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
