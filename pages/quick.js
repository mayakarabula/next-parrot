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

import Processes from '../src/pageParts/Processes'
import QuickTasks from '../src/pageParts/QuickTasks'
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
      // messages: state.messages.concat(message)
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
      // messages: state.messages.concat(message)
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

  getActivePart = () => {
    return {
      0: <QuickTasks socket={this.props.socket} />,
      1: <Processes socket={this.props.socket} />,
      2: (
        <div>
          <h2>Work in progress</h2>
        </div>
      )
    }[this.props.tabId]
  }

  render () {
    const { classes } = this.props;

    console.log(this.props.tabs)
    console.log(
      this.props.tabId
    )
    console.log(this.props.tabs[this.props.tabId])

    return (
      <div style={{ padding: '0 1em' }}>
        {this.props.tabs[this.props.tabId].view}
      </div>
    )
  }
}

/* 
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

         
        </div>
        */

const mapStateToProps = (state) => ({
  tabs: state.navigation.tabs,
  tabId: state.navigation.tabId
})

export default connect(mapStateToProps)(withStyles(styles)(ChatTwo))
