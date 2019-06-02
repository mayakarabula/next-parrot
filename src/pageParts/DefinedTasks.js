import React from 'react';
import { connect } from 'react-redux'
import DescriptionIcon from '@material-ui/icons/Description'
import { getCurrentDefinedTasks, getCurrentProjectId } from '../../redux/selectors'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import FlashIcon from '@material-ui/icons/FlashOn'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faFileAlt } from '@fortawesome/free-solid-svg-icons'

import constants from '../../shared/constants'
import SimpleTable from '../components/Table'
import SocketContext from '../wrappers/sockets/socketContext'

const styles = {}

class DefinedTasks extends React.Component {
    prepareTask = (task) => {
        const data = {
            type: 'quick',
            task_id: task.id,
            project_id: this.props.currentProjectId
        }

        this.props.socket.emit(constants.START_PROCESS, data)
    }

    prepareData = (data) => {
        return data.map(
            (row) => {
                row.commandWithArgs = row.command + ' ' + (row.args || []).join(' ')
                return Object.assign({}, row)
            }
        )
    }

    render() {
        const data = this.prepareData(this.props.tasks || [])

        return (
            <SimpleTable
                heads={[
                    { label: 'Name', id: 'name' },
                    { label: 'Command with Arguments', id: 'commandWithArgs' },
                    { label: '', id: 'actions', align: 'right', renderer: (val, row) => {
                    return (
                        <div>
                            <Button
                                style={{ marginRight: '5px' }}
                                onClick={() => this.prepareTask(row)}
                                variant="outlined"
                                size="small"
                                color="primary"
                            >
                                run
                            </Button>
                            <IconButton style={{ padding: 5 }}>
                                <FontAwesomeIcon icon={faFileAlt} style={{ width: 17, height: 17 }}  />
                            </IconButton>
                        </div>
                    )
                    }}
                ]}
                data={data}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    tasks: getCurrentDefinedTasks(state),
    currentProjectId: getCurrentProjectId(state)
})

const ConnectedComponent = connect(mapStateToProps)(withStyles(styles)(DefinedTasks))

const ContextedComponent = props => (
    <SocketContext.Consumer>
        {socket => <ConnectedComponent {...props} socket={socket} />}
    </SocketContext.Consumer>
)

export default ContextedComponent
