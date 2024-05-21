

//React
import {
  
} from 'react'
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';

import {
  
} from 'react-redux'

//Components
import ToggleColorMode from '../../LandPage/ToggleColorMode';
import CustomSelectInput from '../../../Components/CustomSelectInput/CustomSelectInput';
import { AdminMainButton } from '../../../Components';

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
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import logoLight from '../../../assets/Images/Cliser-Light-Theme.png';
import logoDark from '../../../assets/Images/Cliser-Dark-Theme.png';

const logoStyle = {
  width: '100px',
  height: 'auto',
  cursor: 'pointer',
};



const customSelectStyle = {
  '&:hover': {
      transition: 'all 0.3s ease',
      backgroundColor: "#dbdbdbb0",
  },
  height: '40px',
  display : 'flex',
  justifyContent : 'center',
  alignItems : 'center',
  width :'200px'
};


//Styled Components
const StyledAppAppBar = styled(Box)(() => ({}))

const languages = ["English", "Spanish", "French", "German", "Arabic"];

const AppAppBar = ({ mode, toggleColorMode }) => {
  
  const [open, setOpen] =  useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const Navigate = useNavigate();


  const handleMyWebSiteClick = () => {
    Navigate('/Profile/MyWebSite');
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };




  const menuItems = [
    { value: 'Profile', onClick: () => alert('Profile clicked') },
    { value: 'Settings', onClick: () => alert('Settings clicked') },
    { value: 'Logout', onClick: () => alert('Logout clicked') },
  ];



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
                  sx={(theme) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexShrink: 0,
                  borderRadius: '0',
                  bgcolor:
                    theme.palette.mode === 'light'
                      ? 'rgba(255, 255, 255, 0.4)'
                      : 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(24px)',
                  maxHeight: 40,
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow:
                    theme.palette.mode === 'light'
                      ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                      : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
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
                  <img src={ mode === 'light' ? logoLight : logoDark}
                        style={logoStyle}
                        alt="logo of sitemark"
                      />
                  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <MenuItem
                        onClick={handleMyWebSiteClick}
                        sx={{ py: '6px', px: '12px' }}
                      >
                          <Typography variant="h6" color="text.primary" fontWeight =  'bold'>
                            My WebSite
                          </Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={handleMyWebSiteClick}
                        sx={{ py: '6px', px: '12px' }}
                      >
                          <Typography variant="h6" color="text.primary"  fontWeight =  'bold' >
                            My Stores
                          </Typography>
                    </MenuItem>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    gap: 0.5,
                    alignItems: 'center',
                  }}
                >
                  
                  <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />

                    <CustomSelectInput
                      key="1"
                      name="language"
                      className={customSelectStyle}
                      onChange={handleLanguageChange}
                      valueSet={selectedLanguage}
                    >
                      {languages.map((item, index) => (
                        <MenuItem key={index} value={item} >
                          <Box sx = {{
                          display : 'flex',
                          justifyContent : 'start',
                          alignItems : 'center',
                          textAlign : 'center'
                        }}>
                          <LanguageIcon sx = {{marginRight : '10px'}}/> {item}
                          </Box>
                        </MenuItem>
                      ))}
                      </CustomSelectInput>

                      <MenuItem
                        onClick={handleMyWebSiteClick}
                        sx={{ py: '6px', px: '12px'  , 
                        color: (theme) =>
                          theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                        }}
                      >
                            <NotificationsIcon />
                    </MenuItem>
                  
                  <MenuItem
                        sx={{ py: '6px', px: '12px' }}
                      >
                        <AdminMainButton
                          icon={<AccountBoxIcon  />}
                          title="Profile"
                          appearance="iconButton"
                          type="menu"
                          menuItems={menuItems}
                          sx = {{
                            color: (theme) =>
                              theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                          }}
                        />
                    </MenuItem>
                </Box>

                {/* nav as mobile  */}
                    <Box sx={{ display: { sm: '', md: 'none' } }}>
                      <Button
                        variant="text"
                        color="primary"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ minWidth: '30px', p: '4px' }}
                      >
                        <MenuIcon />
                      </Button>
                      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                        <Box
                          sx={{
                            minWidth: '60dvw',
                            p: 2,
                            backgroundColor: 'background.paper',
                            flexGrow: 1,
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'end',
                              flexGrow: 1,
                            }}
                          >
                            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                          </Box>
                            
                          <Divider />
                          <MenuItem
                            onClick={handleMyWebSiteClick}
                            sx={{ py: '6px', px: '12px' }}
                          >
                          <Typography variant="body2" color="text.primary">
                            My WebSite
                          </Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={handleMyWebSiteClick}
                        sx={{ py: '6px', px: '12px' }}
                      >
                          <Typography variant="body2" color="text.primary">
                            My Strores
                          </Typography>
                    </MenuItem>
                    <Divider />
                    <CustomSelectInput
                      key="1"
                      name="language"
                      className={customSelectStyle}
                      onChange={handleLanguageChange}
                      valueSet={selectedLanguage}
                    >
                      {languages.map((item, index) => (
                        <MenuItem key={index} value={item} >
                          <Box sx = {{
                          display : 'flex',
                          justifyContent : 'start',
                          alignItems : 'center',
                          textAlign : 'center'
                        }}>
                          <LanguageIcon sx = {{marginRight : '10px'}}/> {item}
                          </Box>
                        </MenuItem>
                      ))}
                      </CustomSelectInput>

                        </Box>
                      </Drawer>
                    </Box>
              </Toolbar>
            </Container>
      </AppBar>
        </StyledAppAppBar>
    );
};

export default AppAppBar;

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};
