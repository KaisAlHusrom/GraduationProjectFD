import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import navBarData from './navBarData.json';

const DesignThree = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [navData, setNavData] = useState(null);

  useEffect(() => {
    // Fetch data from the JSON file
    setNavData(navBarData);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {navData &&
            navData.menuItems.map((item, index) => (
              <MenuItem key={index} onClick={handleClose}>
                {item.label}
              </MenuItem>
            ))}
        </Menu>
        {navData && (
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {navData.title}
          </Typography>
        )}
        <Button color="inherit">{navData ? navData.buttonLabel : 'Login'}</Button>
      </Toolbar>
    </AppBar>
  );
};

export default DesignThree;
