//React
import { useEffect, useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components
import EditElement from './EditElement'
import { AdminMainButton } from '../../../../../Components'
import StyleBox from '../components/StyleBox.jsx';

//propTypes 
import propTypes from 'prop-types'
//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { Edit as EditIcon } from '@mui/icons-material';


//Styled Components
const StyledEditComponent = styled(Box)(() => ({
    '&  div': {
        border: 'none'
    },    '&:hover > div': {
        opacity: 1, // Show the TooltipContainers when StyledEditComponent is hovered
        visibility: 'visible',
    },
}));

const TooltipContainer = styled(Box)({
    position: 'absolute',
    top: '0',
    left: '0',
    opacity: 0, // Initially set opacity to 0
    visibility: 'hidden', // Initially hide the TooltipContainer
    transition: 'opacity 1s ease', // Apply transition effect to opacity
});



const EditComponent = ({component , handleAddNewElement , elements ,  componentId}) => {

    const [componentStyle, setComponentStyle] = useState({});  // using for control the component style 

    const [componentData, setComponentData] = useState(component); // using for control the component data

    const [AddElement , setAddElement] = elements   // using for add the elements to component when user is did 



    // add element to component 
    useEffect(() => {
        if (AddElement && componentId === component.section_component_id) {
            handleAddNewElement(setComponentData)
        }
    }, [AddElement, handleAddNewElement])


    useEffect(() => {
        setComponentData(component)
    }, [component])


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


    // to change the component style 
    const handleSectionStyleChange = (newStyle) => {
        setComponentStyle((prevStyle) => ({ ...prevStyle, ...newStyle }));
    };

    // to delete the element from component
    const deleteElementForComponent = (Component_id, element__id) => {
        setComponentData((prevData) => {
            if (prevData.section_component_id === Component_id) {
                const updatedElements = prevData.component_elements.filter(element => element.component_element_id !== element__id);
                return {
                ...prevData,
                component_elements: updatedElements,
                };
            } else {
                return prevData;
            }
            });
    };


    return (
        <StyledEditComponent sx={componentStyle}>
            {componentData.component_elements && componentData.component_elements.map((element, i) => (
                <Box key={`${component.section_component_id}-${element.component_element_id}-${i}`}>
                    <EditElement
                    element={element}
                    deleteElementForComponent={deleteElementForComponent}
                    componentId={component.section_component_id}
                    />
                </Box>
            ))}
            <TooltipContainer>
                <AdminMainButton
                    title="Edit"
                    type="StyleDialog"
                    appearance="iconButton"
                    putTooltip
                    icon={<EditIcon />}
                    willShow={
                        <StyleBox
                            Section_Name={"Style Component"}
                            element_Type='Component'
                            sectionStyle={componentStyle}
                            handleSectionStyleChange={handleSectionStyleChange}
                            styleProperties={['opacity', 'borderRadius', 'display', 'flexDirection', 'alignItems', 'width', 'height']}
                        />
                    }
                    sx={{
                        border: '1px solid red',
                        padding: '10px 15px',
                        fontWeight: 'bold',
                        color: 'white.main',
                        backgroundColor: '#304D30',
                        transition: 'background-color 0.3s',
                        '&:hover': {
                            backgroundColor: 'rgb(7, 15, 43)',
                        },
                    }}
                />
            </TooltipContainer>
        </StyledEditComponent>
    );
};

EditComponent.propTypes = {
    component: propTypes.object
}



export default EditComponent;

