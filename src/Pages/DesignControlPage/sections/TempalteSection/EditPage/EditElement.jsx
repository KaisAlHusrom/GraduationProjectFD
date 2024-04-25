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

    const handleDeleteElementClick = () => {
        deleteElementForComponent(componentId, element.component_element_id);
    };

    return (
        <StyledEditElement sx= {{
            ...elementStyle , 
            backgroundColor: 'none',
            width:'100%',
            margin:'0',
            padding:'0',
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
                            width:'20px',
                            height:'20px',
                            border: '1px solid red',
                            padding: '10px 15px',
                            fontWeight: 'bold',
                            color: 'white.main',
                            backgroundColor: 'primary.dark',
                            position: 'absolute',
                            left: 0,
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
                            width:'20px',
                            height:'20px',
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