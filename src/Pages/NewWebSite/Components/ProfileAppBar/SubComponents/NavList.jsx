//React
import { useMemo, useState } from 'react'

import {
    
} from 'react-redux'

// nav list data
import { navList } from '../utils/navList';

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
import { NavLink, useNavigate } from 'react-router-dom';
import CliserImageLogo from '../../../../Ecommerce/Components/UI/CliserImageLogo';

//Styled Components





const NavList = ({mobileScreen, drawerState}) => {

    const [, setDrawerOpen] = drawerState || [null, () => {}]
    const [selectedNavItem, setSelectedNavItem] = useState(null);
    const navListItems = useMemo(() => navList, [])

    const navigate = useNavigate()

    const handleProfileMainPage = () => {
        setSelectedNavItem(null)
        setDrawerOpen(() => false)
        navigate("/profile")
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
                            <StyledNavLink to={'/profile'}>
                                <CliserImageLogo HandleMainButton={handleProfileMainPage} />
                            </StyledNavLink>
                                
                        </MenuItem>
                        
                    )
                }
                {navListItems && navListItems.length > 0 &&
                        navListItems.map((item, key) => {
                        return (
                            <MenuItem
                            key={key}
                            sx={
                                {...menuItemStyle,
                                backgroundColor: selectedNavItem === item.title && (theme => theme.palette.action.selected) 
                                }
                            }
                            onClick={() => handleClickItem(item.title)}
                            >
                            <StyledNavLink to={item.path }>

                                <Typography variant='subtitle2' color="text.primary">
                                    {<item.icon fontSize='small' color='primary' />}
                                </Typography>
                                <Typography 
                                variant={selectedNavItem === item.title ? 'h7' : "subtitle2"}
                                color={selectedNavItem === item.title ? 'primary' : "text.primary"}>
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