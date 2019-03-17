const projectsController = require('../projectsController')
const verifyDefinedTask = require('./verifyDefinedTask').default
const verifyQuickTask = require('./verifyQuickTask').default

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

exports.default = verifyTask
