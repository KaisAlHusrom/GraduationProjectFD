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
import { getAppropriateTag } from '../../StylesFunctions/GenerateElements'
import  '../Style.css'

//Styled Components
const StyledSendMessageElement = styled(Box)(
    () => ({ })
)


const SendMessageElement = ({element}) => {
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
        <StyledSendMessageElement className='element-query'>
                {getAppropriateTag(element.element, title, elementStyle)}
        </StyledSendMessageElement>
    );
};


SendMessageElement.propTypes = {
    element: propTypes.object
}
export default SendMessageElement;