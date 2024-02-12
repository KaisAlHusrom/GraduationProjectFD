//React
import { useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components
import propTypes from 'prop-types'

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import HeaderElement from './HeaderElement.jsx';

//Styled Components
const StyledHeaderComponent = styled(Box)(() => ({}))


const HeaderComponent = ({component}) => {


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
        <StyledHeaderComponent sx={componentStyle}>
            {
                component && component.component_elements.map((element, i) => {
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