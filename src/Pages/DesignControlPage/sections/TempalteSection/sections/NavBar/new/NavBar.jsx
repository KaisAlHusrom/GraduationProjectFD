//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

//Components

import NavBarData from "./NavBarData"

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import NavBarComponent from './NavBarComponent'

//Styled Components
const StyledNavBar = styled(Box)(
    ({ theme }) => ({
    
    })
)


const NavBar = () => {

    
    const sectionStyle = useMemo(() => {
        const styleObject = {};
        NavBarData.section_css_props.forEach((cssProp) => {
        const { css_prop, css_prop_value } = cssProp;

        if (css_prop.is_section) {
            styleObject[css_prop.prop_name] = css_prop_value;
        }
        });

    return styleObject;
}, []);



    return (
        <StyledNavBar  key={NavBarData.section_id} sx={sectionStyle}>
           {NavBarData &&
                NavBarData.section_components.map((component, i) => {
                return (
                    <NavBarComponent key={i} component={component} />
                );
                })}
        </StyledNavBar>
    );
};

export default NavBar;