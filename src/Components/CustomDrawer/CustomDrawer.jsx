//React
import {
    
} from 'react'

import {  } from 'react-redux'

//Components


//MUI
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Divider
} from '@mui/material'
import { styled } from '@mui/system'


//icons
import CloseIcon from '@mui/icons-material/Close';

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledCustomDrawer = styled(Drawer)(
    () => ({
        zIndex: 1300,
    })
)

const StyledDrawerContent = styled(Box)(
    ({theme}) => ({
        // width: "500px",
    })
)

const StyledHeaderBox = styled(Box)(
    ({ theme }) => ({
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: `${theme.spacing(2)} ${theme.spacing(1)}`
    })
)


const CustomDrawer = (props) => {
    const { children, drawerOpenState, title, putDrawerCloseButton, anchor, variant , drawerWidth } = props

    const [drawerOpen, setDrawerOpen] = drawerOpenState

    //handlers
    const handleCloseDrawer = () => {
        setDrawerOpen(false)
    }


    return (
        <StyledCustomDrawer
        anchor={anchor}
        open={drawerOpen}
        onClose={handleCloseDrawer}
        variant={variant !== null ? variant :'temporary'}
        >
            <StyledDrawerContent style = {{width: drawerWidth}}>
                <StyledHeaderBox>
                    <Typography variant='h6' textTransform="uppercase">
                        {title}
                    </Typography>
                    {
                        putDrawerCloseButton
                        &&
                        <IconButton color='primary' size='small' onClick={handleCloseDrawer}>
                            <CloseIcon />
                        </IconButton>
                    }
                </StyledHeaderBox>
                <Divider />

                {children}
            </StyledDrawerContent>
        </StyledCustomDrawer>
    );
};

CustomDrawer.propTypes = {
    drawerOpenState: propTypes.array.isRequired,
    children: propTypes.element,
    title: propTypes.string,
    putDrawerCloseButton: propTypes.bool,
    anchor: propTypes.oneOf(['right', 'left', 'top', 'bottom']),
    variant: propTypes.string,
}

export default CustomDrawer;