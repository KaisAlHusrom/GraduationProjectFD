//React
import {  } from 'react'

import { useSelector } from 'react-redux'

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
//styles
const StyledListItem = styled(ListItem)(
    () => ({
        padding: "0", 
    })
)


const StyledLink = styled(NavLink)(
    ({ theme }) => ({
        width: "100%",
        color: theme.palette.text.primary,
        textDecoration: "none",
        padding: "0",
        borderRadius: "8px",
        transition: theme.transitions.create(['background-color'], {
            duration: theme.transitions.duration.standard,
        }),
        position: "relative",
        "&.active": {
            backgroundColor: theme.palette.action.selected,
            "&:before": {
                content: "''",
                position: "absolute",
                left: "0px",
                top: "0px",
                width: "5px",
                height: "100%",
                backgroundColor: theme.palette.primary.main,
                borderRadius: "8px 0 0 8px",
            }
        }
    })
)

const StyledBox = styled(Box)(
    ({ theme }) => ({
        width: "100%",
        color: theme.palette.text.primary,
        textDecoration: "none",
        
    })
)


const CustomNavListItem = (props) => {
    const {
        title,
        icon,
        path,
        nestedMenu,
        openedItemState,
        index
    } = props

    //redux
    const dir = useSelector(state => state.langSlice.dir)

    //states
    // const [open, setOpen] = useState(false);

    const {openedItem, setOpenedItem} = openedItemState

    const handleOpenNestedMenu = (index) => {
        if (openedItem === index) {
            setOpenedItem(null); // Close the currently opened item
        } else {
            setOpenedItem(index); // Open the clicked item
        }
    };


    return (
            <StyledListItem>
                    
                {
                        nestedMenu
                        ?
                        <StyledBox
                        component="div"   
                        >
                            <ListItemButton onClick={nestedMenu ? () => handleOpenNestedMenu(index) : null}>
                                <ListItemIcon>
                                    {icon}

                                </ListItemIcon>
                                <ListItemText primary={title} />
                                {
                                    nestedMenu
                                    ?
                                        openedItem === index
                                        ? 
                                        <ExpandLess /> 
                                        : 
                                        <ExpandMore />
                                    :
                                    null
                                }
                                
                            </ListItemButton>
                            <Collapse sx={{backgroundColor: "transparent"}} in={openedItem === index} timeout="auto" unmountOnExit>
                                    <List disablePadding>
                                        {
                                            nestedMenu.map((link, index) => {
                                                return (
                                                    <StyledListItem key={index} >
                                                        <StyledLink 
                                                        
                                                        to={link.path}
                                                        className={({ isActive, isPending, isTransitioning }) =>
                                                            [
                                                            isActive ? "active" : "",
                                                            isPending ? "pending" : "",
                                                            isTransitioning ? "transitioning" : "",
                                                            ].join(" ")
                                                        }
                                                        >
                                                            <ListItemButton sx={{ [dir === "rtl" ? "pr" : "pl"]: 4 }}>
                                                                <ListItemIcon>
                                                                    {link.icon}
                                                                </ListItemIcon>
                                                                <ListItemText primary={link.title} />
                                                            </ListItemButton>
                                                        </StyledLink>
                                                    </StyledListItem>
                                                )
                                            })
                                        }
                                    </List>
                                </Collapse>
                        </StyledBox>
                        
                        :
                        <StyledLink
                        to={path}    
                        className={({ isActive, isPending, isTransitioning }) =>
                            [
                            isPending ? "pending" : "",
                            isActive ? "active" : "",
                            isTransitioning ? "transitioning" : "",
                            ].join(" ")
                        }
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
    openedItemState: propTypes.object,
    index: propTypes.number,

}

export default CustomNavListItem;