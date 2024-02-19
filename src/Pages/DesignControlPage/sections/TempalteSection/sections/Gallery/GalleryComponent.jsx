//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

//Components
import GalleryElement from './GalleryElement'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledGalleryComponent = styled(Box)(() => ({}))


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


    return (
        <StyledGalleryComponent sx={componentStyle}>
            {
                component && component.component_elements.map((element, i) => {
                    return (
                        <GalleryElement key={i} element={element} />
                    )
                })
            }

        </StyledGalleryComponent>
    );
};

GalleryComponent.propTypes = {
    component: propTypes.object
}

export default GalleryComponent;