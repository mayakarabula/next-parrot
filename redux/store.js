import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { actionTypes } from './actionTypes'

// INITIAL STATE
const initialState = {
  processes: [],
  projects: [],
  STDOUT: {},
  STDERR: {},
  errors: []
}

// REDUCERS
export const reducer = (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case actionTypes.ASSIGN_PROJECTS:
      return Object.assign({}, state, {
        projects: action.payload
      })
    case actionTypes.ASSIGN_ERRORS:
      const { errors } = state
      errors.push(action.payload)

      return Object.assign({}, state, {
        errors
      })
    case actionTypes.ASSIGN_PROCESSES:
      return Object.assign({}, state, {
        processes: action.payload
      })
    case actionTypes.ASSIGN_STDOUT:
      const { STDOUT } = state
      STDOUT[payload.pid] = [
        ...(STDOUT[payload.pid] || []),
        { data: payload.data, time: payload.time }
      ]
      return Object.assign({}, state, { STDOUT })
    case actionTypes.ASSIGN_STDERR:
      const { STDERR } = state
      STDERR[payload.pid] = [
        ...(STDERR[payload.pid] || []),
        { data: payload.data, time: payload.time }
      ]
      return Object.assign({}, state, { STDERR })
    default:
      return state
  }
}

export function initializeStore (initialState = initialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  )
}