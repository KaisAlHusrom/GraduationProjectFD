import {useState} from 'react';
import { Drawer, Box, TextField, MenuItem, Menu, Button } from '@mui/material';


const drawerWidth = 240;

const DrawerComponent = ({ open, handleDrawerToggle }) => {
  const [anchorElAbout, setAnchorElAbout] = useState(null);
  const [anchorElCategory, setAnchorElCategory] = useState(null);

  const handleAboutMenuOpen = (event) => {
    setAnchorElAbout(event.currentTarget);
  };

  const handleCategoryMenuOpen = (event) => {
    setAnchorElCategory(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElAbout(null);
    setAnchorElCategory(null);
  };

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={handleDrawerToggle} // Close the drawer when clicking outside
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <TextField label="Search" fullWidth variant="outlined" margin="normal" />
        <div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAboutMenuOpen}
            sx={{ mb: 1, color: 'background', '&:hover': { backgroundColor: 'primary.main' } }}
          >
            About Us
          </Button>
          <Menu
            anchorEl={anchorElAbout}
            open={Boolean(anchorElAbout)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            getContentAnchorEl={null}
          >
            <MenuItem onClick={handleClose}>Mission</MenuItem>
            <MenuItem onClick={handleClose}>Vision</MenuItem>
            <MenuItem onClick={handleClose}>Values</MenuItem>
          </Menu>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCategoryMenuOpen}
            sx={{ mb: 1, color: 'background', '&:hover': { backgroundColor: 'primary.main' } }}
          >
            Categories
          </Button>
          <Menu
            anchorEl={anchorElCategory}
            open={Boolean(anchorElCategory)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            getContentAnchorEl={null}
          >
            <MenuItem onClick={handleClose}>Electronics</MenuItem>
            <MenuItem onClick={handleClose}>Clothing</MenuItem>
            <MenuItem onClick={handleClose}>Books</MenuItem>
          </Menu>
        </div>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 1, color: 'background', '&:hover': { backgroundColor: 'primary.main' } }}
        >
          Sign In
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ color: 'background', '&:hover': { backgroundColor: 'primary.main' } }}
        >
          Sign Up
        </Button>
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
