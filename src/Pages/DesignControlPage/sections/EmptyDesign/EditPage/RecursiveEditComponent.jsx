// React 
import  { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

// MUI 
import { Box } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { styled } from '@mui/styles';
import { Edit as EditIcon } from '@mui/icons-material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCardIcon from '@mui/icons-material/AddCard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// Component 
import EditComponent from './EditComponent.jsx';
import { AdminMainButton, AdminMainButtonOutsideState, CustomDrawer } from '../../../../../Components/index.jsx';
import ElementsTypeModal from './Modals/ElementsTypeModal.jsx';
import ModalDesignCategories from '../../../components/ModalDesignCategories.jsx';
import DrawerSelectedCategoryDesigns from './Drawers/ReadyDesign/DrawerSelectedCategoryDesigns.jsx';
import ConfirmationDialog from '../../../components/ConfirmationDialog.jsx';
import StyleBox from '../../../components/StyleBox.jsx';
import StylesCategory from './Drawers/DrawersNew/StylesCategory.jsx';

// Helpers 
import { writeFilterObject } from '../../../../../Helpers/filterData.js';
import { addStyleAbdullah } from '../../../../../Helpers/RecursiveHelpers/styles.js';



// Services 
import { fetchUserStylePropCategories } from '../../../../../Services/UserServices/Services/stylesPropsCategoriesUsersService.js';



const EditButtonsStyle = {
    width: '30px',
    height: '30px',
    border: '1px solid red',
    fontWeight: 'bold',
    color: 'white.main',
    transition: 'background-color 0.3s',
    '&:hover': {
        backgroundColor: 'rgb(7, 15, 43)',
    },
};
const TooltipContainer = styled(Box)({
    position: "absolute",
    top: "0",
    left: "0",
    display: "flex",
    flexDirection : "column",
    gap : '5px'

});
const TooltipContainer1 = styled(Box)({
    position: "absolute",
    top: "0",
    right: "0",
    display: "flex",
    flexDirection : "column",
    gap : '5px'
});

const StyledRecursiveEditComponent = styled(Box)(() => ({
    position: 'relative',
    '& .button-container': {
        visibility: 'hidden',
        opacity: 0,
        transition: 'visibility 0s, opacity 0.3s linear',
    },
    '&:hover .button-container': {
        visibility: 'visible',
        opacity: 1,
        transition: 'visibility 0s, opacity 0.3s linear',
    },
}));

const RecursiveEditComponent = ({
    component,
    componentId,
    sectionDataState,

}) => {

    const [data, setData] = sectionDataState;
    const [history, setHistory] = useState([]); // Kullanıcının yaptığı işlemleri saklayacak dizi
    const [componentData, setComponentData] = useState(component);

    const [design , setDesign] = useState(null)
    const [dialogDesignState , setDialogDesignState] = useState(false)
    const [drawerDesignState , setDrawerDesignState] = useState(false);

    const [dialogDesignComponentState , setDialogDesignComponentState] = useState(false)
    const [drawerDesignComponentState , setDrawerDesignComponentState] = useState(false);

    const [AddElement , setAddElement] = useState(null) // using for add new element 
    const [styleCategories, setStyleCategories] = useState(null)
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [AddElementToComponentId , setAddElementToComponentId] = useState(null) // using for selected component id to add new  element

    const [dialogState, setDialogState] = useState(false);
    const [drawerState, setDrawerState] = useState(false);
    const [category, setCategory] = useState(null);

    const [componentStyle, setComponentStyle] = useState({});

    //style categories with style props
    useEffect(() => {
        const fetchStyleCategories = async () => {
            const {rows} = await fetchUserStylePropCategories(null, null, null, null, null, 100)
            setStyleCategories(() => rows)
        }

        fetchStyleCategories()
    }, [])

    const recursiveUpdateChildren = (components, componentId, element) => {
        return components.map(component => {
            if (component.id === componentId) {
                // Find the maximum sequence_number among the existing elements
                const maxSequenceNumber = component.children.length > 0
                    ? Math.max(...component.children.map(child => child.sequence_number))
                    : 0;
    
                // Set the new element's sequence_number to maxSequenceNumber + 1
                const newElement = {
                    ...element,
                    sequence_number: maxSequenceNumber + 1
                };
    
                return {
                    ...component,
                    children: [...component.children, newElement],
                };
            } else if (component.children) {
                // Recursively update nested children
                return {
                    ...component,
                    children: recursiveUpdateChildren(component.children, componentId, element),
                };
            }
            return component;
        });
    };
    
    
    const recursiveDeleteComponent = (components, section_component_id) => {
        const updatedComponents = [];
    
        for (const component of components) {
            if (component.id === section_component_id) {
                // Skip this component to delete it
                continue;
            }
    
            if (component.children) {
                // Recursively delete from nested children
                const updatedChildren = recursiveDeleteComponent(component.children, section_component_id);
                if (updatedChildren.length !== component.children.length) {
                    component.children = updatedChildren;
                }
            }
    
            updatedComponents.push(component);
        }
    
        // Ensure components are sorted by sequence_number
        return updatedComponents.sort((a, b) => a.sequence_number - b.sequence_number);
    };
    
    
    const deleteComponentElements = (section_component_id) => {
        const recursiveDeleteChildren = (components) => {
            return components.map(component => {
                if (component.id === section_component_id) {
                    // Clear the children of the component with the matching id
                    return {
                        ...component,
                        children: [],
                    };
                } else if (component.children) {
                    // Recursively delete children for nested components
                    return {
                        ...component,
                        children: recursiveDeleteChildren(component.children),
                    };
                }
                return component;
            });
        };
    
        setData((prevData) => {
            return {
                ...prevData,
                children: recursiveDeleteChildren(prevData.children),
            };
        });
    };
    


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


    const handleSectionStyleChange = useCallback((cssValue, prop) => {
        setComponentData((prevData) => {
            const updatedSectionData = { ...prevData };
            const changed = addStyleAbdullah(updatedSectionData, [prevData.id], prop, cssValue, null, null);
            if (changed) {
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
        setHistory(prevHistory => [...prevHistory, JSON.parse(JSON.stringify(data))]);
    }, [data]);


    const handleAddNewComponentElement = useCallback((componentId, element) => {
        const recursiveAddElement = (components) => {
            return components.map(component => {
                if (component.id === componentId) {
                    // Find the maximum sequence_number among the existing elements
                    const maxSequenceNumber = component.children.length > 0 
                        ? Math.max(...component.children.map(child => child.sequence_number)) 
                        : 0;
                    
                    // Set the new element's sequence_number to maxSequenceNumber + 1
                    const newElement = {
                        ...element,
                        sequence_number: maxSequenceNumber + 1
                    };
    
                    return {
                        ...component,
                        children: [...component.children, newElement],
                    };
                } else if (component.children) {
                    // Recursively update nested children
                    return {
                        ...component,
                        children: recursiveAddElement(component.children),
                    };
                }
                return component;
            });
        };
    
        setData((prevData) => ({
            ...prevData,
            children: recursiveAddElement(prevData.children),
        }));
    }, [setData]);
    
    

    const appliedFilterForComponent = useMemo(() => {
        return [
            writeFilterObject('design_type', 'string', '=', 'component'), 
        ];
    }, []);


    const deleteComponentForComponent = useCallback((section_component_id) => {
        setData((prevData) => {
            const updatedData = {
                ...prevData,
                children: recursiveDeleteComponent(prevData.children, section_component_id),
            };
    
            // Update history for undo functionality
            setHistory(prevHistory => [...prevHistory, prevData]);
    
            return updatedData;
        });
    }, [setData, setHistory]);
    

    // add new element to component 
    const handleAddNewElement = useCallback((componentId, element) => {
        setData((prevData) => ({
            ...prevData,
            children: recursiveUpdateChildren(prevData.children, componentId, element),
        }));
    }, [setData]);

    const handleConfirmation = (section_component_id) => {
        setAddElementToComponentId(section_component_id);
        openConfirmationDialog();
    };


    const closeConfirmationDialog = () => {
        setConfirmationDialogOpen(false);
    };

    const handleConfirmDelete = () => {
        deleteComponentElements(AddElementToComponentId);
        closeConfirmationDialog();
    };

    const openConfirmationDialog = () => {
        setConfirmationDialogOpen(true);
    };

    const duplicateComponent = useCallback((section_component_id) => {
        setData((prevData) => {
            const recursiveDuplicate = (components, parent_id) => {
                const newComponents = [...components];
                for (let i = 0; i < components.length; i++) {
                    const component = components[i];
                    if (component.id === section_component_id) {
                        // Generate new IDs for nested children recursively
                        const generateNewIdsRecursively = (comp) => {
                            const newComponent = { ...comp, id: uuidv4() };
                            if (newComponent.children && newComponent.children.length > 0) {
                                newComponent.children = newComponent.children.map(child => generateNewIdsRecursively(child));
                            }
                            return newComponent;
                        };
    
                        const newComponent = generateNewIdsRecursively(component);
    
                        if (parent_id) {
                            // If parent_id is provided, set sequence_number to maintain the order within the parent component
                            newComponent.sequence_number = component.sequence_number + 1;
                        } else {
                            // If no parent_id, then it's a top-level component, set sequence_number accordingly
                            newComponent.sequence_number = components.length > 0 
                                ? Math.max(...components.map(comp => comp.sequence_number)) + 1 
                                : 1;
                        }
    
                        // Insert the duplicated component after the original component
                        newComponents.splice(i + 1, 0, newComponent);
                        break;
                    } else if (component.children) {
                        newComponents[i] = {
                            ...component,
                            children: recursiveDuplicate(component.children, component.id),
                        };
                    }
                }
                return newComponents;
            };
    
            setHistory(prevHistory => [...prevHistory, JSON.parse(JSON.stringify(prevData))]);
    
            return {
                ...prevData,
                children: recursiveDuplicate(prevData.children, null),
            };
        });
    }, [setData, setHistory]);
    

    return (
        <StyledRecursiveEditComponent key={component.id}  sx = {{
                    position : 'relative'
        }} >
                <Box 
                    sx={{ ...componentStyle  }}
                >
                <EditComponent 
                key={component.id} 
                component={component} 
                componentId={componentId}
                handleAddNewElement={handleAddNewElement} 
                elements={[AddElement, setAddElement]}
                sectionDataState={[data, setData]}
                styleCategories={styleCategories}
            />
                </Box>
                <ConfirmationDialog
                open={confirmationDialogOpen}
                onClose={closeConfirmationDialog}
                onConfirm={handleConfirmDelete}
            />

                {/* <Box className="button-container" sx={{ position: 'absolute', bottom: '-20px', left: '0', display: 'flex', gap: 1, p: 2 }}>

                   
                </Box>

                <Box className="button-container" sx={{ position: 'absolute', bottom: '-20px', right: '0', display: 'flex', gap: 1, p: 2 }}>

            
                </Box>

                     */}
                
            <TooltipContainer>
                <AdminMainButtonOutsideState
                    title="Edit"
                    type="StyleDialog"
                    appearance="iconButton"
                    putTooltip
                    icon={<EditIcon />}
                    customState={[dialogState, setDialogState]}
                    willShow={
                        <StyleBox
                            customState={[dialogState, setDialogState]}
                            drawerStates={[drawerState, setDrawerState]}
                            categoryState={[category, setCategory]}
                            name_of_design={"Style Component"}
                            type_of_design='Component'
                            sectionStyle={componentStyle}
                            handleSectionStyleChange={handleSectionStyleChange}
                            styleCategories={styleCategories}
                        />
                    }
                    sx={{backgroundColor : 'success.dark', ...EditButtonsStyle}}
                />

                <CustomDrawer
                    drawerOpenState={[drawerState, setDrawerState]}
                    title={"Style Component"}
                    drawerStyle={{
                        paddingTop: '80px',
                    }}
                    putDrawerCloseButton={true}
                    anchor={"left"}
                >
                    <StylesCategory
                        customState={[dialogState, setDialogState]}
                        handleSectionStyleChange={handleSectionStyleChange}
                        category={{ category }}
                        sectionStyleProps={componentStyle}
                        sectionStyle={componentStyle}

                    />
                </CustomDrawer>
                <AdminMainButton
                        title="Add elements"
                        type="StyleDialog"
                        appearance="iconButton"
                        putTooltip
                        willShow={
                            <ElementsTypeModal
                                createDesignedDesign={handleAddNewElement}
                                selected_parent_id={component.id}
                                customState={[dialogDesignState, setDialogDesignState]}
                                drawerStates={[drawerDesignState, setDrawerDesignState]}
                                designState={[design, setDesign]}
                            />
                        }
                        icon={<AddBoxIcon />}
                        sx={{ backgroundColor: 'success.dark', ...EditButtonsStyle }}
                    />
                    <AdminMainButton
                        title="Duplicate"
                        type="custom"
                        onClick={() => duplicateComponent(component.id)}
                        appearance="iconButton"
                        putTooltip
                        icon={<ContentCopyIcon />}
                        sx={{ backgroundColor: 'success.dark', ...EditButtonsStyle }}
                    />
                    <AdminMainButtonOutsideState
                        customState={[dialogDesignComponentState, setDialogDesignComponentState]}
                        title="Add Components"
                        type="StyleDialog"
                        appearance="iconButton"
                        putTooltip
                        icon={<AddCardIcon />}
                        willShow={
                            <ModalDesignCategories
                                customState={[dialogDesignComponentState, setDialogDesignComponentState]}
                                drawerStates={[drawerDesignComponentState, setDrawerDesignComponentState]}
                                designState={[design, setDesign]}
                                appliedFilter={appliedFilterForComponent}
                                NameOfCategories={'Component Designs'}
                            />
                        }
                        sx={{ ...EditButtonsStyle, backgroundColor: 'success.dark' }}
                    />
                    <CustomDrawer
                        drawerOpenState={[drawerDesignComponentState, setDrawerDesignComponentState]}
                        title={"Component Designs"}
                        drawerStyle={{
                            paddingTop: '80px'
                        }}
                        putDrawerCloseButton={true}
                        anchor={"left"}
                    >
                        <DrawerSelectedCategoryDesigns
                            isComponentInside={true}
                            design_category_id={design?.id}
                            createDesignedDesign={handleAddNewComponentElement}
                            appliedFilterType={design?.design_type}
                            selected_parent_id={component.id}
                        />
                    </CustomDrawer>
            </TooltipContainer>

            <TooltipContainer1>
            <AdminMainButton
                        title="Delete"
                        type="custom"
                        onClick={() => deleteComponentForComponent(component.id)}
                        appearance="iconButton"
                        putTooltip
                        icon={<DeleteSweepIcon />}
                        sx={{ backgroundColor: 'warning.dark', ...EditButtonsStyle }}
                    />
                    <AdminMainButton
                        title="Delete All Component Elements"
                        type="custom"
                        appearance="iconButton"
                        putTooltip
                        onClick={() => handleConfirmation(component.id)}
                        icon={<DeleteForeverIcon />}
                        sx={{ backgroundColor: 'warning.dark', ...EditButtonsStyle }}
                    />
            </TooltipContainer1>

        </StyledRecursiveEditComponent>
    );
};

RecursiveEditComponent.propTypes = {
    component: PropTypes.object.isRequired,
    handleAddNewElement: PropTypes.func,
    elements: PropTypes.array,
    componentId: PropTypes.string,
    sectionDataState: PropTypes.array,
    styleCategories: PropTypes.array,
    addComponentForComponent: PropTypes.func,
    deleteComponentForComponent: PropTypes.func,
    handleConfirmation: PropTypes.func,
    appliedFilterForComponent: PropTypes.object,
    handleAddNewComponentElement: PropTypes.func,
};

export default RecursiveEditComponent;
