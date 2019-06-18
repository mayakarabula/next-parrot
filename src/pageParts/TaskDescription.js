import React from 'react';
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import SimpleJsonView from '../components/SimpleJsonView'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

/*
 <Card style={{ padding: '1em', fontFamily: 'monospace' }}>
                <Typography>
                    <span>Task:</span> {this.props.data.name}
                </Typography>
                <SimpleJsonView data={this.props.data} />
            </Card>
*/

class TaskDescription extends React.Component {
    render() {
        console.log(Object.entries(this.props.data))
        return (
            <ExpansionPanel defaultExpanded={true}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <Typography>Description</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                <div style={{ fontFamily: 'monospace' }}>
                        <SimpleJsonView data={this.props.data} />
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

export default TaskDescription
