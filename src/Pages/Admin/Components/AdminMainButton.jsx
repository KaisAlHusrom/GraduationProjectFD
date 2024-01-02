//React
import { useState } from 'react'


//Components
import {CustomModal, CustomDrawer} from '../../../Components';



//MUI
import {
    Button,
    Menu,
    MenuItem,
    IconButton,
    Popover,
    Badge,

} from '@mui/material'
import { useTheme } from '@mui/material/styles';

//icons
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
//propTypes 

import propTypes from 'prop-types'




const AdminMainButton = (props) => {
    // --- Props ---
    const { icon, 
        title, 
        onClick, 
        appearance, 
        type, 
        menuItems, 
        willShow, 
        modalIcon, 
        putDrawerCloseButton,
        drawerAnchor,
        badgeContent,
        drawerVariant
    } = props

    //theme
    const theme = useTheme();

    



    //STATES
    // --- menu states ---
    const [menuEl, setMenuEl] = useState(null)
    const openMenu = Boolean(menuEl)

    // --- modal states ---
    const [modalOpen, setModalOpen] = useState(false)
    
    // --- drawer states ---
    const [drawerOpen, setDrawerOpen] = useState(false)

    // --- popover states ---
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    


    

    //HANDLERS
    //--- Menu Handlers ---
    const handleOpenMenu = (e) => {
        setMenuEl(e.currentTarget); 
    }

    const handleCloseSortMenu = () => {
        setMenuEl(null);
    }

    //--- Modal handlers ---

    const handleOpenModal = () => {
        setModalOpen(true)
    }

    //--- Drawer Handlers ---
    const handleOpenDrawer = () => {
        setDrawerOpen(true)
    }

    // --- Popover Handlers ---
    const handleOpenPopover = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };


    //Styled Components
    const StyleOfButton = {
        backgroundColor: appearance === "primary" ? theme.palette.primary.main : "transparent",
        color: appearance === "primary" ? theme.palette.primary.contrastText : "text.primary",
        padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
        borderRadius: "100px",
        fontWeight: "bold",
        "&:hover": {
            backgroundColor: appearance === "primary" ? theme.palette.primary.dark : theme.palette.secondary.main,
        },
        transition: type === "menu" && openMenu ? 'rotate(180deg)' : ""

    }

    const StyledCustomPopover = {
        marginTop: theme.spacing(1) // Adjust this value to add space between the button and popover
    }

    const StyleOfIconButton = {
        border: '1px solid',
        borderColor: theme.palette.divider,
        borderRadius: "10px",
    }

    return (
            <>
            {
                appearance === "iconButton"
                ?
                <IconButton 
                sx={StyleOfIconButton}
                size='small' 
                color='primary'
                onClick= {
                    type === "menu" ? handleOpenMenu :
                    type === "modal" ? handleOpenModal :
                    type === "drawer" ? handleOpenDrawer :
                    type === "popover" ? handleOpenPopover :
                    type === "custom" ? onClick : undefined
                }
                >
                    {
                        badgeContent
                        ?
                        <Badge color='error' badgeContent={badgeContent}>
                            {icon}
                        </Badge>
                        :
                        icon
                    }
                </IconButton>
                :
                <Button
                sx={StyleOfButton}
                onClick={
                    type === "menu" ? handleOpenMenu :
                    type === "modal" ? handleOpenModal :
                    type === "drawer" ? handleOpenDrawer :
                    type === "popover" ? handleOpenPopover :
                    type === "custom" ? onClick : undefined
                }
                startIcon={
                icon
                }
                endIcon= {
                    type === "menu" || type === "popover" ?
                    menuEl ? 
                    <KeyboardArrowUpOutlinedIcon /> :
                    <KeyboardArrowDownOutlinedIcon />
                    :
                    null
                }
                >
                    {title}
                </Button>
            }
            
            {
                menuItems && type === "menu" ?
                <Menu 
                id={title + "-menu"}
                anchorEl={menuEl} 
                open={openMenu} 
                onClose={handleCloseSortMenu}
                MenuListProps={{
                    "aria-labelledby": `by-${title}-menu`,
                }}
                >
                    {
                        menuItems.map((item, key) => {
                            return (
                            <MenuItem
                            onClick={item.onClick}
                            key={key}
                            sx={{
                                gap: theme.spacing()
                            }}
                            >
                            {item.icon && item.icon}
                            {item.value}
                            </MenuItem>
                            )
                        })
                    }
                    
                    

                </Menu>
                : 
                type === "modal"
                ?
                <CustomModal 
                title={title} 
                modalOpenState={[modalOpen, setModalOpen]}
                modalIcon={modalIcon}
                >
                    {willShow}
                </CustomModal>
                : 
                type === "drawer" 
                ?
                <CustomDrawer
                drawerOpenState={[drawerOpen, setDrawerOpen]}
                title={title}
                putDrawerCloseButton={putDrawerCloseButton}
                anchor={drawerAnchor}
                variant={drawerVariant}
                >
                    {willShow}
                </CustomDrawer>
                :
                type === "popover" 
                ?
                <Popover 
                sx={StyledCustomPopover}
                open={open} 
                anchorEl={anchorEl} 
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                elevation={0}
                >
                    {willShow}
                </Popover>
                :
                null
            }
            </>
    );
};

AdminMainButton.propTypes = {
    icon: propTypes.any,
    title: propTypes.string.isRequired,
    appearance: propTypes.oneOf(["primary", "secondary", "iconButton"]).isRequired,
    type: propTypes.oneOf(["modal", "menu", "drawer", "popover","custom"]).isRequired,
    onClick: propTypes.func,
    menuItems: propTypes.array,
    willShow: propTypes.element,
    modalIcon: propTypes.element,
    drawerAnchor: propTypes.oneOf(['right', 'left', 'top', 'bottom']),
    putDrawerCloseButton: propTypes.bool,
    badgeContent: propTypes.oneOfType([propTypes.string, propTypes.number]),
    drawerVariant: propTypes.string,
}

export default AdminMainButton;