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
            <StyledNavBarElement className='element-query'>
                {getAppropriateTag(element.element, element.element_content, elementStyle)}
            </StyledNavBarElement>
        );
    };
    
    NavBarElement.propTypes = {
        element: PropTypes.object.isRequired, // Define PropTypes
    };
    
    export default NavBarElement;
