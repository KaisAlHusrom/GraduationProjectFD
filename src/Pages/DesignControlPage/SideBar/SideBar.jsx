//React
import {
  useState
} from 'react'

import {
  
} from 'react-redux'

//Components
  import { Drawer, AppBar, DrawerHeader } from './Components/SideBarCss';
  import DrawerBox from './Components/DrawerBox';
  import AdminHeaderMenu from '../../Admin/Components/AdminHeaderMenu';
  import ColorPicker from './Components/ColorCom';
  import DialogCom from './Components/DialogCom';

//MUI
import {
  Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { useTheme } from '@mui/system';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import { ListItemText, Toolbar } from '@mui/material';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import PaletteIcon from '@mui/icons-material/Palette';


//Styled Components
const StyledSideBar = styled(Box)(
    ({ theme }) => ({
  
    })
)



const SideBar = () => {

  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [openSecondDrawer, setOpenSecondDrawer] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openSecondDrawer2, setOpenSecondDrawer2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [openColorDrawer3, setOpenColorDrawer3] = useState(false);


  const handleSecondDrawerOpen = () => {
    setOpenSecondDrawer(true);
  };

  const handleSecondDrawerClose = () => {
    setOpenSecondDrawer(false);
  };

    // const handleDrawerClose = () => {
    //   setOpen(false);
    // };

  
    // const handleSecondDrawerOpen2 = () => {
    //   setOpenSecondDrawer2(true);
    // };

    const handleSecondDrawerClose2 = () => {
      setOpenSecondDrawer2(false);
    };

    const handleColorDrawerOpen3 = () => {
      setOpenColorDrawer3(true);
    };

    const handleColorDrawerClose3 = () => {
      setOpenColorDrawer3(false);
    };




    return (
        <StyledSideBar>
              <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Toolbar>
    <AppBar position="fixed" open={open}  >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' , padding:"10px"}}>
        <Typography variant="h6" noWrap component="div">
          Persistent drawer
        </Typography>
        <AdminHeaderMenu />
      </div>
    </AppBar>
  </Toolbar>

    
    
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
          </DrawerHeader>
          <DrawerBox icon={<FormatColorFillIcon />} handleSecondDrawerOpen={handleSecondDrawerOpen} open={open} name="Styles" />
          <DialogCom  ></DialogCom>
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
              <DrawerBox icon={<PaletteIcon />} handleSecondDrawerOpen={handleColorDrawerOpen3} open={open} name="Colors" />
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

        <MuiDrawer open={openColorDrawer3} onClose={handleColorDrawerClose3}>
          <DrawerHeader>
            <IconButton onClick={handleColorDrawerClose3} open={open3}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
              <ColorPicker></ColorPicker>
          </List>
        </MuiDrawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Typography paragraph>{/* Metin içeriği */}</Typography>
        </Box>



      </Box>
        </StyledSideBar>
    );
};

export default SideBar;











//   const SideBar = () => {





//     return (
    
//     );
//   };

//   export default SideBar;
