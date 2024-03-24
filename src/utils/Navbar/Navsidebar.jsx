import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, InputBase, Button, Divider, Badge, Input } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AppleIcon from '@mui/icons-material/Apple';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import { Link, Navigate } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { LocalGroceryStore } from '@mui/icons-material';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import "./Style.css"

const Navsidebar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const handleSignOut = () => {
    // Implement signout logic here
    setLoggedIn(false);
  };

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      setLoggedIn(true);
    }

    // Get user's location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude } = position.coords;
          try {
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}`);
            const data = await response.json();
            setUserLocation({
              name: data.localityInfo.administrative[2].name
            });
          } catch (error) {
            console.error('Error getting user location:', error);
          }
        },
        error => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <AppBar position="static"  sx={{ backgroundColor:"#ED5945",boxShadow: 'none' }} >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <LocalGroceryStore sx={{
              fontSize: 26, color: '#FFFFFF'
            }} />
          <Typography
              variant='h6'
              component="div"
              sx={{
                flexGrow: 1,
                fontFamily: 'Cursive',
                color: '#FFFFFF',
                fontSize: '26px',
              }}
            >
              <b>Grocery Mart</b>
            </Typography>
              <InputBase
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
                style={{ paddingLeft: '30px' }}
              />
              <IconButton color="inherit">
                <SearchIcon />
              </IconButton>
            {userLocation && (
            <Typography variant="subtitle1" color="inherit">
            <LocationOnIcon sx={{ marginRight: 1 }} /> {userLocation.name}
          </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <List>
          {!loggedIn ? (
            <>
              <Divider />
              <ListItem as={Link} to="/sgn">
                <ListItemIcon>
                  <SupervisedUserCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
              <Divider />
            </>
          ) : (
            <>
              <ListItem  onClick={handleSignOut}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
              <Divider />
            </>
          )}
          <ListItem as={Link} to="/Addp">
            <ListItemIcon>
              <ProductionQuantityLimitsIcon/>
            </ListItemIcon>
            <ListItemText primary="All Products" />
          </ListItem>
          
          
          <Divider />
          
          <ListItem as={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          
          <Divider />
          

          <ListItem as={Link} to="/Addc">
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Shopping Cart" />
          </ListItem >
          
          <Divider />
          
          <ListItem as={Link} to="/abt">
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
          
          <Divider />
          
          <ListItem  as={Link} to="/cont">
            <ListItemIcon>
              <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
          
        </List>
      </Drawer>
      
    </div>
  );
};

export default Navsidebar;
