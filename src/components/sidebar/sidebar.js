import React from 'react';
import {Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles} from '@material-ui/core';

import TabConstants from '../../constants/tabs';

const drawerWidth = 200;

const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth
  }
});

function Sidebar({selectedTab, onTabSelect}) {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left">
      <List>
        {TabConstants.Tabs.map(tab => (
          <ListItem
            button
            divider
            key={tab.label}
            onClick={() => onTabSelect(tab.id)}
            selected={selectedTab === tab.id}>
            <ListItemIcon>{tab.icon}</ListItemIcon>
            <ListItemText primary={tab.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
