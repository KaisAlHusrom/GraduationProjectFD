//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import GalleryElement from './GalleryElement'
import GalleryElementBox from './GalleryElementBox'

//Styled Components
const StyledGalleryComponent = styled(Box)(
    ({ theme }) => ({
    
    })
)


const GalleryComponent = ({component}) => {

    const componentStyle = useMemo(() => {
        const styleObject = {};

        component.section_css_props.forEach((cssProp) => {
        const { css_prop, css_prop_value } = cssProp;

        if (css_prop.is_component) {
            styleObject[css_prop.prop_name] = css_prop_value;
        }
        });

        return styleObject;
    }, [component.section_css_props]);



    // console.log(component.component_elements['Texts_Of_Header'].section_css_props)

    return (
            <StyledGalleryComponent sx={componentStyle}>
                <GalleryElementBox component={component} ></GalleryElementBox>
            </StyledGalleryComponent>

      
    );
};

GalleryComponent.propTypes = {
    component: propTypes.object
}

export default GalleryComponent;