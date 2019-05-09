import React from 'react';
import { connect } from 'react-redux'
import DescriptionIcon from '@material-ui/icons/Description'
import DeleteIcon from '@material-ui/icons/Delete'
import ReplayIcon from '@material-ui/icons/Replay'
import moment from 'moment'
import Chip from '@material-ui/core/Chip';
import CodeIcon from '@material-ui/icons/Code'
import TrafficIcon from '@material-ui/icons/Traffic'
import MoreIcon from '@material-ui/icons/MoreVert'
import GroupIcon from '@material-ui/icons/Group'
import { getProcesses } from '../../redux/selectors'
import IconButton from '@material-ui/core/IconButton';
import blue from '@material-ui/core/colors/blue'
import green from '@material-ui/core/colors/green'
import { withStyles } from '@material-ui/core/styles';
import SimpleTable from './Table'
import SimpleJsonView from './SimpleJsonView'
import constants from '../../shared/constants'
import { selectProcess } from '../../redux/actions'
import sortBy from 'lodash/sortBy'
import StyledIconButton from './StyledIconButton'

import { faEllipsisV, faHandPaper, faRedo, faTerminal } from '@fortawesome/free-solid-svg-icons'


const dotStyle = {
    height: 10,
    width: 10,
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: 5
  }

const styles = {
    blueDot: {
      ...dotStyle,
      backgroundColor: blue[500],
    },
    greenDot: {
      ...dotStyle,
      backgroundColor: green[300]
    }
  }

class Processes extends React.Component {
    killProcess = (process) => {
        this.props.socket.emit(constants.KILL_PROCESS, process.id)
    }

    rerunProcess = (process) => {
        this.props.socket.emit(constants.RERUN_PROCESS, process.id)
    }

    selectProcess = (process) => {
        this.props.selectProcess(process.pid)
    }

    render() {
        const { classes } = this.props

        return (
            <SimpleTable
                heads={[
                    { label: 'Task', id: 'task_id' },
                    { label: '', id: '', renderer: (val, row) => {
                    const { parent_pid, queue_id, queue_uuid } = row
                    const parentLabel = parent_pid ?
                        <Chip color="secondary" label={`PID: ${parent_pid}`} icon={<GroupIcon />} clickable style={{ color: 'white' }} /> :
                        ''
                    const queueLabel = queue_id && queue_uuid ?
                    <Chip color="secondary" label={`${queue_id} | ${queue_uuid.substr(0,5)}`} icon={<TrafficIcon />} clickable style={{ color: 'white' }} />
                    : ''

                    return <div>{parentLabel}{queueLabel}</div>
                    }},
                    { label: 'PID', id: 'pid' },
                    // { label: 'Started At', id: 'started_at', renderer: (val) => moment(val).format('MMM Do, h:mm:ss a') },
                    { label: 'Updated At', id: 'updated_at', renderer: (val) => moment(val).format('MMM Do, h:mm:ss a') },
                    // { label: 'Stats', id: 'stats', renderer: (val) => (
                    //     window ? <SimpleJsonView data={val} /> : <div />
                    // ) },
                    // { label: 'ENV', id: 'env_params', renderer: (val) => (
                    //     window ? <SimpleJsonView data={val} /> : <div />
                    // ) },
                    { label: 'Status', id: 'status', renderer: (val) => {
                    if (val.includes('PROCESS_FINISHED')) {
                        return <div><span className={classes.blueDot} /> FINISHED </div>
                    }
                    if (val.includes('PROCESS_STARTED')) {
                        return <div><span className={classes.greenDot} /> STARTED </div>
                    }
                    return val
                    }},
                    { label: '', id: 'actions', align: 'right', renderer: (val, row) => {
                    return (
                        <div>
                            <StyledIconButton tooltip='start again' icon={faRedo} onClick={() => this.rerunProcess(row)} />
                            <StyledIconButton tooltip='stop' icon={faHandPaper} onClick={() => this.killProcess(row)} />
                            <StyledIconButton tooltip='open in terminal' icon={faTerminal} onClick={() => this.selectProcess(row)} />
                        </div>
                    )
                    }}
                ]}
                data={sortBy(this.props.processes, 'updated_at').reverse() || []}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    processes: getProcesses(state),
})

const mapDispatchToProps = dispatch => ({
    selectProcess: (pid) => { 
        dispatch(selectProcess(pid))
     }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Processes))
