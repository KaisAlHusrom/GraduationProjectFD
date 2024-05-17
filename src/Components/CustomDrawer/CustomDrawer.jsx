//React
import { useCallback, useMemo, useState } from 'react'

import {  } from 'react-redux'

//Components


//MUI
import {
    Drawer,
    Box,
    Typography,
    Divider
} from '@mui/material'
import { styled } from '@mui/system'


//icons
import CloseIcon from '@mui/icons-material/Close';

//propTypes 
import propTypes from 'prop-types'
import { useTheme } from '@emotion/react';
import AdminMainButton from '../AdminMainButton/AdminMainButton';

//Styled Components
const handleWidth = 20; // Width of the resizing handle
export const defaultDrawerWidth = 350;
const minDrawerWidth = 200;
const maxDrawerWidth = 600;



const StyledDrawerContent = styled(Box)(
    () => ({
        // width: "500px",
    })
)


const StyledCloseIcon = styled(Box)(
    () => ({
        position: 'absolute',
        top: 15,
        right: 15,
    })
);

const CustomDrawer = (props) => {
    const { children, 
        drawerOpenState, 
        title, putDrawerCloseButton, 
        anchor, variant , drawerStyle, 
        drawerResizable, drawerHeaderStyle, 
        drawerHeaderContent, withoutDrawerHeader,
        drawerWidthState,
        drawerZIndex
    } = props

    const [drawerOpen, setDrawerOpen] = drawerOpenState

    const theme = useTheme()

    //handlers
    const handleCloseDrawer = () => {
        setDrawerOpen(false)
    }

    

    //resizable drawer
    const [drawerWidth, setDrawerWidth] = drawerWidthState || [null, null];
    const [localDrawerWidth, setLocalDrawerWidth] = useState(defaultDrawerWidth);
    const [initialMouseX, setInitialMouseX] = useState(0);
    const [initialWidth, setInitialWidth] = useState(defaultDrawerWidth);
    const [isResizing, setIsResizing] = useState(false);

    const handleMouseDown = e => {
        setInitialMouseX(e.clientX);
        if(drawerWidthState) {
            setInitialWidth(drawerWidth);
        } else {
            setInitialWidth(localDrawerWidth)
        }
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
                if(drawerWidthState) {
                    setDrawerWidth(newWidth);
                } else {
                    setLocalDrawerWidth(newWidth);
                }
            }
        },
        [anchor, drawerWidthState, initialMouseX, initialWidth, setDrawerWidth]
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

    // drawer style
    const StyledCustomDrawer = useMemo(() => {
        return styled(Drawer)(
            () => ({
                position: 'relative',
                zIndex: drawerZIndex ? drawerZIndex : 1000
            })
        )
    }, [drawerZIndex])

    //header style 
    const StyledHeaderBox = useMemo(() => {
        return styled(Box)(
            ({ theme }) => {
                const staticStyles = {
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: `${theme.spacing(2)} ${theme.spacing(1)}`,
                    textTransform:"uppercase"
                }
                
                return drawerHeaderStyle ?
                {
                    ...staticStyles, ...drawerHeaderStyle
                }
                : 
                staticStyles
            }
        )
    }, [drawerHeaderStyle])

    //static style
    const staticDrawerStyle = useMemo(() => {
        return {
            width: drawerResizable ? (drawerWidthState ? drawerWidth : localDrawerWidth) : defaultDrawerWidth,
            backgroundColor: theme.palette.background.paper,
            height: '100%',
            zIndex: 1000
        }
    }, [drawerResizable, drawerWidth, drawerWidthState, localDrawerWidth, theme.palette.background.paper])

    const staticDrawerStyle2 = useMemo(() => {
        return {
            backgroundColor: theme.palette.background.paper,
            position: 'relative',
            height: "100vh",
        }
    }, [theme.palette.background.paper])

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
            
            <StyledDrawerContent sx={staticDrawerStyle2}>
                
                {
                    !withoutDrawerHeader &&
                    <>
                    <StyledHeaderBox >
                        <Typography variant='h6'>
                            {drawerHeaderContent || title}
                        </Typography>
                        
                    </StyledHeaderBox>
                    <Divider />
                </>
                }
                {
                    putDrawerCloseButton
                    &&
                    <StyledCloseIcon>
                        <AdminMainButton 
                            type='custom'
                            icon={<CloseIcon />}
                            appearance='iconButton'
                            onClick={handleCloseDrawer}
                            title={`Close ${title}`}
                            putTooltip
                            toolTipPosition={"left"}
                        />
                    </StyledCloseIcon>
                }
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
    drawerHeaderStyle: propTypes.object, 
    drawerHeaderContent: propTypes.string,
    withoutDrawerHeader: propTypes.bool,
    drawerWidthState: propTypes.array,
    drawerZIndex: propTypes.number
}

export default CustomDrawer;