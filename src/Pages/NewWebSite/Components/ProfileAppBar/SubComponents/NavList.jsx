//React
import { useEffect, useMemo, useState } from 'react'

import { useSelector } from 'react-redux'

// nav list data
import { navList } from '../utils/navList';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
//Components


//MUI
import {
    Box,
    Divider,
    MenuItem,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import CliserImageLogo from '../../../../Ecommerce/utils/CliserImageLogo';

//Styled Components





const NavList = ({mobileScreen, drawerState}) => {

    const [, setDrawerOpen] = drawerState || [null, () => {}]
    const [selectedNavItem, setSelectedNavItem] = useState(null);
    const location = useLocation();

    useEffect(() => {
        // Extract the last part of the pathname as selectedNavItem
        // const lastPart = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
        setSelectedNavItem(location.pathname);
    }, [location]);

    const user = useSelector(state => state.authSlice.user);

    const navListItems = useMemo(() => [...navList, {
        path: "/portfolio/" + user?.id,
        title: "My Works",
        icon: ViewListOutlinedIcon
    }], [user?.id])

    const navigate = useNavigate()

    const handleProfileMainPage = () => {
        setSelectedNavItem(null)
        setDrawerOpen(() => false)
        navigate("")
    }

    const handleClickItem = (title) => {
        setSelectedNavItem(() => title)
        setDrawerOpen(() => false)
    }
    // styles
    const StyledNavList = useMemo(() => {
        return styled(Box)(
            () => ({
                display: 'flex',
                alignItems: 'center',
                width: "100%",
                flexDirection: mobileScreen ? 'column' : 'row'
            })
        )
    }, [mobileScreen])


    const menuItemStyle = useMemo(() => {
        return { 
            borderRadius: theme => theme.spacing(2),
            px: theme => theme.spacing(1.5),
            width: mobileScreen && '100%',
        }
    }, [mobileScreen])

    const navItemsStyle = useMemo(() => {
        return {
            display: { 
                xxs: mobileScreen ? 'flex' : 'none', 
                md: !mobileScreen && 'flex' 
            },
            flexDirection: mobileScreen ? 'column' : 'row',
            width: mobileScreen && '100%',
            }
    }, [mobileScreen])

    const StyledNavLink = useMemo(() => {
        return styled(NavLink)(
            ({ theme }) => ({
                display: 'flex',
                alignItems : 'center',
                gap: mobileScreen ? theme.spacing(3) :theme.spacing(),
                textDecoration : 'none',
                width: "100%",
                height: "100%",
                letterSpacing: 1.5,
            })
        );
    }, [mobileScreen])

    return (
        <StyledNavList>
            {
                !mobileScreen && (<CliserImageLogo HandleMainButton={handleProfileMainPage} />)
            }
            
            <Box sx={navItemsStyle}>
                {
                    mobileScreen &&
                    (
                        <MenuItem
                            sx={{
                                backgroundColor: 'transparent',
                                "&:hover": {
                                    backgroundColor: 'transparent'
                                }
                            }}
                            onClick={() => handleClickItem("profile")}
                            >
                            <StyledNavLink 
                            to={'/profile'} 
                            
                            >
                                <CliserImageLogo HandleMainButton={handleProfileMainPage} />
                            </StyledNavLink>
                                
                        </MenuItem>
                        
                    )
                }
                <Divider />
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
                                }
                            }
                            onClick={() => handleClickItem(item.title)}
                            >
                            <StyledNavLink 
                            to={item.path}
                            >

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
            </Box>
        </StyledNavList>
    );
};

NavList.propTypes = {
    mobileScreen: propTypes.bool,
    drawerState: propTypes.array
}

export default NavList;