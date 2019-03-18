const { spawn }  = require('child_process')
const pidusage = require('pidusage')
const constants = require('../../shared/constants')
const errorHandler = require('../logging/errorHandler')
const modelController = require('./modelController')
const messagesHandler = require('../logging/messagesHandler')
const verifyTask = require('../tasks/verifyTask').default

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

const prepareProcess = (config) => {
    const { project_id, type } = config

    const task = verifyTask(config)
    if (!task) {
        return false
    }

    if (type === 'queue') {
        const { tasks } = task

        tasks.forEach((subTask) => {
            const contexedTask = verifyTask({ project_id, queue: true, ...subTask })

            if (contexedTask) {
                runProcess(contexedTask)
            }
        })
    } else {
        runProcess(task)
    }
}

const runProcess = (task, callbacks = {}) => {
    console.log(task)

    const { task_id, project_id, type, env_params, command, cwd, args } = task

    const env = { ...process.env, ...env_params };
    let proc;

    proc = spawn(command, args, { env, cwd } );

    proc.on('error', (error) => {
        errorHandler.error('ERROR! Process was not started! Message: ' + error.toString())
    })
    if (!proc.pid) {
        return false
    }

    const procData = { task_id, project_id, type, pid: proc.pid, cwd, args, env_params, status: constants.PROCESS_STARTED }

    messagesHandler.processes(constants.START_PROCESS, { pid: proc.pid, data: '[PROCESS HAS STARTED]', time: Date.now() })

    proc.stdout.on('data', (data) => {
        messagesHandler.processes(constants.STDOUT, { pid: proc.pid, data: data.toString(), time: Date.now() })

        if (callbacks.stdoutCallback) {
            callbacks.stdoutCallback(data)
        }

        if (std_out[proc.pid]) {
            std_out[proc.pid].push(data.toString())
        } else {
            std_out[proc.pid] = [data.toString()]
        }
    } );

    proc.stderr.on('data', (data) => {
        messagesHandler.processes(constants.STDERR, { pid: proc.pid, data: data.toString(), time: Date.now() })

        if (callbacks.stderrCallback) {
            callbacks.stderrCallback(data)
        }

        if (std_err[proc.pid]) {
            std_err[proc.pid].push(data.toString())
        } else {
            std_err[proc.pid] = [data.toString()]
        }
    });

    proc.on('close', (data) => {
        messagesHandler.processes(constants.PROCESS_FINISHED, { pid: proc.pid, data: `[PROCESS HAS STOPPED WITH STATUS: ${data}]`, time: Date.now() })
        procData.status = constants.PROCESS_FINISHED

        if (callbacks.onCloseCallback) {
            callbacks.onCloseCallback(data)
        }
    });

    processes.push(procData)

    return procData
}

module.exports = ({
    runProcess,
    prepareProcess,
    listProcesses,
    rerunProcess,
    killProcess
})
