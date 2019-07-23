const get = require('lodash/get')
const { getProject } = require('./projectsController')

const getTasksBy = (projectId, path, ids) => {
  const project = getProject(projectId)
  const tasks = get(project, path, [])
  if (!ids || ids.length === 0) {
    return tasks
  }

  return filter(tasks, (task) => ids.includes(task.id))
}

const getDefinedTasks = (projectId) => (ids) => {
  return getTasksBy(projectId, 'tasks.defined', ids)
}

const getQuickTasks = (projectId) => (ids) => {
  return getTasksBy(projectId, 'tasks.quick', ids)
}

const getQueueTasks = (projectId) => (ids) => {
  return getTasksBy(projectId, 'tasks.queue', ids)
}

module.exports = {
  getDefinedTasks,
  getQuickTasks,
  getQueueTasks
}
