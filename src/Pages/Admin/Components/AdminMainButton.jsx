//React
import { useState } from 'react'

import {  } from 'react-redux'

//Components
import {CustomModal} from '../../../Components';



//MUI
import {
    Button,
    Menu,
    MenuItem,


} from '@mui/material'
import { useTheme } from '@mui/material/styles';

//propTypes 
import propTypes from 'prop-types'




const AdminMainButton = (props) => {
    const { icon, title, onClick, appearance, type, menuItems, modalContent, modalIcon} = props

    //states
    // --- menu states ---
    const [userFilterEl, setUserFilterEl] = useState(null)
    const openUserFilter = Boolean(userFilterEl)

    // --- modal states ---
    const [modalOpen, setModalOpen] = useState(false)
    



    //theme
    const theme = useTheme();


    //Styled Components
    const StyleOfButton = {
            backgroundColor: appearance === "primary" ? theme.palette.primary.main : "transparent",
            color: appearance === "primary" ? theme.palette.primary.contrastText : "text.primary",
            padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
            borderRadius: "100px",
            fontWeight: "bold",
            "&:hover": {
                backgroundColor: appearance === "primary" ? theme.palette.primary.dark : theme.palette.secondary.main,
            }
    }

    //handles
    //--- Menu Handlers ---
    const handleOpenMenu = (e) => {
        setUserFilterEl(e.currentTarget); 
    }

    const handleCloseSortMenu = () => {
        setUserFilterEl(null);
    }

    //--- Modal handlers ---

    const handleOpenModal = () => {
        setModalOpen(true)
    }

    return (
            <>
            <Button
                sx={StyleOfButton}
                onClick={
                    type === "menu" ? handleOpenMenu :
                    type === "modal" ? handleOpenModal :
                    type === "custom" ? onClick : undefined
                }
                startIcon={
                icon
                }
                >
                    {title}
            </Button>
            {
                menuItems && type === "menu" ?
                <Menu 
                id={title + "-menu"}
                anchorEl={userFilterEl} 
                open={openUserFilter} 
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
                modalContent && type === "modal"
                ?
                <CustomModal 
                title={title} 
                modalOpenState={[modalOpen, setModalOpen]}
                modalIcon={modalIcon}
                >
                    {modalContent}
                </CustomModal>
                : null

            }
            </>
    );
};

AdminMainButton.propTypes = {
    icon: propTypes.any,
    title: propTypes.string.isRequired,
    appearance: propTypes.string.isRequired,
    type: propTypes.oneOf(["modal", "menu", "custom"]).isRequired,
    onClick: propTypes.func,
    menuItems: propTypes.array,
    modalContent: propTypes.element,
    modalIcon: propTypes.element
}

export default AdminMainButton;