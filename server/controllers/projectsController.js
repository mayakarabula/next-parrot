const has = require('lodash/has')
const projectsFileHelper = require('../helpers/projectsFileHelper')
const modelController = require('./modelController')
const errorHandler = require('../logging/errorHandler')

const PROPERTIES = ['name', 'tasks.defined', 'tasks.quick', 'tasks.queue']

let projects = []

const verifyCorrectStructure = (project) => {
    let isCorrect = true
    PROPERTIES.forEach((property) => {
        if (!has(project, property)) {
            isCorrect = false
        }
    })

    return isCorrect
}

const constructProjects = () => {
    const loadedProjects = projectsFileHelper.constructProjects()

    projects = loadedProjects.reduce((projects, project) => {
        const isCorrect = verifyCorrectStructure(project)
        if (isCorrect) {
            projects.push(project)
        } else {
            errorHandler.error(`WARNING! Project ${project.name || ''} has invalid structure.`)
        }
        return projects
    }, [])

    return projects
}

const getProject = (filters) => {
    return modelController.getElement(projects)(filters)
}

const getDefinedTask = (projectFilters) => (taskFilters) => {
    return modelController.getElement(getDefinedTasks(projectFilters))(taskFilters, {})
}

const getDefinedTasks = (filters) => {
    const project = getProject(filters)
    return modelController.getPart(project)('tasks.defined', [])
}

const getQuickTasks = (filters) => {
    const project = getProject(filters)
    return modelController.getPart(project)('tasks.quick', [])
}

const getQuickTask = (projectFilters) => (taskFilters) => {
    return modelController.getElement(getQuickTasks(projectFilters))(taskFilters, {})
}

const getQueueTasks = (filters) => {
    const project = getProject(filters)
    return modelController.getPart(project)('tasks.queue', [])
}

const getQueueTask = (projectFilters) => (taskFilters) => {
    return modelController.getElement(getQueueTasks(projectFilters))(taskFilters, {})
}

module.exports = {
    constructProjects,
    getProject,
    getDefinedTasks,
    getDefinedTask,
    getQuickTasks,
    getQuickTask,
    getQueueTasks,
    getQueueTask
}
