const { spawn }  = require('child_process')
const readline      = require('readline');
const pidusage = require('pidusage')
const constants = require('../../shared/constants')
const errorHandler = require('../logging/errorHandler')
const modelController = require('./modelController')
const messagesHandler = require('../logging/messagesHandler')
const verifyTask = require('../tasks/verifyTask').default
const uuidv4 = require('uuid/v4');
const os = require('os');
const find = require('lodash/find');

const processes = []
const std_out = {}
const std_err = {}

const listProcesses = () => {
    setInterval(() => {
        processes.forEach((process) => {
            pidusage(process.pid, (error, stats) => {
                if (!error) {
                    process.stats = stats
                }
            })
        })

        messagesHandler.processes(constants.PROCESSES_LIST, processes)
    }, 5000)
}

const killProcess = (pid) => {
    process.kill(-pid)
}

const rerunProcess = (pid) => {
    const config = modelController.getElement(processes)({ pid })
    if (config) {
        runProcess(config)
    } else {
        errorHandler.error('ERROR! Process was not found.')
    }
}

const prepareProcess = async (config) => {
    const { project_id, type } = config

    const task = verifyTask(config)
    if (!task) {
        return false
    }

    if (type === 'queue') {
        const { tasks, id: queue_id, parallel, pipe } = task
        const queue_uuid = uuidv4()
        let lastPid = null

        for (subTask of tasks) {
            const contexedTask = verifyTask({ project_id, queue_id, queue_uuid, ...subTask })

            if (contexedTask) {
                if (parallel) {
                    runProcess(contexedTask)
                } else {
                    const waitForProc = () => new Promise((resolve, reject) => {
                        const callbacks = {
                            onCloseCallback: () => resolve()
                         }

                        const child = runProcess(contexedTask, callbacks)

                        // if (pipe && lastPid && std_out[lastPid]) {
                        //     const messages = std_out[lastPid].join(os.EOL)
                        //     child.proc.stdin.write(messages)
                        // }

                        lastPid = child.proc.pid
                    })
                    await waitForProc()
                }
            }
        }
    } else {
        runProcess(task)
    }
}

const runProcess = (task, callbacks = {}) => {
    console.log(task)

    const { task_id, project_id, type, env_params, command, cwd, args, queue_id, queue_uuid, statuses } = task

    const env = { ...process.env, ...env_params };
    let proc;

    proc = spawn(command, args, { env, cwd } );

    proc.on('error', (error) => {
        errorHandler.error('ERROR! Process was not started! Message: ' + error.toString())
    })
    if (!proc.pid) {
        return false
    }

    const procData = {
        task_id,
        project_id,
        queue_id,
        queue_uuid,
        type,
        pid: proc.pid,
        cwd,
        args,
        env_params,
        status: constants.PROCESS_STARTED
    }

    messagesHandler.processes(constants.START_PROCESS, { pid: proc.pid, data: '[PROCESS HAS STARTED]', time: Date.now() })

    const checkStatuses = (data) => {
        if (statuses) {
            statuses.forEach((status) => {
                const isValid = status.regex ? RegExp(status.pattern).test(data) : data.includes(status.pattern)

                if (isValid) {
                    procData.status = status.status
                }
            })
        }
    }

    proc.stdout.on('data', (buffer) => {
        const data = buffer.toString()

        messagesHandler.processes(constants.STDOUT, { pid: proc.pid, data: data, time: Date.now() })

        if (callbacks.stdoutCallback) {
            callbacks.stdoutCallback(data)
        }

        checkStatuses(data)

        if (std_out[proc.pid]) {
            std_out[proc.pid].push(data)
        } else {
            std_out[proc.pid] = [data]
        }
    } );

    proc.stderr.on('data', (buffer) => {
        const data = buffer.toString()

        messagesHandler.processes(constants.STDERR, { pid: proc.pid, data: data.toString(), time: Date.now() })

        if (callbacks.stderrCallback) {
            callbacks.stderrCallback(data)
        }

        checkStatuses(data)

        if (std_err[proc.pid]) {
            std_err[proc.pid].push(data)
        } else {
            std_err[proc.pid] = [data]
        }
    });

    proc.on('close', (data) => {
        messagesHandler.processes(constants.PROCESS_FINISHED, { pid: proc.pid, data: `[PROCESS HAS STOPPED WITH STATUS: ${data}]`, time: Date.now() })
        procData.status = constants.PROCESS_FINISHED

        if (callbacks.onCloseCallback) {
            callbacks.onCloseCallback(data, proc.pid)
        }
    });

    processes.push(procData)

    return { procData, proc }
}

module.exports = ({
    runProcess,
    prepareProcess,
    listProcesses,
    rerunProcess,
    killProcess
})
