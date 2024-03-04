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
import CountersElement from './CountersElement'

//Styled Components
const StyledCountersComponent = styled(Box)(() => ({}))


const CountersComponent = ({component}) => {

    
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
        <StyledCountersComponent sx={componentStyle}>
            {
                component && component.component_elements.map((element, i) => {
                    return (
                        <CountersElement key={i} element={element} />
                    )
                })
            }
        </StyledCountersComponent>
    );
};

CountersComponent.propTypes = {
    component: propTypes.object
}

export default CountersComponent;