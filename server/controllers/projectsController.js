const has = require('lodash/has')
const find = require('lodash/find')
const remove = require('lodash/remove')
const projectsFileHelper = require('../helpers/projectsFileHelper')
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

const getProject = (projectId) => {
    return find(projects, { id: projectId })
}

const addProject = (project) => {
    projects.push(project)
    return projects
}

const removeProject = (projectId) => {
    projects = remove(projects, (project) => project.id !== projectId)
    return projects
}

module.exports = {
    constructProjects,
    getProject,
    addProject,
    removeProject
}
