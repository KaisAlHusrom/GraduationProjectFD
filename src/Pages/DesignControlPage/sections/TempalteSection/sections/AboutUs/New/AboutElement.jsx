//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

//Components



//propTypes 
import propTypes from 'prop-types'


//MUI
import {
    Box, Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledAboutElement = styled(Box)(
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
}



const AboutElement = ({element}) => {
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
        <StyledAboutElement>
              {
                getAppropriateTag(element.element, element.element_content, elementStyle)
            }
        </StyledAboutElement>
    );
};

AboutElement.propTypes = {
    element: propTypes.object
}

export default AboutElement;