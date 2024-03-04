//React
import { useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components
import { getAppropriateTag } from '../StylesFunctions/GenerateElements'
import { AdminMainButton } from '../../../../../Components'
import * as utils from '../StylesFunctions/SetStylesFunctions.js';
import { Edit as EditIcon } from '@mui/icons-material';
import ColorButtons from '../components/ColorButtons.jsx'
import CustomSelectInput from '../../../../../Components/CustomSelectInput/CustomSelectInput.jsx'
import CustomTextField from '../../../../../Components/CustomTextField/CustomTextField.jsx'


//propTypes 
import propTypes from 'prop-types'


//MUI
import {
    Box, MenuItem, Typography,
} from '@mui/material'
import { styled } from '@mui/system'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';


//Styled Components
const StyledEditElement = styled(Box)(() => ({}))


const TooltipContainer = styled(Box)({
});

const customSelectStyle = {
    display: 'block',
    width: '300px',
    padding: '5px',
    borderColor: 'red',
    transition: '0.3s all',
    borderRadius: '10px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: "white.dark",
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
    },
};



const EditElement = ({element}) => {


    const [elementStyle, setElementStyle] = useState({});
    const [title, setTitle] = useState(element.element_content);

    useMemo(() => {
        const dictionary = {};
        if (element.section_css_props) {
            element.section_css_props.forEach((cssProp) => {
                const { css_prop, css_prop_value } = cssProp;
                if (css_prop.is_element) {
                    dictionary[css_prop.prop_name] = css_prop_value;
                }
            });
        }
        setElementStyle(dictionary);
    }, [element.section_css_props]);


    const handleSectionStyleChange = (newStyle) => {
        setElementStyle((prevStyle) => ({ ...prevStyle, ...newStyle }));
    };

    const handleTextFieldChange = (e) => {
        setTitle(e.target.value);
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


    return (
        <StyledEditElement sx= {elementStyle}>

                {getAppropriateTag(element.element, title, elementStyle)}

            <TooltipContainer>
                <AdminMainButton
                    title={title}
                    type="modal"
                    appearance="iconButton"
                    putTooltip
                    icon={<EditIcon />}
                    willShow={
                        <>

                        <Typography component="div" variant='h3' sx={{ textAlign: 'center', padding: '10px', color: 'warning.dark' }}>
                            Style of element
                        </Typography>
                    
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            {element.element.element_type !== 'image' && (
                                <>
                                    <Box sx = {{width : '70%' , display:'flex' , marginBottom:'20px' , justifyContent:'space-evenly'}}>

                                    <ColorButtons
                                        drawerAnchor="right"
                                        ButtonName="Change Back Color"
                                        currentColor={elementStyle.backgroundColor}
                                        handleColorSelect={(newColor) => handleSectionStyleChange({ backgroundColor: newColor })}
                                        generateRandomColor={() => handleSectionStyleChange({ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` })}
                                    />

                                    <ColorButtons
                                        drawerAnchor="right"
                                        ButtonName="Change Color"
                                        currentColor={elementStyle.color}
                                        handleColorSelect={(newColor) => handleSectionStyleChange({ color: newColor })}
                                        generateRandomColor={() => handleSectionStyleChange({ color: `#${Math.floor(Math.random() * 16777215).toString(16)}` })}
                                    />

                                    </Box>
                    
                                    {['opacity', 'borderRadius', 'width', "fontSize", "fontWeight" , 'height' ].map((key, index) => (
                                        <CustomSelectInput
                                            key={index}
                                            name={key}
                                            className={customSelectStyle}
                                            onChange={(e) => handleSectionStyleChange({ [key]: e.target.value })}
                                            valueSet={elementStyle[key]}
                                        >
                                            {utils[key]?.map((item, index) => (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))}
                                        </CustomSelectInput>
                                    ))}
                    
                                    <CustomTextField label="Title" variant="filled" value={title} onChange={handleTextFieldChange} focused />
                                </>
                            )}

                        {element.element.element_type === 'image' && (
                                    <>
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
                            {[ 'borderRadius', 'width'].map((key, index) => (
                                        <CustomSelectInput
                                            key={index}
                                            name={key}
                                            className={customSelectStyle}
                                            onChange={(e) => handleSectionStyleChange({ [key]: e.target.value })}
                                            valueSet={elementStyle[key]}
                                        >
                                            {utils[key]?.map((item, index) => (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))}
                                        </CustomSelectInput>
                                    ))}
                    
                                    </>
                                )}
                        </Box>
                        </>
                    
                    }
                    sx={{
                        width:'20px',
                        height:'20px',
                        border: '1px solid red',
                        padding: '10px 15px',
                        fontWeight: 'bold',
                        color: 'white.main',
                        backgroundColor: 'primary.dark',
                    }}
                />
            </TooltipContainer>
            
        </StyledEditElement>
    );
};

EditElement.propTypes = {
    element: propTypes.object
}

export default EditElement;