//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

//Components
import HeaderElement from './HeaderElement'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import  '../Style.css'

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledHeaderComponent = styled(Box)(() => ({}))


const HeaderComponent = ({component}) => {


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
        <StyledHeaderComponent sx = {componentStyle} className='component-query'>
                {
                component && component.children.map((element, i) => {
                    return (
                        <HeaderElement key={i} element={element} />
                    )
                })
            }
        </StyledHeaderComponent>
    );
};

HeaderComponent.propTypes = {
    component: propTypes.object
}

export default HeaderComponent;