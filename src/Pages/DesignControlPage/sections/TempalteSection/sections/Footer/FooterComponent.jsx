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
import FooterElement from './FooterElement'
import  '../Style.css'

//Styled Components
const StyledFooterComponent = styled(Box)(() => ({}))


const FooterComponent = ({component}) => {


    const componentStyle = useMemo(() => {
        const styleObject = {};

        component.styles.forEach((cssProp) => {
        const { style_prop, style_prop_value } = cssProp;

        if (style_prop.is_component) {
            styleObject[style_prop.style_prop_css_name] = style_prop_value;
        }
        });

        return styleObject;
    }, [component.styles]);





    return (
        <StyledFooterComponent sx = {componentStyle} className='component-query'>
            {
                component && component.children.map((element, i) => {
                    return (
                        <FooterElement key={i} element={element} />
                    )
                })
            }
        </StyledFooterComponent>
    );
};

FooterComponent.propTypes = {
    component: propTypes.object
}

export default FooterComponent;