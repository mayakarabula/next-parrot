import { createSelector } from 'reselect'
import find from 'lodash/find'

export const getProcesses = (state) => state.processes || []

export const getProjects = (state) => state.projects || []

export const getCurrentProjectId = (state) => state.currentProject || (state.projects.length > 0 && state.projects[0].id) || ''

export const getCurrentProject = createSelector(
    getProjects,
    getCurrentProjectId,
    (projects, id) => {
        return find(projects, { id }) || {}
    }
)

export const getCurrentTasks = createSelector(
    getCurrentProject,
    (project) => project.tasks || []
)

export const getCurrentDefinedTasks = createSelector(
    getCurrentTasks,
    (tasks) => tasks.defined || []
)

export const getCurrentQuickTasks = createSelector(
    getCurrentTasks,
    (tasks) => tasks.quick || []
)

export const getCurrentQueueTasks = createSelector(
    getCurrentTasks,
    (tasks) => tasks.queues || []
)

