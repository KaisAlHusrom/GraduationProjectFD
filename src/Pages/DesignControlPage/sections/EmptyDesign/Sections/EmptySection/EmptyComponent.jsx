//React
import { useMemo, useState } from 'react'

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
import EmptyElement from './EmptyElement'
import RecursiveComponent from './RecursiveComponent'

//Styled Components
const StyledEmptyComponent = styled(Box)(
    ({ theme }) => ({
    
    })
)


const EmptyComponent = ({component}) => {


    
    const [componentStyle, setComponentStyle] = useState({}); // using for control the component style 

    useMemo(() => {
        const dictionary = {};
        if (component.styles) {
            component.styles.forEach((cssProp) => {
                const { style_prop, style_prop_value } = cssProp;
                if (style_prop?.is_component) {
                    dictionary[style_prop.style_prop_css_name] = style_prop_value;
                }
            });
        }
        setComponentStyle(dictionary);
    }, [component.styles]);



    return (
            <StyledEmptyComponent sx={{...componentStyle , position : 'relative'}} className='component-query'>
                {
                    component && component.children
                        .sort((a, b) => a.sequence_number - b.sequence_number)
                        .map((element, i) => (
                            <>
                            {element.design_type === 'component' ? (
                                <RecursiveComponent
                                    component={element}
                                />
                            ) : (
                                <EmptyElement key={i} element={element}/>

                            )}
                            </>
                        ))
                }
            </StyledEmptyComponent>

    );
};



EmptyComponent.propTypes = {
    component: propTypes.object
}


export default EmptyComponent;