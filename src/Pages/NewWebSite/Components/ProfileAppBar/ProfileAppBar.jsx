

//React
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';



//redux
import { useDispatch, useSelector } from 'react-redux'

//Components
import ToggleColorMode from '../../../../Components/ToggleColorMode/ToggleColorMode';
import CustomSelectInput from '../../../../Components/CustomSelectInput/CustomSelectInput';
import { AdminMainButton, AdminMainButtonOutsideState } from '../../../../Components';

//MUI
import {
  Box,
} from '@mui/material'
import { styled } from '@mui/system'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import NavList from './SubComponents/NavList';
import NotificationsList from '../../../Admin/Components/NotificationsList';
import { changeMode } from '../../../../Redux/Slices/modeSlice';




const customSelectStyle = {
  '&:hover': {
      transition: 'all 0.3s ease',
      // backgroundColor: "#dbdbdbb0",
  },
  // height: '40px',
  display : 'flex',
  justifyContent : 'center',
  alignItems : 'center',
  // width :'200px'
};


//Styled Components
const StyledAppAppBar = styled(Box)(() => ({}))


const languages = ["English", "Spanish", "French", "German", "Arabic"];

const ProfileAppBar = () => {
  const mode = useSelector(state => state.modeSlice.mode)
  const dispatch = useDispatch()
  const toggleColorMode = () => {
    dispatch(changeMode({mode : mode === 'dark' ? 'light' : 'dark'}))
  };
  

  const [drawerOpen, setDrawerOpen] =  useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  


  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };



  const user = useSelector(state => state.authSlice.user)
  const dir = useSelector(state => state.langSlice.dir)
  const navigate = useNavigate()
  const menuItems = [
    user?.is_admin && { value: 'Admin Page', onClick: () => navigate("/admin-dashboard") },
    { value: 'Settings', onClick: () => alert('Settings clicked') },
    { value: 'Logout', onClick: () => alert('Logout clicked') },
  ].filter(item => item);



    return (
        <StyledAppAppBar >
          <AppBar
            
            position="fixed"
            sx={{
              boxShadow: 0,
              bgcolor: 'transparent',
              backgroundImage: 'none',
              p : 0,
              borderRadius : '0'
            }}
          >
            <Container maxWidth="100%" margin = "0" padding = "0" sx = {{
                    paddingLeft: '0 !important',
                    paddingRight: '0 !important',

                  }}>
              <Toolbar
                  variant="regular"
                  sx={() => ({
                  backdropFilter: 'blur(24px)',
                  maxHeight: 40,
                  border: '1px solid',
                  borderColor: 'divider',
                })}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    ml: '-18px',
                    px: 0,
                  }}
                >
                  
                  <NavList />
                </Box>

                <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />

                <Box
                  sx={{
                    display: { xxs: 'none', md: 'flex' },
                    gap: 0.5,
                    alignItems: 'center',
                  }}
                >
                  


                    <CustomSelectInput
                      key="1"
                      name="Language"
                      className={customSelectStyle}
                      onChange={handleLanguageChange}
                      valueSet={selectedLanguage}
                      size={'small'}
                    >
                      {languages.map((item, index) => (
                        <MenuItem key={index} value={item}  >
                          <Box sx = {{
                          display : 'flex',
                          justifyContent : 'start',
                          alignItems : 'center',
                          textAlign : 'center'
                        }}>
                          <LanguageIcon fontSize='small' sx = {{marginRight : '10px'}}/> {item}
                          </Box>
                        </MenuItem>
                      ))}
                      </CustomSelectInput>

                      
                      {/* Notification Button  */}
                      <AdminMainButton
                        appearance='iconButton'
                        putTooltip
                        type='popover'
                        icon={<NotificationsOutlinedIcon />}
                        willShow={<NotificationsList />}
                        title="Notifications"
                        badgeContent={3} // to add number above the button

                      />
                      <AdminMainButton
                        icon={<AccountBoxIcon  />}
                        title="Profile"
                        appearance="iconButton"
                        type="menu"
                        menuItems={menuItems}
                        menuPaperProps={
                          {
                            elevation: 1,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            } 
                          }
                        }
                      />

                </Box>
                

                {/* nav as mobile  */}
                    <Box sx={{ display: { sm: '', md: 'none' } }}>
                        <AdminMainButtonOutsideState
                          customState={[drawerOpen, setDrawerOpen]}
                          type='drawer'
                          appearance='iconButton'
                          title='Cliser Profile Nav Bar'
                          withoutDrawerHeader
                          icon={<MenuIcon />}
                          drawerAnchor={dir === "rtl" ? "right" : "left"}
                          drawerZIndex={1200}
                          drawerStyle={{
                            width: "300px"
                          }}
                          willShow={<Box
                            sx={{
                              p: 2,
                              backgroundColor: 'background.paper',
                              flexGrow: 1,
                              height: '100vh',
                              display: 'flex',
                              flexDirection: 'column',
                              position: 'relative',
                              width: "100%"
                            }}
                          >
                            <NavList mobileScreen drawerState={[drawerOpen, setDrawerOpen]} />
                            <Divider />
                            <CustomSelectInput
                              key="1"
                              name="language"
                              className={customSelectStyle}
                              onChange={handleLanguageChange}
                              valueSet={selectedLanguage}
                              size={'small'}
                              sx={{
                                position: 'absolute',
                                bottom: "20px",
                                width: "90%",
                              }}  
                            >
                              {languages.map((item, index) => (
                                <MenuItem key={index} value={item} >
                                  <Box sx = {{
                                  display : 'flex',
                                  justifyContent : 'start',
                                  alignItems : 'center',
                                  textAlign : 'center',
                                
                                }}>
                                  <LanguageIcon sx = {{marginRight : '10px'}}/> {item}
                                  </Box>
                                </MenuItem>
                              ))}
                              </CustomSelectInput>
  
                          </Box>
                          }
                        />
                    </Box>
              </Toolbar>
            </Container>
      </AppBar>
        </StyledAppAppBar>
    );
};

export default ProfileAppBar;

ProfileAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};
