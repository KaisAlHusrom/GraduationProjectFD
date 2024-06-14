import { useCallback, useEffect, useMemo, useState } from 'react';

// Components
import EditElement from './EditElement';

// propTypes
import propTypes from 'prop-types';

// MUI
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { Edit as EditIcon } from '@mui/icons-material';


import { addStyleAbdullah } from '../../../../../Helpers/RecursiveHelpers/styles.js';
import { AdminMainButton } from '../../../../../Components/index.jsx';
import StyleBox from '../../../components/StyleBox.jsx';



// Styled Components
const StyledEditComponent = styled(Box)(() => ({
    '& div': {
        border: 'none'
    },
    '&:hover > div': {
        opacity: 1, // Show the TooltipContainers when StyledEditComponent is hovered
        visibility: 'visible',
    },
    position: 'relative'
}));

const TooltipContainer = styled(Box)({
    opacity: 0, // Initially set opacity to 0
    visibility: 'hidden', // Initially hide the TooltipContainer
    transition: 'opacity 1s ease', // Apply transition effect to opacity
    position: 'absolute',
    top: '0',
    left: '0'
});

const EditButtonsStyle = {
    border: '1px solid red',
    padding: '10px 15px',
    fontWeight: 'bold',
    color: 'white.main',
    backgroundColor: '#021402',
    transition: 'background-color 0.3s',
    position: 'absolute',
    '&:hover': {
        backgroundColor: 'rgb(7, 15, 43)',
    },
};

const EditComponent = ({ component, handleAddNewElement, elements, componentId, sectionDataState, styleCategories }) => {
    const [componentStyle, setComponentStyle] = useState({}); // using for control the component style 
    const [componentData, setComponentData] = useState(component); // using for control the component data
    const [AddElement] = elements; // using for add the elements to component when user is did 
    const [history, setHistory] = useState([]); // Store user actions
    const [sectionData, setSectionData] = sectionDataState; // using for Control  section data 

    // Add element to component 
    useEffect(() => {
        if (AddElement && componentId === component.id) {
            handleAddNewElement(componentId);
            setHistory(prevHistory => [...prevHistory, JSON.parse(JSON.stringify(sectionData))]);
        }
    }, [AddElement, component.id, componentId, handleAddNewElement, sectionData]);

    useEffect(() => {
        setComponentData(component);
    }, [component]);

    useMemo(() => {
        const dictionary = {};
        if (component.styles) {
            component.styles.forEach((cssProp) => {
                const { style_prop, style_prop_value } = cssProp;
                if (style_prop?.is_component) {
                    dictionary[style_prop.style_prop_css_name] = style_prop_value;
                }
            });
        }
        setComponentStyle(dictionary);
    }, [component.styles]);





    // Change the section style
    const handleSectionStyleChange = useCallback((cssValue, prop) => {
        setComponentData((prevData) => {
            const updatedSectionData = { ...prevData }; // Update with a copy
            const changed = addStyleAbdullah(updatedSectionData, [prevData.id], prop, cssValue, null, null);
            if (changed) {
                // Update componentStyle on style change
                const dictionary = {};
                if (updatedSectionData.styles) {
                    updatedSectionData.styles.forEach((cssProp) => {
                        const { style_prop, style_prop_value } = cssProp;
                        if (style_prop?.is_component) {
                            dictionary[style_prop.style_prop_css_name] = style_prop_value;
                        }
                    });
                }
                setComponentStyle(dictionary);
            }
            return updatedSectionData;
        });
        setHistory(prevHistory => [...prevHistory, JSON.parse(JSON.stringify(sectionData))]);
    }, [sectionData]);

    const deleteElementForComponent = (Component_id, element__id) => {
        setSectionData(prevData => ({
            ...prevData,
            children: prevData.children.map(component => {
                if (component.id === Component_id) {
                    return {
                        ...component,
                        children: component.children.filter(child => child.id !== element__id)
                    };
                }
                return component;
            })
        }));
        setHistory(prevHistory => [...prevHistory, JSON.parse(JSON.stringify(sectionData))]);
    };



    const handleMoveElement = (oldIndex, newIndex, parent_id) => {
        setComponentData((prevData) => {
            if (prevData.id === parent_id) {
                const updatedElements = component.children.map((element, index) => {
                    if (element.sequence_number === oldIndex) {
                        element.sequence_number = newIndex;
                    } else if (element.sequence_number === newIndex) {
                        element.sequence_number = oldIndex;
                    }
                });
                return {
                    ...component,
                    children: updatedElements,
                };
            }
        });
    };
    


    
    // Undo last operation for the section
    const undo = () => {
        if (history.length > 0) {
            const previousState = history[history.length - 1]; // Get the previous state
            setSectionData(previousState); // Restore previous state of sectionData
            setHistory(prevHistory => prevHistory.slice(0, -1));
        }
    };  




    return (
        <StyledEditComponent sx={{ ...componentStyle, position: 'relative' }}>
        {sectionData.children
            .filter(child => child.id === component.id)[0]?.children
            .sort((a, b) => a.sequence_number - b.sequence_number)
            .map((element, i) => (
                <Box key={`${component.id}-${element.id}-${i}`} sx={{ padding: '0px' }}>
                    <EditElement
                        element={element}
                        deleteElementForComponent={deleteElementForComponent}
                        componentId={component.id}
                        handleMoveElement={handleMoveElement}
                        componentDataState={[component, setComponentData]}
                        styleCategories={styleCategories}
                        sectionDataState={sectionDataState}
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
                        name_of_design={"Style Component"}
                        type_of_design='Component'
                        sectionStyle={componentStyle}
                        handleSectionStyleChange={handleSectionStyleChange}
                        styleCategories={styleCategories}
                    />
                }
                sx={EditButtonsStyle}
            />
        </TooltipContainer>
{/* 
        {history.length > 0 && (
            <AdminMainButton
                title="Undo"
                type="custom"
                appearance="iconButton"
                putTooltip
                icon={<UndoIcon />}
                onClick={undo}
                sx={EditButtonsStyle}
            />
        )} */}
    </StyledEditComponent>
    );
};

EditComponent.propTypes = {
    component: propTypes.object,
    handleAddNewElement: propTypes.func,
    componentId: propTypes.string,
    elements: propTypes.array,
    sectionDataState: propTypes.array,
    styleCategories: propTypes.array,
};

export default EditComponent;
