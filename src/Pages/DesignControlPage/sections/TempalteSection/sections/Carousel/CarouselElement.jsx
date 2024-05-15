//React
import { useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components
import { getAppropriateTag } from '../../StylesFunctions/GenerateElements'


//propTypes 
import propTypes from 'prop-types'



//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import  '../Style.css'

//Styled Components
const StyledCarouselElement = styled(Box)(() => ({}))


const CarouselElement = ({ element }) => {

    const [title, setTitle] = useState(element.element_content);
    const [elementStyle, setElementStyle] = useState({});

    useMemo(() => {
        const dictionary = {};
        if (element) {
            element.styles.forEach((cssProp) => {
                const { style_prop, style_prop_value } = cssProp;
                if (style_prop.is_element) {
                    dictionary[style_prop.style_prop_css_name] = style_prop_value;
                }
            });
        }
        setElementStyle(dictionary);
    }, [element.styles]);



    return (
        <StyledCarouselElement className='element-query'>
                        {getAppropriateTag(element.element_type.element_type_name, element.element_content, elementStyle)}
        </StyledCarouselElement>
    );
};

CarouselElement.propTypes = {
    element: propTypes.object,
};



export default CarouselElement;