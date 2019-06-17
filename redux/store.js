import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { actionTypes } from './actionTypes'

// INITIAL STATE
const initialState = {
  processes: [],
  projects: [],
  currentProject: 'example',
  currentProcess: '',
  STDOUT: {},
  STDERR: {},
  errors: [],
  navigation: {
    tabId: 0,
    tabs: []
  }
}

// REDUCERS
export const reducer = (state = initialState, action) => {
  const { payload } = action
  const navigation = state.navigation

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

      console.log('ASSIGN TO STD OUT ', payload.pid, payload.data)

      return Object.assign({}, state, { STDOUT })

    case actionTypes.ASSIGN_STDERR:
      const { STDERR } = state
      STDERR[payload.pid] = [
        ...(STDERR[payload.pid] || []),
        { data: payload.data, time: payload.time }
      ]
      return Object.assign({}, state, { STDERR })

    case actionTypes.SELECT_PROCESS:
      return Object.assign({}, state, {
        currentProcess: action.payload
      })

    case actionTypes.SELECT_TAB:
      navigation.tabId = action.payload

      return Object.assign({}, state, {
        navigation
      })

    case actionTypes.ASSIGN_TABS:
      navigation.tabs = action.payload.tabs
      if (action.payload.tabId) {
        navigation.tabId = action.payload.tabId
      }

      return Object.assign({}, state, {
        navigation
      })

    case actionTypes.ADD_TAB:
      navigation.tabs.push(action.payload)
      navigation.tabId = navigation.tabs.length -1

      return Object.assign({}, state, {
        navigation
      })

    case actionTypes.REMOVE_TAB:
      navigation.tabs = navigation.tabs.filter(
        (tab) => {
          if (!tab.id) {
            return true
          }
          return tab.id !== action.payload
        }
      )
      navigation.tabId = 0

      return Object.assign({}, state, {
        navigation
      })

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