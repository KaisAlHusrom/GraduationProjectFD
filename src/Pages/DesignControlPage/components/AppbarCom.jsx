//React

import {
} from 'react-redux'


import PropTypes from 'prop-types';

//Components
import AdminMainButton from '../../../Components/AdminMainButton/AdminMainButton'
import MainDrawerList from '../SideBar/DrawerLists/MainDrawerList';
import HomeDrawerList from '../SideBar/DrawerLists/HomeDrawerList';
import LanguageDrawerList from '../SideBar/DrawerLists/LanguageDrawerList';
import FontFamily from './FontFamily'


// icons 
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LaptopIcon from '@mui/icons-material/Laptop';
import TabletIcon from '@mui/icons-material/Tablet';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import AutofpsSelectIcon from '@mui/icons-material/AutofpsSelect';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
//MUI
import {
    AppBar,
    Box,
    Toolbar,
} from '@mui/material'
import { styled } from '@mui/system'
import ToggleColorMode from '../../../Components/ToggleColorMode/ToggleColorMode';
import {  useNavigate, useParams } from 'react-router-dom';
import { ButtonStyle } from '../sections/EmptyDesign/StylesFunctions/SetStylesFunctions';



//Styled Components
const StyledAppbarCom = styled(Box)(
    () => ({
      marginBottom : '20px',
      paddingBottom : '20px'})
)




const AppbarCom = ({ mode, toggleColorMode , 
  handleFontFamilyClick , 
  handleSmartphoneClick,
  handleTabletClick , 
  handleLaptopClick,
  isEditPage,
}) => {
  const navigate = useNavigate();

    const handleBack = () => {
      navigate(-1); // This navigates back to the previous page
    };
    const {id} = useParams()


    return (
        <StyledAppbarCom>
            <AppBar position="fixed" open={open} sx = {{
              backgroundColor : 'background.default',
            }}>
        <Toolbar sx={{
        }}>

          {
            isEditPage ?    
            <Box sx={{
              display: 'flex',
              justifyContent:'start',
              alignItems: 'center',
              width: '100%',
            }}>
            <AdminMainButton
                    title=""
                    icon={<ArrowBackIosIcon />}
                    appearance="iconButton"
                    type='custom'
                    onClick={handleBack}
                    drawerAnchor='left'
                    sx={{...ButtonStyle , width: "60px" , marginBottom :'20px'}}
              />
                </Box> : 
              <Box sx={{
              display: 'flex',
              justifyContent:'start',
              alignItems: 'center',
              width: '100%'
            }}>
            <AdminMainButton
                    title=""
                    icon={<MenuIcon />}
                    appearance="iconButton"
                    type='drawer'
                    drawerAnchor='left'
                    sx={{...ButtonStyle , width: "60px" , marginBottom :'20px' , height : '40px'}}
                    willShow={
                      <MainDrawerList WepProject_id = {id} ></MainDrawerList>
                    }

              />
              <AdminMainButton
                    title="Home"
                    icon={<HomeIcon />}
                    appearance="secondary"
                    type='drawer'
                    drawerAnchor='left'
                    sx={{...ButtonStyle , width: "130px"  , marginBottom :'20px'}}
                    willShow={
                      <HomeDrawerList WepProject_id = {id}></HomeDrawerList>
                    }
              />
              <AdminMainButton
                    title="English"
                    icon={<LanguageIcon />}
                    appearance="secondary"
                    type='drawer'
                    drawerAnchor='left'
                    sx={{...ButtonStyle , width: "130px" ,  marginBottom :'20px'}}
                    willShow={
                      <LanguageDrawerList></LanguageDrawerList>
                    }
              />
                <AdminMainButton
                    title="Font Family"
                    icon={<AutofpsSelectIcon />}
                    appearance="secondary"
                    type='StyleDialog'
                    drawerAnchor='left'
                    sx={{...ButtonStyle , width: "170px" ,  marginBottom :'20px'}}
                    willShow={<FontFamily handleFontFamilyClick={handleFontFamilyClick} />}

              />
                </Box>
          }


                  <Box sx={{
                  display: 'flex',
                  justifyContent:'',
                  alignItems: 'center',
                  width: 'fit-content',
                  padding: '10px 15px', 
                  borderLeft:"1px solid",
                  borderColor:'success.dark',
                  }}>
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />

                      <AdminMainButton
                        title="Smart phone"
                        icon={<SmartphoneIcon />}
                        appearance="iconButton"
                        putTooltip
                        type='custom'
                        onClick={() => handleSmartphoneClick()}
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
                            onClick={() => handleTabletClick()}
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
                          onClick={() => handleLaptopClick()}
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

                          {
                            isEditPage ? (null) 
                            :   <Box sx={{
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
                            onClick={() =>   navigate('/preview/' + id  )}
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

                          }
            
        </Toolbar>
        
      </AppBar>
        </StyledAppbarCom>
    );
};


AppbarCom.propTypes = {
  mode: PropTypes.string, // Assuming mode is a string
  toggleColorMode: PropTypes.func,
  handleFontFamilyClick: PropTypes.func,
  handleSmartphoneClick: PropTypes.func,
  handleTabletClick: PropTypes.func,
  handleLaptopClick: PropTypes.func,
  WepProject_id : PropTypes.string,
  isEditPage : PropTypes.bool,
};


export default AppbarCom;