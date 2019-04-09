import React from 'react';
import { connect } from 'react-redux'
import DescriptionIcon from '@material-ui/icons/Description'
import { getCurrentQuickTasks, getCurrentProjectId } from '../../redux/selectors'
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SimpleTable from './Table'
import FlashIcon from '@material-ui/icons/FlashOn'
import constants from '../../shared/constants'
import Terminal from './Terminal'

const styles = {}

class QuickTasks extends React.Component {

    prepareTask = (task) => {
        const data = {
            type: 'quick',
            task_id: task.id,
            project_id: this.props.currentProjectId
        }

        this.props.socket.emit(constants.START_PROCESS, data)
    }

    render() {
        return (
            <SimpleTable
                heads={[
                    { label: 'Name', id: 'name' },
                    { label: 'Command with Arguments', id: 'command', renderer: (val, row) => `${val} ${(row['args'] || []).join(' ')}`  },
                    { label: '', id: 'actions', align: 'right', renderer: (val, row) => {
                    console.log(row)
                    return (
                        <div>
                        <IconButton onClick={() => this.prepareTask(row)}>
                            <FlashIcon />
                        </IconButton>
                        <IconButton>
                            <DescriptionIcon />
                        </IconButton>
                        </div>
                    )
                    }}
                ]}
                data={this.props.tasks || []}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    tasks: getCurrentQuickTasks(state),
    currentProjectId: getCurrentProjectId(state)
})

export default connect(mapStateToProps)(withStyles(styles)(QuickTasks))
