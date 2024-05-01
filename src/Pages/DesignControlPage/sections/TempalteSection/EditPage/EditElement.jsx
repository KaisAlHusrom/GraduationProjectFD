//React
import { useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components
import { getAppropriateTag } from '../StylesFunctions/GenerateElements'
import { AdminMainButton } from '../../../../../Components'
import * as utils from '../StylesFunctions/SetStylesFunctions.js';
import StyleBox from '../components/StyleBox.jsx';


//propTypes 
import propTypes from 'prop-types'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { Edit as EditIcon } from '@mui/icons-material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

//Styled Components
const StyledEditElement = styled(Box)(() => ({
    '&:hover > div': {
        opacity: 1,
        visibility: 'visible',
    },
}));


const TooltipContainer = styled(Box)({
    position: 'relative',
    opacity: 0,
    transition: 'opacity 1s ease',
    zIndex: 999,
});

const EditElement = ({ element, deleteElementForComponent, componentId }) => {


    const [elementStyle, setElementStyle] = useState({}); // using for control the element style
    const [title, setTitle] = useState(element.element_content);  // using for control the title and make user is change 



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

    // to change the element style 
    const handleSectionStyleChange = (newStyle) => {
        setElementStyle((prevStyle) => ({ ...prevStyle, ...newStyle }));
    };
    //  to change the title 
    const handleTextFieldChange = (e) => {
        setTitle(e.target.value);
    };

    // if the element type is image 
    const handleImageChangeWrapper = (file) => {
        utils.handleImageChange(file, setTitle);
    };
    // if the element type is image 

    const handleUploadImageClickWrapper = () => {
        utils.handleUploadImageClick(handleImageChangeWrapper);
    };
        
    // if the element type is image 
    const handleDeleteLogoClick = () => {
        utils.handleDeleteLogoClick(setTitle);
    };
    // to delete the element 
    const handleDeleteElementClick = () => {
        deleteElementForComponent(componentId, element.component_element_id);
    };

    return (
        <StyledEditElement sx= {{
            ...elementStyle , 
            backgroundColor: 'none',
            width:'100%',
            margin:'0 0px 20px 0',
            padding:'0',
            position:'none',
            }}>
                {getAppropriateTag(element.element, title, elementStyle)}
                    
                <TooltipContainer>
                    <AdminMainButton
                        title="Edit"
                        type="StyleDialog"
                        appearance="iconButton"
                        putTooltip
                        icon={<EditIcon />}
                        willShow={
                            <StyleBox 
                                Section_Name={"Style Element"}
                                title={title}
                                handleTextFieldChange={handleTextFieldChange}
                                element_Type={element.element.element_type}
                                sectionStyle={elementStyle}
                                handleSectionStyleChange={handleSectionStyleChange}
                                handleDeleteLogoClick={handleDeleteLogoClick}
                                handleUploadImageClickWrapper={handleUploadImageClickWrapper}
                                styleProperties={['opacity', 'borderRadius', 'width', "fontSize", "fontWeight", 'height']}
                            />
                        }
                        sx={{
                            width:'40px',
                            height:'40px',
                            border: '1px solid red',
                            padding: '10px 15px',
                            fontWeight: 'bold',
                            color: 'white.main',
                            backgroundColor: '#304D30',
                            position: 'absolute',
                            left: 0,
                            transition: 'background-color 0.3s',
                            '&:hover': {
                                backgroundColor: 'rgb(7, 15, 43)',
                            },
                        }}
                    />
                    <AdminMainButton
                        title="Delete"
                        type="custom"
                        appearance="iconButton"
                        putTooltip
                        icon={<DeleteSweepIcon />}
                        onClick={handleDeleteElementClick}

                        sx={{
                            width:'40px',
                            height:'40px',
                            border: '1px solid red',
                            padding: '10px 15px',
                            fontWeight: 'bold',
                            color: 'white.main',
                            backgroundColor: 'warning.dark',
                            position: 'absolute',
                            right:'0'
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