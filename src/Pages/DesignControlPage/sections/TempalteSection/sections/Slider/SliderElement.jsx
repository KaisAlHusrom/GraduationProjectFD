//React
import { useMemo, useState } from 'react'

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
import { getAppropriateTag } from '../../StylesFunctions/GenerateElements'

//Styled Components
const StyledSliderElement = styled(Box)(
    ({ theme }) => ({
    
    })
)


const SliderElement = ({element}) => {
    const [title, setTitle] = useState(element.element_content);
    const [elementStyle, setElementStyle] = useState({});

    useMemo(() => {
        const dictionary = {};
        if (element.section_css_props) {
            element.section_css_props.forEach((cssProp) => {
                const { css_prop, css_prop_value } = cssProp;
                if (css_prop.is_element) {
                    dictionary[css_prop.prop_name] = css_prop_value;
                }
            });
        }
        setElementStyle(dictionary);
    }, [element.section_css_props]);




    return (
        <StyledSliderElement className='element-query'>
                            {getAppropriateTag(element.element, title, elementStyle)}
        </StyledSliderElement>
    );
};

SliderElement.propTypes = {
    element: propTypes.object
}

export default SliderElement;