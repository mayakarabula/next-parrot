import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import DashboardIcon from '@material-ui/icons/Dashboard'
import OnIcon from '@material-ui/icons/SpeakerNotes'
import OffIcon from '@material-ui/icons/SpeakerNotesOff'
import TrainIcon from '@material-ui/icons/Train'
import TrafficIcon from '@material-ui/icons/Traffic'
import SettingsIcon from '@material-ui/icons/Settings'
import PluginsIcon from '@material-ui/icons/Power'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from 'next/link'

export const sites = [
  {
    href: '/',
    key: 'projects',
    label: 'Projects',
    icon: <DashboardIcon />
  },
  {
    href: '/defined',
    key: 'defined',
    label: 'Complex Tasks',
    icon: <OnIcon />
  },
  {
    href: '/quick',
    key: 'quick',
    label: 'Quick Tasks',
    icon: <OffIcon />
  },
  {
    href: '/',
    key: 'queues',
    label: 'Queues Tasks',
    icon: <TrafficIcon />
  },
  {
    href: '/',
    key: 'processes',
    label: 'Processes',
    icon: <TrainIcon />
  },
  {
    href: '/',
    key: 'plugins',
    label: 'Plugins',
    icon: <PluginsIcon />
  },
  {
    href: '/',
    key: 'settings',
    label: 'Settings',
    icon: <SettingsIcon />
  },
]

class Navigation extends React.Component {
  render() {
    const { pathname } = this.props.router

    return (
      <List>
        {
          sites.map(
            (site) => (
              <Link href={site.href}>
                <ListItem button key={site.key} style={{
                  ...pathname === site.href && { backgroundColor: '#ececec' }
                 }}>
                  <ListItemIcon>{site.icon}</ListItemIcon>
                  <ListItemText primary={site.label} />
                </ListItem>
              </Link>
            )
          )
        }
      </List>
    )
  }
}

export default withRouter(Navigation)