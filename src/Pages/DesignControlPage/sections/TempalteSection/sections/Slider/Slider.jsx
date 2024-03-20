//React
import { useContext, useMemo } from 'react'

import {
    
} from 'react-redux'

//Components
import SliderData from './SliderData.json'
import { MainTemplateSectionSet } from '../../UseContext/UserSetSections'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import UpDownButtons from '../../components/UpDownButtons'
import EditLink from '../../components/EditLink'
import SliderComponent from './SliderComponent'

//Styled Components
const StyledSlider = styled(Box)(
    ({ theme }) => ({
    
    })
)


const SliderSection = ({moveSectionUp , moveSectionDown}) => {
    const {SliderSection } = useContext(MainTemplateSectionSet)

    const sectionStyle = useMemo(() => {
        const styleObject = {};

        SliderData.section_css_props.forEach((cssProp) => {
        const { css_prop, css_prop_value } = cssProp;

        if (css_prop.is_section) {
            styleObject[css_prop.prop_name] = css_prop_value;
        }
        });

        return styleObject;
    }, []);

    return (
        SliderSection ? (
            <StyledSlider sx= {sectionStyle}  key={SliderData.section_id}>
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
        {SliderData &&
        SliderData.section_components.map((component, i) => {
        return (
            <SliderComponent key={i} component={component} />
        );
        })}

            <EditLink Data = {SliderData} ></EditLink>


        </StyledSlider>
        
        ) : null
    );
};

export default SliderSection;