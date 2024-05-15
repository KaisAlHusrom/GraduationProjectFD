//React
import { useEffect, useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import propTypes from 'prop-types'
import { useInView } from 'react-intersection-observer'
import SendMessageElement from './SendMessageElement'
import  '../Style.css'

//Styled Components
const StyledSendMessageComponent = styled(Box)(
    () => ({
    
    })
)


const SendMessageComponent = ({component}) => {

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
        <StyledSendMessageComponent 
        sx={{
            ...componentStyle,
            opacity: isInView ? 1 : 0,
            }}
            className={isInView ? 'component-query slide-down-animation' : ''}
            ref={ref}
            >
            {
                component && component.children.map((element, i) => {
                    return (
                        <SendMessageElement key={i} element={element} />
                    )
                })
            }
        </StyledSendMessageComponent>
    );
};


SendMessageComponent.propTypes = {
    component: propTypes.object
}


export default SendMessageComponent;