
import PropTypes from 'prop-types';

// MUI components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';

// MUI icons
import MenuIcon from '@mui/icons-material/Menu';

// React Router
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { changeMode } from '../../Redux/Slices/modeSlice';

//LOGO


//components
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode';
import AdminMainButton from '../AdminMainButton/AdminMainButton';
import MainAppBarDrawerNavList from '../MainAppBarDrawerNavList/MainAppBarDrawerNavList';
import { useMemo } from 'react';
import CliserImageLogo from '../../Pages/Ecommerce/utils/CliserImageLogo';


function MainAppBar({auth}) {
    const mode = useSelector(state => state.modeSlice.mode)
    const dispatch = useDispatch()

    const toggleColorMode = () => {
        if(mode === 'dark' ) {
            dispatch(changeMode({mode : 'light'}))
        } 
        if(mode === 'light' ) {
            dispatch(changeMode({mode : 'dark'}))
        } 
    };

    

    const Navigate = useNavigate();

    const handleEcommerceClick = () => {
        Navigate('/cliser-digital-market');
    };

    const handleLoginClick = () => {
        Navigate('/auth/login');
    };

    const handleSignUpClick = () => {
        Navigate('/auth/sign-up');
    };

    const HandleMainButton = () => {
        Navigate('/');
    };

    return (
        <AppBar
            position="fixed"
            sx={{
            boxShadow: 0,
            bgcolor: 'transparent',
            backgroundImage: 'none',
            mt: 2,
            }}
        >
            <Container maxWidth="lg">
            <Toolbar
                variant="regular"
                sx={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
                borderRadius: '999px',
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
                <CliserImageLogo HandleMainButton={HandleMainButton} />
                <Box sx={{ display: { xxs: 'none', md: 'flex' } }}>
                    <MenuItem
                    onClick={handleEcommerceClick}
                    sx={{ py: '6px', px: '12px', color: theme => theme.palette.secondary.light }}
                    >
                            Digital Market
                    </MenuItem>
                    {
                        !auth &&
                        <LandPageMenuItems />
                    }
                </Box>
                </Box>
                <Box
                sx={{
                    display: { xxs: 'none', md: 'flex' },
                    gap: 0.5,
                    alignItems: 'center',
                }}
                >
                <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                <Button
                    color="primary"
                    variant="text"
                    size="small"
                    component="a"
                    onClick={handleLoginClick}
                >
                    Sign in
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    component="a"
                    onClick={handleSignUpClick}
                >
                    Sign up
                </Button>
                </Box>
                <Box sx={{ display: { sm: '', md: 'none' } }}>

                    <AdminMainButton 
                        appearance='iconButton'
                        type='drawer'
                        drawerAnchor={"right"}
                        drawerZIndex={1200}
                        title='Cliser'
                        withoutDrawerHeader
                        icon={<MenuIcon />}
                        putBorder
                        putDrawerCloseButton
                        willShow={
                            <MainAppBarDrawerNavList auth={auth} />
                        }
                    />
                </Box>
            </Toolbar>
            </Container>
        </AppBar>
    );
}

MainAppBar.propTypes = {
    auth: PropTypes.bool
};

export default MainAppBar;

export const LandPageMenuItems = () => {
    const scrollToSection = (sectionId) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 128;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({ behavior: 'smooth' });
            window.scrollTo({
            top: targetScroll,
            behavior: 'smooth',
            });
            // setOpen(false);
        }
    };

    const menuItemStyles = useMemo(() => {
        return { py: '6px', px: '12px', color: theme => theme.palette.text.primary }
    }, [])

    return (
        <>
                    <MenuItem
                        onClick={() => scrollToSection('features')}
                        sx={menuItemStyles}
                    >
                            Features
                    </MenuItem>
                    
                    <MenuItem
                        onClick={() => scrollToSection('testimonials')}
                        sx={menuItemStyles}
                    >
                            Testimonials
                    </MenuItem>
                    <MenuItem
                        onClick={() => scrollToSection('highlights')}
                        sx={menuItemStyles}
                    >
                            Highlights
                    </MenuItem>
                    <MenuItem
                        onClick={() => scrollToSection('pricing')}
                        sx={menuItemStyles}
                    >
                            Pricing
                    </MenuItem>
                    <MenuItem
                        onClick={() => scrollToSection('faq')}
                        sx={menuItemStyles}
                    >
                            FAQ
                    </MenuItem>
        </>
    )
}