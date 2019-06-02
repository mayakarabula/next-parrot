import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectTab } from '../../redux/actions'

const QUICK_TASKS_TABS = {
  DEFINITIONS: 0,
  PROCESSES: 1,
  GRAPHS: 2
}

const Tasks  = (props) => {
  return (
    <div style={{ padding: '0 24px' }}>
      <Typography variant='h5' component='h1' style={{ color: 'white' }}>
        {props.name}
      </Typography>

      <Tabs value={props.tabId} style={{ marginTop: 15 }} indicatorColor="secondary">
        <Tab
          onClick={() => props.selectTab(QUICK_TASKS_TABS.DEFINITIONS)}
          label="Tasks Definitions"
        />
        <Tab
          onClick={() => props.selectTab(QUICK_TASKS_TABS.PROCESSES)}
          label="Processes"
        />
        <Tab
          onClick={() => props.selectTab(QUICK_TASKS_TABS.GRAPHS)}
          label="Graphs"
        />
      </Tabs>
    </div>
  )
}

class TopNavigation extends React.Component {
  render() {
    switch(this.props.router.pathname) {
      case '/quick': return <Tasks {...this.props} name='Quick Tasks' />
      case '/defined': return <Tasks {...this.props} name='Complex Tasks' />
      default: return <div />
    }
  }
}

const mapStateToProps = (state) => ({
  tabId: state.navigation.tabId
})

const mapDispatchToProps = dispatch => ({
  selectTab: (tab) => dispatch(selectTab(tab))
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TopNavigation)
