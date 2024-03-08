//React
import { useContext, useMemo } from 'react'

import {
    
} from 'react-redux'
import { MainTemplateSectionSet } from '../../UseContext/UserSetSections'

//Components
import ServicesComponent from './ServicesComponent'
import ServicesData from './ServicesData.json'
import UpDownButtons from '../../components/UpDownButtons'
import EditLink from '../../components/EditLink'

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledServices = styled(Box)(() => ({}))



const Services = ({moveSectionUp , moveSectionDown}) => {

    const {ServicesSection } = useContext(MainTemplateSectionSet)

    const sectionStyle = useMemo(() => {
        const styleObject = {};

        ServicesData.section_css_props.forEach((cssProp) => {
        const { css_prop, css_prop_value } = cssProp;

        if (css_prop.is_section) {
            styleObject[css_prop.prop_name] = css_prop_value;
        }
        });

        return styleObject;
    }, []);




    return (
    ServicesSection ? (
        <StyledServices sx= {sectionStyle}  key={ServicesData.section_id}>

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
                
        {ServicesData &&
        ServicesData.section_components.map((component, i) => {
        return (
            <ServicesComponent key={i} component={component} />
        );
        })}


            <EditLink Data = {ServicesData} ></EditLink>

    </StyledServices>
    ) : null
    );
};

export default Services;