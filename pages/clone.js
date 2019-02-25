import { Component } from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import constants from '../shared/constants'
import {
  assignProjects,
  assignProcesses,
  assignErrors,
  assignSTDERR,
  assignSTDOUT
} from '../redux/actions'
import { connect } from 'react-redux'

class ChatTwo extends Component {
  // fetch old messages data from the server
  static async getInitialProps ({ req }) {
    const response = await fetch('http://localhost:3000/messages/chat2')
    const messages = await response.json()
    return { messages }
  }

  static defaultProps = {
    messages: []
  }

  // init state with the prefetched messages
  state = {
    field: '',
    newMessage: 0,
    messages: this.props.messages,
    subscribe: false,
    subscribed: false
  }

  subscribe = () => {
    if (this.state.subscribe && !this.state.subscribed) {
      // connect to WS server and listen event
      const { dispatch } = this.props

      console.log('should subscribe')
      this.props.socket.on(constants.PROJECTS_LIST, (data) => dispatch(assignProjects(data)))
      this.props.socket.on(constants.GENERAL_ERROR, (data) => dispatch(assignErrors(data)))
      this.props.socket.on(constants.STDOUT, (data) => dispatch(assignSTDOUT(data)))
      this.props.socket.on(constants.STDERR, (data) => dispatch(assignSTDERR(data)))
      this.props.socket.on(constants.PROCESS_FINISHED, (data) => dispatch(assignSTDOUT(data)))
      this.props.socket.on(constants.START_PROCESS, (data) => dispatch(assignSTDOUT(data)))
      this.props.socket.on(constants.PROCESSES_LIST, (data) => dispatch(assignProcesses(data)))

      // this.props.socket.on('message.chat2', this.handleMessage)
      // this.props.socket.on('message.chat1', this.handleOtherMessage)
      this.setState({ subscribed: true })
    }
  }
  componentDidMount () {
    this.subscribe()
  }

  componentDidUpdate () {
    this.subscribe()
  }

  static getDerivedStateFromProps (props, state) {
    if (props.socket && !state.subscribe) return { subscribe: true }
    return null
  }

  // close socket connection
  componentWillUnmount () {
    this.props.socket.off('message.chat1', this.handleOtherMessage)
    this.props.socket.off('message.chat2', this.handleMessage)
  }

  // add messages from server to the state
  consoleOut = d => {
    console.log(d)
  }

  handleMessage = message => {
    this.setState(state => ({ messages: state.messages.concat(message) }))
  }

  handleOtherMessage = () => {
    this.setState(prevState => ({ newMessage: prevState.newMessage + 1 }))
  }

  handleChange = event => {
    this.setState({ field: event.target.value })
  }

  // send messages to server and add them to the state
  handleSubmit = event => {
    event.preventDefault()

    // create message object
    const message = {
      type: 'defined',
      task_id: 'easy mode',
      project_id: 'example',
      // command: "ruby",
      // env_params: {},
      // cwd: "/home/jakub/parrot-next",
      args: ["hello.rb"]
    }

    // send object to WS server
    this.props.socket.emit(constants.START_PROCESS, message)

    // add it to state and clean current input value
    this.setState(state => ({
      field: '',
      messages: state.messages.concat(message)
    }))
  }

  render () {
    return (
      <main>
        <div>
          <Link href={'/'}>
            <a>{`Chat One ${
              this.state.newMessage > 0
                ? `( ${this.state.newMessage} new message )`
                : ''
            }`}</a>
          </Link>
          <br />
          <Link href={'/clone'}>
            <a>{'Chat Two'}</a>
          </Link>
          <ul>
            {this.state.messages.map(message => (
              <li key={message.id}>{message.value}</li>
            ))}
          </ul>
          <form onSubmit={e => this.handleSubmit(e)}>
            <input
              onChange={this.handleChange}
              type='text'
              placeholder='Hello world!'
              value={this.state.field}
            />
            <button>Send</button>
          </form>
        </div>
      </main>
    )
  }
}

export default connect()(ChatTwo)
