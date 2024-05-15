//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

//Components
import CarouselElement from './CarouselElement'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import  '../Style.css'



//Styled Components
const StyledCarouselComponent = styled(Box)(() => ({}))


const CarouselComponent = ({component}) => {
    
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
        <StyledCarouselComponent  sx={componentStyle} className='component-query'>
                {
                component && component.children.map((element, i) => {
                    return (
                        <CarouselElement key={i} element={element} />
                )
                })
            }
        </StyledCarouselComponent>
    );
};

CarouselComponent.propTypes = {
    component: propTypes.object
}


export default CarouselComponent;