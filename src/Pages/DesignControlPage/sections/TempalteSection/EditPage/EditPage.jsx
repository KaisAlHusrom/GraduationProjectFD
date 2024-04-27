import {
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

import AddElementModal from '../components/AddElementModal.jsx';

//MUI
import { Box } from '@mui/material';
import { styled } from '@mui/system'
import { Edit as EditIcon } from '@mui/icons-material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import AddComponentModal from '../components/AddComponentModal.jsx';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SectionsModal from './Modals/SectionsModal.jsx';



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
        const CarouselDataModule = await import("../sections/Services/ServicesData.json");s
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
    else if (section_id === "16") {
    const CarouselDataModule = await import("../sections/Slider/SliderData.json");
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
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: '10px',
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity 0.3s ease',
    width :'100px'
});
const EditButtonsStyle = {
    border: '1px solid red',
    padding: '10px 15px',
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
    const [sectionStyle, setSectionStyle] = useState({});
    const [sectionData, setSectionData] = useState(null);

    useEffect(() => {
        const fetchSectionData = async () => {
            const fetchedData = await getSectionData(section_id);
            setSectionData(fetchedData);
            const dictionary = {};
            if (fetchedData && fetchedData.section_css_props) {
                fetchedData.section_css_props.forEach((cssProp) => {
                    const { css_prop, css_prop_value } = cssProp;
                    if (css_prop.is_section) {
                        dictionary[css_prop.prop_name] = css_prop_value;
                    }
                });
                setSectionStyle(dictionary);
            }
        };
        fetchSectionData();
    }, [section_id]);


    const handleSectionStyleChange = (newStyle) => {
        setSectionStyle((prevStyle) => ({ ...prevStyle, ...newStyle }));
    };

    const addComponentForComponent = (section_component_id) => {
        const index = sectionData.section_components.findIndex(component => component.section_component_id === section_component_id);
        if (index !== -1) {
            const newComponent = { ...sectionData.section_components[index], section_component_id: uuidv4() };
            setSectionData((prevData) => {
                const updatedComponents = [...prevData.section_components];
                updatedComponents.splice(index + 1, 0, newComponent);
                return {
                    ...prevData,
                    section_components: updatedComponents,
                };
            });
        }
    };
    
    const deleteComponentForComponent = (section_component_id) => {
        const index = sectionData.section_components.findIndex(component => component.section_component_id === section_component_id);
        if (index !== -1) {
            setSectionData((prevData) => {
                const updatedComponents = [...prevData.section_components];
                updatedComponents.splice(index, 1);
                return {
                    ...prevData,
                    section_components: updatedComponents,
                };
            });
        }
    };

    const createNewComponent = (section_css_props) => {
        // Update the state to include the new component
        setSectionData((prevData) => {
            const updatedComponents = [...prevData.section_components, createEmptyComponent(section_css_props)];
            return {
                ...prevData,
                section_components: updatedComponents,
            };
        });
    };

    const createDesignedComponent = (component) => {
        // Update the state to include the new component
        setSectionData((prevData) => {
            const updatedComponents = [...prevData.section_components, component];
            return {
                ...prevData,
                section_components: updatedComponents,
            };
        });
    };

    const createNewElement = (selectedComponentId, element_type, element_content) => {
        // Yeni elementi oluştur
        const newElement = createEmptyElement(selectedComponentId, element_type, element_content);
    
        // Bileşenin durumunu güncelle ve yeni elementi ekleyerek
        setSectionData((prevData) => ({
            ...prevData,
            section_components: prevData.section_components.map((component) => {
                if (component.section_component_id === selectedComponentId) {
                    return {
                        ...component,
                        component_elements: [...component.component_elements, newElement],
                    };
                }
                return component;
            }),
        }));
    };


    const deleteSection = () => {
        setSectionData(prevData => ({
            ...prevData,
            section_components: [] // Set section_components to an empty array
        }));
    };


    const deleteComponentElements = (section_component_id) => {
        const index = sectionData.section_components.findIndex(component => component.section_component_id === section_component_id);
        if (index !== -1) {
            setSectionData((prevData) => {
                const updatedComponents = [...prevData.section_components];
                // Update the component_elements array for the specific section_component
                updatedComponents[index].component_elements = [];
                return {
                    ...prevData,
                    section_components: updatedComponents,
                };
            });
        }
    }

    const createNewSection = (SectionsDesigns) => {
        setSectionData(SectionsDesigns)
        if (SectionsDesigns && SectionsDesigns.section_css_props) {
            const dictionary = {};
            SectionsDesigns.section_css_props.forEach((cssProp) => {
                const { css_prop, css_prop_value } = cssProp;
                if (css_prop.is_section) {
                    dictionary[css_prop.prop_name] = css_prop_value;
                }
            });
            setSectionStyle(dictionary);
        }
        console.log(SectionsDesigns)
    };


    return (
        <StyledEditPage>


            <HoverBox key={section_id} sx={sectionStyle}>
                {sectionData && sectionData.section_components && sectionData.section_components.map((component, i) => (
                    <Box key={component.section_component_id}>
                        
                        <EditComponent key={i} component={component} />

                        <ActionButtons className="action-buttons">

                            <AdminMainButton
                                title="Add"
                                type="custom"
                                onClick={() => addComponentForComponent(component.section_component_id)}
                                appearance="iconButton"
                                putTooltip                                
                                icon={<AddBoxIcon />}
                                sx={EditButtonsStyle}
                            />
                            <AdminMainButton
                                title="Delete"
                                type="custom"
                                onClick={() => deleteComponentForComponent(component.section_component_id)}
                                appearance="iconButton"
                                putTooltip
                                icon={<DeleteSweepIcon />}
                                sx={EditButtonsStyle}
                            />
                            <AdminMainButton
                                title="Delete All Component Elements"
                                type="custom"
                                appearance="iconButton"
                                putTooltip
                                onClick={() => deleteComponentElements(component.section_component_id)}
                                icon={<DeleteSweepIcon />}
                                sx={EditButtonsStyle}
                            />
                            <AdminMainButton
                                title="Add elements"
                                type="StyleDialog"
                                appearance="iconButton"
                                putTooltip
                                willShow={
                                    <AddElementModal  componentSection_component_id = {component.section_component_id} createNewElement = {createNewElement}></AddElementModal>
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
                            sx={EditButtonsStyle}

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


                    </Box> 
                
            </TooltipContainer>

            </HoverBox>

        </StyledEditPage>
    );
};

export default EditPage;  


