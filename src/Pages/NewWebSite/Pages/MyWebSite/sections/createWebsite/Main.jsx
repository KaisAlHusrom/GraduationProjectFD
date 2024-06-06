import { useState, useCallback, useMemo } from 'react';
import { styled } from '@mui/system';
import StartWebSite from './Sections/StartWebSite';
import InfoWebSite from './Sections/InfoWebSite';
import CreatePage from './Sections/CreatePage';
import { Box, Container, Stack, alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';


import { writeFilterObject } from '../../../../../../Helpers/filterData';
import useFetchData from '../../../../../../Helpers/customHooks/useFetchData';

import { cleanDesignDataDesignPage, updateID2 } from '../../../../../../Helpers/RecursiveHelpers/addNewElementToSpecificElement';


import { v4 as uuIdv4 } from 'uuid';
import _ from 'lodash';
import { addUserPages, fetchUserPages } from '../../../../../../Services/UserServices/Services/pagesUsersService';
import { addUserWebProject } from '../../../../../../Services/UserServices/Services/webProjectsUsersService';

const StyledMain = styled(Box)(() => ({}));

const Main = () => {
    const [selectedBox, setSelectedBox] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [pageTitle, setPageTitle] = useState('');
    const [pageDescription, setPageDescription] = useState('');
    const [uploadedImagePage, setUploadedImagePage] = useState(null);
    const [webProjectId, setWebProjectId] = useState(null);

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


    const handleSubmit = useCallback(async () => {
        const data = {
            user_id: "be53c718-1115-4cd7-bee8-b0c2bef4735b",
            project_title: name,
            project_logo: uploadedImage,
            project_type: selectedBox,
            project_job: selectedIndustry,
            project_description: description,
            is_template: 0,
            is_own_project: 0,
        };

        try {
            const res = await addUserWebProject(data);
            if (res.success) {
                setWebProjectId(res.data.id);
                setCurrentStep((prevStep) => prevStep + 1);
            }
        } catch (error) {
            console.error('Error submitting project:', error);
        }
    }, [name, uploadedImage, selectedBox, selectedIndustry, description]);



    const appliedFilter = useMemo(() => {
        return [
            writeFilterObject('is_template', 'bool', '=', 'true'), 
        ]
        
    }, [])
    const { data } = useFetchData(fetchUserPages, 'all', appliedFilter, null, true, null, null, 10)
    console.log(data)

    
    const handleSubmitPage = async () => {
        try {
            let updatedTemplate = _.cloneDeep(data[0]);
            updatedTemplate["page_title"] = pageTitle,
            updatedTemplate["page_image"] = uploadedImagePage,
            updatedTemplate["page_description"] = pageDescription,
            updatedTemplate["is_template"] = 0,
            updatedTemplate["web_project_id"] = webProjectId,
            updatedTemplate["page_path"] = "/"
            updatedTemplate['id'] = uuIdv4()
            updateID2(updatedTemplate?.designs)
            cleanDesignDataDesignPage(updatedTemplate.designs)
            updatedTemplate['designs'] = updatedTemplate['designs']?.map((design) => {
                design['page_id'] = updatedTemplate.id;
                return design;
            });
            
            const res = await addUserPages(updatedTemplate);
            
            if(res.success) {
                navigate('/empty-design/' + webProjectId  )
            }

        } catch (error) {
            console.error('Error submitting page:', error);
        }

    }


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
                        {currentStep === 3 && (
                            <CreatePage
                                handleBackClick={handleBackClick}
                                handleTextFieldChangePage_title={handleTextFieldChange(setPageTitle)}
                                handleTextFieldChangePage_description={handleTextFieldChange(setPageDescription)}
                                handleSubmit={handleSubmitPage}
                                uploadedImagePage={uploadedImagePage}
                                page_title={pageTitle}
                                page_description={pageDescription}
                                handleUploadImageClickPage={handleUploadImageClick(setUploadedImagePage)}
                            />
                        )}
                    </Stack>
                </Container>
            </Box>
        </StyledMain>
    );
};

export default Main;
