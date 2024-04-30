//React
import {
    
} from 'react-redux'

//Components
import { AdminMainButton } from '../../../../../Components'

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccordionComponent from './AccordionComponent'
import { ButtonElementDesign, HeadingDesign, ImageDesign, SubTitlesDesign} from '../EditPage/Data/ConstDataDesign'

//Styled Components
const StyledAddElementModal = styled(Box)(
    () => ({
    borderRadius: '10px',
    boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;",
    padding: (theme) => theme.spacing(4),
    })
)
const ButtonStyle = {
    margin: "10px",
    display: 'block',
    width: '250px',
    padding: '10px',
    transition: 'all 0.5s ease',
    borderRadius: '10px',
    fontWeight: 'bold',
    color: "#eee",
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: "white.dark",
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
    },
    boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",

}


const AddElementModal = ({componentSection_component_id , elements ,setAddElementToComponentId }) => {
    return (
        <StyledAddElementModal>
                <Box sx = {{display :'flex' , flexWrap :'wrap' , justifyContent :'center'}}>
                    <AdminMainButton
                            title="Add Heading Text"
                            type="drawer"
                            appearance="primary"
                            putTooltip
                            drawerWidth='500px'

                            willShow={
                                <AccordionComponent elements = {elements} items={HeadingDesign} setAddElementToComponentId = {setAddElementToComponentId} 
                                componentSection_component_id = {componentSection_component_id}/>
                            }
                            icon={<AddBoxIcon />}
                            sx = {ButtonStyle}
                        />      
                        <AdminMainButton
                        title="Add Subtitles"
                        type="drawer"
                        appearance="primary"
                        putTooltip
                        drawerWidth='500px'
                        willShow={
                            <AccordionComponent elements = {elements} items={SubTitlesDesign} setAddElementToComponentId = {setAddElementToComponentId} 
                            componentSection_component_id = {componentSection_component_id}/>
                        }
                        icon={<AddBoxIcon />}
                        sx = {ButtonStyle}
                    />      
                    <AdminMainButton
                        title="Add Image"
                        type="drawer"
                        appearance="primary"
                        putTooltip
                        drawerWidth='500px'
                        willShow={
                            <AccordionComponent elements = {elements} items={ImageDesign} setAddElementToComponentId = {setAddElementToComponentId} 
                            componentSection_component_id = {componentSection_component_id}/>
                        }
                        icon={<AddBoxIcon />}
                        sx = {ButtonStyle}
                    />      
                    <AdminMainButton
                        title="Add Buttons"
                        type="drawer"
                        appearance="primary"
                        putTooltip
                        drawerWidth='500px'
                        willShow={
                            <AccordionComponent elements = {elements} items={ButtonElementDesign} setAddElementToComponentId = {setAddElementToComponentId} 
                            componentSection_component_id = {componentSection_component_id}/>
                        }
                        icon={<AddBoxIcon />}
                        sx = {ButtonStyle}
                    />      
                    
                        </Box>
        </StyledAddElementModal>
    );
};

export default AddElementModal;