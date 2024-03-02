//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

//Components
import FooterData from './FooterData.json'
import EditLink from '../../components/EditLink'
import FooterComponent from './FooterComponent'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledFooter = styled(Box)(() => ({}))





const Footer = () => {


    const sectionStyle = useMemo(() => {
        const styleObject = {};

        FooterData.section_css_props.forEach((cssProp) => {
        const { css_prop, css_prop_value } = cssProp;

        if (css_prop.is_section) {
            styleObject[css_prop.prop_name] = css_prop_value;
        }
        });

        return styleObject;
    }, []);



    return (
        <StyledFooter sx = {sectionStyle} key={FooterData.section_id}>
                
        {FooterData &&
            FooterData.section_components.map((component, i) => {
                return (
                    <FooterComponent key={i} component={component} />
                );
        })}

                <EditLink Data = {FooterData} ></EditLink>

        </StyledFooter>
    );
};

export default Footer;