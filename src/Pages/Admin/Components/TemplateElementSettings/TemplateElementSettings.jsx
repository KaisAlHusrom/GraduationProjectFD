//React
import { useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Autocomplete,
    Box,
    Button,
    Grid, TextField, TextareaAutosize, Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

//images
import empty from "../../../../Assets/Images/emptyProduct.webp"

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledTemplateElementSettings = styled(Grid)(
    ({ theme }) => ({
        width: "100%",
        border: "1px solid",
        borderColor: theme.palette.divider,
        padding: theme.spacing(2),
        borderRadius: theme.spacing(2),
    })
)

const StyledTextArea = styled(TextareaAutosize)(
    ({theme}) => ({
        backgroundColor: theme.palette.background.paper,
        border: "2px solid",
        borderColor: theme.palette.divider,
        resize: "none",
        width: "100%",
        borderRadius: theme.spacing(2),
        color: theme.palette.text.primary,
        outline: "none",
        fontSize: "1rem",
        letterSpacing: "2px",
        padding: theme.spacing(),
        "&:focus": {
            borderColor: theme.palette.primary.main,
        }
    })
)

const StyledImageBox = styled(Box)(
    () => ({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
    })
)

const imageStyle = {
    width: "210px",
    height: "140px",
    marginBottom: "8px",
    borderRadius: "8px",
}


const TemplateElementSettings = (props) => {
    const {
        selectedElementState,
        elementTypesState
    } = props

    //selected element state
    const {selectedElement, setSelectedElement} = selectedElementState

    //all elements types state
    const {elementTypes} = elementTypesState

    //state for upload images
    const [imageSrc, setImageSrc] = useState((null));
    const handleImageChange = (e) => {
        const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageSrc(event.target.result);
            };

            reader.readAsDataURL(file);
            setImageSrc(file);
    }


    const defaultProps = useMemo(()=> {
        return {
            options: elementTypes,
            getOptionLabel: (option) => option.element_type_name,
            getOptionKey: (option) => option.element_type_id,
        };
    }, [elementTypes])


    //Handlers
    const handleChangeElementType = (event, newValue) => {
        setSelectedElement(() => newValue)
    }

    return (
        <StyledTemplateElementSettings container spacing={2}>
            <Grid item xxs={12}>
                <Typography variant='h6' letterSpacing={2} color="primary.main">
                    Element Settings
                </Typography>
            </Grid>
            <Grid item xxs={12}>
                <StyledImageBox>
                    <img 
                    src={imageSrc ? imageSrc : empty} 
                    alt={"Element Image"} 
                    style={imageStyle}
                    
                    />
                    <Button size='small' component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload Element Image
                        <input
                        hidden 
                        type="file" 
                        accept='image/*' 
                        name={"element_image"}
                        onChange={handleImageChange}
                        />
                    </Button>
                    <Box mt={1}>
                        <Typography variant="subtitle1" component="span" color="error">
                            {/* {data?.errors?.image ? data?.errors.image : ''} */}
                        </Typography>
                    </Box>

                </StyledImageBox>
            </Grid>
            <Grid item xxs={12} xs={6} md={4} lg={3}>
                <Autocomplete
                    {...defaultProps}
                    disablePortal
                    id="Element Types Auto Complete"
                    renderInput={(params) => <TextField {...params} label="Element Type" />}
                    onChange={(event, newValue) => handleChangeElementType(event, newValue)}
                    value={selectedElement}
                    size='small'
                />
            </Grid>
            <Grid item xxs={12} xs={6} md={4} lg={3}>
                <TextField
                label="Element Name"
                name='element_name'
                size='small'
                />
            </Grid>
            
            <Grid item xxs={12}>
                <StyledTextArea
                minRows={3} // Adjust the minimum number of rows as needed
                maxRows={5} // Adjust the maximum number of rows as needed
                placeholder={"Element Description"}
                name={"element_description"}
                // value={cell}
                />
            </Grid>
        </StyledTemplateElementSettings>
    );
};

TemplateElementSettings.propTypes = {
    selectedElementState: propTypes.object,
    elementTypesState: propTypes.object,
}

export default TemplateElementSettings;