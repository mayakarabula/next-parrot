import React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { getStderrByPid, getStdoutByPid } from '../../redux/selectors'
import sortBy from 'lodash/sortBy'
import * as constants from '../../shared/constants'

import CloseIcon from '@material-ui/icons/Close'
import ZommOutIcon from '@material-ui/icons/ZoomOutMap'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import IconButton from '@material-ui/core/IconButton'

const styles = (theme) => ({
  root: {
    padding: theme.spacing.unit * 2,
    background: '#282a36',
    color: '#f8f8f2',
    fontFamily: 'monospace',
    minHeight: 250,
    width: '100%'
  },
  actions: {
    float: 'right',
  },
  action: {
    color: '#f8f8f2'
  }
})

const prepareData = (props) => {
  const { stdErr, stdOut } = props

  console.log(
    stdErr,
    stdOut
  )

  return sortBy([...stdOut, ...stdErr], 'time').map((entry) => entry.data)
}

/*
<div className={classes.actions}>
<IconButton className={classes.action}>
  <ZommOutIcon />
</IconButton>
<IconButton className={classes.action}>
  <OpenInNewIcon />
</IconButton>
<IconButton className={classes.action}>
  <CloseIcon />
</IconButton>
</div>
*/

class Terminal extends React.Component {
  shouldComponentUpdate(nextProps) {
    console.log(this.props, nextProps)
    return true
  }

  render() {
    const output = prepareData(this.props)
    const { classes } = this.props

    return (
      <Paper className={classes.root}>
        <pre>
        {output.join('')}
        </pre>
      </Paper>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('reconsiders state', state)

  console.log({
    stdOut: state[constants.STDOUT][state.currentProcess],
    stdErr: state[constants.STDERR][state.currentProcess]
  })

  return ({
    stdOut: state[constants.STDOUT][state.currentProcess] || [],
    stdErr: state[constants.STDERR][state.currentProcess] || []
  })
}

export default connect(mapStateToProps)(withStyles(styles)(Terminal))
