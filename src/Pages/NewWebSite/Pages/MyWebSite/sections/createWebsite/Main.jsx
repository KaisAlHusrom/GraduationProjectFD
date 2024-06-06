import { useState } from 'react';

// Components
import { styled } from '@mui/system';
import StartWebSite from './Sections/StartWebSite';
import InfoWebSite from './Sections/InfoWebSite';

// MUI
import {
    Box,
    Container,
    Stack,
    alpha
} from '@mui/material';
import { addWebProject } from '../../../../../../Services/AdminServices/Services/webProjectsService';

// Styled Components
const StyledMain = styled(Box)(() => ({}));

const Main = () => {
    const [selectedBox, setSelectedBox] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);

    const languages = ["English", "Spanish", "French", "German", "Arabic"];
    const industries = [
        "Technology",
        "Healthcare",
        "Finance",
        "Education",
        "Entertainment",
        "Retail",
    ];

    const handleBoxClick = (box) => {
        setSelectedBox(box);
    };

    const handleNextClick = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleBackClick = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleTextFieldChangeName = (value) => {
            setName(value);
    };
    const handleTextFieldChangeDescription = (value) => {
        setDescription(value);
};
    const handleUploadImageClick = () => {
        const inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.accept = 'image/*';
        inputElement.onchange = (e) => {
            const file = e.target.files[0];
            setUploadedImage(file);
        };
        inputElement.click();
    };



    const handleSubmit = async() => {

        const data = {
            'user_id' : "7b5ed12e-1852-11ef-9062-3822e21e8ed2",
            'project_title' : name, 
            'project_logo' : uploadedImage,
            'project_type' :  selectedBox,
            'project_job' :  selectedIndustry,
            'project_description': description,
            'is_template' : 0,
            'is_own_project' : 0,
        }

        const res = await  addWebProject(data)
        console.log(res)
            if(res.success) {
                console.log(res.data)
            }
            console.log("Submitted data:", { name, description, selectedLanguage, selectedIndustry, uploadedImage });

        // setUploadedImage("");
        // setName("");
        // setDescription("");
        // setSelectedLanguage("");
        // setSelectedIndustry("");
    };

    return (
        <StyledMain>
            <Box
                id="hero"
                sx={(theme) => ({
                    width: '100%',
                    backgroundImage: theme.palette.mode === 'light'
                        ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                        : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
                    backgroundSize: '100% 20%',
                    backgroundRepeat: 'no-repeat',
                })}
            >
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        pt: { xs: 14, sm: 20 },
                        pb: { xs: 8, sm: 12 },
                    }}
                >
                    <Stack spacing={2} useFlexGap sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}>
                        {currentStep === 1 && (
                            <StartWebSite
                                selectedBoxState={[selectedBox, setSelectedBox]}
                                handleBoxClick={handleBoxClick}
                                handleNextClick={handleNextClick}
                            />
                        )}

                        {currentStep === 2 && (
                            <InfoWebSite
                                handleBackClick={handleBackClick}
                                handleTextFieldChangeName={handleTextFieldChangeName}
                                handleTextFieldChangeDescription = {handleTextFieldChangeDescription}
                                handleSubmit={handleSubmit}
                                name={name}
                                description={description}
                                selectedLanguage={selectedLanguage}
                                selectedIndustry={selectedIndustry}
                                setSelectedLanguage={setSelectedLanguage}
                                setSelectedIndustry={setSelectedIndustry}
                                languages={languages}
                                industries={industries}
                                handleUploadImageClick={handleUploadImageClick}
                                uploadedImage={uploadedImage}
                            />
                        )}
                    </Stack>
                </Container>
            </Box>
        </StyledMain>
    );
};

export default Main;
