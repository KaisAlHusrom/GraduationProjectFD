//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Popover,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { useTheme } from '@emotion/react'




const CustomPopover = () => {
    //Styled Components
    const theme = useTheme()
    const StyledCustomPopover = {
        marginTop: theme.spacing(1) // Adjust this value to add space between the button and popover
    }


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    //handles
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Popover
        sx={StyledCustomPopover}
        open={open} 
        anchorEl={anchorEl} 
        onClose={handleClose}
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
            CustomPopover
        </Popover>
    );
};

CustomPopover.propTypes = {
    children: propTypes.array
}

export default CustomPopover;