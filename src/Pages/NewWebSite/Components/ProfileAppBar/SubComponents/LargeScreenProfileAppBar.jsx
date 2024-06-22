//React
import { useState } from 'react'

import { useSelector } from 'react-redux'

//Components


//MUI
import {
    Box,
    AppBar,
    Toolbar,
    MenuItem,
    Container
} from '@mui/material'
import { styled } from '@mui/system'
import { alpha } from '@mui/material';

//icons

import LanguageIcon from '@mui/icons-material/Language';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

//propTypes 
import propTypes from 'prop-types'
import NavList from './NavList';
import ToggleColorMode from '../../../../../Components/ToggleColorMode/ToggleColorMode';
import CustomSelectInput from '../../../../../Components/CustomSelectInput/CustomSelectInput';
import { AdminMainButton } from '../../../../../Components';
import NotificationsList from '../../../../Admin/Components/NotificationsList';

//Styled Components
const StyledLargeScreenProfileAppBar = styled(Box)(
    () => ({
    
    })
)

const StyledNavAsNormalContainer = styled(Container)(
    () => ({
        display: "flex",
        alignItems: "center",
    })
);

const languages = ["English", "Spanish", "French", "German", "Arabic"];
const LargeScreenProfileAppBar = (props) => {
    const {
        profileMenuItems
    } = props


    const mode = useSelector(state => state.modeSlice.mode)

    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    return (
        <StyledLargeScreenProfileAppBar>
            <AppBar    
                position="fixed"
                sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                p : 0,
                borderRadius : '0',
                background: theme => theme.palette.background.default,
                }}
            >
                <Box sx={{
                width: '100%',
                height: '40px',
                position: 'fixed',
                marginTop: 8,
                backgroundImage: mode === 'light'
                ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
            backgroundSize: '100% 80%',
            backgroundRepeat: 'no-repeat',
                }}></Box>
                <Container maxWidth='100%' margin = "0" padding = "0" sx = {{
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
                    {/* Nav as normal */}
                    <StyledNavAsNormalContainer maxWidth="xl">
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

                    <ToggleColorMode  />

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
                            menuItems={profileMenuItems}
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
                    </StyledNavAsNormalContainer>

                    {/* nav as mobile  */}
                        <Box sx={{ display: { sm: '', md: 'none' } }}>
                            {/* <AdminMainButtonOutsideState
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
                                <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: "20px",
                                    width: "90%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: theme => theme.spacing(2)
                                }}
                                >
                                <FooterMenu 
                                    title="Cliser"
                                    ListMenu={CliserMenu}
                                    download={false}
                                    addListStyle
                                    sx={{
                                        maxHeight: 200,
                                        overflow: 'auto',
                                    }}
                                />
                                <Divider />
                                <FooterMenu 
                                    title="Products"
                                    fetchProductsCategories={true}
                                    addListStyle
                                    sx={{
                                    maxHeight: 200,
                                    overflow: 'auto',
                                    }}
                                />
                                <Divider />
                                <CustomSelectInput
                                    key="1"
                                    name="language"
                                    className={customSelectStyle}
                                    onChange={handleLanguageChange}
                                    valueSet={selectedLanguage}
                                    size={'small'}
                                    sx={{
                                    width: "90%",
                                    marginBottom: 2,
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
                                
    
                            </Box>
                            }
                            /> */}
                        </Box>
                </Toolbar>
                </Container>
        </AppBar>
        </StyledLargeScreenProfileAppBar>
    );
};

LargeScreenProfileAppBar.propTypes = {
    profileMenuItems: propTypes.array
}

export default LargeScreenProfileAppBar;