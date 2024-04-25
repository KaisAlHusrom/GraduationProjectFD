//React
import { useContext, useMemo } from 'react'

import {
    
} from 'react-redux'

//Components
import MessageData from './SendMessageData.json'

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { MainTemplateSectionSet } from '../../UseContext/UserSetSections'
import UpDownButtons from '../../components/UpDownButtons'
import EditLink from '../../components/EditLink'
import SendMessageComponent from './SendMessageComponent'
import  '../Style.css'

//Styled Components
const StyledSendMessage = styled(Box)(
    ({ theme }) => ({
    
    })
)


const SendMessage = ({moveSectionUp , moveSectionDown}) => {


    const {MessageSection } = useContext(MainTemplateSectionSet)

    
    const sectionStyle = useMemo(() => {
        const styleObject = {};

        MessageData.section_css_props.forEach((cssProp) => {
        const { css_prop, css_prop_value } = cssProp;

        if (css_prop.is_section) {
            styleObject[css_prop.prop_name] = css_prop_value;
        }
        });

        return styleObject;
    }, []);



    return (
        MessageSection ? (
            <StyledSendMessage sx= {sectionStyle}  key={MessageData.section_id}>
    
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
                    
            {MessageData &&
                    MessageData.section_components.map((component, i) => {
        return (
            <SendMessageComponent key={i} component={component} />
        );
        })}


            <EditLink Data = {MessageData} ></EditLink>

        </StyledSendMessage>
        ) : null
    );
};

export default SendMessage;