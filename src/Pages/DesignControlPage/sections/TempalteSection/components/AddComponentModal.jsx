//React
import {
    
} from 'react-redux'

//Components

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { BoxDesignOne, emptyDesign , ButtonDesign } from '../EditPage/Data/ConstDataDesign';
import { AdminMainButton } from '../../../../../Components';
import Drawer from '../EditPage/Drawers/ReadyDesign/Drawer';
import AddCardIcon from '@mui/icons-material/AddCard';
import GamepadIcon from '@mui/icons-material/Gamepad';

//Styled Components
const StyledAddElementModal = styled(Box)(
    () => ({
    borderRadius: '10px',
    boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;",
    padding: (theme) => theme.spacing(4),
    })
)


const AddComponentModal = ({ createNewComponent , createDesignedComponent }) => {


    return (
        <StyledAddElementModal>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexWrap: 'wrap',
                }}>
                    <AdminMainButton 
                        title="Cards"
                        type="drawer"
                        appearance="primary"
                        putTooltip
                        icon={<AddCardIcon />}
                        willShow={
                            <Drawer BoxDesignOne = {BoxDesignOne}  emptyDesign = {emptyDesign} createNewComponent = {createNewComponent} createDesignedComponent = {createDesignedComponent} ></Drawer>
                        }
                        sx={{
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
                        }}>
                    </AdminMainButton>

                    <AdminMainButton 
                        title="Buttons"
                        type="drawer"
                        appearance="primary"
                        putTooltip
                        icon={<GamepadIcon />}
                        willShow={
                            <Drawer BoxDesignOne = {ButtonDesign}  emptyDesign = {emptyDesign} createNewComponent = {createNewComponent} createDesignedComponent = {createDesignedComponent} ></Drawer>
                        }
                        sx={{
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
                        }}>

                    </AdminMainButton>
                    
                    <AdminMainButton 
                        title="Buttons"
                        type="drawer"
                        appearance="primary"
                        putTooltip
                        icon={<GamepadIcon />}
                        willShow={
                            <Drawer BoxDesignOne = {BoxDesignOne}  emptyDesign = {emptyDesign} createNewComponent = {createNewComponent} createDesignedComponent = {createDesignedComponent} ></Drawer>
                        }
                        sx={{
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
                        }}>

                    </AdminMainButton>
                                        
                    <AdminMainButton 
                        title="Buttons"
                        type="drawer"
                        appearance="primary"
                        putTooltip
                        icon={<GamepadIcon />}
                        willShow={
                            <Drawer BoxDesignOne = {BoxDesignOne}  emptyDesign = {emptyDesign} createNewComponent = {createNewComponent} createDesignedComponent = {createDesignedComponent} ></Drawer>
                        }
                        sx={{
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
                        }}>

                    </AdminMainButton>

                                        
                    <AdminMainButton 
                        title="Buttons"
                        type="drawer"
                        appearance="primary"
                        putTooltip
                        icon={<GamepadIcon />}
                        willShow={
                            <Drawer BoxDesignOne = {BoxDesignOne}  emptyDesign = {emptyDesign} createNewComponent = {createNewComponent} createDesignedComponent = {createDesignedComponent} ></Drawer>
                        }
                        sx={{
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
                        }}>

                    </AdminMainButton>

                                        
                    <AdminMainButton 
                        title="Buttons"
                        type="drawer"
                        appearance="primary"
                        putTooltip
                        icon={<GamepadIcon />}
                        willShow={
                            <Drawer BoxDesignOne = {BoxDesignOne}  emptyDesign = {emptyDesign} createNewComponent = {createNewComponent} createDesignedComponent = {createDesignedComponent} ></Drawer>
                        }
                        sx={{
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
                        }}>

                    </AdminMainButton>
                </Box>
        </StyledAddElementModal>


    );
};

export default AddComponentModal;




