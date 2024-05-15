//React
import { createContext, useContext, useEffect, useState } from 'react'



//Components
import TemplateDevView from '../TemplateDevView/TemplateDevView'





//MUI
import {
    Stack,
} from '@mui/material'
import { styled } from '@mui/system'

//services
import { transformElementTypeToDesignStructure } from '../../../../Helpers/transformData'


//Context
const MyCreateElementContext = createContext();

//propTypes 
// import propTypes from 'prop-types'

//Styled Components
const StyledCreateElementTemplate = styled(Stack)(
    ({theme}) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme.spacing(2),
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
    const [template, setTemplate] = useState(null)
    useEffect(() => {
        //this effect for the first rendering only, because selectedElement shouldn't change later
        if(selectedElement) {
            
            // Call the transformData function with the original data
            const transformedTemplateData = transformElementTypeToDesignStructure(selectedElement, null, mode);
            // transformedTemplateData.forEach(data => {
            //     addDesign(data);
            // })

            // // set the template to the data that is the root of the tree, the grand father.
            setTemplate(() => transformedTemplateData)
        }
    }, [mode, selectedElement])

    
    
    const [elementsStyle, setElementsStyle] = useState(null)
    const [hoveredSubElementId, setHoveredSubElementId] = useState(null)

    const [selectedSubElementIds, setSelectedSubElementIds] = useState([])
    useEffect(() => {
        if (template && template.id) {
            setSelectedSubElementIds((prev) => {
                if(prev.length === 0) {
                    return [template.id]
                }
                return prev
            });
        } else {
            setSelectedSubElementIds([]);
        }

    }, [template, setSelectedSubElementIds])

    return (
        <MyCreateElementContext.Provider value={{
            selectedElement,
            setSelectedElement,
            elementsStyle, 
            setElementsStyle,
            selectedSubElementIds,
            setSelectedSubElementIds,
            hoveredSubElementId, setHoveredSubElementId,
            mode, setMode,
            template, setTemplate,
        }}
        >
            
            <StyledCreateElementTemplate >
                <TemplateDevView  />

                {/* <TemplateElementSettings  /> */}

                {/* <TemplateElementStyleSettings /> */}
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