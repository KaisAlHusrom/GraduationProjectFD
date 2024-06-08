import  { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// Components
import EditComponent from './EditComponent.jsx';

// Helpers
import { addStyleAbdullah } from '../../../../../Helpers/RecursiveHelpers/styles.js';
import useEffectFetchData from '../../../../../Helpers/customHooks/useEffectFetchData.jsx';
import { cleanDesignDataDesignPage } from '../../../../../Helpers/RecursiveHelpers/addNewElementToSpecificElement.js';
import { writeFilterObject } from '../../../../../Helpers/filterData.js';

// Services


// MUI
import { Alert, AlertTitle, Box } from '@mui/material';
import { styled } from '@mui/system';
import { Edit as EditIcon } from '@mui/icons-material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ListAltIcon from '@mui/icons-material/ListAlt';
import UndoIcon from '@mui/icons-material/Undo';
import SaveIcon from '@mui/icons-material/Save';
import ElementsTypeModal from './Modals/ElementsTypeModal.jsx';
import { AdminMainButton } from '../../../../../Components/index.jsx';
import ModalDesignCategories from '../../../components/ModalDesignCategories.jsx';
import StyleBox from '../../../components/StyleBox.jsx';
import ConfirmationDialog from '../../../components/ConfirmationDialog.jsx';
import { fetchSpecificUserDesign, updateUserDesigns } from '../../../../../Services/UserServices/Services/designUsersService.js';
import { fetchUserStylePropCategories } from '../../../../../Services/UserServices/Services/stylesPropsCategoriesUsersService.js';
import AppbarCom from '../../../components/AppbarCom.jsx';
import { useColorMode, useScreenWidth } from '../StylesFunctions/SetStylesFunctions.js';


// Helper function to recursively generate new IDs for nested children
const generateNewIdsForChildren = (component) => {
    const newComponent = { ...component, id: uuidv4() };
    if (newComponent.children && newComponent.children.length > 0) {
        newComponent.children = newComponent.children.map(child => generateNewIdsForChildren(child));
    }
    return newComponent;
};

const StyledEditPage = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8),
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
            const {rows} = await fetchUserStylePropCategories(null, null, null, null, null, 100)
            setStyleCategories(() => rows)
        }

        fetchStyleCategories()
    }, [])


    const { data ,setData} = useEffectFetchData(fetchSpecificUserDesign,params , true , true )


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
                if (style_prop?.is_section) {
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


    const addComponentForComponent = (section_component_id) => {
        const index = sectionData.children.findIndex(component => component.id === section_component_id);
        if (index !== -1) {
            const newComponent = generateNewIdsForChildren(sectionData.children[index]);
    
            // Find the maximum sequence_number among the children
            const maxSequenceNumber = Math.max(...sectionData.children.map(component => component.sequence_number));
            
            // Set the new component's sequence_number to maxSequenceNumber + 1
            newComponent.sequence_number = maxSequenceNumber + 1;
    
            setSectionData((prevData) => {
                const updatedComponents = [...prevData.children];
    
                // Insert the new component after the current component
                updatedComponents.splice(index + 1, 0, newComponent);
    
                // Sort the components by sequence_number to ensure order is maintained
                updatedComponents.sort((a, b) => a.sequence_number - b.sequence_number);
    
                return {
                    ...prevData,
                    children: updatedComponents,
                };
            });
    
            setHistory(prevHistory => [...prevHistory, sectionData]);
        }
    };
    
    
    const deleteComponentForComponent = (section_component_id) => {
        const index = sectionData.children.findIndex(component => component.id === section_component_id);
        if (index !== -1) {
            setData((prevData) => {
                const updatedComponents = [...prevData.children];
                updatedComponents.splice(index, 1);
    
                // Yalnızca bir bileşen varsa ve sequence_number 3 ise, sequence_number değerini 1'e düşür
                if (updatedComponents.length === 1 && updatedComponents[0].sequence_number === 3) {
                    updatedComponents[0].sequence_number = 1;
                }
    
                return {
                    ...prevData,
                    children: updatedComponents,
                };
            });
            setHistory(prevHistory => [...prevHistory, sectionData]);
        }
    };
    

    // create designed component
    const createDesignedComponent = (component) => {
        // Yeni bileşenin sequence_number değerini belirlemek için mevcut bileşenleri kontrol et
        let maxSequenceNumber = 0;
        sectionData.children.forEach(existingComponent => {
            if (existingComponent.sequence_number > maxSequenceNumber) {
                maxSequenceNumber = existingComponent.sequence_number;
            }
        });
    
        // Yeni bileşenin sequence_number değeri mevcut en yüksek sequence_number değerinden 1 fazla olmalı
        component.sequence_number = maxSequenceNumber + 1;
    
        // State'i güncelle ve yeni bileşeni ekle
        setData((prevData) => {
            const updatedComponents = prevData && Array.isArray(prevData.children) 
                ? [...prevData.children, component] 
                : [component];
            
            return {
                ...prevData,
                children: updatedComponents,
            };
        });
    
        setHistory(prevHistory => [...prevHistory, data]);
    };
    
    
    // add new element to component 
    const handleAddNewElement = useCallback((componentId , element) => {
        setData((prevData) => ({
            ...prevData,
            children: prevData.children.map((component) => {
                if (component.id === componentId) {
                    return {
                        ...component,
                        children: [...component.children,  element],
                    };
                }
                return component;
            }),
        }));
    }, [setData]);
    
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
            setData(previousState);
            // Son işlemi işlem geçmişinden kaldır
            setHistory(prevHistory => prevHistory.slice(0, -1));
        }
    };

    const SaveSectionData =async ()=> {

        cleanDesignDataDesignPage(sectionData) 
        const updatedDesign = await updateUserDesigns(section_id , sectionData)
    }


    const {
        isMobileWidth,
        isTabletWidth,
        isLaptopWidth,
        handleSmartphoneClick,
        handleTabletClick,
        handleLaptopClick,
    } = useScreenWidth();

    const { mode, toggleColorMode } = useColorMode();


    return (
        <StyledEditPage>

                <AppbarCom
                    isEditPage = {true}
                    mode={mode}
                    toggleColorMode={toggleColorMode}
                    handleSmartphoneClick={handleSmartphoneClick}
                    handleTabletClick={handleTabletClick}
                    handleLaptopClick={handleLaptopClick}
                />

            <AdminMainButton
                title="Save"
                type="custom"
                onClick={()=> SaveSectionData()}
                appearance="primary"
                putTooltip                                
                icon={<SaveIcon />}
                sx={{
                    fontWeight: '900',
                    borderRadius : '5pxpx',
                    color: 'rgb(25, 17, 5)',
                    backgroundColor: 'rgb(255, 221, 173)',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                        backgroundColor: 'rgb(25, 17, 5)',
                        color : 'rgb(255, 221, 173)'
                    },
                    position: 'absolute',
                    right: '100px',
                    marginTop: '20px',
                }}
            />
            <Alert severity="warning" sx={{
                marginBottom  :'20px'
            }}>
                <AlertTitle>Warning</AlertTitle>
                Don't forget to click on the Save button
                </Alert>
            <ConfirmationDialog
                open={confirmationDialogOpen}
                onClose={closeConfirmationDialog}
                onConfirm={handleConfirmDelete}
            />

            <HoverBox key={section_id} sx={{...sectionStyle , 
            width: isMobileWidth ? '500px' : isTabletWidth ? '50%' : isLaptopWidth ? '100%' : '',
            padding: isMobileWidth ? '0px' : isTabletWidth ? '0px' : '',
            margin: '100px auto',
            }}>
                {sectionData && sectionData.children && sectionData.children.slice() // Diziyi mutasyona uğratmamak için slice kullanıyoruz
                    .sort((a, b) => a.sequence_number - b.sequence_number)
                    .map((component, i) => (
                        <Box key={component.id}>
                        <EditComponent 
                            key={component.id} 
                            component={component} 
                            componentId={AddElementToComponentId}
                            handleAddNewElement={handleAddNewElement} 
                            elements={[AddElement, setAddElement]}
                            sectionDataState={[sectionData, setSectionData]}
                            styleCategories={styleCategories}
                        />
                        
                        <ActionButtons className="action-buttons">

                        {i === sectionData.children.length - 1 && (
                        <AdminMainButton
                            title="Duplicate"
                            type="custom"
                            onClick={() => addComponentForComponent(component.id)}
                            appearance="iconButton"
                            putTooltip                                
                            icon={<AddBoxIcon />}
                            sx={EditButtonsStyle}
                        />
                    )}
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
                                    <ElementsTypeModal
                                    createDesignedDesign = {handleAddNewElement}
                                    selected_parent_id = {component.id}                                     
                                    />
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
                                    name_of_design="Style Section"
                                    type_of_design='section'
                                    handleSectionStyleChange={handleSectionStyleChange}
                                    styleCategories={styleCategories}
                                    sectionStyleProps={sectionStyle}
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
                            <ModalDesignCategories  
                            createDesignedDesign = {createDesignedComponent}
                            appliedFilter = {appliedFilterForComponent}
                            selected_parent_id = {section_id} 
                            NameOfCategories = {'component'}
                            ></ModalDesignCategories>
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
                                    <ModalDesignCategories  
                                    createDesignedDesign = {createNewSection} 
                                    appliedFilter = {appliedFilterForSections}
                                    NameOfCategories = {'section'}

                                    ></ModalDesignCategories>

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

        </StyledEditPage>
    );
};

export default EditPage;  



