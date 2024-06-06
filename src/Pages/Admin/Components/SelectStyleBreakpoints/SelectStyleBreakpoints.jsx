import { useEffect, useState } from 'react';
//icons
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import DesktopMacOutlinedIcon from '@mui/icons-material/DesktopMacOutlined';
import TabletOutlinedIcon from '@mui/icons-material/TabletOutlined';
import LaptopOutlinedIcon from '@mui/icons-material/LaptopOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';


import { AdminMainButton } from '../../../../Components';
import { fetchStyleBreakpoints } from '../../../../Services/AdminServices/Services/StyleResponsiveBreakpointsServices';

import { Box, Skeleton } from '@mui/material';

import { styled } from '@mui/system'
import { useTheme } from '@emotion/react'

//propTypes 
import propTypes from 'prop-types'


const getIcon = (name) => {
    if (name === "Large Desktops") {
        return <DesktopWindowsOutlinedIcon color='primary' />
    }

    if (name === "Desktops") {
        return <DesktopMacOutlinedIcon color='primary' />
    }

    if (name === "Tablet Screen") {
        return <TabletOutlinedIcon color='primary' />
    }

    if (name === "Small Laptops and tablets") {
        return <LaptopOutlinedIcon color='primary' />
    }

    if (name === "Mobile Screen") {
        return <PhoneAndroidOutlinedIcon color='primary' />
    }
}

const StyledBox = styled(Box)(
    ({ theme }) => ({
        width: '100%',
        display: 'flex',
        // alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: theme.spacing()
    })
);

export const SelectStyleBreakpoints = ({state}) => {
    const {styleBreakpoint, setStyleBreakpoint} = state;

    
    const theme = useTheme()
    const [breakpoints, setBreakpoints] = useState(null)
    useEffect(() => {
        const fetchBreakpoints = async () => {
            const {rows} = await fetchStyleBreakpoints()
            setBreakpoints(() => rows)
        }
        fetchBreakpoints()
    }, [])


    const handleSetBreakpoint = (breakpoint) => {
        if (styleBreakpoint?.id === breakpoint.id) {
            setStyleBreakpoint(() => null)
        } else {
            setStyleBreakpoint(() => breakpoint)
        }
    }

    return <StyledBox>
        {
            breakpoints && breakpoints.length > 0 
                ? 
                breakpoints.map((breakpoint, key) => {

                    return (
                        <AdminMainButton
                            key={key}
                            title={breakpoint.style_responsive_break_point_normal_name}
                            icon={getIcon(breakpoint.style_responsive_break_point_normal_name)}
                            type='custom'
                            appearance='primary'
                            putBorder
                            sx={{
                                textTransform: "capitalize",
                                "&:hover": {
                                    backgroundColor: theme.palette.action.hover,
                                },
                                backgroundColor: styleBreakpoint?.id === breakpoint?.id && theme.palette.action.selected,
                            }}
                            onClick={() => handleSetBreakpoint(breakpoint)}
                        />
                    )
                })
                :
                <Skeleton width="100%" height={100} />
        }
    </StyledBox>

    
}

SelectStyleBreakpoints.propTypes = {
    state: propTypes.object
}