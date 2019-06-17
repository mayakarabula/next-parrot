import { actionTypes } from './actionTypes'

// ACTIONS
export const assignProjects = (projects) => {
  return ({ type: actionTypes.ASSIGN_PROJECTS, payload: projects })
}

export const assignProcesses = (processes) => {
  return ({ type: actionTypes.ASSIGN_PROCESSES, payload: processes })
}

export const assignSTDOUT = (stdout) => {
  return ({ type: actionTypes.ASSIGN_STDOUT, payload: stdout })
}

export const assignSTDERR = (stderr) => {
  return ({ type: actionTypes.ASSIGN_STDERR, payload: stderr })
}

export const assignErrors = (errors) => {
  return ({ type: actionTypes.ASSIGN_ERRORS, payload: errors })
}

export const selectProcess = (pid) => {
  return ({ type: actionTypes.SELECT_PROCESS, payload: pid })
}

export const selectTab = (tabId) => {
  return ({ type: actionTypes.SELECT_TAB, payload: tabId })
}

export const assignTabs = (tabs, tabId) => {
  return ({ type: actionTypes.ASSIGN_TABS, payload: { tabs, tabId } })
}

export const addTab = (tab) => {
  return ({ type: actionTypes.ADD_TAB, payload: tab })
}

export const removeTab = (id) => {
  return ({ type: actionTypes.REMOVE_TAB, payload: id })
}
