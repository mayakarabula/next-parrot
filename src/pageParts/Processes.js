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
import sortBy from 'lodash/sortBy'

import SimpleTable from '../components/Table'
import SimpleJsonView from '../components/SimpleJsonView'
import constants from '../../shared/constants'
import { selectProcess } from '../../redux/actions'
import StyledIconButton from '../components/StyledIconButton'
import SocketContext from '../wrappers/sockets/socketContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addTab, removeTab } from '../../redux/actions'

import { faEllipsisV, faHandPaper, faRedo, faTerminal, faTimes } from '@fortawesome/free-solid-svg-icons'
import ProcessInfo from './ProcessInfo';
const uuidv4 = require('uuid/v4');

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
                    { label: 'Mode', id: 'mode', renderer: (val, row) => {
                    const { parent_pid, queue_id, queue_uuid } = row
                    const parentLabel = parent_pid ?
                        <Chip color="secondary" label={`PID: ${parent_pid}`} icon={<GroupIcon />} clickable style={{ color: 'white' }} /> :
                        ''
                    const queueLabel = queue_id && queue_uuid ?
                    <Chip color="secondary" label={`${queue_id} | ${queue_uuid.substr(0,5)}`} icon={<TrafficIcon />} clickable style={{ color: 'white' }} />
                    : ''
                    const forkLabel = !parentLabel && !queueLabel && 'Fork'

                    return <div>{parentLabel}{queueLabel}{forkLabel}</div>
                    }},
                    { label: 'PID', id: 'pid' },
                    { label: 'Updated At', id: 'updated_at', renderer: (val) => moment(val).format('MMM Do, h:mm:ss a') },
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
                            <StyledIconButton tooltip='open in terminal' icon={faTerminal} onClick={() => {
                                this.selectProcess(row)
                                const uuid = uuidv4()
                                    this.props.addTab({
                                        id: uuid,
                                        label: (
                                            <div>
                                                <span>
                                                {row.task_id}
                                                <FontAwesomeIcon
                                                    icon={faTimes}
                                                    style={{ marginLeft: '10px' }}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        this.props.removeTab(uuid)
                                                    }}
                                                />
                                            </span>
                                            <span style={{ display:'block', fontSize:'9px' }}>
                                                PID: {row.pid}
                                            </span>
                                            </div>
                                        ),
                                        view: <ProcessInfo data={row} />
                                    })
                            }} />
                        </div>
                    )
                    }}
                ]}
                sortBy='updated_at'
                sortOrder='desc'
                data={sortBy(this.props.processes, 'updated_at').reverse() || []}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    processes: state.processes || [],
})

const mapDispatchToProps = dispatch => ({
    selectProcess: (pid) => dispatch(selectProcess(pid)),
    addTab: (tab) => dispatch(addTab(tab)),
    removeTab: (uuid) => dispatch(removeTab(uuid))
})

const StyledProcesses = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Processes))

const ContextedComponent = props => (
    <SocketContext.Consumer>
        {socket => <StyledProcesses {...props} socket={socket} />}
    </SocketContext.Consumer>
)

export default ContextedComponent
