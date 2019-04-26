const projectsController = require('../controllers/projectsController')
const verifyDefinedTask = require('./verifyDefinedTask').default
const verifyQuickTask = require('./verifyQuickTask').default
const verifyQueueTask = require('./verifyQueueTask').default
const errorHandler = require('../logging/errorHandler')

const verifyTask = (config) => {
    const { task_id, project_id, type } = config

    const taskGetters = {
        defined: projectsController.getDefinedTask,
        quick: projectsController.getQuickTask,
        queue: projectsController.getQueueTask
    }

    if (!task_id || !project_id || !type ) {
        return false
    }

    console.log('verify Task', 'has required data')

    const task = taskGetters[type]({ id: project_id })({ id: task_id })

    console.log('verify Task', 'got this task', task)

    const taskVerification = {
        defined: verifyDefinedTask,
        quick: verifyQuickTask,
        queue: verifyQueueTask
    }

    if (taskVerification[type](task, config)) {
        return { ...config, ...task }
    } else {
        errorHandler.error('ERROR! Parameters passed are incosistent with the task definition!')

        return false
    }
}

exports.default = verifyTask
