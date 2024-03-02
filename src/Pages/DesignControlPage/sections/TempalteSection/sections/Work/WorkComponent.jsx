//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

//Components



//propTypes 
import propTypes from 'prop-types'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import WorkElement from './WorkElement'

//Styled Components
const StyledWorkComponent = styled(Box)(() => ({}))


const WorkComponent = ( {component}) => {
    
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
        <StyledWorkComponent sx={componentStyle}>
            {
                component && component.component_elements.map((element, i) => {
                    return (
                        <WorkElement key={i} element={element} />
                    )
                })
            }
        </StyledWorkComponent>
    );
};

WorkComponent.propTypes = {
    component: propTypes.object
}


export default WorkComponent;