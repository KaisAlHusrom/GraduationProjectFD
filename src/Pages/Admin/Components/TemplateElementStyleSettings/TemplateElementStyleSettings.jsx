//React
import { useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Autocomplete,
    Grid, TextField, Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { useLoaderData } from 'react-router-dom'
import { generateStyleTextfield } from '../../../../Helpers/generateStyleTextfield'

//Styled Components
const StyledTemplateElementStyleSettings = styled(Grid)(
    ({ theme }) => ({
        width: "100%",
        border: "1px solid",
        borderColor: theme.palette.divider,
        padding: theme.spacing(2),
        borderRadius: theme.spacing(2),
    })
)


const TemplateElementStyleSettings = ({elementStyleState}) => {
    const {elementStyleProps, stylesStatus, stylesBreakPoints} = useLoaderData()
    const {elementStyle, setElementStyle} = elementStyleState

    //style status state
    const [styleStatus, setStyleStatus] = useState(stylesStatus[0])
    
    //style breakpoint state
    const [styleBreakpoint, setStyleBreakpoint] = useState(stylesBreakPoints[0])

    //Status autocomplete default props
    const statusDefaultProps = useMemo(()=> {
        return {
            options: stylesStatus,
            getOptionLabel: (option) => option.style_status_normal_name,
            getOptionKey: (option) => option.style_status_id,
        };
    }, [stylesStatus])

    //Breakpoints autocomplete default props
    const breakpointsDefaultProps = useMemo(()=> {
        return {
            options: stylesBreakPoints,
            getOptionLabel: (option) => option.style_breakpoint_normal_name,
            getOptionKey: (option) => option.style_breakpoint_id,
        };
    }, [stylesBreakPoints])

    //handlers 
    const handleChange = (css_prop_name, newValue, type) => {
        const css_prop_value = type === "color" ? newValue.hex : newValue;
    
        // Copy the current elementStyle object
        const updatedStyle = { ...elementStyle };
    
        // Check if both styleStatus and styleBreakpoint are default
        if (styleStatus.style_status_normal_name === stylesStatus[0].style_status_normal_name
            && 
            styleBreakpoint.style_breakpoint_normal_name === stylesBreakPoints[0].style_breakpoint_normal_name) {
            // Add the property directly to elementStyle
            updatedStyle[css_prop_name] = type === "number" ? `${css_prop_value}px` : css_prop_value;
        } else {
            if (styleBreakpoint.style_breakpoint_normal_name !== stylesBreakPoints[0].style_breakpoint_normal_name
                &&
                styleStatus.style_status_normal_name !== stylesStatus[0].style_status_normal_name
                ) {
                // Add the property to styleStatus key in styleBreakpoint key in elementStyle object
                updatedStyle[styleBreakpoint.style_breakpoint_css_name] = {
                    ...updatedStyle[styleBreakpoint.style_breakpoint_css_name],
                    [styleStatus.style_status_css_name]: {
                        ...updatedStyle[styleBreakpoint.style_breakpoint_css_name]?.[styleStatus.style_status_css_name],
                        [css_prop_name]: type === "number" ? `${css_prop_value}px` : css_prop_value,
                    },
                };
            }
            else if (styleBreakpoint.style_breakpoint_normal_name !== stylesBreakPoints[0].style_breakpoint_normal_name) {
                // Add the property to styleStatus key in elementStyle object
                updatedStyle[`'${styleBreakpoint.style_breakpoint_css_name}'`] = {
                    ...updatedStyle[styleBreakpoint.style_breakpoint_css_name],
                    [css_prop_name]: type === "number" ? `${css_prop_value}px` : css_prop_value,
                };
            } else if(styleStatus.style_status_normal_name !== stylesStatus[0].style_status_normal_name) {
                // Add the property to styleStatus key in elementStyle object
                updatedStyle[`':${styleStatus.style_status_css_name}'`] = {
                    ...updatedStyle[styleStatus.style_status_css_name],
                    [css_prop_name]: type === "number" ? `${css_prop_value}px` : css_prop_value,
                };
            }
        }
    
        // Set the updated style object in state
        setElementStyle(updatedStyle);

    };
    
    
    
    const handleChangeStatus = async (event, newValue) => {
        setStyleStatus(() => newValue)
    }


    const handleChangeBreakpoint = async (event, newValue) => {
        setStyleBreakpoint(() => newValue)
    }

    return (
        <StyledTemplateElementStyleSettings container spacing={2}>
            <Grid item xxs={12}>
                <Typography variant='h6' letterSpacing={2} color="primary.main">
                    Style Settings
                </Typography>
            </Grid>
            <Grid container spacing={2} item xxs={12}>
                <Grid item xxs={12}>
                    <Typography variant='subtitle1' letterSpacing={2} color="text.secondary">
                        Applied Styles
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} item xxs={12}>
                <Grid item xxs={12}>
                    <Typography variant='subtitle1' letterSpacing={2} color="text.secondary">
                        Styles Status And Breakpoints
                    </Typography>
                </Grid>
                <Grid item xxs={12} xs={6} md={4} lg={3}>
                    <Autocomplete
                        {...breakpointsDefaultProps}
                        disablePortal
                        id="Element Types Auto Complete"
                        renderInput={(params) => <TextField {...params} label="Style Breakpoints" />}
                        onChange={(event, newValue) => handleChangeBreakpoint(event, newValue)}
                        value={styleBreakpoint}
                        size='small'
                    />  
                </Grid>
                <Grid item xxs={12} xs={6} md={4} lg={3}>
                    <Autocomplete
                        {...statusDefaultProps}
                        disablePortal
                        id="Element Types Auto Complete"
                        renderInput={(params) => <TextField {...params} label="Style Status" />}
                        onChange={(event, newValue) => handleChangeStatus(event, newValue)}
                        value={styleStatus}
                        size='small'
                    />  
                </Grid>
            </Grid>
            <Grid container spacing={2} item xxs={12}>
                <Grid item xxs={12}>
                    <Typography variant='subtitle1' letterSpacing={2} color="text.secondary">
                        Styles Props
                    </Typography>
                </Grid>
                    {
                    elementStyleProps && elementStyleProps.length > 0 ? 
                    elementStyleProps.map((styleProp, key) => {
                        return (
                            <Grid key={key} item xxs={12} xs={6} md={4} lg={3}>
                                {
                                    generateStyleTextfield(styleProp, handleChange, elementStyle)
                                }   
                            </Grid>
                        )
                    })
                    : 
                    null
                    }
            </Grid>
            
        </StyledTemplateElementStyleSettings>
    );
};

TemplateElementStyleSettings.propTypes = {
    elementStyleState: propTypes.object
}

export default TemplateElementStyleSettings;