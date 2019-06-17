import React from 'react';
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Terminal from '../components/Terminal'
import SimpleJsonView from '../components/SimpleJsonView'

class ProcessInfo extends React.Component {
    render() {
        console.log(Object.entries(this.props.data))
        return (
            <Card style={{ padding: '1em', fontFamily: 'monospace' }}>
                <Typography>
                    <span>Process:</span> {this.props.data.task_id}
                </Typography>
                <SimpleJsonView data={this.props.data} />
                <Terminal />
            </Card>
        )
    }
}

export default ProcessInfo
