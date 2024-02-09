//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

//Components

import HeaderData from "./HeaderData"



//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import HeaderComponent from './HeaderComponent'

//Styled Components
const StyledHeader = styled(Box)(
    ({ theme }) => ({
    
    })
)


const Header = () => {

    const sectionStyle = useMemo(() => {
        const styleObject = {};
        HeaderData.section_css_props.forEach((cssProp) => {
        const { css_prop, css_prop_value } = cssProp;

        if (css_prop.is_section) {
            styleObject[css_prop.prop_name] = css_prop_value;
        }
        });

    return styleObject;
}, []);



    return (
        <StyledHeader key={HeaderData.section_id} sx={sectionStyle}>
            {HeaderData &&
                HeaderData.section_components.map((component, i) => {
                return (
                    <HeaderComponent key={i} component={component} />
                );
                })}
         
        </StyledHeader>
    );
};

export default Header;