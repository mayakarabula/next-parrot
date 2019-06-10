import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectTab, assignTabs } from '../../redux/actions'
import QuickTasks from './QuickTasks'
import DefinedTasks from './DefinedTasks'
import Processes from './Processes'

const Tasks  = (props) => {
  return (
    <div style={{ padding: '0 24px' }}>
      <Typography variant='h5' component='h1' style={{ color: 'white' }}>
        {props.name}
      </Typography>

      <Tabs value={props.tabId} style={{ marginTop: 15 }} indicatorColor="secondary">
        {
          [
            props.tabs.map(
              (tab, index) => (
                <Tab
                  onClick={() => props.selectTab(index)}
                  label={tab.label || ''}
                />
              )
            )
          ]
        }
      </Tabs>
    </div>
  )
}

class TopNavigation extends React.Component {
  constructor(props) {
    super(props)
    this.setTabs()
  }

  setTabs () {
    const { pathname } = this.props.router

    switch(pathname) {
      case '/quick':
        this.props.assignTabs([
          { label: 'Quick Tasks', view: <QuickTasks /> },
          { label: 'Processes', view: <Processes /> },
          { label: 'Graphs' }
        ]);
        break;
      case '/defined':
        this.props.assignTabs([
          { label: 'Complex Tasks' }
        ]);
        break;
    }
  }

  componentDidUpdate(prevProps) {
    const { pathname: lastPathname } = prevProps.router
    if (this.props.router.pathname !== lastPathname) {
      this.setTabs()
    }
  }

  render() {
    const { pathname } = this.props.router

    switch(pathname) {
      case '/quick':
        return <Tasks {...this.props} name='Quick Tasks' />
      case '/defined':
        return <Tasks {...this.props} name='Complex Tasks' />
      default: return <div />
    }
  }
}

const mapStateToProps = (state) => ({
  tabId: state.navigation.tabId,
  tabs: state.navigation.tabs
})

const mapDispatchToProps = dispatch => ({
  assignTabs: (tabs) => dispatch(assignTabs(tabs, 0)),
  selectTab: (tab) => dispatch(selectTab(tab))
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TopNavigation)
