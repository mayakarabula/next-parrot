import { Component } from 'react'
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
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Processes from '../src/components/Processes'
import QuickTasks from '../src/components/QuickTasks'
import Terminal from '../src/components/Terminal'

const styles = {
  greetingMessage: {
    padding: 12,
    maxWidth: 600,
    marginBottom: 12
  }
}

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
  sendDefined = event => {
    event.preventDefault()

    // create message object
    const message = {
      type: 'defined',
      task_id: 'easy mode',
      project_id: 'example',
      // command: "ruby",
      // env_params: {},
      // cwd: "/Users/jakub/next-parrot",
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

  sendQuick = event => {
    event.preventDefault()

    // create message object
    const message = {
      type: 'quick',
      task_id: 'easy and quick',
      project_id: 'example',
    }

    // send object to WS server
    this.props.socket.emit(constants.START_PROCESS, message)

    // add it to state and clean current input value
    this.setState(state => ({
      field: '',
      messages: state.messages.concat(message)
    }))
  }

  sendQueue = event => {
    event.preventDefault()

    // create message object
    const message = {
      type: 'queue',
      task_id: 'easy queue',
      project_id: 'example',
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
    const { classes } = this.props;

    console.log(this.props)

    return (
      <div>
        <Paper elevation={1} className={classes.greetingMessage}>
          <Typography variant="h6" component="h3">
            Welcome to Auto Parrot!
          </Typography>
          <Typography component="p">
            Are you looking for something specific?
          </Typography>
        </Paper>
        <div>
          <br/>
          <button onClick={this.sendDefined}>defined</button>
          <button onClick={this.sendQuick}>quick</button>
          <button onClick={this.sendQueue}>queue</button>

          <Tabs>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
          </Tabs>
          <QuickTasks socket={this.props.socket} />
          <Processes socket={this.props.socket} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(withStyles(styles)(ChatTwo))
