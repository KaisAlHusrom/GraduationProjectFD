//React
import React, {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import MenuIcon from '@mui/icons-material/Menu';
import MainDrawerList from '../SideBar/DrawerLists/MainDrawerList';
import PersistentDrawerLeft from '../SideBar/Components/PersistentDrawerLeft';

//Styled Components
const StyledAppbarCom = styled(Box)(
    () => ({
    
    })
)


const AppbarCom = () => {

    const [open, setOpen] = React.useState(false)
    const handleDrawerOpen = () => {
      setOpen(true);
    };



    return (
        <StyledAppbarCom>
            <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Material-U
          </Typography>
        </Toolbar>
      </AppBar>

        <PersistentDrawerLeft drawerOpenState = {[open, setOpen]} closebtn={true} >
          <MainDrawerList></MainDrawerList>
        </PersistentDrawerLeft>

        </StyledAppbarCom>
    );
};

export default AppbarCom;