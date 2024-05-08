//React
import { useCallback, useMemo, useState } from 'react'

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
import { useTheme } from '@emotion/react';

//Styled Components
const handleWidth = 20; // Width of the resizing handle
export const defaultDrawerWidth = 350;
const minDrawerWidth = 200;
const maxDrawerWidth = 600;

const StyledCustomDrawer = styled(Drawer)(
    () => ({
        zIndex: 1300,
        position: 'relative',
        
    })
)

const StyledDrawerContent = styled(Box)(
    () => ({
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
    const { children, drawerOpenState, title, putDrawerCloseButton, anchor, variant , drawerStyle, drawerResizable } = props

    const [drawerOpen, setDrawerOpen] = drawerOpenState

    const theme = useTheme()

    //handlers
    const handleCloseDrawer = () => {
        setDrawerOpen(false)
    }

    

    //resizable drawer
    const [drawerWidth, setDrawerWidth] = useState(defaultDrawerWidth);
    const [initialMouseX, setInitialMouseX] = useState(0);
    const [initialWidth, setInitialWidth] = useState(defaultDrawerWidth);
    const [isResizing, setIsResizing] = useState(false);

    const handleMouseDown = e => {
        setInitialMouseX(e.clientX);
        setInitialWidth(drawerWidth);
        setIsResizing(true);
        document.addEventListener("mouseup", handleMouseUp, true);
        document.addEventListener("mousemove", handleMouseMove, true);
    };

    const handleMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener("mouseup", handleMouseUp, true);
        document.removeEventListener("mousemove", handleMouseMove, true);
    };
    
    const handleMouseMove = useCallback(
        (e) => {
            e.preventDefault()
            const deltaX = e.clientX - initialMouseX;
            const newWidth = anchor === "right" ? initialWidth - deltaX : initialWidth + deltaX ;
            if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
                setDrawerWidth(newWidth);
            }
        },
        [anchor, initialMouseX, initialWidth]
    );
    
    
    const handlePosition = useMemo(() => {
        return anchor === 'left'
        ? { right: -handleWidth / 2 }
        : anchor === 'right'
        ? { left: -handleWidth / 2 }
        : { right: -handleWidth / 2 }
    }, [anchor])

    const draggerStyle = useMemo(() => {
        return {
            position: 'absolute',
            top: 0,
            ...handlePosition,
            width: handleWidth,
            minHeight: "98vh",
            height: '100%',
            cursor: 'col-resize',
            zIndex: 2000,
        }
    },[handlePosition])

    //static style
    const staticDrawerStyle = useMemo(() => {
        return {
            width: drawerResizable ? drawerWidth : defaultDrawerWidth,
            backgroundColor: theme.palette.background.paper,
            height: '100%'
        }
    }, [drawerResizable, drawerWidth, theme.palette.background.paper])

    return (
        <StyledCustomDrawer
        anchor={anchor}
        open={drawerOpen}
        onClose={handleCloseDrawer}
        variant={variant !== null ? variant :'temporary'}
        PaperProps={{
            sx: drawerStyle
            ?
            {...staticDrawerStyle, ...drawerStyle}
            :
            staticDrawerStyle
        }}
        >
            
            <StyledDrawerContent sx={{position: 'relative'}}>
                
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
                {
                    drawerResizable 
                    &&
                    <div
                        style={draggerStyle}
                        onMouseDown={e => handleMouseDown(e)}
                        >
                    </div>
                }
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
    drawerStyle: propTypes.object,
    drawerResizable: propTypes.bool,
}

export default CustomDrawer;