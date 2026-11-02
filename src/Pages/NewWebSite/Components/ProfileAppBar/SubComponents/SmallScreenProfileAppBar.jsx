//React
import {  useState, forwardRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

//Components


//MUI
import {
    Box,
    BottomNavigation,
    BottomNavigationAction,
    AppBar,
    Dialog,
    Toolbar,
    IconButton,
    Typography,
    DialogContent,
    Slide,
    MenuItem,
    Badge,
    Divider
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';

//propTypes 
import propTypes from 'prop-types'

//react router
import { useLocation, useNavigate } from 'react-router-dom'
import CustomSelectInput from '../../../../../Components/CustomSelectInput/CustomSelectInput';
import NavList from './NavList';
import NotificationsList from '../../../../Admin/Components/NotificationsList';
import SettingsListItem from '../../../../Admin/Components/SettingsListItem';
import { changeMode } from '../../../../../Redux/Slices/modeSlice';
import CliserImageLogo from '../../../../Ecommerce/utils/CliserImageLogo';

//Styled Components
const StyledSmallScreenProfileAppBar = styled(Box)(
    () => ({
    
    })
)

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: -3,
        border: `1px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
  }));

const languages = ["English", "Spanish", "French", "German", "Arabic"];

const SmallScreenProfileAppBar = ({handleLogOut}) => {
    const user = useSelector(state => state.authSlice.user)
    const location = useLocation();

    const getInitialValue = () => {
        if (window.location.pathname !== "/profile") {
            return 1;
        }
        return 0;
    };
    const [value, setValue] = useState(getInitialValue);
    useEffect(() => {
        if (window.location.pathname !== "/profile") {
            setValue(() => 1);
            return
        }
        setValue(() => 0)
    }, [location])

    const [prevValue, setPrevValue] = useState(getInitialValue); // New state for previous value

    

    const navigate = useNavigate()
    const handleNavigate = (path) => {
        navigate(path)
    }

    const [openSettings, setOpenSettings] = useState(false);
    const [openNotifications, setOpenNotifications] = useState(false);
    const [openPages, setOpenPages] = useState(false);
    const Transition = forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    const handleOpenSettings = () => {
        setOpenSettings(() => true)
    }

    const handleCloseSettings = () => {
        setOpenSettings(() => false)
        setValue(prevValue);
    }

    const handleOpenPages = () => {
        setOpenPages(() => true)
    }

    const handleClosePages = () => {
        setOpenPages(() => false)
        setValue(prevValue);
    }
    
    const handleOpenNotifications = () => {
        setOpenNotifications(() => true)
    }

    const handleCloseNotifications = () => {
        setOpenNotifications(() => false)
        setValue(prevValue);
    }


    


    // settings
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const dispatch = useDispatch();
    const mode = useSelector(state => state.modeSlice.mode)
    const handleDarkMode = () => {
        dispatch(changeMode({
            mode: "dark"
        }))
    }

    const handleLightMode = () => {
        dispatch(changeMode({
            mode: "light"
        }))
    }

    const modeButtons = [
        {
            value: "dark",
            name: "Dark",
            icon: <DarkModeIcon />,
            onClick: handleDarkMode,
        },
        {
            value: "light",
            name: "Light",
            icon: <WbSunnyIcon />,
            onClick: handleLightMode,
        },
    ] 

    return (
        <StyledSmallScreenProfileAppBar>
            <BottomNavigation
                showLabels
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                }}
                value={value}
                onChange={(event, newValue) => {
                    setValue((prev) => {
                        setPrevValue(prev)
                        return newValue
                    });
                }}
                >
                <BottomNavigationAction
                    label={"Home"}
                    icon={<HomeIcon />}
                    onClick={() => handleNavigate("/")}
                />
                <BottomNavigationAction
                    label={"Pages"}
                    icon={<MenuBookOutlinedIcon/>}
                    onClick={handleOpenPages}
                />
                <BottomNavigationAction
                    label={"My Works"}
                    icon={<AccountCircleIcon/>}
                    onClick={() => handleNavigate(`/portfolio/${user?.id}`)}
                />
                
                <BottomNavigationAction
                    label={"Notifications"}
                    icon={
                        <StyledBadge badgeContent={3} color="secondary">
                            <NotificationsOutlinedIcon/>
                        </StyledBadge>
                    }
                    onClick={handleOpenNotifications}
                />
                <BottomNavigationAction
                    label={"Settings"}
                    icon={<SettingsOutlinedIcon/>}
                    onClick={handleOpenSettings}
                />
            </BottomNavigation>

            {
            openSettings &&
                <Dialog
                fullScreen
                open={openSettings}
                onClose={handleCloseSettings}
                TransitionComponent={Transition}
                PaperProps={{
                    elevation: 6
                }}
            >
                <DialogHeader
                    title="Settings"
                    handleClose={handleCloseSettings}
                />
                <DialogContent>
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
                    <SettingsListItem 
                        title="Mode:"
                        groupButtons={modeButtons}
                        value={mode}
                    />
                </DialogContent>
                </Dialog>
            }

            {
            openNotifications &&
                <Dialog
                fullScreen
                open={openNotifications}
                onClose={handleCloseNotifications}
                TransitionComponent={Transition}
                PaperProps={{
                    elevation: 6
                }}
            >
                <DialogHeader
                    title="Notifications"
                    handleClose={handleCloseNotifications}
                />
                <DialogContent>
                    <NotificationsList />
                
                </DialogContent>
                </Dialog>
            }

            {
            openPages &&
                <Dialog
                fullScreen
                open={openPages}
                onClose={handleClosePages}
                TransitionComponent={Transition}
                PaperProps={{
                    elevation: 6
                }}
            >
                <DialogHeader
                    title="Pages"
                    handleClose={handleClosePages}
                />
                <DialogContent>
                    <NavList mobileScreen handleClose={handleClosePages} handleLogOut={handleLogOut} />

                
                </DialogContent>
                </Dialog>
            }
        </StyledSmallScreenProfileAppBar>
    );
};

SmallScreenProfileAppBar.propTypes = {
    children: propTypes.array
}

export default SmallScreenProfileAppBar;

const DialogHeader = ({title, handleClose}) => {
    

    return (
        <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
                <CliserImageLogo  />
               
                
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    {title}
                </Typography>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}