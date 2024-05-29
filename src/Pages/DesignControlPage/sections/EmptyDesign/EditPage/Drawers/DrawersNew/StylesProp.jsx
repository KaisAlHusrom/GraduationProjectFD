//React
import { useEffect, useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { GetAppropriateStyleValues } from '../../../../../../Admin/Components/StylePropValues/StylePropValues'
import { convertToCssValue } from '../../../../../../../Helpers/RecursiveHelpers/styles'

//Styled Components
const StyledStylesProp = styled(Box)(
    ({ theme }) => ({
    
    })
)

export const Test = ({ prop, handleSectionStyleChange }) => {
    // Ensure styleState is an array with two elements [valueStyle, setValueStyle]
    const [value , setValue] = useState(null)
    const [mainDirections, setMainDirections] = useState({});
    const [cornerDirections, setCornerDirections] = useState({});
    const cssValue = useMemo(() => convertToCssValue(prop, value, mainDirections, cornerDirections), [cornerDirections, mainDirections, prop, value]);


    useEffect(() => {
        if(cssValue) {
            handleSectionStyleChange(cssValue, prop , prop.style_prop_css_name)
        }
    } , [cssValue, handleSectionStyleChange, prop])
    

        return (
        <Box sx={{ margin: '20px' }}>
            <GetAppropriateStyleValues
            label={prop.style_prop_normal_name}
            stylePropValueType={prop.style_prop_value_type}
            stylePropValues={prop.options}
            valueState={{ value, setValue, cssValue }}
            locateTypes={prop.locateTypes}
            directionsState={{ mainDirections, setMainDirections, cornerDirections, setCornerDirections }}
            />
        </Box>
        );
    };