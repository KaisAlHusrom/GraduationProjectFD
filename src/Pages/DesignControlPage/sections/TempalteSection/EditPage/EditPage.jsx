import React, {
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

//MUI
import { Box } from '@mui/material';
import { styled } from '@mui/system'
import { Edit as EditIcon } from '@mui/icons-material';
import StyleBox from '../components/StyleBox.jsx';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';



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
    else if (section_id === "16") {
    const CarouselDataModule = await import("../sections/Slider/SliderData.json");
            return CarouselDataModule.default;
        }
};


//Styled Components
const StyledEditPage = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8),
    backgroundColor : 'white',
    
}));


const TooltipContainer = styled(Box)({
    position: 'absolute',
    top: '0',
    left: '0',
    opacity: 0, // Initially set opacity to 0
    visibility: 'hidden', // Initially hide the TooltipContainer
    transition: 'opacity 1s ease', // Apply transition effect to opacity
});

const HoverableBox = styled(Box)({
    '&:hover > div': {
        opacity: 1, // Show the TooltipContainers when StyledEditComponent is hovered
        visibility: 'visible',
    },
});


const EditPage = () => {

    const { section_id } = useParams();
    const [sectionStyle, setSectionStyle] = useState({});
    const [sectionData, setSectionData] = useState(null);

    useEffect(() => {
        const fetchSectionData = async () => {
            const fetchedData = await getSectionData(section_id);
            setSectionData(fetchedData);
            // setData(fetchedData); // Burada data değişkenini de güncelliyoruz
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
        console.log(section_component_id)
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
    
    const deleteLastComponentForComponent = (section_component_id) => {
        console.log(section_component_id)

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
    
    
    return (
        <StyledEditPage>

            <HoverableBox key={section_id} sx={sectionStyle}>

            {sectionData && sectionData.section_components && sectionData.section_components.map((component, i) => (
                    <Box key= {component.section_component_id}  >

                        <EditComponent key={i} component={component} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' , position:'absolute'}}>
                            <AdminMainButton
                                title="Add"
                                type="custom"
                                onClick={() => addComponentForComponent(component.section_component_id)}
                                appearance="button"
                                putTooltip
                                icon={<AddBoxIcon />}
                                sx={{
                                    width:'150px',
                                    border: '1px solid red',
                                    padding: '10px 15px',
                                    fontWeight: 'bold',
                                    color: 'white.main',
                                    backgroundColor: 'black',
                                    transition: 'background-color 0.8s',
                                    '&:hover': {
                                        backgroundColor: 'gray',
                                    },
                                }}
                            />
                            <AdminMainButton
                                title="Delete"
                                type="custom"
                                onClick={() => deleteLastComponentForComponent(component.section_component_id)}
                                appearance="button"
                                putTooltip
                                icon={<DeleteSweepIcon />}
                                sx={{
                                    width:'150px',
                                    border: '1px solid red',
                                    padding: '10px 15px',
                                    fontWeight: 'bold',
                                    color: 'white.main',
                                    backgroundColor: 'black',
                                    transition: 'background-color 0.3s',
                                    '&:hover': {
                                        backgroundColor: 'gray',
                                    },
                                }}
                            />
                        </Box>

                    </Box>
))}

                <TooltipContainer>
                    <AdminMainButton
                        title="Edit Section"
                        type="StyleDialog"
                        appearance="iconButton"
                        putTooltip
                        icon={<EditIcon />}
                        willShow={
                            <StyleBox 
                            Section_Name = {"Style Section"}
                            element_Type = 'section'
                            sectionStyle = {sectionStyle}
                            handleSectionStyleChange = {handleSectionStyleChange}
                            styleProperties={['opacity', 'borderRadius', 'display', 'flexDirection', 'alignItems', 'width', 'height']}
                            />
                        }
                        sx={{
                            border: '1px solid red',
                            padding: '10px 15px',
                            fontWeight: 'bold',
                            color: 'white.main',
                            backgroundColor: 'black',
                        }}
                    />
                </TooltipContainer>
            

            </HoverableBox>

        </StyledEditPage>
    );
};

export default EditPage;