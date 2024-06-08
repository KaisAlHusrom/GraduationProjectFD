//React
import { useCallback, useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Typography
} from '@mui/material'
import { styled } from '@mui/system'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import _ from 'lodash';

//propTypes 
import propTypes from 'prop-types'
import CustomTextField from '../../../../Components/CustomTextField/CustomTextField'
import { AdminMainButton } from '../../../../Components'
import { writeFilterObject } from '../../../../Helpers/filterData';
import useFetchData from '../../../../Helpers/customHooks/useFetchData';
import { addUserPages, fetchUserPages } from '../../../../Services/UserServices/Services/pagesUsersService';
import { cleanDesignDataDesignPage, updateID2 } from '../../../../Helpers/RecursiveHelpers/addNewElementToSpecificElement';
import { v4 as uuIdv4 } from 'uuid';
import { ButtonStyle } from '../../sections/EmptyDesign/StylesFunctions/SetStylesFunctions';

//Styled Components
const StyledAddNewPage = styled(Box)(
    ({ theme }) => ({
    
    })
)

const TextFiledStyle = {

    
}

const AddNewPage = ({WepProject_id}) => {

    const [title , setTitle] = useState()
    const [description , setDescription] = useState()
    const [path , setPath] = useState()
    const [uploadedImagePage, setUploadedImagePage] = useState(null);

    const handleTextFieldChange = useCallback((setter) => (value) => {
        setter(value);
    }, []);

    const appliedFilter = useMemo(() => {
        return [
            writeFilterObject('is_template', 'bool', '=', 'true'), 
        ]
        
    }, [])
    const { data } = useFetchData(fetchUserPages, 'all', appliedFilter, null, true, null, null, 10)


    const handleSubmitPage = async () => {
        try {
            let updatedTemplate = _.cloneDeep(data[0]);
            updatedTemplate["page_title"] = title,
            updatedTemplate["page_image"] = uploadedImagePage,
            updatedTemplate["page_description"] = description,
            updatedTemplate["is_template"] = 0,
            updatedTemplate["web_project_id"] = WepProject_id,
            updatedTemplate["page_path"] = "/"
            updatedTemplate['id'] = uuIdv4()
            updateID2(updatedTemplate?.designs)
            cleanDesignDataDesignPage(updatedTemplate.designs)
            updatedTemplate['designs'] = updatedTemplate['designs']?.map((design) => {
                design['page_id'] = updatedTemplate.id;
                return design;
            });
            
            const res = await addUserPages(updatedTemplate);
            
            // if(res.success) {
            //     navigate('/empty-design/' + webProjectId  )
            // }

        } catch (error) {
            console.error('Error submitting page:', error);
        }

    }



    const handleUploadImageClick = useCallback(() => () => {
        const inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.accept = 'image/*';
        inputElement.onchange = (e) => {
            const file = e.target.files[0];
            setUploadedImagePage(file);
        };
        inputElement.click();
    }, []);
    const isSubmitDisabled = !title || !description || !uploadedImagePage || !path; // Disable submit button if any of the inputs are empty


    return (
        <StyledAddNewPage>
            <Typography>
                    Add New Page
            </Typography>

            <Box sx = {{
                display  : 'flex', 
                alignItems : 'center',
                justifyContent : 'center',
                flexWrap : 'wrap',
                gap : '10px',
                width : '100%',
            }}>
            <CustomTextField 
                    id={"1"}
                    label="Page title"
                    required = {true}
                    onChange={handleTextFieldChange(setTitle)}
                    BoxStyle={{ marginTop: '10px' , width: '300px'}}
                    TextFiledStyle = {TextFiledStyle}
                />
                    <CustomTextField 
                    id={"2"}
                    required = {true}
                    onChange={handleTextFieldChange(setDescription)}

                    label="Page Description"
                    BoxStyle={{ marginTop: '10px' , width: '300px'}}
                    TextFiledStyle = {TextFiledStyle}

                />
                    <CustomTextField 
                    id={"3"}
                    required = {true}
                    label="Page Path"
                    onChange={handleTextFieldChange(setPath)}
                    BoxStyle={{ marginTop: '10px' , width: '300px'}}
                    TextFiledStyle = {TextFiledStyle}

                />
                    <Box
                    sx = {{
                        display : 'flex',
                        flexDirection : 'column',
                        justifyContent : 'center',
                        alignItems : 'center',
                        width : '100%'
                    }}
                    >
                    <AdminMainButton
                            sx={ButtonStyle}
                            title='Upload Image'
                            type='custom'
                            appearance='primary'
                            icon={<AddCircleOutlineIcon />}
                            onClick={handleUploadImageClick()}
                        />
                {uploadedImagePage && (
                    <img
                        src={URL.createObjectURL(uploadedImagePage)} // Use URL.createObjectURL to create a URL for the uploaded image
                        alt="Uploaded Image"
                        style={{
                            width: '200px',
                            height: '200px',
                            marginTop :'20px'
                        }}
                    />
                )}
                    </Box>

                    <AdminMainButton
                            sx={{...ButtonStyle , backgroundColor : 'success.dark' , 
                            '&:hover' : {
                                backgroundColor: 'warning'
                                },
                            }}
                            title='Save'
                            type='custom'
                            appearance='primary'
                            icon={<AddCircleOutlineIcon />}
                            disabled={isSubmitDisabled}

                            onClick={handleSubmitPage}
                        />

                        {
                            isSubmitDisabled ? (
                                <Typography sx = {{
                                    color : 'error.main',
                                    width : '100%',
                                    fontWeight :'bold',
                                    textAlign :'center'
                                }}>
                                    Please fill the all Info
                                </Typography>
                            ) : null
                        }
            </Box>
        </StyledAddNewPage>
    );
};

AddNewPage.propTypes = {
    WepProject_id: propTypes.string,
}

export default AddNewPage;