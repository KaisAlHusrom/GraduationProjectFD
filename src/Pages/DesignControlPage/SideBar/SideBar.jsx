//React
import {
  useState
} from 'react'

import {
  
} from 'react-redux'

//Components
  import { Drawer, AppBar, DrawerHeader } from './Components/SideBarCss';
  import DrawerBox from './Components/DrawerBox';
  // import AdminHeaderMenu from '../../Admin/Components/AdminHeaderMenu';
  import ColorPicker from './Components/ColorCom';
  import DialogCom from './Components/DialogCom';

//MUI
import {
  Box,
  Typography,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Toolbar
} from '@mui/material'
import { styled } from '@mui/system'
import { useTheme } from '@mui/system';
import MuiDrawer from '@mui/material/Drawer';
//KAIS: you import these in wrong place, I put them above
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import ListItem from '@mui/material/ListItem';
// import { ListItemText, Toolbar } from '@mui/material';

//icons
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PaletteIcon from '@mui/icons-material/Palette';



//Styled Components
const StyledSideBar = styled(Box)(
    ({ theme }) => ({
      display: 'flex' 
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
        {/* <Box sx={{ display: 'flex' }}> KAIS: you don't have to put Box here, because StyledSideBar already Box, I put display: "flex" in above */}

        {/* KAIS: CssBaseLine component is added in CustomThemeProvider component */}
        {/* <CssBaseline /> */}
        <Toolbar>
          <AppBar position="fixed" open={open}  >
          {/* KAIS: I changed the div to box here, because in div you can't use theme values, but in Box you can */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' , padding:theme.spacing(1.5)}}>
            <Typography variant="h6" noWrap component="div">
              Persistent drawer
            </Typography>
            {/* <AdminHeaderMenu />  */}
            {/* TODO: KAIS: There is no need to add the admin header to design page, Users will enter to this page to change their web pages, and this app bar shouldn't appear to them */}
          </Box>
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



      {/* </Box> */}
        </StyledSideBar>
    );
};

export default SideBar;











//   const SideBar = () => {





//     return (
    
//     );
//   };

//   export default SideBar;
