import { createSelector } from 'reselect'
import find from 'lodash/find'
import * as constants from '../shared/constants'

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

export const getCurrentProcess = (state) => state.currentProcess

export const getStdout = (state) => state[constants.STDOUT]

export const getStdoutByPid = createSelector(
    getStdout,
    getCurrentProcess,
    (stdOut, procPid) => stdOut[procPid] || []
)

export const getStderr = (state) => state[constants.STDERR]

export const getStderrByPid = createSelector(
    getStderr,
    getCurrentProcess,
    (stdErr, procPid) => stdErr[procPid] || []
)
