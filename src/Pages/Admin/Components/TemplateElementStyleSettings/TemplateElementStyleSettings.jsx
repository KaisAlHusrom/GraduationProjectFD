//React
import { useState } from 'react'

import {
    
} from 'react-redux'



//MUI
import {

    Grid, Typography,
} from '@mui/material'
import { styled } from '@mui/system'


//propTypes 
import propTypes from 'prop-types'
import CustomLazyAutoComplete from '../../../../Components/CustomLazyAutoComplete/CustomLazyAutoComplete'


//services
import {fetchStyleStatuses} from '../../../../Services/styleStatusesService.js'


//Components
import AppliedStyles from '../AppliedStyles/AppliedStyles.jsx'
import StyleFieldBox from '../StyleFieldBox/StyleFieldBox.jsx'
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate.jsx'
import { SelectStyleBreakpoints } from '../SelectStyleBreakpoints/SelectStyleBreakpoints.jsx'


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



const TemplateElementStyleSettings = () => {
    const {template, selectedSubElementIds} = useMyCreateElementContext()

    //style status state
    const [styleStatus, setStyleStatus] = useState(null)
    
    //style breakpoint state
    const [styleBreakpoint, setStyleBreakpoint] = useState(null)


    //handlers 
    // const handleChangeStyleProp = (css_prop_name, newValue, type) => {
    //     const css_prop_value = type === "color" ? newValue.hex : newValue;
    
    //     // Copy the current elementStyle object
    //     const updatedStyle = { ...elementsStyle };
    
    //     // // Check if both styleStatus and styleBreakpoint are default
    //     // if (styleStatus.style_status_normal_name === stylesStatus[0].style_status_normal_name
    //     //     && 
    //     //     styleBreakpoint.style_breakpoint_normal_name === stylesBreakPoints[0].style_breakpoint_normal_name) {
    //     //     // Add the property directly to elementStyle
    //     //     updatedStyle[css_prop_name] = type === "number" ? `${css_prop_value}px` : css_prop_value;
    //     // } else {
    //     //     if (styleBreakpoint.style_breakpoint_normal_name !== stylesBreakPoints[0].style_breakpoint_normal_name
    //     //         &&
    //     //         styleStatus.style_status_normal_name !== stylesStatus[0].style_status_normal_name
    //     //         ) {
    //     //         // Add the property to styleStatus key in styleBreakpoint key in elementStyle object
    //     //         updatedStyle[styleBreakpoint.style_breakpoint_css_name] = {
    //     //             ...updatedStyle[styleBreakpoint.style_breakpoint_css_name],
    //     //             [styleStatus.style_status_css_name]: {
    //     //                 ...updatedStyle[styleBreakpoint.style_breakpoint_css_name]?.[styleStatus.style_status_css_name],
    //     //                 [css_prop_name]: type === "number" ? `${css_prop_value}px` : css_prop_value,
    //     //             },
    //     //         };
    //     //     }
    //     //     else if (styleBreakpoint.style_breakpoint_normal_name !== stylesBreakPoints[0].style_breakpoint_normal_name) {
    //     //         // Add the property to styleStatus key in elementStyle object
    //     //         updatedStyle[`'${styleBreakpoint.style_breakpoint_css_name}'`] = {
    //     //             ...updatedStyle[styleBreakpoint.style_breakpoint_css_name],
    //     //             [css_prop_name]: type === "number" ? `${css_prop_value}px` : css_prop_value,
    //     //         };
    //     //     } else if(styleStatus.style_status_normal_name !== stylesStatus[0].style_status_normal_name) {
    //     //         // Add the property to styleStatus key in elementStyle object
    //     //         updatedStyle[`':${styleStatus.style_status_css_name}'`] = {
    //     //             ...updatedStyle[styleStatus.style_status_css_name],
    //     //             [css_prop_name]: type === "number" ? `${css_prop_value}px` : css_prop_value,
    //     //         };
    //     //     }
    //     // }
    
    //     // Set the updated style object in state
    //     setElementsStyle(updatedStyle);

    // };
    
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
                <Grid item xxs={12}>
                    <AppliedStyles />
                </Grid>
            </Grid>
            <Grid container spacing={2} item xxs={12}>
                <Grid item xxs={12}>
                    <Typography variant='subtitle1' letterSpacing={2} color="text.secondary">
                        Styles Status And Breakpoints
                    </Typography>
                </Grid>
                <Grid item xxs={12}>
                    <SelectStyleBreakpoints state={{styleBreakpoint, setStyleBreakpoint}} />
                    {/* <CustomLazyAutoComplete
                        optionId='id'
                        optionName='style_responsive_break_point_normal_name'
                        label='Style Responsive Breakpoints'
                        handleFetchData={fetchStyleBreakpoints}
                        valueState={[styleBreakpoint, setStyleBreakpoint]}
                    /> */}
                </Grid>
                {/* <Grid item xxs={12} xs={6} md={4} lg={3}>
                    <CustomLazyAutoComplete
                        optionId='id'
                        optionName='style_status_normal_name'
                        label='Style Statuses'
                        handleFetchData={fetchStyleStatuses}
                        valueState={[styleStatus, setStyleStatus]}
                    />
                </Grid> */}
            </Grid>
            <Grid container spacing={2} item xxs={12}>
                <Grid item xxs={12}>
                    <Typography variant='subtitle1' letterSpacing={2} color="text.secondary">
                        Styles Props
                    </Typography>
                </Grid>
                <Grid item xxs={12}>
                    
                    <StyleFieldBox 
                        category='category'
                        stylePropName='display'
                        stylePropValueType='string'
                        stylePropValues={[]}
                    />
                </Grid>
            </Grid>
            
        </StyledTemplateElementStyleSettings>
    );
};

TemplateElementStyleSettings.propTypes = {
    elementStyleState: propTypes.object
}

export default TemplateElementStyleSettings;


