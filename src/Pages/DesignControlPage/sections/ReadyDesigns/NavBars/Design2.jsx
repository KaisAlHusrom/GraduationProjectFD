import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import MenuData from "./MenuData.json";

const StyledDesign2 = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // Make the component fill the entire viewport vertically
});

const StyledButton = styled(Button)({
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.5)' // Increase size on hover
  }
});

const Designtwo = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [menuItems, setMenuItems] = useState(MenuData.menuItems);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledDesign2>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Navbar with Dropdown Menu
          </Typography>
          <StyledButton color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            Menu
          </StyledButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {menuItems.map((item, index) => (
              <MenuItem key={index} onClick={handleClose}>
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </StyledDesign2>
  );
};

export default Designtwo;
