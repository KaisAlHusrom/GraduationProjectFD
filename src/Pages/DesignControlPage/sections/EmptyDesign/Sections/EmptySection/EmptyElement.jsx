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
import { getAppropriateTag } from '../../../TempalteSection/StylesFunctions/GenerateElements'

//Styled Components
const StyledEmptyElement = styled(Box)(
    ({ theme }) => ({
    
    })
)


const EmptyElement = ({element}) => {


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
        <StyledEmptyElement className='element-query'>
                {getAppropriateTag(element.element_type.element_type_name, element.element_content, elementStyle)}
        </StyledEmptyElement>
    );
};


EmptyElement.propTypes = {
    element: propTypes.object
}


export default EmptyElement;