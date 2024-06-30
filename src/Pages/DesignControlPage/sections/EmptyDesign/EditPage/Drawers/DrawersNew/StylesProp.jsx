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

export const StylesProp = ({ prop, handleSectionStyleChange , sectionStyle }) => {

    
    const [value , setValue] = useState(null)
    const [mainDirections, setMainDirections] = useState({});
    const [cornerDirections, setCornerDirections] = useState({});
    const cssValue = useMemo(() => convertToCssValue(prop, value, mainDirections, cornerDirections), [cornerDirections, mainDirections, prop, value]);

        

    useEffect(() => {
        if(cssValue) {
            handleSectionStyleChange(cssValue, prop , prop.style_prop_css_name)
        }
    } , [cssValue, prop])


    // const propNormalNameValues = Object.entries(sectionStyle).map(([propCssName, propCssValue]) => {
    //     if(prop?.children?.length > 0) {
    //         if(prop.style_prop_css_name === propCssName) {
    //             const wanted = prop?.children.find(option => option.style_prop_value_css_name === propCssValue)
    //             return wanted.style_prop_value_normal_name

    //         }

    //     }
    // })
    // console.log('normal names' , propNormalNameValues)

    useEffect(() => {
        if(Object.keys(sectionStyle).length > 0) {
            Object.entries(sectionStyle).forEach(([propCssName, propValue]) => {
                    if(prop.style_prop_css_name === propCssName) {
                        setValue(propValue)
                    }
            });
        }
    }, [prop.style_prop_css_name, sectionStyle])
    

        return (
        <Box sx={{ margin: '20px'  ,
        }}>
            <GetAppropriateStyleValues
            label={prop.style_prop_normal_name}
            stylePropValueType={prop.style_prop_value_type}
            stylePropValues={prop.options}
            valueState={{ value, setValue, cssValue }}
            locateTypes={prop.locateTypes}
            directionsState={{ mainDirections, setMainDirections, cornerDirections, setCornerDirections }}
            sectionStyle = {sectionStyle}
            />
        </Box>
        );
    };