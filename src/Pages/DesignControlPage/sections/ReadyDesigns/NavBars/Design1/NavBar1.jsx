//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

//Components

import NavBar1Data from "./NavBar1Data.json"

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import NavBarComponent1 from './NavBarComponent1'

//Styled Components
const StyledNavBar = styled(Box)(
    () => ({
    
    })
)


const NavBar1 = () => {

    
    const sectionStyle = useMemo(() => {
        const styleObject = {};
        NavBar1Data.section_css_props.forEach((cssProp) => {
        const { css_prop, css_prop_value } = cssProp;

        if (css_prop.is_section) {
            styleObject[css_prop.prop_name] = css_prop_value;
        }
        });

    return styleObject;
}, []);



    return (
        <StyledNavBar  key={NavBar1Data.section_id} sx={sectionStyle}>
            {NavBar1Data &&
                NavBar1Data.section_components.map((component, i) => {
                return (
                    <NavBarComponent1 key={i} component={component} />
                );
                })}
        </StyledNavBar>
    );
};

export default NavBar1;