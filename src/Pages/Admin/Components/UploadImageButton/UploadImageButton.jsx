//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//images
import empty from "../../../../Assets/Images/emptyProduct.webp"

//Components


//MUI
import {
    Box,
    Button,
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

//propTypes 
import propTypes from 'prop-types'

//Styled Components

const StyledImageBox = styled(Box)(
    () => ({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
    })
)

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const imageStyle = {
    width: "140px",
    height: "140px",
    marginBottom: "8px",
    borderRadius: "8px",
}


const UploadImageButton = ({imageState, showImage, label, customOnChange}) => {

    const [image, setImage] = imageState

    const handleImageChange = (e) => {

        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target.result);
        };
        reader.readAsDataURL(file);
        setImage(file);
    }

    // console.log(customOnChange)

    return (
        <>
            {
                showImage
                ?
                <StyledImageBox>
                    <img 
                    src={image ? image : empty} 
                    style={imageStyle}
                    
                    />
                    <Button size='small' component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload {label}
                        <VisuallyHiddenInput 
                        type="file" 
                        accept='image/*' 
                        name={label}
                        onChange={customOnChange ? (event) => customOnChange(event) : (event) => handleImageChange(event)}
                        />
                    </Button>
                    {/* {error ? 
                    <Box mt={1}>
                        <Typography variant="subtitle1" component="span" color="error">
                            {errorMessage}
                        </Typography>
                    </Box>
                                    
                    : 
                    null} */}
                </StyledImageBox>
                :
                <Button size='small' component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload Background Image
                    <input
                    hidden 
                    type="file" 
                    accept='image/*' 
                    name={"background image"}
                    onChange={customOnChange ? (event) => customOnChange(event) : (event) => handleImageChange(event)}
                    />
                </Button>
            }
        </>
    );
};

UploadImageButton.propTypes = {
    imageState: propTypes.array,
    showImage: propTypes.bool,
    label: propTypes.string,
    customOnChange: propTypes.func,
}

export default UploadImageButton;