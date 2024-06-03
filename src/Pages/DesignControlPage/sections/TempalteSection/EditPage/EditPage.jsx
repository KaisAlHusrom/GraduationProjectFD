import {
    useCallback,
    useEffect,
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
import {SectionsDesigns } from './Data/ConstSectionsData.jsx'
import SectionsModal from './Modals/SectionsModal.jsx';
import AddElementModal from '../components/AddElementModal.jsx';
import AddComponentModal from '../components/AddComponentModal.jsx';

//MUI
import { Box } from '@mui/material';
import { styled } from '@mui/system'
import { Edit as EditIcon } from '@mui/icons-material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ListAltIcon from '@mui/icons-material/ListAlt';
import UndoIcon from '@mui/icons-material/Undo';
import ConfirmationDialog from '../components/ConfirmationDialog.jsx';



const getSectionData = async (section_id) => {
    if (section_id === "10") {
        const TeamDataModule = await import("../sections/Team/TeamData.json");
        return TeamDataModule.default;
    } else if (section_id === "11") {
        const CarouselDataModule = await import("../sections/Carousel/CarouselData.json");
        return CarouselDataModule.default;
    }
    else if (section_id === "12") {
        const CarouselDataModule = await import("../sections/Work/WorkData.json");
        return CarouselDataModule.default;
    }
    else if (section_id === "13") {
        const CarouselDataModule = await import("../sections/Counters/CountersData.json");
        return CarouselDataModule.default;
    }
    else if (section_id === "14") {
        const CarouselDataModule = await import("../sections/Services/ServicesData.json");
        return CarouselDataModule.default;
    }
    else if (section_id === "15") {
        const CarouselDataModule = await import("../sections/Footer/FooterData.json");
        return CarouselDataModule.default;
    }
    else if (section_id === "1") {
        const CarouselDataModule = await import("../sections/Header/HeaderData.json");
        return CarouselDataModule.default;
    }
    else if (section_id === "2") {
    const CarouselDataModule = await import("../sections/NavBar/NavBarData.json");
        return CarouselDataModule.default;
    }
    else if (section_id === "17") {
        const CarouselDataModule = await import("../sections/SendMessage/SendMessageData.json");
            return CarouselDataModule.default;
        }

};


const StyledEditPage = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8),
    backgroundColor: 'white',
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
    backgroundColor: '#304D30',
    transition: 'background-color 0.3s',
    '&:hover': {
        backgroundColor: 'rgb(7, 15, 43)',
    },
}

const EditPage = () => {
    const { section_id } = useParams();
    const [history, setHistory] = useState([]); // Kullanıcının yaptığı işlemleri saklayacak dizi
    const [sectionStyle, setSectionStyle] = useState({}); // using for changing the section style 
    const [sectionData, setSectionData] = useState([]); // using for Control  section data 

    const [AddElement , setAddElement] = useState(null) // using for add new element 
    const [AddElementToComponentId , setAddElementToComponentId] = useState(null) // using for selected component id to add new  element

    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

    const openConfirmationDialog = () => {
        setConfirmationDialogOpen(true);
    };
    
    const closeConfirmationDialog = () => {
        setConfirmationDialogOpen(false);
    };

    //  get the section style
    useEffect(() => {
        const fetchSectionData = async () => {
            const fetchedData = await getSectionData(section_id);
            setSectionData(fetchedData);
            const dictionary = {};
            if (fetchedData && fetchedData.styles) {
                fetchedData.styles.forEach((cssProp) => {
                    const {  style_prop, style_prop_value } = cssProp;
                    if (style_prop.is_section) {
                        dictionary[style_prop.style_prop_css_name] = style_prop_value;
                    }
                });
                setSectionStyle(dictionary);
            }
        };
        fetchSectionData();
    }, [section_id]);

    // change the section style
    const handleSectionStyleChange = (newStyle) => {
        setSectionStyle((prevStyle) => ({ ...prevStyle, ...newStyle }));
    };
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
            const updatedComponents = [...prevData.children, component];
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
                                    <AddElementModal 
                                    setAddElementToComponentId = {setAddElementToComponentId} 
                                    elements =  {[AddElement , setAddElement]}  
                                    componentSection_component_id = {component.id} 
                                    ></AddElementModal>
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
                                    styleProperties={['opacity', 'borderRadius', 'display', 'flexDirection', 'alignItems', 'width', 'height']}
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
                            <AddComponentModal  createNewComponent = {createNewComponent}  createDesignedComponent = {createDesignedComponent}></AddComponentModal>
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
                                    <SectionsModal SectionsDesigns = {SectionsDesigns} createNewSection = {createNewSection}></SectionsModal>
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


