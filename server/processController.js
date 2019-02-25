const { spawn }  = require('child_process')
const isEqual = require('lodash/isEqual')
const intersection = require('lodash/intersection')
const pidusage = require('pidusage')
const constants = require('../shared/constants')
const projectsController = require('./projectsController')
const errorHandler = require('./errorHandler')
const modelController = require('./modelController')
const messagesHandler = require('./messagesHandler')

const processes = []
const std_out = {}
const std_err = {}

const verifyQuickTask = (task, config) => {
    const { env_params, command, cwd, args } = config

    if (env_params) {
       const validEnv =  isEqual(
            intersection(Object.keys(env_params), task.fields),
            Object.keys(env_params)
        )
        if (!validEnv) {
            return false
        }
    }
    if (command && task.command !== command) {
        return false
    }
    if (args && args !== task.args) {
        return false
    }
    if (cwd && task.cwd !== cwd) {
        return false
    }

    return true
}

const verifyDefinedTask = (task, config) => {
    const { env_params = {}, command, cwd } = config
    
    if (env_params) {
        const validEnv =  isEqual(
             intersection(Object.keys(env_params), task.fields),
             Object.keys(env_params)
         )
         if (!validEnv) {
             return false
         }
     }
    if (command && task.command !== command) {
        return false
    }
    if (cwd && task.cwd !== cwd) {
        return false
    }

    return true
}

const verifyTask = (config) => {
    const { task_id, project_id, type } = config

    const taskGetters = {
        defined: projectsController.getDefinedTask,
        quick: projectsController.getQuickTasks
    }

    if (!task_id || !project_id || !type ) {
        return false
    }

    const task = taskGetters[type]({ id: project_id })({ id: task_id })

    const taskVerification = {
        defined: verifyDefinedTask,
        quick: verifyQuickTask,
    }

    if (taskVerification[type](task, config)) {
        return { ...config, ...task }
    } else {
        errorHandler.error('ERROR! Parameters passed are incosistent with the task definition!')

        return false
    }
}

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

const runProcess = (config) => {
    const task = verifyTask(config)
    if (!task) {
        return false
    }

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

        if (std_out[proc.pid]) {
            std_out[proc.pid].push(data.toString())
        } else {
            std_out[proc.pid] = [data.toString()]
        }
    } );

    proc.stderr.on('data', (data) => {
        messagesHandler.processes(constants.STDERR, { pid: proc.pid, data: data.toString(), time: Date.now() })

        if (std_err[proc.pid]) {
            std_err[proc.pid].push(data.toString())
        } else {
            std_err[proc.pid] = [data.toString()]
        }
    });

    proc.on('close', (data) => {
        messagesHandler.processes(constants.PROCESS_FINISHED, { pid: proc.pid, data: `[PROCESS HAS STOPPED WITH STATUS: ${data}]`, time: Date.now() })
        procData.status = constants.PROCESS_FINISHED
    });

    processes.push(procData)

    return procData
}

module.exports = ({
    runProcess,
    listProcesses,
    rerunProcess,
    killProcess
})
