//React
import {
    useMemo, useState 
} from 'react'
import { useParams } from 'react-router-dom';

import {
    
} from 'react-redux'

//Components
import EditComponent from './EditComponent.jsx';
import ColorButtons from '../components/ColorButtons';
import CustomSelectInput from '../../../../../Components/CustomSelectInput/CustomSelectInput';
import * as utils from '../StylesFunctions/SetStylesFunctions.js';

//MUI
import { Box, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/system'


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
};

const customSelectStyle = {
    display: 'block',
    width: '300px',
    padding: '5px',
    borderColor: 'red',
    transition: '0.3s all',
    borderRadius: '10px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: "white.dark",
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
    },
};


//Styled Components
const StyledEditPage = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8),
    backgroundColor : 'white'
}));


const EditPage = () => {

    const { section_id } = useParams();
    const [sectionStyle, setSectionStyle] = useState({});
    const [sectionData, setSectionData] = useState(null);

    
    useMemo(() => {
        const fetchSectionData = async () => {
            const data = await getSectionData(section_id);
            setSectionData(data);
            const dictionary = {};
            if (data && data.section_css_props) {
                data.section_css_props.forEach((cssProp) => {
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

    return (
        <StyledEditPage>

            <Box key={section_id} sx={sectionStyle}>
                {sectionData && sectionData.section_components && sectionData.section_components.map((component, i) => (
                    <EditComponent key={i} component={component} />
                ))}
            </Box>

            <Typography component="div" variant='h3' sx={{ textAlign: 'center', padding: '10px', color: 'warning.dark' }}>
                Style of section
            </Typography>


            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'grey',
                width: '50%',
                margin: 'auto',
                padding: '20px',
                borderRadius: '10px',
            }}>

                <Box sx={{ display: 'block', width: '70%' }}>
                    <ColorButtons
                        drawerAnchor="right"
                        ButtonName="Change Back Color"
                        currentColor={sectionStyle.backgroundColor}
                        handleColorSelect={(newColor) => handleSectionStyleChange({ backgroundColor: newColor })}
                        generateRandomColor={() => handleSectionStyleChange({ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` })}
                    />
                </Box>

                {['opacity', 'borderRadius', 'display', 'flexDirection', 'alignItems', 'width'].map((key, index) => (
                    <CustomSelectInput
                        key={index}
                        name={key}
                        className={customSelectStyle}
                        onChange={(e) => handleSectionStyleChange({ [key]: e.target.value })}
                        valueSet={sectionStyle[key] || ''}
                    >
                        {utils[key]?.map((item, index) => (
                            <MenuItem key={index} value={item}>{item}</MenuItem>
                        ))}
                    </CustomSelectInput>
                ))}


            </Box>

        </StyledEditPage>
    );
};

export default EditPage;

