import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = ({ open, toggleDrawer }) => {
  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
      <List sx={{ width: 250 }}>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/restaurant/food-items" onClick={toggleDrawer(false)}>
            <ListItemText primary="Manage Food Items" />
          </ListItemButton>
        </ListItem>
        {/* <ListItem disablePadding>
          <ListItemButton component={Link} to="/restaurant/orders" onClick={toggleDrawer(false)}>
            <ListItemText primary="Manage Orders" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/restaurant/profile" onClick={toggleDrawer(false)}>
            <ListItemText primary="Profile Settings" />
          </ListItemButton>
        </ListItem> */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
