//React
import { useContext, useMemo } from 'react'

import {
    
} from 'react-redux'

//Components
import HeaderData from './HeaderData.json'
import HeaderComponent from './HeaderComponent'
import { MainTemplateSectionSet } from '../../UseContext/UserSetSections'
import UpDownButtons from '../../components/UpDownButtons'
import EditLink from '../../components/EditLink'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledHeader = styled(Box)(() => ({}))


const Header = ({moveSectionUp , moveSectionDown}) => {

    const {HeaderSection } = useContext(MainTemplateSectionSet)

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
    HeaderSection ? (
        <StyledHeader sx = {sectionStyle}  key={HeaderData.section_id}>
            <Box sx = {{
                display: 'flex',
                flexDirection: 'row',
                justifyContent:'start',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}>
            <UpDownButtons moveSectionUp = {moveSectionUp} moveSectionDown = {moveSectionDown} ></UpDownButtons>

            </Box>

        {HeaderData &&
        HeaderData.section_components.map((component, i) => {
        return (
            <HeaderComponent key={i} component={component} />
        );
        })}


            <EditLink Data = {HeaderData} ></EditLink>

        </StyledHeader>
        ) : null 
    );
};

export default Header;