//React
import {
    useMemo, useState
} from 'react'
import propTypes from 'prop-types';

import {
    
} from 'react-redux'

//Components
import { getAppropriateTag } from '../StylesFunctions/GenerateElements';
import { AdminMainButton } from '../../../../../Components';
import * as utils from '../StylesFunctions/SetStylesFunctions.js';
import StyleBox from '../components/StyleBox.jsx';

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { Edit as EditIcon } from '@mui/icons-material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


//Styled Components
const StyledEditElement = styled(Box)(({ elementStyle }) => ({
    '&:hover > div': {
        opacity: 1,
        visibility: 'visible',
    },
    ...elementStyle,
}));

const TooltipContainer = styled(Box)({
    position: 'relative',
    opacity: 0,
    transition: 'opacity 1s ease',
    zIndex: 999,
});



const EditElement = ({ element, deleteElementForComponent, componentId , handleMoveElement , componentData }) => {
    const [elementStyle, setElementStyle] = useState({});
    const [elementData] = useState(element); // using for control the component data

    const [title, setTitle] = useState(elementData.element_content);

    useMemo(() => {
        const dictionary = {};
        if (elementData.section_css_props) {
            elementData.section_css_props.forEach((cssProp) => {
                const { css_prop, css_prop_value } = cssProp;
                if (css_prop.is_element) {
                    dictionary[css_prop.prop_name] = css_prop_value;
                }
            });
        }
        setElementStyle(dictionary);
    }, [elementData.section_css_props]);

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
        deleteElementForComponent(componentId, elementData.component_element_id);
    };


    const handleOrderElementClick = (event, direction, currentSequenceNumber) => {
        event.stopPropagation();
        const elementsCount = componentData.component_elements.length;
        let newIndex;
        if (direction === 'up') {
            newIndex = Math.max(currentSequenceNumber - 2, 0); // Yukarı hareket için yeni dizin hesaplama
        } else {
            newIndex = Math.min(currentSequenceNumber, elementsCount - 1); // Aşağı hareket için yeni dizin hesaplama
        }
        handleMoveElement(currentSequenceNumber - 1, newIndex);
    };


    return (

        <StyledEditElement
            elementStyle={{ ...elementStyle, backgroundColor: 'none', width: '100%', margin: '0 0px 20px 0', padding: '0', position: 'none' }}
        >   
                {                        
                getAppropriateTag(elementData.element, title, elementStyle)
                }
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
                            element_Type={elementData.element.element_type}
                            sectionStyle={elementStyle}
                            handleSectionStyleChange={handleSectionStyleChange}
                            handleDeleteLogoClick={handleDeleteLogoClick}
                            handleUploadImageClickWrapper={handleUploadImageClickWrapper}
                            styleProperties={['opacity', 'borderRadius', 'width', "fontSize", "fontWeight", 'height']}
                        />
                    }
                    sx={{
                        width: '40px',
                        height: '40px',
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
                        width: '40px',
                        height: '40px',
                        border: '1px solid red',
                        padding: '10px 15px',
                        fontWeight: 'bold',
                        color: 'white.main',
                        backgroundColor: 'warning.dark',
                        position: 'absolute',
                        right: '0'
                    }}
                />
                <AdminMainButton
                    title="Up"
                    type="custom"
                    appearance="iconButton"
                    putTooltip
                    icon={<KeyboardArrowUpIcon />}
                    onClick={(e) => handleOrderElementClick(e, 'up' ,elementData.sequenceNumber)}
                    sx={{
                        width: '20px',
                        height: '20px',
                        border: '1px solid red',
                        padding: '10px 15px',
                        fontWeight: 'bold',
                        color: 'white.main',
                        backgroundColor: 'warning.dark',
                        position: 'absolute',
                        right: '150px'
                    }}
                />
                <AdminMainButton
                    title="Down"
                    type="custom"
                    appearance="iconButton"
                    putTooltip
                    icon={<KeyboardArrowDownIcon />}
                    onClick={(e) => handleOrderElementClick(e, 'down' , elementData.sequenceNumber)}
                    sx={{
                        width: '20px',
                        height: '20px',
                        border: '1px solid red',
                        padding: '10px 15px',
                        fontWeight: 'bold',
                        color: 'white.main',
                        backgroundColor: 'warning.dark',
                        position: 'absolute',
                        right: '150px',
                        top: '20px',
                    }}
                />
            </TooltipContainer>
        </StyledEditElement>
        
    );
};

EditElement.propTypes = {
    element: propTypes.object,
    deleteElementForComponent: propTypes.func,
    handleMoveElement : propTypes.func,
    componentData : propTypes.object,
    componentId : propTypes.number
};

export default EditElement;







    
