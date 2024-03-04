//React
import { useContext, useMemo } from 'react'

import {
    
} from 'react-redux'

//Components
import WorkData from './WorkData.json'
import UpDownButtons from '../../components/UpDownButtons'
import { MainTemplateSectionSet } from '../../UseContext/UserSetSections'
import WorkComponent from './WorkComponent'
import EditLink from '../../components/EditLink'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledWork = styled(Box)(
    () => ({})
)


const Work = ({moveSectionUp , moveSectionDown}) => {

    const {WorkSection } = useContext(MainTemplateSectionSet)

    const sectionStyle = useMemo(() => {
        const styleObject = {};

        WorkData.section_css_props.forEach((cssProp) => {
        const { css_prop, css_prop_value } = cssProp;

        if (css_prop.is_section) {
            styleObject[css_prop.prop_name] = css_prop_value;
        }
        });

        return styleObject;
    }, []);



    return (
        WorkSection ? (
            <StyledWork key={WorkData.section_id} sx={sectionStyle}>
                
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


                {WorkData &&
                WorkData.section_components.map((component, i) => {
                return (
                    <WorkComponent key={i} component={component} />
                );
                })}

                <EditLink Data = {WorkData} ></EditLink>

        </StyledWork>

        ): null
       
    );
};

export default Work;