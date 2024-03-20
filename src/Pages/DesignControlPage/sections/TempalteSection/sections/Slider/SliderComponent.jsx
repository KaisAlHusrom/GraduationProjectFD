//React
import { useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import  '../Style.css'

//propTypes 
import propTypes from 'prop-types'
import SliderElement from './SliderElement'

//Styled Components
const StyledSliderComponent = styled(Box)(
    ({ theme }) => ({
    
    })
)


const SliderComponent = ({component}) => {


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

    const [isInView, setIsInView] = useState(false);
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            setIsInView(true);
        }
    }, [inView]);




    return (
        <StyledSliderComponent sx={{
            ...componentStyle,
            opacity: isInView ? 1 : 0,
            }}
            className={isInView ? 'component-query slide-down-animation' : ''}
            ref={ref}
            >
     {
                component && component.component_elements.map((element, i) => {
                    return (
                        <SliderElement key={i} element={element} />
                    )
                })
            }        </StyledSliderComponent>
    );
};

SliderComponent.propTypes = {
    component: propTypes.object
}

export default SliderComponent;