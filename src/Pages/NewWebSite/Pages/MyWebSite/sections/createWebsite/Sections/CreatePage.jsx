//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import CustomTextField from '../../../../../../../Components/CustomTextField/CustomTextField'
import { AdminMainButton } from '../../../../../../../Components'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import logoDark from '../../../../../../../assets/Images/Cliser-Dark-Theme.png';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';


//Styled Components
const StyledCreatePage = styled(Box)(
    () => ({
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 20,
        padding: '20px',
        borderRadius: '20px',

    })
);



const customSelectStyle = {
    '&:hover': {
        transition: 'all 0.3s ease',
        backgroundColor: "#dbdbdbb0",
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '600px',
    minWidth: '300px',
    width: '100%', // Ensure it takes the full width available
};



const CreatePage = ({
    handleTextFieldChangePage_title,
    handleTextFieldChangePage_description,
    handleBackClick,
    handleSubmit,
    page_title,
    handleUploadImageClickPage,
    uploadedImagePage,
    page_description
}) => {

    const isSubmitDisabled = !page_title || !page_description || !uploadedImagePage; // Disable submit button if any of the inputs are empty

    return (
        <StyledCreatePage>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    width: '400px', // Ensure it takes the full width available
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: '30px',
                        color: (theme) =>
                            theme.palette.mode === 'light' ? 'text.light' : 'text.dark',
                    }}
                >
                    Create a First Page 
                </Typography>

                <Box sx={{ width: '100%', maxWidth: '600px' }}>
                    <CustomTextField
                        id="page-title"
                        label="Page name"
                        variant="outlined"
                        value={page_title}
                        onChange={handleTextFieldChangePage_title}
                        disableHover={true} // Pass disableHover prop to disable hover effect
                        BoxStyle={customSelectStyle}
                        TextFiledStyle={{
                            borderRadius: '20px',
                        }}
                        labelStyle={{
                            fontWeight: '700',
                            fontSize: '20px',
                            borderRadius: '20px',
                            textAlign: 'center'
                        }}  // Customize label style
                        inputStyle={{
                            fontWeight: '700',
                            fontSize: '20px',
                        }}
                    />
                </Box>

                <Box sx={{ width: '100%', maxWidth: '600px' }}>
                    <CustomTextField
                        id="page-description"
                        label="Page Description"
                        variant="outlined"
                        value={page_description}
                        onChange={handleTextFieldChangePage_description}
                        disableHover={true} // Pass disableHover prop to disable hover effect
                        TextFiledStyle={{
                            borderRadius: '0px',
                        }}
                        BoxStyle={customSelectStyle}
                        labelStyle={{
                            fontWeight: '700',
                            fontSize: '20px'
                        }}  // Customize label style
                        inputStyle={{
                            fontWeight: '700',
                            fontSize: '20px'
                        }}
                    />
                </Box>



                <AdminMainButton
                    sx={{
                        width: '100%', // Make the button responsive
                        maxWidth: '420px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#eee',
                        backgroundColor: '#092635',
                        fontWeight: 'bold',
                        boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                    }}
                    title='Upload Image '
                    type='custom'
                    appearance='primary'
                    icon={<AddCircleOutlineIcon />}
                    onClick={handleUploadImageClickPage}
                />

                {uploadedImagePage && (
                    <img
                        src={URL.createObjectURL(uploadedImagePage)} // Use URL.createObjectURL to create a URL for the uploaded image
                        alt="Uploaded Image"
                        style={{
                            width: '200px',
                            height: '200px',
                        }}
                    />
                )}


                <Box sx={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '420px' }}>
                    <AdminMainButton
                        title="Back"
                        appearance="primary"
                        filled
                        type="custom"
                        onClick={handleBackClick}
                        icon={<WestIcon />}
                        sx={{
                            color: "primary.contrastText",
                            width: '100%', // Make the button responsive
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            },
                        }}
                    />

                    <AdminMainButton
                        title="Create Page"
                        appearance="primary"
                        filled
                        type="custom"
                        onClick={handleSubmit}
                        disabled={isSubmitDisabled}
                        icon={<EastIcon />}
                        sx={{
                            color: "primary.contrastText",
                            width: '100%', // Make the button responsive
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            },
                        }}
                    />
                </Box>

            </Box>

            <Box sx={{
                borderRadius: "10px",
                backgroundImage: "linear-gradient(60deg, #29323c 0%, #485563 100%)",
                width: "100%",
                maxWidth: "400px",
            }}>
                <img src={logoDark} alt="" style={{
                    width: '100%'
                }} />
            </Box>

            
        </StyledCreatePage>
    );
};

export default CreatePage;