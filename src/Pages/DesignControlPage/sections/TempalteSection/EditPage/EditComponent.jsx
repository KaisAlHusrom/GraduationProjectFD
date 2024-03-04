//React
import { useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components
import EditElement from './EditElement'
import { AdminMainButton } from '../../../../../Components'
import ColorButtons from '../components/ColorButtons';
import CustomSelectInput from '../../../../../Components/CustomSelectInput/CustomSelectInput';
import * as utils from '../StylesFunctions/SetStylesFunctions.js';

//propTypes 
import propTypes from 'prop-types'
//MUI
import {
    Box, MenuItem, Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import DeleteIcon from '@mui/icons-material/Delete';

import { Edit as EditIcon } from '@mui/icons-material';

//Styled Components
const StyledEditComponent = styled(Box)(() => ({}))

const TooltipContainer = styled(Box)({
    position: 'absolute',
    top: '0',
    left: '0',
});

const TooltipContainerDelete = styled(Box)({
    position: 'absolute',
    top: '0',
    right: '0',
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

const EditComponent = ({component}) => {

    const [componentStyle, setComponentStyle] = useState({});

    useMemo(() => {
        const dictionary = {};
        if (component.section_css_props) {
            component.section_css_props.forEach((cssProp) => {
                const { css_prop, css_prop_value } = cssProp;
                if (css_prop.is_component) {
                    dictionary[css_prop.prop_name] = css_prop_value;
                }
            });
        }
        setComponentStyle(dictionary);
    }, [component.section_css_props]);


    const handleSectionStyleChange = (newStyle) => {
        setComponentStyle((prevStyle) => ({ ...prevStyle, ...newStyle }));
    };





    return (
        <StyledEditComponent sx={componentStyle}>
            {
                component && component.component_elements.map((element, i) => {
                    return (
                        <EditElement key={i} element={element} />

                        
                    )
                })
            }
            <TooltipContainer>
                <AdminMainButton
                    title="Edit"
                    type="modal"
                    appearance="iconButton"
                    putTooltip
                    icon={<EditIcon />}
                    willShow={
                        <>

                        <Typography component="div" variant='h3' sx={{ textAlign: 'center', padding: '10px', color: 'warning.dark' }}>
                            Style of Component
                        </Typography>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx = {{width:'70%'}}>
                            <ColorButtons
                                drawerAnchor="right"
                                ButtonName="Change Back Color"
                                currentColor={componentStyle.backgroundColor}
                                handleColorSelect={(newColor) => handleSectionStyleChange({ backgroundColor: newColor })}
                                generateRandomColor={() => handleSectionStyleChange({ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` })}
                            />
                            </Box>

                            {['opacity', 'borderRadius', 'display', 'flexDirection', 'alignItems', 'width' , 'height'].map((key, index) => (
                                <CustomSelectInput
                                    key={index}
                                    name={key}
                                    className={customSelectStyle}
                                    onChange={(e) => handleSectionStyleChange({ [key]: e.target.value })}
                                    valueSet={componentStyle[key]}
                                >
                                    {utils[key]?.map((item, index) => (
                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                    ))}
                                </CustomSelectInput>
                            ))}
                        </Box>
                        </>
                    }
                    sx={{
                        border: '1px solid red',
                        padding: '10px 15px',
                        fontWeight: 'bold',
                        color: 'white.main',
                        backgroundColor: 'primary.dark',
                    }}
                />
            </TooltipContainer>

            <TooltipContainerDelete>
                <AdminMainButton
                    title="Delete"
                    type="custom"
                    appearance="iconButton"
                    putTooltip
                    icon={<DeleteIcon />}
                    sx={{
                        border: '1px solid red',
                        padding: '10px 15px',
                        fontWeight: 'bold',
                        color: 'white.main',
                        backgroundColor: 'warning.dark',
                    }}
                />
            </TooltipContainerDelete>
            
        </StyledEditComponent>
    );
};

EditComponent.propTypes = {
    component: propTypes.object
}



export default EditComponent;