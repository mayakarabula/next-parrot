import { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

import Processes from '../src/pageParts/Processes'
import DefinedTasks from '../src/pageParts/DefinedTasks'

const styles = {
  greetingMessage: {
    padding: 12,
    maxWidth: 600,
    marginBottom: 12
  }
}

class DefinedTasksPage extends Component {
  getActivePart = () => {
    return {
      0: <DefinedTasks socket={this.props.socket} />,
      1: <Processes socket={this.props.socket} />,
      2: (
        <div>
          <h2>Work in progress</h2>
        </div>
      )
    }[this.props.tabId]
  }

  render () {
    let ActivePart = this.getActivePart()

    return (
      <div style={{ padding: '0 1em' }}>
        {ActivePart}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tabId: state.navigation.tabId
})

export default connect(mapStateToProps)(withStyles(styles)(DefinedTasksPage))
