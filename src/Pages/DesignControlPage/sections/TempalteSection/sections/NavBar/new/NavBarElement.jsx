//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box, Link, Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledNavBarElement = styled(Box)(
    ({ theme }) => ({
    
    })
)

const getAppropriateTag = (element, elementContent, elementStyle) => {
    if(element?.element_type === "Head3") {
        return (
            <Typography sx={elementStyle} variant="h3">{elementContent}</Typography>
        )
    }
    if(element?.element_type === "text") {
        return (
            <Typography sx={elementStyle} variant="h6">{elementContent}</Typography>
        )
    }

    if(element?.element_type === "image") {
        console.log(elementStyle)
        return (
            <img style={elementStyle} src={elementContent} alt={elementContent} />
        )
    }
    if(element?.element_type === "link") {
        console.log(elementStyle)
        return (
            <Link href="#" style={elementStyle} >{elementContent}</Link>
        )
    }
}


const NavBarElement = ({element}) => {
    const elementStyle = useMemo(() => {
        const styleObject = {};

        if(element.section_css_props) {
            element.section_css_props.forEach((cssProp) => {
                const { css_prop, css_prop_value } = cssProp;
        
                if (css_prop.is_element) {
                    styleObject[css_prop.prop_name] = css_prop_value;
                }
            });
        }

        return styleObject;
    }, [element.section_css_props]);


    return (
        <StyledNavBarElement>
              {
                getAppropriateTag(element.element, element.element_content, elementStyle)
            }
        </StyledNavBarElement>
    );
};

NavBarElement.propTypes = {
    element: propTypes.element
}

export default NavBarElement;