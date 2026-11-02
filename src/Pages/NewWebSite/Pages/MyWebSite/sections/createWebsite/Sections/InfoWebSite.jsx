// REACT 
import PropTypes from 'prop-types';

// COMPONENT 
import { AdminMainButton } from '../../../../../../../Components';
import CustomTextField from '../../../../../../../Components/CustomTextField/CustomTextField';
import CustomSelectInput from '../../../../../../../Components/CustomSelectInput/CustomSelectInput';

// MUI 
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import LanguageIcon from '@mui/icons-material/Language';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { styled } from '@mui/system';
import { Box, MenuItem, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Image 
import logoDark from '../../../../../../../assets/Images/Cliser-Dark-Theme.png';

// Styled Components
const StyledInfoWebSite = styled(Box)(
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

const InfoWebSite = ({
    handleTextFieldChangeName,
    handleTextFieldChangeDescription,
    handleBackClick,
    handleSubmit,
    name,
    selectedLanguage,
    setSelectedLanguage,
    selectedIndustry,
    setSelectedIndustry,
    languages,
    industries,
    handleUploadImageClick,
    uploadedImage,
    description
}) => {

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const handleIndustryChange = (event) => {
        setSelectedIndustry(event.target.value);
    };
    const isSubmitDisabled = !selectedLanguage || !selectedIndustry || !uploadedImage || !name; // Disable submit button if any of the inputs are empty

    return (
        <StyledInfoWebSite>
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
                    Create a new website
                </Typography>

                <Box sx={{ width: '100%', maxWidth: '600px' }}>
                    <CustomTextField
                        id="name"
                        label="Business name"
                        variant="outlined"
                        value={name}
                        onChange={handleTextFieldChangeName}
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
                        id="description"
                        label="Description"
                        variant="outlined"
                        value={description}
                        onChange={handleTextFieldChangeDescription}
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

                <Box sx={{ width: '100%', maxWidth: '600px' }}>
                    <CustomSelectInput
                        name="language"
                        className={customSelectStyle}
                        onChange={handleLanguageChange}
                        valueSet={selectedLanguage}
                        required={true} // Pass the required prop
                    >
                        {languages.map((item, index) => (
                            <MenuItem key={index} value={item} sx={{
                                fontWeight: '700',
                            }} >
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'start',
                                    alignItems: 'center',
                                    textAlign: 'center'
                                }}>
                                    <LanguageIcon sx={{
                                        marginRight: '10px',
                                    }} />
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontSize: '20px',
                                        }}
                                    >
                                        {item}
                                    </Typography>
                                </Box>
                            </MenuItem>
                        ))}
                    </CustomSelectInput>
                </Box>

                <Box sx={{ width: '100%', maxWidth: '600px' }}>
                    <CustomSelectInput
                        name="industry"
                        className={customSelectStyle}
                        onChange={handleIndustryChange}
                        valueSet={selectedIndustry}
                        required={true} // Pass the required prop
                    >
                        {industries.map((item, index) => (
                            <MenuItem key={index} value={item} sx={{
                                color: (theme) =>
                                    theme.palette.mode === 'light' ? 'text.primary' : 'text.primary',
                                fontWeight: '700',

                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'start',
                                    alignItems: 'center',
                                    textAlign: 'center'
                                }}>
                                    <DoneOutlineIcon sx={{
                                        marginRight: '10px',
                                        color: (theme) =>
                                            theme.palette.mode === 'light' ? 'text.primary' : 'text.primary',

                                    }} />
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontSize: '20px',
                                        }}
                                    >
                                        {item}
                                    </Typography>
                                </Box>
                            </MenuItem>
                        ))}
                    </CustomSelectInput>
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
                    onClick={handleUploadImageClick}
                />

                {uploadedImage && (
                    <img
                        src={URL.createObjectURL(uploadedImage)} // Use URL.createObjectURL to create a URL for the uploaded image
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
                        title="Create WebSite"
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

        </StyledInfoWebSite>
    );
};

InfoWebSite.propTypes = {
    handleBackClick: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    uploadedImage: PropTypes.object,
    description: PropTypes.string,
    selectedLanguage: PropTypes.string.isRequired,
    setSelectedLanguage: PropTypes.func.isRequired,
    selectedIndustry: PropTypes.string.isRequired,
    setSelectedIndustry: PropTypes.func.isRequired,
    languages: PropTypes.array.isRequired,
    industries: PropTypes.array.isRequired,
    handleTextFieldChangeName: PropTypes.func.isRequired,
    handleTextFieldChangeDescription: PropTypes.func.isRequired,
    handleUploadImageClick: PropTypes.func,
};

export default InfoWebSite;
