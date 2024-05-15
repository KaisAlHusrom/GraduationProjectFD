//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

//Components
import NavBarElement from './NavBarElement.jsx';

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import  '../Style.css'


//Styled Components
const StyledNavBarComponent = styled(Box)(() => ({}))

const NavBarComponent = ({component}) => {

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
        <StyledNavBarComponent sx={componentStyle} className='component-query'>
            {
                component && component.children.map((element, i) => {
                    return (
                        <NavBarElement key={i} element={element} />
                    )
                })
            }

    
        </StyledNavBarComponent>
    );
};

NavBarComponent.propTypes = {
    component: propTypes.object
}

export default NavBarComponent;