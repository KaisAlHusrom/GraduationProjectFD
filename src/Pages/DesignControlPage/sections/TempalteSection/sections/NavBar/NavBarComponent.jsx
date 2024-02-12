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


//Styled Components
const StyledNavBarComponent = styled(Box)(() => ({}))

const NavBarComponent = ({component}) => {

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

      // Define tab labels

    return (
        <StyledNavBarComponent sx={componentStyle}>
            {
                component && component.component_elements.map((element, i) => {
                    return (
                        <NavBarElement key={i} element={element} />
                    )
                })
            }

    
        </StyledNavBarComponent>
    );
};

NavBarComponent.propTypes = {
    component: propTypes.component
}

export default NavBarComponent;