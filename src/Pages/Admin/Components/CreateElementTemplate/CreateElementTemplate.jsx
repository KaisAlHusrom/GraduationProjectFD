//React
import { createContext, useCallback, useContext, useEffect, useState } from 'react'



//Components
import TemplateDevView from '../TemplateDevView/TemplateDevView'





//MUI
import {
    Stack,
} from '@mui/material'
import { styled } from '@mui/system'

//services
import { transformElementTypeToDesignStructure } from '../../../../Helpers/transformData'
import DesignOptions from '../DesignOptions/DesignOptions'


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

    const [mode, setMode] = useState(null)


    const [selectedElement, setSelectedElement] = useState(null)
    const [template, setTemplate] = useState(null)
    useEffect(() => {
        //this effect for the first rendering only, because selectedElement shouldn't change later
        
        if(mode) {
            const storedTemplate = JSON.parse(localStorage.getItem(mode));
            if(storedTemplate !== null) {
                setTemplate(() => storedTemplate)
            } 
            else if(selectedElement) {
                // Call the transformData function with the original data
                const transformedTemplateData = transformElementTypeToDesignStructure(selectedElement, null, mode);
                // transformedTemplateData.forEach(data => {
                //     addDesign(data);
                // })
                setTemplate(() => transformedTemplateData)
            }
            
        }
    }, [mode, selectedElement])


    //add template to local storage
    //TODO: why the history return to []
    const [history, setHistory] = useState(() => {
        const storedHistory = JSON.parse(sessionStorage.getItem(`${mode}_history`));
        console.log(storedHistory)
        return storedHistory ? storedHistory : [];
    });
    const [redoHistory, setRedoHistory] = useState([])
    
    useEffect(() => {
        if(mode) {
            if(template) {
                localStorage.setItem(mode, JSON.stringify(template));
            }
            if(history) {
                sessionStorage.setItem(`${mode}_history`, JSON.stringify(history));
            }
        }
    }, [history, mode, selectedElement, template]);
    
    

    const [hoveredSubElementId, setHoveredSubElementId] = useState(null)

    //selected elements
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


    // ability to undo changes:
    const handleUndo = useCallback(() => {
        if (history.length > 0) {
            const previousTemplate = history[history.length - 1];
            if (previousTemplate) {
                setRedoHistory([...redoHistory, template]); // Move current template to redo history
                setTemplate(previousTemplate);
                setHistory(history.slice(0, -1)); // Remove last template from history
            }
        }
    }, [history, redoHistory, template]);

    //ability to redo changes:
    const handleRedo = useCallback(() => {
        if (redoHistory.length > 0) {
            const nextTemplate = redoHistory[redoHistory.length - 1];
            if (nextTemplate) {
                setHistory([...history, template]); // Move current template to history
                setTemplate(nextTemplate);
                setRedoHistory(redoHistory.slice(0, -1)); // Remove last template from redo history
            }
        }
    }, [history, redoHistory, template]);
    

    
    
    const handleTemplateChange = useCallback((updatedTemplate) => {
        setHistory([...history, template]);
        setRedoHistory(() => [])
        setTemplate(() => updatedTemplate);
    }, [history, template])

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'z') {
                handleUndo();
            }

            if (event.ctrlKey && event.key === 'y') {
                handleRedo();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleRedo, handleUndo, history]);

    

    return (
        <MyCreateElementContext.Provider value={{
            selectedElement,
            setSelectedElement,
            selectedSubElementIds,
            setSelectedSubElementIds,
            hoveredSubElementId, setHoveredSubElementId,
            mode, setMode,
            template, setTemplate,
            handleTemplateChange
        }}
        >
            
            <StyledCreateElementTemplate >
                <DesignOptions 
                    handleRedo={handleRedo}
                    handleUndo={handleUndo}
                    history={history}
                    redoHistory={redoHistory}
                />
                <TemplateDevView   />

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