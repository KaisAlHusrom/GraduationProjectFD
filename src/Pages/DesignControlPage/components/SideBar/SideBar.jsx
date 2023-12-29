import  { useState } from 'react';
import {  useTheme } from '@mui/system';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import { ListItemText } from '@mui/material';
import { styled } from '@mui/system'

import { Drawer , AppBar , DrawerHeader } from './SideBarCss';
import DrawerBox from '../DrawerBox';
import AdminHeaderMenu from '../../../Admin/Components/AdminHeaderMenu';

// ... (Diğer import ifadeleri)

const SideBar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openSecondDrawer, setOpenSecondDrawer] = useState(false);

  const [open2, setOpen2] = useState(false);
  const [openSecondDrawer2, setOpenSecondDrawer2] = useState(false);


  const handleSecondDrawerOpen = () => {
      setOpenSecondDrawer(true);
    };
  
    const handleSecondDrawerClose = () => {
      setOpenSecondDrawer(false);
    };

    const handleSecondDrawerOpen2 = () => {
      setOpenSecondDrawer2(true);
    };
  
    const handleSecondDrawerClose2 = () => {
      setOpenSecondDrawer2(false);
    };
  
  
  

  const handleDrawerClose = () => {
    setOpen(false);
  };

//Styled Components
const AdminHeaderMenuStyle = styled(Box)(
  ({ theme }) => ({
      // width: 'calc(100% - 300px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: `0 ${theme.spacing(2)}`,
      gap: theme.spacing(1)
  })
)






  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{padding:10}}>
        <AdminHeaderMenuStyle>
        <AdminHeaderMenu></AdminHeaderMenu>

        </AdminHeaderMenuStyle>

      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
            <DrawerBox handleSecondDrawerOpen= {handleSecondDrawerOpen} open={open} name="Styles"></DrawerBox>
            <DrawerBox handleSecondDrawerOpen= {handleSecondDrawerOpen2} open={open2} name="Media Center"></DrawerBox>

      </Drawer>

  
      <MuiDrawer
        variant="temporary"
        anchor="left"
        open={openSecondDrawer}
        onClose={handleSecondDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
      >
      <DrawerHeader>
          <IconButton onClick={handleSecondDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="Subitem 1" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Subitem 2" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Subitem 3" />
          </ListItem>
        </List>
      </MuiDrawer>

      <MuiDrawer
        variant="temporary"
        anchor="left"
        open={openSecondDrawer2}
        onClose={handleSecondDrawerClose2}
        ModalProps={{
          keepMounted: true,
        }}

      >
      <DrawerHeader>
          <IconButton onClick={handleSecondDrawerClose2}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="Subitem 1 2" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Subitem 2 2" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Subitem 3 2" />
          </ListItem>
        </List>
      </MuiDrawer>






      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>
          {/* ... metin içeriği ... */}
        </Typography>
      </Box>
    </Box>
  );
};

export default SideBar;