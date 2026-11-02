import {  useEffect, useState } from 'react';

// Components
import EditElement from './EditElement';
import { AdminMainButton,  } from '../../../../../Components/index.jsx';


// propTypes
import propTypes from 'prop-types';

// MUI
import { Box } from '@mui/material';

import UndoIcon from '@mui/icons-material/Undo';
import RecursiveEditComponent from './RecursiveEditComponent.jsx';
import { position } from 'stylis';

// Helpers

const EditButtonsStyle = {
    width: '30px',
    height: '30px',
    border: '1px solid red',
    fontWeight: 'bold',
    backgroundColor: 'success.dark',
    color : 'white.main',
    transition: 'background-color 0.3s',
    '&:hover': {
        backgroundColor: 'rgb(7, 15, 43)',
    },
    position : 'absolute',
    bottom : '-5px',
    marginLeft : '20px' 
};


const EditComponent = ({
    component,
    handleAddNewElement,
    elements,
    componentId,
    sectionDataState,
    styleCategories,
}) => {
    const [componentData, setComponentData] = useState(component);
    const [AddElement] = elements;
    const [history, setHistory] = useState([]);
    const [sectionData, setSectionData] = sectionDataState;


    useEffect(() => {
        if (AddElement && componentId === component.id) {
            handleAddNewElement(componentId);
            setHistory(prevHistory => [...prevHistory, JSON.parse(JSON.stringify(sectionData))]);
        }
    }, [AddElement, component.id, componentId, handleAddNewElement, sectionData]);
    
    const deleteElementForComponent = (Component_id, element__id) => {
        setSectionData(prevData => ({
            ...prevData,
            children: recursiveDeleteChildren(prevData.children, Component_id, element__id),
        }));
    
        // Assuming setHistory is defined somewhere in your component
        setHistory(prevHistory => [...prevHistory, JSON.parse(JSON.stringify(sectionData))]);
    };
    
    const recursiveDeleteChildren = (components, Component_id, element__id) => {
        return components.map(component => {
            if (component.id === Component_id) {
                // Delete the element with element__id from children array
                return {
                    ...component,
                    children: component.children.filter(child => child.id !== element__id),
                };
            } else if (component.children) {
                // Recursively delete from nested children
                return {
                    ...component,
                    children: recursiveDeleteChildren(component.children, Component_id, element__id),
                };
            }
            return component;
        });
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

    const undo = () => {
        if (history.length > 0) {
            const previousState = history[history.length - 1];
            setSectionData(previousState);
            setHistory(prevHistory => prevHistory.slice(0, -1));
        }
    };
 

    return (
        <  >
            {component.children &&
                component.children
                    .sort((a, b) => a.sequence_number - b.sequence_number)
                    .map((element, i) => (
                        < >
                            {element.design_type === 'component' ? (
                                <RecursiveEditComponent
                                    component={element}
                                    elements={elements}
                                    sectionDataState={sectionDataState}
                                    handleAddNewElement={handleAddNewElement}
                                    styleCategories={styleCategories}
                                />
                            ) : (
                                <EditElement
                                    element={element}
                                    deleteElementForComponent={deleteElementForComponent}
                                    componentId={component.id}
                                    handleMoveElement={handleMoveElement}
                                    componentDataState={[component, setComponentData]}
                                    styleCategories={styleCategories}
                                    sectionDataState={sectionDataState}
                                    elements={elements}
                                    handleAddNewElement={handleAddNewElement}
                                />
                            )}
                        </>
                    ))}

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
            )}
        </>
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