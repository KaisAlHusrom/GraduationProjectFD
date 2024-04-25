//React
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

import {
    
} from 'react-redux'


//Components
import TemplateDevView from '../TemplateDevView/TemplateDevView'


//MUI
import {
    Stack,
} from '@mui/material'
import { styled } from '@mui/system'

//services
import { fetchElementTypesRows } from '../../../../Services/elementsTypesService'
import TemplateElementSettings from '../TemplateElementSettings/TemplateElementSettings'


import { useLoaderData } from 'react-router-dom'
import TemplateElementStyleSettings from '../TemplateElementStyleSettings/TemplateElementStyleSettings'
import useFetchDataOutsideState from '../../../../Helpers/customHooks/useFetchDataOutsideState'

//Context
const MyCreateElementContext = createContext();

//propTypes 
// import propTypes from 'prop-types'

//Styled Components
const StyledCreateElementTemplate = styled(Stack)(
    () => ({
    
    })
)


const CreateElementTemplate = () => {

    // useEffect(() => {
    //     const handleBeforeUnload = (event) => {
    //       // Cancel the event
    //         event.preventDefault();
    //         // Chrome requires returnValue to be set
    //         event.returnValue = '';
        
    //         // Display a confirmation dialog
    //         const confirmationMessage = 'Are you sure you want to leave?';
            
    //         // Some browsers ignore the return value, but you should still provide it
    //         return confirmationMessage;
    //     };
        
    //         // Add event listener when the component mounts
    //         window.addEventListener('beforeunload', handleBeforeUnload);
        
    //         // Remove event listener when the component unmounts
    //         return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, []);

    
    const [mode, setMode] = useState(null)



    const [selectedElement, setSelectedElement] = useState(null)
    console.log(selectedElement)
    const [template, setTemplate] = useState(null)
    useEffect(() => {
        if(selectedElement) {
            // Function to transform the original data into the template data structure
            const transformData = (data) => {
                
                // Initialize an array to hold the transformed elements
                const transformedData = [];

                // Recursive function to transform each element and its children
                const transformElement = (element) => {
                    // Initialize an object to hold the transformed properties
                    const transformedElement = {};

                    const exampleTitle = element.element_type_name

                    console.log(element)

                    // Map properties from original data to template data
                    transformedElement['element_type_id'] = element.id;
                    transformedElement['parent_id'] = element.parent_id;
                    transformedElement['parent'] = element.parent;
                    transformedElement['children'] = element.children?.map(child => transformElement(child));
                    transformedElement['element_title'] = exampleTitle;
                    transformedElement['element_description'] = "";
                    transformedElement['element_image'] = ''; 
                    transformedElement['is_template'] = true; 
                    transformedElement['is_child'] = element.is_child;
                    transformedElement['sequence_number'] = element.sequence_number;

                    // Push the transformed element to the array
                    transformedData.push(transformedElement);
                    return transformedElement
                };

                // Start transformation with the root element
                transformElement(data);

                // Return the transformed data
                return transformedData;
            };
            // Call the transformData function with the original data
            const transformedTemplateData = transformData(selectedElement);
            console.log(transformedTemplateData);
            // setTemplate(() => selectedElement)
        }
    }, [selectedElement])

    const [elementsStyle, setElementsStyle] = useState(null)
    const [selectedSubElementId, setSelectedSubElementId] = useState(null)

    return (
        <MyCreateElementContext.Provider value={{
            selectedElement,
            setSelectedElement,
            elementsStyle, 
            setElementsStyle,
            selectedSubElementId,
            setSelectedSubElementId,
            mode, setMode
        }}
        >
            
            <StyledCreateElementTemplate spacing={4} direction="column" alignItems="center">
                <TemplateDevView selectedElementState={{selectedElement, setSelectedElement, elementsStyle}} />

                <TemplateElementSettings selectedElementState={{selectedElement, setSelectedElement}} />

                <TemplateElementStyleSettings elementStyleState={{elementsStyle, setElementsStyle}} />
            </StyledCreateElementTemplate>
        </MyCreateElementContext.Provider>
        
    );
};

CreateElementTemplate.propTypes = {
    // type: propTypes.oneOf(["element", "section", "component"]).isRequired,
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMyCreateElementContext = () => {
    return useContext(MyCreateElementContext);
};


export default CreateElementTemplate;