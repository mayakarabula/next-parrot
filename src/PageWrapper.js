import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import lightGreen from '@material-ui/core/colors/lightGreen';
import lightBlue from '@material-ui/core/colors/lightBlue';
import grey from '@material-ui/core/colors/grey'

import DnsIcon from '@material-ui/icons/Dns';
import BrushIcon from '@material-ui/icons/Brush';
import Drawer from '@material-ui/core/Drawer';
import FastIcon from '@material-ui/icons/FastForward'
import CreateIcon from '@material-ui/icons/Create'
import DashboardIcon from '@material-ui/icons/Dashboard'
import OnIcon from '@material-ui/icons/SpeakerNotes'
import OffIcon from '@material-ui/icons/SpeakerNotesOff'
import TrainIcon from '@material-ui/icons/Train'
import TrafficIcon from '@material-ui/icons/Traffic'
import MoreIcon from '@material-ui/icons/MoreHoriz'
import SettingsIcon from '@material-ui/icons/Settings'
import PluginsIcon from '@material-ui/icons/Power'

import InputBase from '@material-ui/core/InputBase';

import TopNavigation from './pageParts/TopNavigation'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrow } from '@fortawesome/free-solid-svg-icons'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Link from 'next/link'
import { Divider } from '@material-ui/core';

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    color: grey[100],
    zIndex: theme.zIndex.drawer + 1,
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '50px'
  },
  barIcon: {
    color: grey[100]
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  blueIcon: {
    color: '#fff',
    backgroundColor: lightBlue[500],
    marginLeft: 12,
  },
  greenIcon: {
    color: '#fff',
    backgroundColor: lightGreen[500],
    marginLeft: 12,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
  },
})

function PageWrapper (props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
         <div style={{ display: 'flex', height: '65px', justifyContent: 'center' }}>
            <ListItem>
              <ListItemIcon>
                <FontAwesomeIcon icon={faCrow} />
              </ListItemIcon>
              <ListItemText primary='Auto Parrot' />
            </ListItem>
          </div>
        <Divider />
        <List>
          <Link href={'/clone'}>
            <ListItem button key='projects'>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary='Projects' />
            </ListItem>
          </Link>
          <Link href={'/'}>
            <ListItem button key='defined'>
              <ListItemIcon><OnIcon /></ListItemIcon>
              <ListItemText primary='Complex Tasks' />
            </ListItem>
          </Link>
          <Link href={'/clone'}>
            <ListItem button key='quick'>
              <ListItemIcon><OffIcon /></ListItemIcon>
              <ListItemText primary='Quick Tasks' />
            </ListItem>
          </Link>
          <Link href={'/clone'}>
            <ListItem button key='queues'>
              <ListItemIcon><TrafficIcon /></ListItemIcon>
              <ListItemText primary='Queues' />
            </ListItem>
          </Link>
          <Link href={'/clone'}>
            <ListItem button key='processes'>
              <ListItemIcon><TrainIcon /></ListItemIcon>
              <ListItemText primary='Running Tasks' />
            </ListItem>
          </Link>
          <Link href={'/clone'}>
            <ListItem button key='processes'>
              <ListItemIcon><PluginsIcon /></ListItemIcon>
              <ListItemText primary='Plugins' />
            </ListItem>
          </Link>
          <Link href={'/clone'}>
            <ListItem button key='processes'>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary='Settings' />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main className={classes.content}>
        <AppBar position='static' className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
              <IconButton className={classes.barIcon}>
                <BrushIcon />
              </IconButton>
              <IconButton className={classes.barIcon}>
                <DnsIcon />
              </IconButton>
              <IconButton className={classes.barIcon}>
                <MoreIcon />
              </IconButton>
            </Toolbar>

          <TopNavigation />
          </AppBar>
          <AppBar position='static' style={{
            backgroundColor: 'white',
            color: 'black',
            padding: '10px',
            marginBottom: '15px'
          }}>
            <InputBase
              id="standard-name"
              placeholder='You can write here to search for any task, process or project...'
            />
          </AppBar>
        {props.children}
      </main>
    </div>
  );
}

PageWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageWrapper);
