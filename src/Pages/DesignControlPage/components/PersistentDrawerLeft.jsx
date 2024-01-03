import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import Drawer from '@mui/material/Drawer';
import styled from '@emotion/styled';





const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));




const PersistentDrawerLeft = ({
  children,
  Main,
  drawerOpenState ,
  sx, 
  closebtn
}) => {
  const theme = useTheme();
  
  const [open, setOpen] =drawerOpenState

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const style = {
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
    },
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={
          sx ? {...style,...sx} : style 
        }
        variant="persistent"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
    >
        <DrawerHeader>
          {closebtn ? <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>:<></> } 
        </DrawerHeader>
        <Divider />
          {children}
        <Divider />
      </Drawer>
    </Box>
  );
};


export default PersistentDrawerLeft;
