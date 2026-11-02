//React
import { useEffect, useMemo, useState } from 'react'

import { useSelector } from 'react-redux'

// nav list data
import { navList } from '../utils/navList';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//Components


//MUI
import {
    Box,
    Divider,
    MenuItem,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'
//icons
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

//propTypes 
import propTypes from 'prop-types'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import CliserImageLogo from '../../../../Ecommerce/utils/CliserImageLogo';

//Styled Components





const NavList = ({mobileScreen, handleClose, handleLogOut}) => {

    const [selectedNavItem, setSelectedNavItem] = useState(null);
    const location = useLocation();

    useEffect(() => {
        // Extract the last part of the pathname as selectedNavItem
        // const lastPart = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
        setSelectedNavItem(location.pathname);
    }, [location]);

    const user = useSelector(state => state.authSlice.user);

    const navListItems = useMemo(() => [
        ...navList,
        {
        path: "/portfolio/" + user?.id,
        title: "My Works",
        icon: AccountCircleIcon
    }], [user?.id])

    const navigate = useNavigate()

    const handleProfileMainPage = () => {
        setSelectedNavItem(null)
        if(handleClose) {
            handleClose()
        }
        navigate("/")
    }

    const handleClickItem = (title) => {
        setSelectedNavItem(() => title)
        if(handleClose) {
            handleClose()
        }
    }
    // styles
    const StyledNavList = useMemo(() => {
        return styled(Box)(
            () => ({
                display: 'flex',
                alignItems: 'center',
                width: "100%",
                flexDirection: 'column',
                marginTop: theme => theme.spacing(2),
            })
        )
    }, [])


    const menuItemStyle = useMemo(() => {
        return { 
            px: theme => theme.spacing(1.5),
            width:'100%',
        }
    }, [])

    const navItemsStyle = useMemo(() => {
        return {
            display: 'flex',
            flexDirection: 'column',
            gap: theme => theme.spacing(),
            width: '100%',
            marginTop: theme => theme.spacing(4)
            }
    }, [])

    const StyledNavLink = useMemo(() => {
        return styled(NavLink)(
            ({ theme }) => ({
                display: 'flex',
                alignItems : 'center',
                gap: theme.spacing(3),
                textDecoration : 'none',
                width: "100%",
                height: "100%",
                letterSpacing: 1.5,
            })
        );
    }, [])

    const StyledBox = useMemo(() => {
        return styled(Box)(
            ({ theme }) => ({
                display: 'flex',
                alignItems : 'center',
                gap: theme.spacing(3),
                textDecoration : 'none',
                width: "100%",
                height: "100%",
                letterSpacing: 1.5,
            })
        );
    }, [])

    return (
        <StyledNavList>
            
            <Box sx={navItemsStyle}>
                {navListItems && navListItems.length > 0 &&
                        navListItems.map((item, key) => {
                        return (
                            <MenuItem
                            key={key}
                            sx={
                                {...menuItemStyle,
                                backgroundColor: selectedNavItem === item.path && (theme => theme.palette.action.selected),
                                border: selectedNavItem === item.path && '1px solid',
                                borderColor: selectedNavItem === item.path && (theme => theme.palette.divider),
                                position: 'relative'
                                }
                            }
                            onClick={() => handleClickItem(item.title)}
                            >
                            <StyledNavLink 
                            to={item.path}
                            >
                                {
                                    selectedNavItem === item.path
                                    && (
                                        <Box component={'span'} sx={{
                                            position: 'absolute',
                                            width: 3,
                                            height: '100%',
                                            backgroundColor: theme => theme.palette.primary.main,
                                            left: 0,
                                        }}>
                                        </Box>
                                    )
                                }
                                

                                <Typography variant='subtitle2' color="text.primary">
                                    {<item.icon fontSize='small' color='primary' />}
                                </Typography>
                                <Typography 
                                variant={selectedNavItem === item.path ? 'h7' : "subtitle1"}
                                color={selectedNavItem === item.path ? 'primary' : "text.primary"}>
                                    {item.title}
                                </Typography>
                            </StyledNavLink>
                                
                        </MenuItem>
                        )
                        })
                }
                {
                    mobileScreen &&
                    <>
                    <Divider />
                    
                        <MenuItem
                            onClick={handleLogOut}
                        >
                            <StyledBox >
                                <Typography variant='subtitle2' color="error.main">
                                    {<LogoutOutlinedIcon fontSize='small' color='error.main' />}
                                </Typography>
                                <Typography 
                                variant={'subtitle1'}
                                color={"error.main"}>
                                    Logout
                                </Typography>
                            </StyledBox>
                        </MenuItem>
                    
                        
                    </>
                }
            </Box>
        </StyledNavList>
    );
};

NavList.propTypes = {
    mobileScreen: propTypes.bool,
    handleClose: propTypes.func,
    handleLogOut: propTypes.func,
}

export default NavList;