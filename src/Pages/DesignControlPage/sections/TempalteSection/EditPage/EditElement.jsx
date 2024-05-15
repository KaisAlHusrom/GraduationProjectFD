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



const buttonStyle = {
    width: '20px',
    height: '0px',
    border: '1px solid red',
    padding: '10px 15px',
    fontWeight: 'bold',
    color: 'white.main',
    backgroundColor: '#062c06',
    transition: 'background-color 0.3s',
    marginBottom : '2px',
    '&:hover': {
        backgroundColor: 'rgb(7, 15, 43)',
    },
};


const EditElement = ({ element, deleteElementForComponent, componentId , handleMoveElement , componentData }) => {
    const [elementStyle, setElementStyle] = useState({});
    const [elementData] = useState(element); // using for control the component data

    const [title, setTitle] = useState(elementData.element_content);

    useMemo(() => {
        const dictionary = {};
        if (elementData.styles) {
            elementData.styles.forEach((cssProp) => {
                const { style_prop, style_prop_value } = cssProp;
                if (style_prop.is_element) {
                    dictionary[style_prop.style_prop_css_name] = style_prop_value;
                }
            });
        }
        setElementStyle(dictionary);
    }, [elementData.styles]);

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
        deleteElementForComponent(componentId, elementData.id);
    };

    
    // to change the order of elements 
    const handleOrderElementClick = (event, direction, currentSequenceNumber) => {
        event.stopPropagation();
        const elementsCount = componentData.children.length;
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
                getAppropriateTag(elementData.element_type.element_type_name, title, elementStyle)
                }
            <TooltipContainer>
            <div style={{ position: 'absolute', height : '50px' , flexWrap : 'wrap', right: '-50px', top: '0', display: 'flex', flexDirection: 'column' }}>

                <AdminMainButton
                    title = ""
                    type="StyleDialog"
                    appearance="iconButton"
                    putTooltip
                    icon={<EditIcon />}
                    willShow={
                        <StyleBox
                            Section_Name={"Style Element"}
                            title={title}
                            handleTextFieldChange={handleTextFieldChange}
                            element_Type={elementData.element_type.element_type_name}
                            sectionStyle={elementStyle}
                            handleSectionStyleChange={handleSectionStyleChange}
                            handleDeleteLogoClick={handleDeleteLogoClick}
                            handleUploadImageClickWrapper={handleUploadImageClickWrapper}
                            styleProperties={['opacity', 'borderRadius', 'width', "fontSize", "fontWeight", 'height']}
                        />
                    }
                    sx={buttonStyle}
                />
                <AdminMainButton
                    title = ""
                    type="custom"
                    appearance="iconButton"
                    putTooltip
                    icon={<DeleteSweepIcon />}
                    onClick={handleDeleteElementClick}
                    sx={{
                        width: '20px',
                        height: '0px',
                        border: '1px solid red',
                        padding: '10px 15px',
                        fontWeight: 'bold',
                        color: 'white.main',
                        backgroundColor: 'warning.dark',
                        transition: 'background-color 0.3s',
                        marginBottom : '2px',
                        '&:hover': {
                            backgroundColor: 'rgb(7, 15, 43)',
                        },
                    }}
                />
            <AdminMainButton
                title = ""
                type="custom"
                appearance="iconButton"
                putTooltip
                icon={<KeyboardArrowUpIcon />}
                onClick={(e) => handleOrderElementClick(e, 'up' ,elementData.element_type.sequence_number)}
                sx={buttonStyle}
            />
            <AdminMainButton
                title = ""
                type="custom"
                appearance="iconButton"
                putTooltip
                icon={<KeyboardArrowDownIcon />}
                onClick={(e) => handleOrderElementClick(e, 'down' , elementData.element_type.sequence_number)}
                sx={buttonStyle}
            />
        </div>
            </TooltipContainer>
        </StyledEditElement>
        
    );
};

EditElement.propTypes = {
    element: propTypes.object,
    deleteElementForComponent: propTypes.func,
    handleMoveElement : propTypes.func,
    componentData : propTypes.object,
    componentId : propTypes.string
};

export default EditElement;







    
