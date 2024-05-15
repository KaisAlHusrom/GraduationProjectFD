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
import EditLink from '../../components/EditLink'

//Styled Components
const StyledNavBar = styled(Box)(
    () => ({})
)


const NavBar = () => {

    
 
    const sectionStyle = useMemo(() => {
        const styleObject = {};

        NavBarData.styles.forEach((cssProp) => {
        const { style_prop, style_prop_value } = cssProp;

        if (style_prop.is_component) {
            styleObject[style_prop.style_prop_css_name] = style_prop_value;
        }
        });

        return styleObject;
    }, []);



    return (
        <StyledNavBar  key={NavBarData.section_id} sx={sectionStyle}>
            {NavBarData &&
                NavBarData.children.map((component, i) => {
                return (
                    <NavBarComponent key={i} component={component} />
                );
                })}
                <EditLink Data = {NavBarData} ></EditLink>

        </StyledNavBar>
    );
};

export default NavBar;