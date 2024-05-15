//React
import { useEffect, useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components
import ServicesElement from './ServicesElement'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import  '../Style.css'

//propTypes 
import propTypes from 'prop-types'
import { useInView } from 'react-intersection-observer'

//Styled Components
const StyledServicesComponent = styled(Box)(() => ({}))


const ServicesComponent = ({component}) => {


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


    const [isInView, setIsInView] = useState(false);
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            setIsInView(true);
        }
    }, [inView]);

    return (
        <StyledServicesComponent sx={{
            ...componentStyle,
            opacity: isInView ? 1 : 0,
            }}
            className={isInView ? 'component-query slide-down-animation' : ''}
            ref={ref}
            

        >
            {
                component && component.children.map((element, i) => {
                    return (
                        <ServicesElement key={i} element={element} />
                    )
                })
            }
        </StyledServicesComponent>
    );
};

ServicesComponent.propTypes = {
    component: propTypes.object
}

export default ServicesComponent;