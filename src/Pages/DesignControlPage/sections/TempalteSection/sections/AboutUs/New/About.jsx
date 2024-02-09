//React
import { useContext, useMemo } from 'react'

import {
    
} from 'react-redux'

//Components

import AboutData from "./AboutData"

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { MainTemplateSectionSet } from '../../../UseContext/UserSetSections'
import AboutComponent from './AboutComponent'

//Styled Components
const StyledAbout = styled(Box)(
    ({ theme }) => ({
    
    })
)




const About = () => {


    const sectionStyle = useMemo(() => {
        const styleObject = {};

        AboutData.section_css_props.forEach((cssProp) => {
        const { css_prop, css_prop_value } = cssProp;

        if (css_prop.is_section) {
            styleObject[css_prop.prop_name] = css_prop_value;
        }
        });

    return styleObject;
}, []);

    const {AboutUsPage } = useContext(MainTemplateSectionSet)
    return (
        AboutUsPage ? (
            <StyledAbout key={AboutData.section_id} sx={sectionStyle}>
            {AboutData &&
                AboutData.section_components.map((component, i) => {
                return (
                    <AboutComponent key={i} component={component} />
                );
                })}
         
            </StyledAbout>
             ) : (
                null
            )

    );
};

export default About;