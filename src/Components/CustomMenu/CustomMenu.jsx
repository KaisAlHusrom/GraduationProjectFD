//React
import {  } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {

    Menu,
} from '@mui/material'


//propTypes 
import propTypes from 'prop-types'

//Styled Components


const CustomMenu = (props) => {
    const {
        menuOpenState,
        children
    } = props

    const [anchorEl, setAnchorEl] = menuOpenState;
    const open = Boolean(anchorEl);


    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            sx={{
                "& .MuiList-root": {
                    paddingTop: 0,
                    paddingBottom: 0,
                },
                "& .MuiPaper-root": {
                    overflow: 'visible'
                }
            }}
        >
            {children}
        </Menu>

    );
};

CustomMenu.propTypes = {
    children: propTypes.element,
    menuOpenState: propTypes.array,
}

export default CustomMenu;