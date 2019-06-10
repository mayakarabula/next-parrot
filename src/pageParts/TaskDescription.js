import React from 'react';
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import SimpleJsonView from '../components/SimpleJsonView'

class TaskDescription extends React.Component {
    render() {
        console.log(Object.entries(this.props.data))
        return (
            <Card style={{ padding: '1em', fontFamily: 'monospace' }}>
                <Typography>
                    <span>Task:</span> {this.props.data.name}
                </Typography>
                <SimpleJsonView data={this.props.data} />
            </Card>
        )
    }
}

export default TaskDescription
