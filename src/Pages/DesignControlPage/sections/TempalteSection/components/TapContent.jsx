// React
import { useState, useMemo } from 'react';
import PropTypes from 'prop-types'; 

// Components
import CustomAlert from '../../../../../Components/CustomAlert/CustomAlert';
import { AdminMainButton } from '../../../../../Components';
import CustomTextField from '../../../../../Components/CustomTextField/CustomTextField';
import CustomSelectInput from '../../../../../Components/CustomSelectInput/CustomSelectInput';
import ColorButtons from './ColorButtons.jsx';
import * as utils from '../StylesFunctions/SetStylesFunctions.js';

// MUI
import { Box, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

// Styled Components
const StyledTapContent = styled(Box)(() => ({}));

const customSelectStyle = {
    display: 'block',
    width: '300px',
    padding: '5px',
    borderColor: 'red',
    transition: '0.3s all',
    borderRadius: '10px',
    cursor: 'pointer',
    // Add any additional styles or hover effects here
    '&:hover': {
        backgroundColor: "white.dark",
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
    },
};

const TapContent = ({ 
    content,
    element,
    elementStyles,
    onStyleChange,
}) => {
    const { opacity, fontSize, fontWeight, color, backgroundColor, borderRadius } = elementStyles;
    const [open, setOpen] = useState(true);
    const [title, setTitle] = content;
    const [temporaryText, setTemporaryText] = useState(title);

    const handleTextFieldChange = (e) => {
        setTemporaryText(e.target.value);
    };

    const handleSaveChanges = () => {
        setTitle(temporaryText);
    };

    const handleOpacityChange = (e) => {
        const newOpacity = parseFloat(e.target.value);
        onStyleChange({ ...elementStyles, opacity: newOpacity });
    };

    const handleFontSizeChange = (e) => {
        const newFontSize = parseFloat(e.target.value);
        onStyleChange({ ...elementStyles, fontSize: newFontSize });
    };

    const handleFontWeightChange = (e) => {
        const newFontWeight = parseFloat(e.target.value);
        onStyleChange({ ...elementStyles, fontWeight: newFontWeight });
    };

    const handleColorChange = (newColor) => {
        onStyleChange({ ...elementStyles, color: newColor });
    };

    const handleBackGroundColorChange = (newColor) => {
        onStyleChange({ ...elementStyles, backgroundColor: newColor });
    };

    const handleBorderRadiusChange = (e) => {
        const newBorderRadius = parseFloat(e.target.value);
        onStyleChange({ ...elementStyles, borderRadius: newBorderRadius });
    };

    const handleImageChangeWrapper = (file) => {
        utils.handleImageChange(file, setTitle);
    };

    const handleUploadImageClickWrapper = () => {
        utils.handleUploadImageClick(handleImageChangeWrapper);
    };
    
    const handleDeleteLogoClick = () => {
        utils.handleDeleteLogoClick(setTitle);
    };
    const generateRandomColor = () => {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        onStyleChange({ ...elementStyles, color: randomColor });
    };
    const generateRandomBackColor = () => {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        onStyleChange({ ...elementStyles, backgroundColor: randomColor });
    };

    return (
        <StyledTapContent >

            {(element.element.element_type === 'Head3' || element.element.element_type === 'link' || element.element.element_type === 'text') && (
                <>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>

                    <CustomTextField label="Title" variant="filled" value={temporaryText} onChange={handleTextFieldChange} focused />

                    <CustomSelectInput
                        name='opacity'
                        className={customSelectStyle}
                        onChange={handleOpacityChange}
                        valueSet={opacity}
                    >
                        {utils.opacity.map((item, index) => (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </CustomSelectInput>

                    <CustomSelectInput
                        name='Font Size'
                        className={customSelectStyle}
                        onChange={handleFontSizeChange}
                        valueSet={parseInt(fontSize)}
                    >
                        {utils.FontSize.map((item, index) => (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </CustomSelectInput>

                    <CustomSelectInput
                        name='Font Weight'
                        className={customSelectStyle}
                        onChange={handleFontWeightChange}
                        valueSet={fontWeight}
                    >
                        {utils.FontWight.map((item, index) => (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </CustomSelectInput>


                    <CustomSelectInput
                        name='Border Radius'
                        className={customSelectStyle}
                        onChange={handleBorderRadiusChange}
                        valueSet={parseInt(borderRadius)}
                    >
                        {utils.Radius.map((item, index) => (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </CustomSelectInput>


                    </Box>  

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>



                    <ColorButtons
                        drawerAnchor="right"
                        ButtonName="Change Color"
                        currentColor={color}
                        handleColorSelect={handleColorChange}
                        generateRandomColor={generateRandomColor}
                    />
                        <ColorButtons
                        drawerAnchor="right"
                        ButtonName="Change Back Color"
                        currentColor={backgroundColor}
                        handleColorSelect={handleBackGroundColorChange}
                        generateRandomColor={generateRandomBackColor}
                        />

                    </Box>

                    <Box sx={{ width: '100%', marginTop: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <AdminMainButton
                            title="Save Changes"
                            type="custom"
                            appearance="primary"
                            icon={<DoneAllIcon />}
                            onClick={handleSaveChanges}
                            sx={{
                                marginTop: '10px',
                                width: '30%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: 'white.main',
                                backgroundColor: 'info.dark',
                            }}
                        />
                        <CustomAlert AlertOpenState={[open, setOpen]} title="Don't Forget click on the save button" />
                    </Box>
                </>
            )}

            {
            element.element.element_type === 'image' && 
            (
                <Box>
                    
                    <AdminMainButton
                            title='Upload Image '
                                type='custom'
                                appearance='primary'
                                icon={<AddCircleOutlineIcon />}
                                onClick={handleUploadImageClickWrapper}
                            sx={{
                            marginTop: '10px',
                            width: '30%',
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
                            width: '30%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white.main',
                            backgroundColor: 'warning.dark',
                            }}

                            
                            />
                            
                </Box>
            )
            }
        </StyledTapContent>
    );
};

    
TapContent.propTypes = {
    element: PropTypes.object.isRequired, // Define PropTypes
};

export default TapContent;