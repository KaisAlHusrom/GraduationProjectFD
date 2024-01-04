//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//router
import { NavLink } from 'react-router-dom'

//Components


//MUI
import {
    Box,
    Collapse,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

//propTypes 
import propTypes from 'prop-types'

//Styled Components

const StyledListItem = styled(ListItem)(
    () => ({
        padding: "0"
    })
)

const StyledLink = styled(NavLink)(
    ({ theme }) => ({
        width: "100%",
        color: theme.palette.text.primary,
        textDecoration: "none",
        padding: "0"
    })
)

const StyledBox = styled(Box)(
    ({ theme }) => ({
        width: "100%",
        color: theme.palette.text.primary,
        textDecoration: "none"
    })
)



const CustomNavListItem = (props) => {
    const {
        title,
        icon,
        path,
        nestedMenu,
    } = props

    //states
    const [open, setOpen] = useState(false);

    const handleOpenNestedMenu = () => {
        setOpen(!open);
    };

    return (
            <StyledListItem>
                    
                {
                        nestedMenu
                        ?
                        <StyledBox
                        component="div"   
                        >
                            <ListItemButton onClick={nestedMenu ? handleOpenNestedMenu : null}>
                                <ListItemIcon>
                                    {icon}

                                </ListItemIcon>
                                <ListItemText primary={title} />
                                {
                                    nestedMenu
                                    ?
                                        open 
                                        ? 
                                        <ExpandLess /> 
                                        : 
                                        <ExpandMore />
                                    :
                                    null
                                }
                                
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {
                                            nestedMenu.map((link, index) => {
                                                return (
                                                    <StyledLink key={index} to={link.path}>
                                                        <ListItemButton sx={{ pl: 4 }}>
                                                            <ListItemIcon>
                                                                {link.icon}
                                                            </ListItemIcon>
                                                            <ListItemText primary={link.title} />
                                                        </ListItemButton>
                                                    </StyledLink>
                                                )
                                            })
                                        }
                                    </List>
                                </Collapse>
                        </StyledBox>
                        
                        :
                        <StyledLink
                        to={path}    
                        >
                        <ListItemButton >
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={title} />
                            </ListItemButton>
                        
                        </StyledLink>
                    }
            </StyledListItem>
    );
};

CustomNavListItem.propTypes = {
    title: propTypes.string,
    icon: propTypes.element,
    path: propTypes.string,
    nestedMenu: propTypes.array,
}

export default CustomNavListItem;