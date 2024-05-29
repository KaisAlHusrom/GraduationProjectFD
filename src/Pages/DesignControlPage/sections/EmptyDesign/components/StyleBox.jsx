import  React, { useState } from 'react';
import { Box, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { AdminMainButton } from '../../../../../Components';

import CustomSelectInput from '../../../../../Components/CustomSelectInput/CustomSelectInput';
import CustomTextField from '../../../../../Components/CustomTextField/CustomTextField';

import ColorButtons from './ColorButtons';
import * as utils from '../StylesFunctions/SetStylesFunctions.js';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AnimationIcon from '@mui/icons-material/Animation';
import AnimationsDrawer from '../EditPage/Drawers/AnimationsDrawer.jsx';
import MarginDrawer from '../EditPage/Drawers/MarginDrawer.jsx';
import MarginIcon from '@mui/icons-material/Margin';
import BorderDrawer from '../EditPage/Drawers/BorderDrawer.jsx';
import StylesCategory from '../EditPage/Drawers/DrawersNew/StylesCategory.jsx';

const StyledStyleBox = styled(Box)({
    borderRadius: '10px',
    boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;",
    padding: (theme) => theme.spacing(4),
});



    const CategoryButtonStyle = {
        marginTop: '20px',
        marginBottom: '20px',
        width: '300px',
        display: 'flex',
        flexWrap:'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#eee',
        backgroundColor: '#092635',

        fontWeight:'bold',
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    }

const StyleBox = ({
    Section_Name,
    element_Type,
    sectionStyle,
    handleSectionStyleChange,
    styleCategories,
    handleUploadImageClickWrapper,
    handleDeleteLogoClick,
    title,
    handleTextFieldChange,
    
}) => {



    return (
        <StyledStyleBox>
            <Typography component="div" variant='h3' sx={{ textAlign: 'center', padding: '10px', color: 'white.dark', fontWeight: 'bold', borderBottom: '1px solid #eee' }}>
                {Section_Name}
            </Typography>

            {element_Type !== 'image' && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', width: '100%' }}>

                    <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center', }}>

                        { 
                        styleCategories.map((category , key) => (
                            <Box key = {key} 
                            >
                                <AdminMainButton 
                                sx={CategoryButtonStyle} 
                                title={category.category_name} 
                                type='drawer' 
                                drawerZIndex = {1300}
                                drawerWidth="350px"
                                putDrawerCloseButton 
                                appearance='primary'
                                icon={<BorderColorIcon />}
                                willShow={<StylesCategory  handleSectionStyleChange = {handleSectionStyleChange} category = {{category}}/>} />
                            </Box>
                        ))}


                    </Box>
                    {handleTextFieldChange && <CustomTextField label="Title" variant="filled" value={title} onChange={handleTextFieldChange} focused />}
                </Box>
            )}

            {/* {element_Type === 'image' && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }}>
                    <AdminMainButton sx={{
                                    marginTop: '20px',
                                    marginBottom: '20px',
                                    width: '420px',
                                    display: 'flex',
                                    flexWrap:'wrap',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#eee',
                                    backgroundColor: '#092635',
                                    fontWeight:'bold',
                                    boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                                }} title='Upload Image ' type='custom' appearance='primary' icon={<AddCircleOutlineIcon />} onClick={handleUploadImageClickWrapper} />
                    <AdminMainButton sx={{
                                    marginTop: '20px',
                                    marginBottom: '20px',
                                    width: '420px',
                                    display: 'flex',
                                    flexWrap:'wrap',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#eee',
                                    backgroundColor: '#092635',
                                    fontWeight:'bold',
                                    boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                                }} title='Delete Image ' type='custom' appearance='primary' onClick={handleDeleteLogoClick} icon={<DeleteIcon />} />
                    {styleProperties.map((key, index) => (
                        <CustomSelectInput 
                        sx = {ButtonStyle}
                        key={index} name={key} className={customSelectStyle} onChange={(e) => handleSectionStyleChange({ [key]: e.target.value })} valueSet={sectionStyle[key]}>
                            {utils[key]?.map((item, index) => (
                                <MenuItem key={index} value={item}>{item}</MenuItem>
                            ))}
                        </CustomSelectInput>
                    ))}
                    <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center', }}>
                        <AdminMainButton sx={{
                                    marginTop: '20px',
                                    marginBottom: '20px',
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
                                drawerWidth = "350px"
                                drawerZIndex = "10000"
                                title="Borders" type='drawer' putDrawerCloseButton appearance='primary' icon={<BorderColorIcon />} willShow={<BorderDrawer handleSectionStyleChange={handleSectionStyleChange} />} />
                        <AdminMainButton sx={{
                                    marginTop: '20px',
                                    marginBottom: '20px',
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
                                drawerWidth = "350px"
                                drawerZIndex = "10000"

                                title="Margins" type='drawer' drawerAnchor="right" putDrawerCloseButton appearance='primary' icon={<MarginIcon />} willShow={<MarginDrawer handleSectionStyleChange={handleSectionStyleChange} />} />
                        <AdminMainButton sx={{
                                    marginTop: '20px',
                                    marginBottom: '20px',
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
                                drawerWidth = "350px" 
                                drawerZIndex = "10000"
                                title="Animations" type='drawer' drawerAnchor="right" putDrawerCloseButton appearance='primary' icon={<AnimationIcon />} willShow={<AnimationsDrawer />} />
                    </Box>
                </Box>
            )} */}
        </StyledStyleBox>
    );
};

export default StyleBox;
