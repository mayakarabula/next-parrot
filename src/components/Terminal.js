import React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { getStderrByPid, getStdoutByPid } from '../../redux/selectors'
import sortBy from 'lodash/sortBy'

import CloseIcon from '@material-ui/icons/Close'
import ZommOutIcon from '@material-ui/icons/ZoomOutMap'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import IconButton from '@material-ui/core/IconButton'

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    background: '#282a36',
    color: '#f8f8f2',
    fontFamily: 'monospace',
    minHeight: 250
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

  return sortBy([...stdOut, ...stdErr], 'time').map((entry) => entry.data)
}

const Terminal = (props) => {
  const output = prepareData(props)
  const { classes } = props

  return (
    <Paper className={classes.root}>
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
      <pre>
      {output.join('')}
      </pre>
    </Paper>
  )
}

const mapStateToProps = (state) => ({
  stdOut: getStdoutByPid(state),
  stdErr: getStderrByPid(state)
})

export default connect(mapStateToProps)(withStyles(styles)(Terminal))
