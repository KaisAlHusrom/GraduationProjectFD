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

const StyledStyleBox = styled(Box)({
    borderRadius: '10px',
    boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;",
    padding: (theme) => theme.spacing(4),
});
const customSelectStyle = {
    '&:hover': {
        transition: 'all 0.3s ease',
        backgroundColor: "#09263529",
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
    },
};

const ButtonStyle = {
        margin: "10px",
        display: 'block',
        width: '250px',
        padding: '10px',
        transition: 'all 0.5s ease',
        borderRadius: '10px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: "white.dark",
            boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
        },
        boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",

}


const StyleBox = ({
    Section_Name,
    element_Type,
    sectionStyle,
    handleSectionStyleChange,
    styleProperties,
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
                    <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', }}>
                        <ColorButtons drawerAnchor="right" ButtonName="Change Back Color" currentColor={sectionStyle.backgroundColor} handleColorSelect={(newColor) => handleSectionStyleChange({ backgroundColor: newColor })} generateRandomColor={() => handleSectionStyleChange({ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` })} />
                        {handleTextFieldChange && <ColorButtons drawerAnchor="right" ButtonName="Change Color" currentColor={sectionStyle.color} handleColorSelect={(newColor) => handleSectionStyleChange({ color: newColor })} generateRandomColor={() => handleSectionStyleChange({ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` })} />}
                    </Box>

                    {styleProperties.map((key, index) => (
                            <React.Fragment key={index}>
                                <CustomSelectInput
                                    sx={ButtonStyle}
                                    name={key}
                                    className={customSelectStyle} 
                                    onChange={(e) => handleSectionStyleChange({ [key]: e.target.value })}
                                    valueSet={sectionStyle[key]}
                                    disabled={(key === 'flexDirection' || key === 'alignItems') && sectionStyle['display'] === 'block'}
                                >
                                    {utils[key]?.map((item, index) => (
                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                    ))}
                                </CustomSelectInput>
                            </React.Fragment>
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
                                }} title="Borders" type='drawer' putDrawerCloseButton appearance='primary' icon={<BorderColorIcon />} willShow={<BorderDrawer handleSectionStyleChange={handleSectionStyleChange} />} />
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
                                }} title="Margins" type='drawer' drawerAnchor="right" putDrawerCloseButton appearance='primary' icon={<MarginIcon />} willShow={<MarginDrawer handleSectionStyleChange={handleSectionStyleChange} />} />
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
                                }} title="Animations" type='drawer' drawerAnchor="right" putDrawerCloseButton appearance='primary' icon={<AnimationIcon />} willShow={<AnimationsDrawer />} />
                    </Box>
                    {handleTextFieldChange && <CustomTextField label="Title" variant="filled" value={title} onChange={handleTextFieldChange} focused />}
                </Box>
            )}

            {element_Type === 'image' && (
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
                                }} title="Borders" type='drawer' putDrawerCloseButton appearance='primary' icon={<BorderColorIcon />} willShow={<BorderDrawer handleSectionStyleChange={handleSectionStyleChange} />} />
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
                                }} title="Margins" type='drawer' drawerAnchor="right" putDrawerCloseButton appearance='primary' icon={<MarginIcon />} willShow={<MarginDrawer handleSectionStyleChange={handleSectionStyleChange} />} />
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
                                }} title="Animations" type='drawer' drawerAnchor="right" putDrawerCloseButton appearance='primary' icon={<AnimationIcon />} willShow={<AnimationsDrawer />} />
                    </Box>
                </Box>
            )}
        </StyledStyleBox>
    );
};

export default StyleBox;
