//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

//Components
import AboutElement from './AboutElement'


import propTypes from 'prop-types'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'


//Styled Components
const StyledAboutComponent = styled(Box)(() => ({}))




const AboutComponent = ({component}) => {


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
        <StyledAboutComponent sx={componentStyle}>
            {
                component && component.component_elements.map((element, i) => {
                    return (
                        <AboutElement key={i} element={element} />
                    )
                })
            }
        </StyledAboutComponent>
    );
};
AboutComponent.propTypes = {
    component: propTypes.object
}


export default AboutComponent;