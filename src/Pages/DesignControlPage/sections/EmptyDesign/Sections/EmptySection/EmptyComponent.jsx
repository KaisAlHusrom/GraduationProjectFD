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
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledEmptyComponent = styled(Box)(
    ({ theme }) => ({
    
    })
)


const EmptyComponent = ({component}) => {

    const componentStyle = useMemo(() => {


        const styleObject = {};
        if (component) {
            component.forEach((item) => {
                if (item.styles) {
                item.styles.forEach((cssProp) => {
                    const { style_prop, style_prop_value } = cssProp;
                    if (style_prop.is_section) {
                    styleObject[style_prop.style_prop_css_name] = style_prop_value;
                    }
                });
                }
            });
            }
        return styleObject;
    }, [component]);




    return (
        <StyledEmptyComponent sx = {componentStyle} className='component-query'>
                {
                component && component.children.map((element, i) => {
                    return (
                        // <HeaderElement key={i} element={element} />
                        <>
                        <Typography>Component</Typography>
                        </>
                    )
                })
            }
        </StyledEmptyComponent>
    );
};



EmptyComponent.propTypes = {
    component: propTypes.object
}


export default EmptyComponent;