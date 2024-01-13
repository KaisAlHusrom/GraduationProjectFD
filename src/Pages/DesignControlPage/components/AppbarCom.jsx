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
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LaptopIcon from '@mui/icons-material/Laptop';
import TabletIcon from '@mui/icons-material/Tablet';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import TurnRightIcon from '@mui/icons-material/TurnRight';
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
import TemplateMain from '../sections/TempalteSection/TemplateMain';


//Styled Components
const StyledAppbarCom = styled(Box)(
    ({theme}) => ({
      color: theme.palette.warning.main ,

    })
)


const AppbarCom = () => {

    return (
        <StyledAppbarCom>
            <AppBar position="fixed" open={open}>
        <Toolbar sx={{
     
      
        }}>

              <Box sx={{
              display: 'flex',
              justifyContent:'start',
              alignItems: 'center',
              width: '100%'
            }}>
            <AdminMainButton
                    title="Home"
                    icon={<MenuIcon />}
                    appearance="iconButton"
                    type='drawer'
                    sx={{
                      border : '1px solid',
                      padding: '10px 15px',
                      fontWeight: 'bold',
                      backgroundColor:'success.dark',
                      color:'white.main'
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
                      backgroundColor:'success.dark',
                      color:'white.main',
                      marginLeft:'10px'
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
                      backgroundColor:'success.dark',
                      color:'white.main',
                      marginLeft:'10px'
                    }}
                    willShow={
                      <LanguageDrawerList></LanguageDrawerList>
                    }
              />
            
            
                </Box>


                  <Box sx={{
          display: 'flex',
          justifyContent:'center',
          alignItems: 'center',
          width: 'fit-content',
          padding: '10px 15px', 
          borderLeft:"1px solid",
          borderColor:'success.dark',
          }}>
                <AdminMainButton
                title="Smart phone"
                icon={<SmartphoneIcon />}
                appearance="iconButton"
                putTooltip
                type='custom'
                sx={{
                  border : 'none',
                  padding: '10px 15px',
                  fontWeight: 'bold',
                  backgroundColor:'success.dark',
                  color:'white.main',
                  marginLeft:'10px'
                }}
          />
      
          <AdminMainButton
                title="Tablet"
                icon={<TabletIcon />}
                appearance="iconButton"
                type='custom'
                putTooltip
                sx={{
                  border : 'none',
                  padding: '10px 15px',
                  fontWeight: 'bold',
                  backgroundColor:'success.dark',
                  color:'white.main',
                  marginLeft:'10px'
                }}
          />
              <AdminMainButton
                title="Laptop"
                icon={<LaptopIcon />}
                appearance="iconButton"
                type='custom'
                putTooltip
                sx={{
                  border : 'none',
                  padding: '10px 15px',
                  fontWeight: 'bold',
                  backgroundColor:'success.dark',
                  color:'white.main',
                  marginLeft:'10px'
                }}
          />
                </Box>


                <Box sx={{
                  display: 'flex',
                  justifyContent:'center',
                  alignItems: 'center',
                  width: '100%',
        

                  }}>
                <AdminMainButton
                title="Undo"
                icon={<TurnLeftIcon />}
                appearance="iconButton"
                putTooltip
                type='custom'
                sx={{
                  border : 'none',
                  padding: '10px 15px',
                  fontWeight: 'bold',
                  backgroundColor:'success.dark',
                  color:'white.main',
                  marginLeft:'10px'

                }}
          />
      
          <AdminMainButton
                title="Redo"
                icon={<TurnRightIcon />}
                appearance="iconButton"
                type='custom'
                putTooltip
                sx={{
                  border : 'none',
                  padding: '10px 15px',
                  fontWeight: 'bold',
                  backgroundColor:'success.dark',
                  color:'white.main',
                  marginLeft:'10px'

                }}
          />

                </Box>



                <Box sx={{
                  display: 'flex',
                  justifyContent:'end',
                  alignItems: 'center',
                  padding: '10px ',
                  width: 'fit-content',
                  borderLeft:"1px solid",

                  borderColor:'warning.dark',
                  }}>
                <AdminMainButton
                title="Upgrade"
                icon={<ElectricBoltIcon />}
                appearance="primary"
                type='custom'
                sx={{
                  border : 'none',
                  padding: '10px 15px',
                  fontWeight: 'bold',
                  backgroundColor:'warning.dark',
                  color:'white.main',
                  marginLeft:'10px'

                }}
          />
            <AdminMainButton
                title="Preview"
                icon={<ElectricBoltIcon />}
                appearance="primary"
                type='custom'
                sx={{
                  border : 'none',
                  padding: '10px 15px',
                  fontWeight: 'bold',
                  backgroundColor:'success.dark',
                  color:'white.main',
                  marginLeft:'10px'
                }}
          />

        
      
         
                </Box>
        </Toolbar>
        
      </AppBar>

            <Box component="main" sx={{ p: 3 }}>
            <TemplateMain></TemplateMain>
            </Box>
        </StyledAppbarCom>
    );
};

export default AppbarCom;