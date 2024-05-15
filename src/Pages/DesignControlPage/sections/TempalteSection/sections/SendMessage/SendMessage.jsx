//React
import { useContext, useMemo } from 'react'

import {
    
} from 'react-redux'

//Components
import MessageData from './SendMessageData.json'
import { MainTemplateSectionSet } from '../../UseContext/UserSetSections'
import UpDownButtons from '../../components/UpDownButtons'
import EditLink from '../../components/EditLink'
import SendMessageComponent from './SendMessageComponent'
//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
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

        MessageData.styles.forEach((cssProp) => {
        const { style_prop, style_prop_value } = cssProp;
        if (style_prop.is_section) {
            styleObject[style_prop.style_prop_css_name] = style_prop_value;
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
                    MessageData.children.map((component, i) => {
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