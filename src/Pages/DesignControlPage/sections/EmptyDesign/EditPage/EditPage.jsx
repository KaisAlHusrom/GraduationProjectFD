import {
    useCallback,
    useEffect,
    useMemo,
    useState 
} from 'react'
import { useParams } from 'react-router-dom';

import {
    
} from 'react-redux'
import { v4 as uuidv4 } from 'uuid'; // UUID oluşturmak için

//Components
import EditComponent from './EditComponent.jsx';
import { AdminMainButton } from '../../../../../Components/index.jsx';
import StyleBox from '../components/StyleBox.jsx';
import {createEmptyComponent , createEmptyElement} from './Data/ConstDataComponent.jsx'
import AddElementModal from '../components/AddElementModal.jsx';
import AddComponentModal from '../components/AddComponentModal.jsx';
import ConfirmationDialog from '../components/ConfirmationDialog.jsx';


//  helpers 
import { addStyleAbdullah } from '../../../../../Helpers/RecursiveHelpers/styles.js';
import useEffectFetchData from '../../../../../Helpers/customHooks/useEffectFetchData.jsx';
import { writeFilterObject } from '../../../../../Helpers/filterData.js';

// services 
import { fetchStylePropCategory } from '../../../../../Services/StylePropCategory.js';
import {  fetchSpecificDesign } from '../../../../../Services/designService.js';



//MUI
import { Box } from '@mui/material';
import { styled } from '@mui/system'
import { Edit as EditIcon } from '@mui/icons-material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ListAltIcon from '@mui/icons-material/ListAlt';
import UndoIcon from '@mui/icons-material/Undo';
import SaveIcon from '@mui/icons-material/Save';




const StyledEditPage = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8),
    backgroundColor: 'white',
    minHeight :'100vh'
}));


const TooltipContainer = styled(Box)({
    position: 'absolute',
    top: '0',
    left: '0',
    opacity: 0, // Initially set opacity to 0
    visibility: 'hidden', // Initially hide the TooltipContainer
    transition: 'opacity 1s ease', // Apply transition effect to opacity
    display :'flex',
});


const HoverBox = styled(Box)({
    position: 'relative',
    '&:hover .action-buttons': {
        opacity: 1,
        visibility: 'visible',
    },
    '&:hover > div': {
        opacity: 1, // Show the TooltipContainers when StyledEditComponent is hovered
        visibility: 'visible',
    },
});


const ActionButtons = styled(Box)({
    position: 'relative',
    bottom: '0px',
    left: '50px',
    display: 'flex',
    gap :'10px',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity 0.3s ease',
    width :'100px'
});


const EditButtonsStyle = {
    border: '1px solid red',
    fontWeight: 'bold',
    color: 'white.main',
    backgroundColor: 'success.dark',
    transition: 'background-color 0.3s',
    '&:hover': {
        backgroundColor: 'rgb(7, 15, 43)',
    },
}

const EditPage = () => {

    const { section_id } = useParams();
    const [styleCategories, setStyleCategories] = useState(null)

    const [history, setHistory] = useState([]); // Kullanıcının yaptığı işlemleri saklayacak dizi
    const [sectionStyle, setSectionStyle] = useState({}); // using for changing the section style 
    const [sectionData, setSectionData] = useState([]); // using for Control  section data 

    const [AddElement , setAddElement] = useState(null) // using for add new element 
    const [AddElementToComponentId , setAddElementToComponentId] = useState(null) // using for selected component id to add new  element

    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);


    const appliedFilterForComponent = useMemo(() => {
        return [
            writeFilterObject('design_type', 'string', '=', 'component'), 
        ];
    }, []);

    const appliedFilterForSections = useMemo(() => {
        return [
            writeFilterObject('design_type', 'string', '=', 'section'), 
        ];
    }, []);

    const params = useMemo(()=> {
        return [section_id]  
    } , [section_id])

        //style categories with style props

    useEffect(() => {
        const fetchStyleCategories = async () => {
            const {rows} = await fetchStylePropCategory(null, null, null, null, null, 20)
            setStyleCategories(() => rows)
        }

        fetchStyleCategories()
    }, [])


    const {loading, hasMore, setPageNumber, data ,setData} = useEffectFetchData(fetchSpecificDesign,params , true , true )


    const openConfirmationDialog = () => {
        setConfirmationDialogOpen(true);
    };
    
    const closeConfirmationDialog = () => {
        setConfirmationDialogOpen(false);
    };

    //  get the section style
    useEffect(() => {
        if (data) {
            setSectionData(data);
            const dictionary = {};

            if (data.styles) {
                data.styles.forEach((cssProp) => {
                const { style_prop, style_prop_value } = cssProp;
                if (style_prop.is_section) {
                    dictionary[style_prop.style_prop_css_name] = style_prop_value;
                }
            });
            }
        setSectionStyle(dictionary);
        }
    }, [data]);


    // change the section style
    const handleSectionStyleChange = useCallback((cssValue, prop) => {
        setData((prevData) => {
            const updatedSectionData = { ...prevData }; // Kopya alarak güncelleme yap

            const changed = addStyleAbdullah(updatedSectionData, [section_id], prop, cssValue, null, null);
    
            return updatedSectionData;
        });
    }, [section_id, setData]);
    

    //  duplicate component 
    const addComponentForComponent = (section_component_id) => {
        const index = sectionData.children.findIndex(component => component.id === section_component_id);
        if (index !== -1) {
            const newComponent = { ...sectionData.children[index], section_component_id: uuidv4() };
            setSectionData((prevData) => {
                const updatedComponents = [...prevData.children];
                updatedComponents.splice(index + 1, 0, newComponent);
                return {
                    ...prevData,
                    children: updatedComponents,
                };
            });
            setHistory(prevHistory => [...prevHistory, sectionData]);
        }

    };
    //  delete the component
    const deleteComponentForComponent = (section_component_id) => {
        const index = sectionData.children.findIndex(component => component.id === section_component_id);
        if (index !== -1) {
            setSectionData((prevData) => {
                const updatedComponents = [...prevData.children];
                updatedComponents.splice(index, 1);
                return {
                    ...prevData,
                    children: updatedComponents,
                };
            });
            setHistory(prevHistory => [...prevHistory, sectionData]);

        }
    };
    // create Empty component
    const createNewComponent = (section_css_props) => {
        // Update the state to include the new component
        setSectionData((prevData) => {
            const updatedComponents = [...prevData.children, createEmptyComponent(section_css_props)];
            return {
                ...prevData,
                children: updatedComponents,
            };
        });
        setHistory(prevHistory => [...prevHistory, sectionData]);

    };
    // create designed component
    const createDesignedComponent = (component) => {
        // Update the state to include the new component
        setSectionData((prevData) => {
            // Check if prevData exists and has children
            const updatedComponents = prevData && Array.isArray(prevData.children) 
                ? [...prevData.children, component] 
                : [component];
            
            return {
                ...prevData,
                children: updatedComponents,
            };
        });
        setHistory(prevHistory => [...prevHistory, sectionData]);
    };
    
    // add new element to component 
    const handleAddNewElement = useCallback((componentId) => {
        setSectionData((prevData) => ({
            ...prevData,
            children: prevData.children.map((component) => {
                if (component.id === componentId) {
                    return {
                        ...component,
                        children: [...component.children,  createEmptyElement(AddElement.element_type.element_type_name, AddElement.element_content, AddElement.styles)],
                    };
                }
                return component;
            }),
        }));
    }, [setSectionData, AddElement]);
    
    // delete the all component in the section 
    const deleteSection = () => {
        setSectionData(prevData => ({
            ...prevData,
            children: [] // Set section_components to an empty array
        }));
        setHistory(prevHistory => [...prevHistory, sectionData]);

    };

    // delete the element inside component 

    const deleteComponentElements = (section_component_id) => {
        const index = sectionData.children.findIndex(component => component.id === section_component_id);
        if (index !== -1) {
            setSectionData((prevData) => {
                const updatedComponents = [...prevData.children];
                updatedComponents[index].children = [];
                return {
                    ...prevData,
                    children: updatedComponents,
                };
            });
        }
    };

    const handleConfirmation = (section_component_id) => {
        setAddElementToComponentId(section_component_id);
        openConfirmationDialog();
    };

    const handleConfirmDelete = () => {
        deleteComponentElements(AddElementToComponentId);
        closeConfirmationDialog();
    };

    // create new section 
    const createNewSection = (SectionsDesigns) => {
        setSectionData(SectionsDesigns)
        if (SectionsDesigns && SectionsDesigns.styles) {
            const dictionary = {};
            SectionsDesigns.styles.forEach((cssProp) => {
                const {  style_prop, style_prop_value } = cssProp;
                if (style_prop.is_section) {
                    dictionary[style_prop.style_prop_css_name] = style_prop_value;
                }
            });
            setSectionStyle(dictionary);
        }
        setHistory(prevHistory => [...prevHistory, sectionData]);

    };

    // undo last operation for the section 
    const undo = () => {
        if (history.length > 0) {
            // Önceki durumu alın
            const previousState = history[history.length - 1];
            // Önceki durumu geri yükle
            setSectionData(previousState);
            // Son işlemi işlem geçmişinden kaldır
            setHistory(prevHistory => prevHistory.slice(0, -1));
        }
    };

    console.log(sectionStyle)

    return (
        <StyledEditPage>
                <ConfirmationDialog
                    open={confirmationDialogOpen}
                    onClose={closeConfirmationDialog}
                    onConfirm={handleConfirmDelete}
                />

            <HoverBox key={section_id} sx={sectionStyle}>
                {sectionData && sectionData.children && sectionData.children.map((component, i) => (
                    <Box key={component.id}>
                        
                        <EditComponent 
                        key={component.id} 
                        component={component} 
                        componentId = {AddElementToComponentId}
                        handleAddNewElement = {handleAddNewElement} 
                        elements = {[AddElement , setAddElement]}
                        sectionDataState = {[sectionData, setSectionData]}
                        />
                        
                        <ActionButtons className="action-buttons">

                            <AdminMainButton
                                title="duplicate"
                                type="custom"
                                onClick={() => addComponentForComponent(component.id)}
                                appearance="iconButton"
                                putTooltip                                
                                icon={<AddBoxIcon />}
                                sx={EditButtonsStyle}
                            />
                            <AdminMainButton
                                title="Delete"
                                type="custom"
                                onClick={() => deleteComponentForComponent(component.id)}
                                appearance="iconButton"
                                putTooltip
                                icon={<DeleteSweepIcon />}
                                sx={{
                                    border: '1px solid red',
                                    fontWeight: 'bold',
                                    color: 'white.main',
                                    backgroundColor: 'warning.dark',
                                    transition: 'background-color 0.3s',
                                    '&:hover': {
                                        backgroundColor: 'rgb(7, 15, 43)',
                                    },
                                }}
                            />
                            <AdminMainButton
                                title="Delete All Component Elements"
                                type="custom"
                                appearance="iconButton"
                                putTooltip
                                onClick={() => handleConfirmation(component.id)}
                                icon={<DeleteSweepIcon />}
                                sx={{
                                    border: '1px solid red',
                                    fontWeight: 'bold',
                                    color: 'white.main',
                                    backgroundColor: 'warning.dark',
                                    margin: '5px',
                                    transition: 'background-color 0.3s',
                                    '&:hover': {
                                        backgroundColor: 'rgb(7, 15, 43)',
                                    },
                                    display:component.children.length === 0 ? 'none' : 'flex',
                                }}
                            />
                            <AdminMainButton
                                title="Add elements"
                                type="StyleDialog"
                                appearance="iconButton"
                                putTooltip
                                willShow={
                                    <AddElementModal setAddElementToComponentId = {setAddElementToComponentId} elements =  {[AddElement , setAddElement]}  
                                    componentSection_component_id = {component.id} ></AddElementModal>
                                }
                                icon={<AddBoxIcon />}
                                sx={EditButtonsStyle}
                            />

                        </ActionButtons>

                    </Box>
                ))}

            <TooltipContainer>  
                    <Box sx = {{
                        width :'250px',
                        display : 'flex',
                        justifyContent : 'space-between',
                        alignItems : 'center',
                    }}>
                        <AdminMainButton
                            title="Edit Section"
                            type="StyleDialog"
                            appearance="iconButton"
                            putTooltip
                            icon={<EditIcon />}
                            willShow={
                                <StyleBox 
                                    Section_Name="Style Section"
                                    element_Type='section'
                                    sectionStyle={sectionStyle}
                                    handleSectionStyleChange={handleSectionStyleChange}
                                    styleCategories={styleCategories}
                                />
                            }
                            sx={EditButtonsStyle}
                        />
                        <AdminMainButton
                            title="Delete All Component"
                            type="custom"
                            appearance="iconButton"
                            putTooltip
                            onClick={() => deleteSection(section_id)}
                            icon={<DeleteSweepIcon />}
                            sx={{
                                border: '1px solid red',
                                fontWeight: 'bold',
                                color: 'white.main',
                                backgroundColor: 'warning.dark',
                                transition: 'background-color 0.3s',
                                '&:hover': {
                                    backgroundColor: 'rgb(7, 15, 43)',
                                },
                            }}

                        />
                        <AdminMainButton
                            title="Add Components"
                            type="StyleDialog"
                            appearance="iconButton"
                            putTooltip
                            icon={<AddBoxIcon />}
                            willShow={
                            <AddComponentModal  createNewDesign = {createNewComponent} 
                            createDesignedDesign = {createDesignedComponent}
                            appliedFilter = {appliedFilterForComponent}
                            ></AddComponentModal>
                            }
                            sx={EditButtonsStyle}

                        />
                        <AdminMainButton
                            title="Create New Section"
                                type="StyleDialog"
                                appearance="iconButton"
                                putTooltip
                                icon={<ListAltIcon />}
                                willShow={
                                    // <SectionsModal SectionsDesigns = {SectionsDesigns} createNewSection = {createNewSection}></SectionsModal>
                                    <AddComponentModal  
                                    createNewDesign = {createNewSection}  
                                    createDesignedDesign = {createDesignedComponent} 
                                    appliedFilter = {appliedFilterForSections}
                                    ></AddComponentModal>

                                }
                                sx={EditButtonsStyle}
                                />
                            {history.length > 0 && (
                                    <AdminMainButton
                                    title="Undo"
                                    type="custom"
                                    appearance="iconButton"
                                    putTooltip
                                    icon={<UndoIcon />}
                                    onClick={undo}
                                    sx={EditButtonsStyle}
                                    
                                    />)}
                    </Box> 
                
            </TooltipContainer>

            </HoverBox>


            <AdminMainButton
                title="Save"
                type="custom"
                // onClick={}
                appearance="primary"
                putTooltip                                
                icon={<SaveIcon />}
                sx={{
                    border: '1px solid red',
                    fontWeight: 'bold',
                    color: 'white.main',
                    backgroundColor: 'primary.dark',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                        backgroundColor: 'rgb(7, 15, 43)',
                    },
                    position: 'absolute',
                    right: '100px',
                    marginTop: '20px',
                }}
            />



        </StyledEditPage>
    );
};

export default EditPage;  



