import React from 'react';
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import SimpleJsonView from '../components/SimpleJsonView'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Terminal from '../components/Terminal'


/*
 <Card style={{ padding: '1em', fontFamily: 'monospace' }}>
                <Typography>
                    <span>Process:</span> {this.props.data.task_id}
                </Typography>
                <SimpleJsonView data={this.props.data} />
                <Terminal />
            </Card>
*/
class ProcessInfo extends React.Component {
    render() {
        console.log(Object.entries(this.props.data))
        return (
            <div>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography>Process information</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <div style={{ fontFamily: 'monospace' }}>
                            <SimpleJsonView data={this.props.data} />
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={true}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <Typography>Terminal output</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Terminal style={{width: '100%'}} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
            </div>
        )
    }
}

export default ProcessInfo
