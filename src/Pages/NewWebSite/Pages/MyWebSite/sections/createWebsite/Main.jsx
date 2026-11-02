import { useState, useCallback } from 'react';
import { styled } from '@mui/system';
import StartWebSite from './Sections/StartWebSite';
import InfoWebSite from './Sections/InfoWebSite';
import { Box, Container, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';




import _ from 'lodash';
import { addUserWebProject } from '../../../../../../Services/UserServices/Services/webProjectsUsersService';
import { useSelector } from 'react-redux';

const StyledMain = styled(Box)(() => ({}));

const Main = () => {
    const [selectedBox, setSelectedBox] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);

    const navigate = useNavigate();

    const languages = ["English", "Spanish", "French", "German", "Arabic"];
    const industries = ["Technology", "Healthcare", "Finance", "Education", "Entertainment", "Retail"];

    const handleBoxClick = useCallback((box) => {
        setSelectedBox(box);
    }, []);

    const handleNextClick = useCallback(() => {
        setCurrentStep((prevStep) => prevStep + 1);
    }, []);

    const handleBackClick = useCallback(() => {
        setCurrentStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
    }, []);

    const handleTextFieldChange = useCallback((setter) => (value) => {
        setter(value);
    }, []);

    const handleUploadImageClick = useCallback((setter) => () => {  
        const inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.accept = 'image/*';
        inputElement.onchange = (e) => {
            const file = e.target.files[0];
            setter(file);
        };
        inputElement.click();
    }, []);

    const user = useSelector(state => state.authSlice.user)


    // get the Template and duplicate the template  




    const handleSubmit = useCallback(async () => {
        try {
            let updatedTemplate = {};
            updatedTemplate["project_title"] = name
            updatedTemplate["project_logo"] = uploadedImage
            updatedTemplate["project_type"] = selectedBox
            updatedTemplate["project_job"] = selectedIndustry
            updatedTemplate["project_description"] = description
            updatedTemplate["is_template"] = 0
            updatedTemplate["is_own_project"] = 0
            updatedTemplate["user_id"] = user?.id

            // updatedTemplate["page_path"] = "/"
      
            const res = await addUserWebProject(updatedTemplate);
            console.log(res)
            if (res.success) {
                // setCurrentStep((prevStep) => prevStep + 1);
                navigate('/empty-design/' + res.data.id  )

            }
        } catch (error) {
            console.error('Error submitting project:', error);
        }
    }, [name, uploadedImage, selectedBox, selectedIndustry, description, user?.id, navigate]);

    
    return (
        <StyledMain>
            <Box
                id="hero"
                sx={(theme) => ({
                    width: '100%',
                    
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
                    <Stack
                        spacing={2}
                        useFlexGap
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }}
                    >
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
                                handleTextFieldChangeName={handleTextFieldChange(setName)}
                                handleTextFieldChangeDescription={handleTextFieldChange(setDescription)}
                                handleSubmit={handleSubmit}
                                name={name}
                                description={description}
                                selectedLanguage={selectedLanguage}
                                selectedIndustry={selectedIndustry}
                                setSelectedLanguage={setSelectedLanguage}
                                setSelectedIndustry={setSelectedIndustry}
                                languages={languages}
                                industries={industries}
                                handleUploadImageClick={handleUploadImageClick(setUploadedImage)}
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
