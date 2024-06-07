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
import { useDispatch } from 'react-redux'
import { handleOpenSnackbar, setSnackbarIsError, setSnackbarMessage } from '../../../../Redux/Slices/snackbarOpenSlice'

import { ConfirmModal } from '../../../../Components'
import { addDesigns, updateDesigns } from '../../../../Services/AdminServices/Services/designService'



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
        height: "100vh",
        padding: theme.spacing(2),
        width: "100%"
    })
)


const CreateElementTemplate = () => {
    const dispatch = useDispatch()
    

    const [mode, setMode] = useState(null)

    const [parentElementId, setParentElementId] = useState(null)
    const [selectedElement, setSelectedElement] = useState(null)
    const [template, setTemplate] = useState(null)
    useEffect(() => {
        //this effect for the first rendering only, because selectedElement shouldn't change later
        
        if(mode) {
            const storedTemplate = JSON.parse(localStorage.getItem(mode));
            if(storedTemplate !== null) {
                // console.log(storedTemplate)
                
                setTemplate(() => storedTemplate)
            } 
            else if(selectedElement) {
                if(selectedElement === "blank page") {
                    // Call the transformData function with the original data
                    // const transformedTemplateData = blankNewPage();

                    // setTemplate(() => transformedTemplateData)
                }else {
                    // Call the transformData function with the original data
                    const transformedTemplateData = transformElementTypeToDesignStructure(selectedElement, null, mode);

                    setTemplate(() => transformedTemplateData)
                
                }
            }
            
        }
    }, [mode, selectedElement])


    //add template to local storage
    //TODO: fix history maximum array length or size
    const [history, setHistory] = useState([]);
    // set history when mode is selected, this for first render only
    // useEffect(() => {
    //     if(mode) {
    //         const storedHistory = JSON.parse(sessionStorage.getItem(`${mode}_history`));
    //         if(storedHistory && storedHistory.length > 0) {
    //             setHistory(() => storedHistory)
    //         } else {
    //             // sessionStorage.setItem(`${mode}_history`, JSON.stringify(history));
    //         }
    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [mode])
    
    const [redoHistory, setRedoHistory] = useState([])
    
    // set template and history to local and session storages
    useEffect(() => {
        if(mode) {
            
            if(template) {
                
                localStorage.setItem(mode, JSON.stringify(template));
            }
            if(history) {
                // sessionStorage.setItem(`${mode}_history`, JSON.stringify(history));
            }
        }
    }, [history, mode, template]);
    
    

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
        } else {
            dispatch(setSnackbarIsError({isError: true}))
            dispatch(setSnackbarMessage({message: "There is no changes to undo"}))
            dispatch(handleOpenSnackbar())
        }
    }, [dispatch, history, redoHistory, template]);

    //ability to redo changes:
    const handleRedo = useCallback(() => {
        if (redoHistory.length > 0) {
            const nextTemplate = redoHistory[redoHistory.length - 1];
            if (nextTemplate) {
                setHistory([...history, template]); // Move current template to history
                setTemplate(nextTemplate);
                setRedoHistory(redoHistory.slice(0, -1)); // Remove last template from redo history
            }
        } else {
            dispatch(setSnackbarIsError({isError: true}))
            dispatch(setSnackbarMessage({message: "There is no changes to redo"}))
            dispatch(handleOpenSnackbar())
        }
    }, [dispatch, history, redoHistory, template]);

    //open element structure drawer
    const [elementStructureDrawer, setElementStructureDrawer] = useState(false)
    const handleOpenElementStructure = useCallback((e) => {
        e.preventDefault()
        if(template) {
            setElementStructureDrawer(prev => !prev)
        } else {
            dispatch(setSnackbarIsError({isError: true}))
            dispatch(setSnackbarMessage({message: "Select Mode"}))
            dispatch(handleOpenSnackbar())
        }
    }, [dispatch, template]);

    //open style options drawer
    const [styleOptionsDrawer, setStyleOptionsDrawer] = useState(false)
    const handleOpenStyleOptions = useCallback((e) => {
        e.preventDefault()
        if(template) {
            setStyleOptionsDrawer(prev => !prev)
        } else {
            dispatch(setSnackbarIsError({isError: true}))
            dispatch(setSnackbarMessage({message: "Select Mode"}))
            dispatch(handleOpenSnackbar())
        }
    }, [dispatch, template]);
    

    
    // function to change the template based on updated template
    const handleTemplateChange = useCallback((updatedTemplate) => {
        setHistory([...history, template]);
        setRedoHistory(() => [])
        setTemplate(() => updatedTemplate);
        setSelectedElement(() => null)
        //to close drawers when there is no template
        if(!updatedTemplate) {
            setElementStructureDrawer(false)
            setStyleOptionsDrawer(false)
        }
    }, [history, template])


    //create new blank design
    const handleNewDesign = useCallback(() => {
        if(template) {
            localStorage.removeItem(mode);
            handleTemplateChange(null)
        }
    }, [handleTemplateChange, mode, template])

    // * save template to database
    const saveTemplate = (inputValues) => {
        addDesigns(inputValues)
        localStorage.removeItem(mode);
        handleTemplateChange(null)
    }

    // * update template to database
    const updateDataAdminTemplate = (inputValues) => {
        updateDesigns(template['id'], inputValues)
        localStorage.removeItem(mode);
        handleTemplateChange(null)
    }


    //confirm new blank design
    const [confirmOpen, setConfirmOpen] = useState(false)
    const handleConfirmCreateNewBlankDesign = useCallback(() => {
        setConfirmOpen(() => true)
    }, [])

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'z') {
                handleUndo();
            }

            if (event.ctrlKey && event.key === 'y') {
                handleRedo();
            }

            if (event.altKey  && event.key === 'e') {
                handleOpenElementStructure(event);
            }

            if (event.altKey && event.key === 's') {
                handleOpenStyleOptions(event);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleOpenElementStructure, handleOpenStyleOptions, handleRedo, handleUndo, history]);



    return (
        <MyCreateElementContext.Provider value={{
            selectedElement,
            setSelectedElement,
            selectedSubElementIds,
            setSelectedSubElementIds,
            hoveredSubElementId, setHoveredSubElementId,
            mode, setMode,
            template, setTemplate,
            handleTemplateChange,
            elementStructureDrawer, setElementStructureDrawer,
            styleOptionsDrawer, setStyleOptionsDrawer,
            parentElementId, setParentElementId
        }}
        >
            
            <StyledCreateElementTemplate >
                <DesignOptions 
                    handleRedo={handleRedo}
                    handleUndo={handleUndo}
                    handleNewBlank={handleConfirmCreateNewBlankDesign}
                    saveTemplate={saveTemplate}
                    updateDataAdminTemplate={updateDataAdminTemplate}
                    history={history}
                    redoHistory={redoHistory}
                />

                <TemplateDevView   />

                <ConfirmModal 
                    title={"Create new blank design"}
                    ConfirmMessage={"Are you sure you want to create a blank design, Your changes will ben removed"}
                    handleAgree={handleNewDesign}
                    confirmModalState={[confirmOpen, setConfirmOpen]}
                />
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