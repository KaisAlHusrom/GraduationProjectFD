//React
import { useMemo, useState } from 'react'

import {
} from 'react-redux'

//Components
import { getAppropriateTag } from '../../StylesFunctions/GenerateElements.jsx'; 
//MUI
import {
    Box
} from '@mui/material'
import { styled } from '@mui/system'

import  '../Style.css'

//propTypes 
import PropTypes from 'prop-types'; 

//Styled Components
const StyledNavBarElement = styled(Box)(
    () => ({
    
    })
)


    const NavBarElement = ({ element }) => {

        const [title, setTitle] = useState(element.element_content);
        element.element_content = title;
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
            <StyledNavBarElement className='element-query'>
                        {getAppropriateTag(element.element_type.element_type_name, element.element_content, elementStyle)}
            </StyledNavBarElement>
        );
    };
    
    NavBarElement.propTypes = {
        element: PropTypes.object.isRequired, // Define PropTypes
    };
    
    export default NavBarElement;
