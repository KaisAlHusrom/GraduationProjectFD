//React
import { useState } from 'react'

import {
    
} from 'react-redux'

import { Form, useActionData, useLocation } from 'react-router-dom'

//Helpers
import StringHelper from '../../Helpers/StringsHelper'
import NumberHelper from '../../Helpers/NumberHelper'

//images
import empty from "../../Assets/Images/emptyProduct.webp"

//Components
import LinearProgressWithLabel from '../LinearProgressWithLabel/LinearProgressWithLabel'

//MUI
import {
    Box, Button, FormControl, FormControlLabel, FormLabel, Grid, InputAdornment, InputLabel, OutlinedInput , Switch, TextField, TextareaAutosize, Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { MuiTelInput } from 'mui-tel-input'

//Icons
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FolderZipIcon from '@mui/icons-material/FolderZip';

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledCustomFormModal = styled(Box)(
    () => ({
    
    })
)

const StyledSubmitButton = styled(Button)(
    ({ theme }) => ({
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": {
                backgroundColor: theme.palette.primary.dark,
            }
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

const StyledImageBox = styled(Box)(
    () => ({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
    })
)

const StyledFileBox =styled(Box)(
    () => ({
        display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
    })
)

const StyledUploadedFileBox = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.palette.action.selected,
        padding: `0 ${theme.spacing()}`,
        borderRadius: "8px",
    })
)

const StyledFileNameProgress = styled(Box)(
    ({theme}) => ({
        maxWidth: "280px",
        margin: theme.spacing()
    })
)

const StyledTextArea = styled(TextareaAutosize)(
    ({theme}) => ({
        backgroundColor: theme.palette.background.paper,
        border: "2px solid",
        borderColor: theme.palette.divider,
        resize: "none",
        width: "100%",
        borderRadius: "8px",
        color: theme.palette.text.primary,
        outline: "none",
        fontSize: "1rem",
        padding: theme.spacing(),
        "&:focus": {
            borderColor: theme.palette.primary.main,
        }
    })
)



const imageStyle = {
    width: "140px",
    height: "140px",
    marginBottom: "8px",
    borderRadius: "8px",
}




const CustomFormModal = (props) => {
    const {
        columns,
    } = props
    
    // Define the desired order of keys
    const sortingOrder = [
        "image",
        "email",
        "password",
        "string",
        "mobileNumber",
        "int",
        "date",
        "decimal",
        "text",
        "bool",
        "file",
    ];
    //Columns after sorting them
    const sortedColumns = {};
    sortingOrder.forEach((type) => {
        Object.entries(columns).forEach(([key, value]) => {
            if (value === type) {
                sortedColumns[key] = value;
            }
        });
    });

    //Columns count (To make the last text field width is 12 instead of 6 if the count is odd number)
    const columnsCount = Object.entries(sortedColumns)
    .filter(([column, type]) => (
        type !== "image" &&
        type !== "file" &&
        type !== "text" &&
        type !== "bool" &&
        column !== "id" &&
        column !== "created_at" &&
        column !== "updated_at"
    )).length;




    const data = useActionData() //The data that come from the action method in the CustomRouterProvider
    const location = useLocation();

    // Access the current path from the location object
    const currentPath = location.pathname;

    //states
    //image type
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

    //file type
    const [uploadProgress, setUploadProgress] = useState(0);
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState(0);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        if (file) {
            setFileName(file.name);
            setFileSize(file.size);
            const reader = new FileReader();

            reader.onprogress = (event) => {
                
                if (event.lengthComputable) {
                    const progress = Math.round((event.loaded / event.total) * 100);
                    // console.log(progress)
                    setUploadProgress(progress);
                }
            };

            reader.onloadend = () => {
                
                // Perform other operations after the file has been read (e.g., setting the image source)
                // setImageSrc(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };


    //phoneNumber type
    const [value, setValue] = useState('')
    const handleChange = (newValue) => {
        setValue(newValue)
    }

    //Return Inputs based on column type
    const returnInputs = (column, type, data, key) => {
        if (column === "id" || column === "created_at" || column === "updated_at") return;

        if(type === "int") {
            return (
                <Grid key={key} item xs={6}>
                    <TextField
                    fullWidth
                    type="number"
                    label={StringHelper.capitalizeEachWord(column.split("_").join(" "))}
                    name={column}
                    color="primary"
                    required
                    size="small"
                    error={data?.error ? true : false}
                    helperText={data?.error ? data.error : ''}
                    />
                </Grid>
            )
        }

        if(type === "decimal") {
            return (
                <Grid key={key} item xs={columnsCount % 2 === 0 ? 6 : 12}>
                    <FormControl
                    fullWidth
                    color="primary"
                    required
                    size="small"
                    
                    >
                        <InputLabel  htmlFor="outlined-adornment-amount">
                        {StringHelper.capitalizeEachWord(column.split("_").join(" "))}
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label={StringHelper.capitalizeEachWord(column.split("_").join(" "))}
                            
                        />
                    </FormControl>
                </Grid>
            )
        }

        if(type === "string") {
            return (
            <Grid key={key} item xs={6}>
                <TextField
                fullWidth
                label={StringHelper.capitalizeEachWord(column.split("_").join(" "))}
                name={column}
                color="primary"
                required
                size="small"
                error={data?.error ? true : false}
                helperText={data?.error ? data.error : ''}
                />
            </Grid>
            )
        }

        if(type === "text") {
            return (
            <Grid key={key} item xs={12}>
                <FormLabel>{StringHelper.capitalizeEachWord(column.split("_").join(" "))}</FormLabel>
                <StyledTextArea
                minRows={3} // Adjust the minimum number of rows as needed
                maxRows={10} // Adjust the maximum number of rows as needed
                placeholder={StringHelper.capitalizeEachWord(column.split("_").join(" "))}
                name={column}
                required
                aria-label={StringHelper.capitalizeEachWord(column.split("_").join(" "))}
                />
            </Grid>
            )
        }

        if(type === "mobileNumber") {
            return (
            <Grid key={key} item xs={6}>
                <MuiTelInput 
                    size='small' 
                    label={StringHelper.capitalizeEachWord(column.split("_").join(" "))}
                    name={column}
                    fullWidth 
                    value={value}
                    required
                    onChange={handleChange} 
                    inputProps={{ maxLength: 17 }} //TODO: add validation
                />
            </Grid>
            )
        }

        if(type === "email") {
            return (
                <Grid key={key} item xs={6}>
                    <TextField
                    type='email'
                    fullWidth
                    label={StringHelper.capitalizeEachWord(column.split("_").join(" "))}
                    name={column}
                    color="primary"
                    required
                    size="small"
                    error={data?.error ? true : false}
                    helperText={data?.error ? data.error : ''}
                    />
                </Grid>
                )
        }

        if(type === "password") {
            return (
                // <>
                <Grid key={key} item xs={6}>
                    <TextField
                    type='password'
                    fullWidth
                    label={StringHelper.capitalizeEachWord(column.split("_").join(" "))}
                    name={column}
                    color="primary"
                    required
                    size="small"
                    error={data?.error ? true : false}
                    helperText={data?.error ? data.error : ''}
                    />
                </Grid>
                )
                // {/* <Grid key={"confirm_password"} item xs={6}>
                //     <TextField
                //     type='password'
                //     fullWidth
                //     label={"Confirm Password"}
                //     name="password_confirmation"
                //     color="primary"
                //     required
                //     size="small"
                //     error={data?.error ? true : false}
                //     helperText={data?.error ? data.error : ''}
                //     />
                // </Grid>
                // </> */}
        }

        if(type === "date") {
            return (
                <Grid key={key} item xs={columnsCount % 2 === 0 ? 6 : 12}>
                    <TextField
                    focused
                    type='date'
                    fullWidth
                    label={StringHelper.capitalizeEachWord(column.split("_").join(" "))}
                    name={column}
                    color="primary"
                    required
                    size="small"
                    error={data?.error ? true : false}
                    helperText={data?.error ? data.error : ''}
                    />
                </Grid>
                )
        }

        if(type === "bool") {
            return (
                <Grid key={key} item xs={12}>
                    <FormControlLabel
                            label={StringHelper.capitalizeEachWord(column.split("_").join(" "))}
                            size="small"
                            control={
                                <Switch 
                                name={column}
                                // error={errors?.is_admin ? true : false}
                                // helperText={errors?.is_admin ? errors.is_admin : ''}
                                />
                            }
                        />
                </Grid>
                )
        }

        if(type === "image") {
            return (
            <Grid key={key} item xs={12}>
                <StyledImageBox>
                <img 
                src={imageSrc ? imageSrc : empty} 
                alt={column} 
                style={imageStyle}
                
                />
                <Button size='small' component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload {StringHelper.capitalizeEachWord(column.split("_").join(" "))}
                    <VisuallyHiddenInput 
                    type="file" 
                    accept='image/*' 
                    name={column}
                    onChange={handleImageChange}
                    />
                </Button>
                <Box mt={1}>
                    <Typography variant="subtitle1" component="span" color="error">
                        {data?.errors?.image ? data?.errors.image : ''}
                    </Typography>
                </Box>

                </StyledImageBox>
            </Grid>
            )
        }

        if(type === "file") {
            return (
            <Grid key={key} item xs={12}>
                <StyledFileBox>
                    <Button size='small' component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload {StringHelper.capitalizeEachWord(column.split("_").join(" "))}
                        <VisuallyHiddenInput 
                        type="file" 
                        accept='.zip,.rar,application/zip,application/x-rar-compressed,application/octet-stream' 
                        name={column}
                        onChange={handleFileChange}
                        />
                    </Button>
                    <Box mt={1}>
                        {uploadProgress > 0 && (
                        <StyledUploadedFileBox>
                            <Box>
                                <FolderZipIcon color='primary' />
                            </Box>
                            <StyledFileNameProgress>
                                <Typography variant='body1' sx={{
                                    overflow: 'hidden', 
                                    whiteSpace: 'nowrap', 
                                    textOverflow: 'ellipsis',
                                }}>
                                    {fileName} | {NumberHelper.formatFileSize(fileSize)}
                                </Typography>
                                <LinearProgressWithLabel value={uploadProgress} />
                            </StyledFileNameProgress>
                        </StyledUploadedFileBox>
                        )}
                        <Typography variant="subtitle1" component="span" color="error">
                            {data?.errors?.image ? data?.errors.image : ''}
                        </Typography>
                    </Box>

                </StyledFileBox>
            </Grid>
            )
        }
    }

    return (
        <Form method='post' action={currentPath} encType="multipart/form-data" >
            <StyledCustomFormModal>
            <Grid container spacing={2}>
                {
                    sortedColumns && Object.entries(sortedColumns).map(([column, type], key) => (
                            returnInputs(column, type, data, key)
                    ))
                }
                
                
                <Grid item xs={12}>
                    <StyledSubmitButton 
                    type="submit"
                    >
                        Add
                    </StyledSubmitButton>
                </Grid>
                </Grid>
            </StyledCustomFormModal>
        </Form>
    );
};

CustomFormModal.propTypes = {
    columns: propTypes.object
}

export default CustomFormModal;