import React from 'react';
import { connect } from 'react-redux'
import io from 'socket.io-client'

import constants from '../../../shared/constants'
import {
  assignProjects,
  assignProcesses,
  assignErrors,
  assignSTDERR,
  assignSTDOUT
} from '../../../redux/actions'
import SocketContext from './socketContext'

class SocketIOWrapper extends React.Component {
  // static async getInitialProps ({ req }) {
  //   const response = await fetch('http://localhost:3000/messages/chat2')
  //   const messages = await response.json()
  //   return { messages }
  // }
  constructor(props) {
    super(props)

    this.state = {
      subscribe: true,
      subscribed: false,
      socket: null
    }
  }

  mapChannelToEvent = ({
    [constants.PROJECTS_LIST]: this.props.assignProjects,
    [constants.GENERAL_ERROR]: this.props.assignErrors,
    [constants.STDOUT]: this.props.assignSTDOUT,
    [constants.STDERR]: this.props.assignSTDERR,
    [constants.PROCESS_FINISHED]: this.props.assignSTDOUT,
    [constants.START_PROCESS]: this.props.assignSTDOUT,
    [constants.PROCESSES_LIST]: this.props.assignProcesses,
  })

  subscribe = (socket = this.state.socket) => {
    if (this.state.subscribe && !this.state.subscribed) {
      Object.entries(this.mapChannelToEvent).forEach(
        ([channel, event]) => {
          socket.on(channel, (data) => event(data))
        }
      )

      this.setState({ subscribed: true })
    }
  }

  componentDidMount () {
    const socket = io()

    this.setState({ socket })
    this.subscribe(socket)
  }

  componentDidUpdate () {
    this.subscribe()
  }

  // close socket connection
  componentWillUnmount () {
    Object.entries(this.mapChannelToEvent).forEach(
      ([channel, event]) => {
        this.state.socket.off(channel, (data) => event(data))
      }
    )
    this.state.socket.close()
  }

  render () {
    const { children } = this.props
    const childElements = React.Children.map(children, child =>
      React.cloneElement(child, {
        socket: this.state.socket
      })
    )

    return (
      <SocketContext.Provider value={this.state.socket}>
        { childElements }
      </SocketContext.Provider>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  assignProjects: (data) => dispatch(assignProjects(data)),
  assignProcesses: (data) => dispatch(assignProcesses(data)),
  assignErrors: (data) => dispatch(assignErrors(data)),
  assignSTDERR: (data) => dispatch(assignSTDERR(data)),
  assignSTDOUT: (data) => dispatch(assignSTDOUT(data))
})

export default connect(() => ({}), mapDispatchToProps)(SocketIOWrapper)
