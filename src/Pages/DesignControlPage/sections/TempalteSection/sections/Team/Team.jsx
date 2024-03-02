//React
import {  useContext, useMemo } from 'react'

import {
    
} from 'react-redux'

//Components
import TeamData from "./TeamData.json"
import TeamComponent from './TeamComponent'
import { MainTemplateSectionSet } from '../../UseContext/UserSetSections'

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import UpDownButtons from '../../components/UpDownButtons';
import EditLink from '../../components/EditLink';


//Styled Components
const StyledTeam = styled(Box)(() => ({}))





const Team = ({ moveSectionUp , moveSectionDown }) => {

    const {TeamSection } = useContext(MainTemplateSectionSet)

    const sectionStyle = useMemo(() => {
        const styleObject = {};

        TeamData.section_css_props.forEach((cssProp) => {
        const { css_prop, css_prop_value } = cssProp;

        if (css_prop.is_section) {
            styleObject[css_prop.prop_name] = css_prop_value;
        }
        });

        return styleObject;
    }, []);

    
    return (
        TeamSection ? (

        <StyledTeam key={TeamData.section_id} sx={sectionStyle}>
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


            {TeamData &&
                TeamData.section_components.map((component, i) => {
                return (
                    <TeamComponent key={i} component={component} />
                );
                })}

                <EditLink Data = {TeamData} ></EditLink>
            
            </StyledTeam>
                ) : (
                    null
                )
    );
};

export default Team;


