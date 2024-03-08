//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components
import CustomTextField from '../../../../../Components/CustomTextField/CustomTextField.jsx'
import { AdminMainButton } from '../../../../../Components/index.jsx'
import CustomSelectInput from '../../../../../Components/CustomSelectInput/CustomSelectInput'
import ColorButtons from './ColorButtons'
import * as utils from '../StylesFunctions/SetStylesFunctions.js';


//MUI
import {
    Box, MenuItem, Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AnimationIcon from '@mui/icons-material/Animation';
import BordersDrawer from './BordersDrawer.jsx'
import CustomAccordion from './Accordion.jsx'


//Styled Components
const StyledStyleBox = styled(Box)(
    ({ theme }) => ({
        borderRadius: '10px',
        boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;",
        padding : theme.spacing(4)
    })
)
const customSelectStyle = {
    '&:hover': {
        transition: 'all 0.3s ease',
        backgroundColor: "#09263529",
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
    },
};


const StyleBox = ({
    Section_Name,
    element_Type, 
    sectionStyle,
    handleSectionStyleChange,
    styleProperties,
    handleUploadImageClickWrapper,
    handleDeleteLogoClick,
    title , 
    handleTextFieldChange , 
}) => {


    const [selectedBorder, setSelectedBorder] = useState(null);
    return (
        <StyledStyleBox>
            <Typography component="div" variant='h3' sx={{ textAlign: 'center', padding: '10px', color: 'white.dark' , fontWeight:'bold' , 
                borderBottom: '1px solid #eee'}}>
                {Section_Name}
            </Typography>

            {element_Type !== 'image' && (
                <Box sx={{  display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', width: '100%' }}>

                <Box sx = {{width:'100%' ,  display: 'flex', flexWrap: 'wrap', justifyContent: 'center' ,alignItems: 'center',}}>
                    <ColorButtons
                            drawerAnchor="right"
                            ButtonName="Change Back Color"
                            currentColor={sectionStyle.backgroundColor}
                            handleColorSelect={(newColor) => handleSectionStyleChange({ backgroundColor: newColor })}
                            generateRandomColor={() => handleSectionStyleChange({ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` })}
                    />
                    {handleTextFieldChange ? (
                    <ColorButtons
                        drawerAnchor="right"
                        ButtonName="Change  Color"
                        currentColor={sectionStyle.color}
                        handleColorSelect={(newColor) => handleSectionStyleChange({ color: newColor })}
                        generateRandomColor={() => handleSectionStyleChange({ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` })}
                        />  
                    ) : null}

                    </Box>

                    {styleProperties.map((key, index) => (
                        <CustomSelectInput
                                key={index}
                                name={key}
                                className={customSelectStyle}
                                onChange={(e) => handleSectionStyleChange({ [key]: e.target.value })}
                                valueSet={sectionStyle[key]}
                            >
                                {utils[key]?.map((item, index) => (
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                ))}
                            </CustomSelectInput>
                        
                    ))}
                    <Box sx = {{width:'100%' ,  display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' ,alignItems: 'center',}}>

                    <AdminMainButton
                                title="Borders"
                                type='drawer'
                                putDrawerCloseButton
                                appearance='primary'
                                icon={<BorderColorIcon />}

                                willShow={
                                <>
                                    {/* Accordion */}
                                        <Box sx={{ marginTop: '20px' }}>
                                            <CustomAccordion selectedBorder={[selectedBorder, setSelectedBorder]}  handleSectionStyleChange = {handleSectionStyleChange}></CustomAccordion>
                                        </Box>
                                    {/* Accordion */}

                            </>
                                }
                                sx={{
                                marginTop: '10px',
                                width: '220px',
                                display: 'flex',
                                flexWrap:'wrap',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: '#eee',
                                backgroundColor: '#092635',
                                fontWeight:'bold',
                                boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        
                        }}
                        />
                    <AdminMainButton
                            title="Animations"
                                type='drawer'
                                putDrawerCloseButton
                                appearance='primary'
                                icon={<AnimationIcon />}
                                sx={{
                                marginTop: '10px',
                                width: '220px',
                                display: 'flex',
                                flexWrap:'wrap',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: '#eee',
                                backgroundColor: '#092635',
                                fontWeight:'bold',
                                boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        
                        }}
                        />
                            </Box>
                    {handleTextFieldChange ? (
                    <CustomTextField label="Title" variant="filled" value={title} onChange={handleTextFieldChange} focused />
                    ) : null}
                </Box>
                )}
    
            {element_Type === 'image' && (
                    <Box sx={{  display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    
                    <AdminMainButton
                        title='Upload Image '
                        type='custom'
                        appearance='primary'
                        icon={<AddCircleOutlineIcon />}
                        onClick={handleUploadImageClickWrapper}
                        sx={{
                        marginTop: '10px',
                        width: '40%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white.main',
                        backgroundColor: 'success.dark',
                        }}
                    />
                    <AdminMainButton
                        title='Delete Image '
                        type='custom'
                        appearance='primary'
                        onClick={handleDeleteLogoClick}
                        icon={<DeleteIcon />}
                        sx={{
                        marginTop: '10px',
                        width: '40%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white.main',
                        backgroundColor: 'warning.dark',
                        }}
                    />
            
                    {styleProperties.map((key, index) => (
                        <CustomSelectInput
                        key={index}
                        name={key}
                        className={customSelectStyle}
                        onChange={(e) => handleSectionStyleChange({ [key]: e.target.value })}
                        valueSet={sectionStyle[key]}
                        >
                        {utils[key]?.map((item, index) => (
                            <MenuItem key={index} value={item}>{item}</MenuItem>
                        ))}
                        </CustomSelectInput>
                    ))}

                    </Box>
                )}
        </StyledStyleBox>
        );
};

export default StyleBox;


