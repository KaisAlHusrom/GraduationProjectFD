//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

//Components
import WorkElement from './WorkElement'



//propTypes 
import propTypes from 'prop-types'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import  '../Style.css'

//Styled Components
const StyledWorkComponent = styled(Box)(() => ({}))


const WorkComponent = ( {component}) => {
    
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
        <StyledWorkComponent sx={componentStyle} className='component-query'>
            {
                component && component.children.map((element, i) => {
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