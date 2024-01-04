//React
import  {
    
} from 'react'

import {
    
} from 'react-redux'

//Components
import AdminMainButton from '../../../Components/AdminMainButton/AdminMainButton'

// icons 
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
//MUI
import {
    AppBar,
    Box,
    Toolbar,
} from '@mui/material'
import { styled } from '@mui/system'
import MainDrawerList from '../SideBar/DrawerLists/MainDrawerList';
import HomeDrawerList from '../SideBar/DrawerLists/HomeDrawerList';
import LanguageDrawerList from '../SideBar/DrawerLists/LanguageDrawerList';


//Styled Components
const StyledAppbarCom = styled(Box)(
    ({theme}) => ({
       color: theme.palette.warning.main 
    })
)


const AppbarCom = () => {

    return (
        <StyledAppbarCom>
            <AppBar position="fixed" open={open}>
        <Toolbar>

          <AdminMainButton
                title="Home"
                icon={<MenuIcon />}
                appearance="iconButton"
                type='drawer'
                sx={{
                  border : '1px solid',
                  padding: '10px 15px',
                  fontWeight: 'bold',
                }}
                willShow={
                  <MainDrawerList></MainDrawerList>
                }
          />
          <AdminMainButton
                title="Home"
                icon={<HomeIcon />}
                appearance=""
                type='drawer'
                sx={{
                  border : 'none',
                  padding: '10px 15px',
                  fontWeight: 'bold',
                }}
                willShow={
                  <HomeDrawerList></HomeDrawerList>
                }
          />
          <AdminMainButton
                title="English"
                icon={<LanguageIcon />}
                appearance=""
                type='drawer'
                sx={{
                  border : 'none',
                  padding: '10px 15px',
                  fontWeight: 'bold',
                }}
                willShow={
                  <LanguageDrawerList></LanguageDrawerList>
                }
          />



          


        </Toolbar>
      </AppBar>
        </StyledAppbarCom>
    );
};

export default AppbarCom;