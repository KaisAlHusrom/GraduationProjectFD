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

        component.section_css_props.forEach((cssProp) => {
        const { css_prop, css_prop_value } = cssProp;

        if (css_prop.is_component) {
            styleObject[css_prop.prop_name] = css_prop_value;
        }
        });

        return styleObject;
    }, [component.section_css_props]);


    return (
        <StyledHeaderComponent sx = {componentStyle} className='component-query'>
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