//React
import { useEffect, useState } from 'react'




//Helpers
import StringHelper from '../../Helpers/StringsHelper'



//Components


//MUI
import {
    Autocomplete,
    Box, Button, FormControl, FormControlLabel, FormLabel, Grid, InputAdornment, InputLabel, OutlinedInput , Rating, Switch, TextField, TextareaAutosize, Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//Icons

import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
//propTypes 
import propTypes from 'prop-types'
import { DatePicker } from '@mui/x-date-pickers'
import RelationTextFieldToCustomModal from '../RelationTextFieldToCustomModal/RelationTextFieldToCustomModal'
import { useMyContext } from '../DatabaseView/DatabaseView'
import AdminUploadImageComponent from '../AdminUploadImageComponent/AdminUploadImageComponent'
import AdminMainButton from '../AdminMainButton/AdminMainButton'
import AdminUploadVideoComponent from '../AdminUploadVideoComponent/AdminUploadVideoComponent'
import UploadFileButton from '../UploadFileButton/UploadFileButton'
import { MAX_FILE_SIZE } from '../../Services/AdminServices/Services/productsService'


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




const CustomFormModal = (props) => {
    const {
        columns,
        title,
        setFromOpen,
        handleCustomAddData,
        customRelationships
    } = props
    
    // Define the desired order of keys
    const sortingOrder = [
        "image",
        "image:video",
        "email",
        "password",
        "string",
        "mobileNumber",
        "int",
        "date",
        "decimal",
        "enum",
        "many-to-many",
        "many-to-one",
        "one-to-many",
        "text",
        "rate",
        "bool",
        "file",
    ];
    //Columns after sorting them
    const sortedColumns = {};
    sortingOrder.forEach((type) => {
        const updatedType = type.split("|")[0]
        // console.log(type)
        Object.entries(columns).forEach(([key, value]) => {
            const updatedValue = value.split("|")[0]
            if (updatedValue === updatedType) {
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


    //states
    //image type
    // const [imageSrc, setImageSrc] = useState((null));
    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //         const reader = new FileReader();
    //         reader.onload = (event) => {
    //             setImageSrc(event.target.result);
    //         };

    //         reader.readAsDataURL(file);
    //         setImageSrc(file);
    // }

    //file type
    const [uploadProgress, setUploadProgress] = useState(0);
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState(0);
    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
        
    //     if (file) {
    //         setFileName(file.name);
    //         setFileSize(file.size);
    //         const reader = new FileReader();

    //         reader.onprogress = (event) => {
                
    //             if (event.lengthComputable) {
    //                 const progress = Math.round((event.loaded / event.total) * 100);
    //                 // console.log(progress)
    //                 setUploadProgress(progress);
    //             }
    //         };

    //         reader.onloadend = () => {
                
    //             // Perform other operations after the file has been read (e.g., setting the image source)
    //             // setImageSrc(reader.result);
    //         };

    //         reader.readAsDataURL(file);
    //     }
    // };



    // State variables for input values
    
    const [inputValues, setInputValues] = useState({});
    useEffect(() => {
        if(Object.values(columns).includes("bool")) {
            Object.entries(columns).forEach(([column, type]) => {
                if (type === "bool") {
                    inputValues[column] = false;
                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [columns])

    const [image, setImage] = useState(null)
    const [video, setVideo] = useState(null)

    //media type state
    const [mediaType, setMediaType] = useState('image')

    // Handle change for input fields
    const handleChange = (e, column, newValue, relation, setAutoCompleteValue) => {
        
        const name = column
        const type = columns[column]?.split("|")[0]
        
        let value = e?.target?.value;


        if(type === "date") {

            value = `${e['$y']}-${e['$M'] + 1}-${e['$D']}`;
            console.log(value)

        }
        
        if(type === "enum"|| type === "rate") {
            value = newValue;
        }
        
        if(type === "many-to-many" || type === "many-to-one") {
            //?? TO send only the ids I have to setAutoCompleteValue to not change the values in Autocomplete component;
            value = newValue;
            setAutoCompleteValue(() => newValue)

            if(type === "many-to-many") {
                value = value ? value.map(dataObject => dataObject[relation["related_table_id"]]) : null
            }

            if(type === "many-to-one") {
                value = value ? value[relation["related_table_id"]] : ""
            }

        }

        if(type === "bool") {
            value = e.target.checked;
        }

        if(type === "image") {
            value = e.target.files[0];

            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(() => event.target.result)

            };

            reader.readAsDataURL(value);
        }

        if(type === "image:video") {
            if(mediaType === "video") {
                value = e.target.files[0];
                //! because there is no any file in this project except products, I sue max file that in products service
                if (value.size > MAX_FILE_SIZE) {
                    console.error(`File size should not exceed ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    setVideo(() => event.target.result)
    
                };
    
                reader.readAsDataURL(value);
            } else {
                value = e.target.files[0];
                //! because there is no any file in this project except products, I sue max file that in products service
                if (value.size > MAX_FILE_SIZE) {
                    console.error(`File size should not exceed ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    setImage(() => event.target.result)

                };

                reader.readAsDataURL(value);
            }
        }


        if(type === "file") {
            value = e.target.files[0];
            if (value.size > MAX_FILE_SIZE) {
                console.error(`File size should not exceed ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
                return;
            }
            if (value) {
                setFileName(value.name);
                setFileSize(value.size);
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
    
                reader.readAsDataURL(value);
            }
        }


        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [name]: value,
        }));

    };

    //Return Inputs based on column type
    const returnInputs = (column, type, response, key) => {

        const error = !!(response?.errors && response.errors[column]);
        const errorMessage = response?.errors?.[column] ?? '';
        const label = StringHelper.capitalizeEachWord(column.split("_").join(" "))
        // console.log(type)
        const defaultProps = {
            fullWidth: true,
            label: label,
            name: column,
            color: "primary",
            size: "small",
            onChange: (event) => handleChange(event, column),
            value: inputValues[column] || "",
            error: error,
            helperText: errorMessage,
        }

        
        if (type === "pk" || column === "created_at" || column === "updated_at" || type === "one-to-many") return;

        if(type === "int") {
            return (
                <Grid key={key} item xs={6}>
                    <TextField
                    {...defaultProps}
                    type="number"
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
                    size="small" 
                    >
                        <InputLabel>
                        {label}
                        </InputLabel>
                        <OutlinedInput
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label={label}
                            onChange= {(event) => handleChange(event, column)}
                            value= {inputValues[column] || ""}
                        />
                        {error
                        ?
                        <Typography ml={2} variant='body2' color="error">
                            {errorMessage}
                        </Typography>
                        : null}
                    </FormControl>
                </Grid>
            )
        }

        if(type === "enum") {

            const values = columns[column].split('|')[1].split(",");
            return (
            <Grid key={key} item xs={6}>
                <FormControl error={error} fullWidth>
                    <Autocomplete
                        disablePortal
                        options={values}
                        fullWidth
                        size="small"
                        value={inputValues[column] || null}
                        onChange={(event, newValue) => handleChange(event, column, newValue)}
                        renderInput={(params) => <TextField {...params} label={column} />}
                        
                    />
                    {error
                    ?
                    <Typography ml={2} variant='body2' color="error">
                        {errorMessage}
                    </Typography>
                    : null}
                </FormControl>

            </Grid>
            )
        }

        if(type === "string") {
            return (
            <Grid key={key} item xs={6}>
                <TextField
                {...defaultProps}
                />
            </Grid>
            )
        }

        if(type === "text") {
            return (
            <Grid key={key} item xs={12}>
                <FormLabel
                error={error}
                >{label}</FormLabel>
                <StyledTextArea
                minRows={3} // Adjust the minimum number of rows as needed
                maxRows={10} // Adjust the maximum number of rows as needed
                placeholder={StringHelper.capitalizeEachWord(column.split("_").join(" "))}
                name={column}
                aria-label={StringHelper.capitalizeEachWord(column.split("_").join(" "))}
                sx={{
                    borderColor: error ? "error.main" : "transparent"
                }}
                onChange= {(event) => handleChange(event, column)}
                value= {inputValues[column] || ""}
                />
                {
                error
                ? 
                <Box ml={2} component="span">
                    <Typography variant="body2" component="span" color="error">
                        {errorMessage}
                    </Typography>
                </Box>
                
                : null
                
                }
                
            </Grid>
            )
        }

        if(type === "mobileNumber") {
            return (
            <Grid key={key} item xs={6}>
                <TextField 
                    {...defaultProps}
                    inputProps={{ maxLength: 17 }} //TODO: add validation
                />
            </Grid>
            )
        }

        if(type === "email") {
            return (
                <Grid key={key} item xs={6}>
                    <TextField
                    {...defaultProps}
                    type='email'
                    />
                </Grid>
                )
        }

        if(type === "password") {
            return (
                // <>
                <Grid key={key} item xs={6}>
                    <TextField
                    {...defaultProps}
                    type='password'
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
                    <DatePicker 
                    fullWidth={true}
                    label={label}
                    name= {column}
                    color= "primary"
                    size= "small"
                    onChange= {(event, newValue) => handleChange(event, column, newValue)}
                    sx={{
                        width: '100%',
                    }}
                    />
                </Grid>
                )
        }

        if(type === "bool") {
            return (
                <Grid key={key} item xs={12}>
                    <FormControlLabel
                            label={label}
                            size="small"
                            control={
                                <Switch 
                                    name={column}
                                    onChange= {(event) => handleChange(event, column)}
                                    checked= {inputValues[column] || false}
                                    
                                />
                            }
                        />
                </Grid>
                )
        }


        if(type === "image") {
            return (
            <Grid key={key} item xs={12}>
                <AdminUploadImageComponent
                    column={column}
                    customOnChange={(event) => handleChange(event, column)}
                    response={response}
                    imageState={[image, setImage]}
                />
            </Grid>
            )
        }

        if(type === "image:video") {

            return (
            <Grid key={key} item xs={12}>
                {
                    mediaType === "image"
                    ?
                        <AdminUploadImageComponent
                            column={column}
                            customOnChange={(event) => handleChange(event, column)}
                            response={response}
                            imageState={[image, setImage]}
                        />
                    :
                        <AdminUploadVideoComponent
                            column={column}
                            customOnChange={(event) => handleChange(event, column)}
                            response={response}
                            videoState={[video, setVideo]}
                        />
                }
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 2,
                    gap: 1,
                }}>
                    <AdminMainButton 
                        type='custom'
                        appearance='iconButton'
                        onClick={() => setMediaType("image")}
                        title='image'
                        putTooltip
                        toolTipPosition={"top"}
                        putBorder
                        icon={<BrokenImageOutlinedIcon />}
                        sx={{
                            backgroundColor: mediaType === "image" && ((theme) => theme.palette.action.selected),
                        }}
                    />  
                    <AdminMainButton 
                        type='custom'
                        appearance='iconButton'
                        onClick={() => setMediaType("video")}
                        title='video'
                        putTooltip
                        toolTipPosition={"top"}
                        putBorder
                        icon={<OndemandVideoOutlinedIcon />}
                        sx={{
                            backgroundColor: mediaType === "video" && ((theme) => theme.palette.action.selected),
                        }}
                    />  
                </Box>
            </Grid>
            )
        }

        if(type === "file") {

            return (
            <Grid key={key} item xs={12}>
                <UploadFileButton 
                    customOnChange={(event) => handleChange(event, column)}
                    label={column + "File"}
                    errorMessage={errorMessage}
                    fileStates={{uploadProgress, setUploadProgress, fileName, setFileName, fileSize, setFileSize}}
                    name={column}
                />
            </Grid>
            )
        }

        if(type === "rate") {
            return <Grid key={key} item xs={12}>

                    <Typography variant='subtitle1'>{label}</Typography>
                    <Rating
                        name={column}
                        onChange={ (event,newValue) => handleChange(event, column, newValue)}
                        value= {inputValues[column] || ""}
                        label={label}         
                    />
            </Grid>

        } 

        if(type === "many-to-one" || type === "many-to-many" || type === "one-to-many") {
            return (
                    <RelationTextFieldToCustomModal 
                    columnName={column} 
                    columnType={type} 
                    response={response} 
                    key={key} 
                    error={error}
                    errorMessage={errorMessage}
                    handleChange={handleChange}
                    customRelationships={customRelationships}
                    />
            )
        } 
    }

    //when submitting
    const {handleAddData, setPageNumber, pageNumber, setRefetch} = useMyContext()
    const [response, setResponse] = useState(null);



    useEffect(() => {
        if(response) {
            if(response.success) {
                if(pageNumber === 1) {
                    setRefetch(prev => prev + 1)
                } else {
                    setPageNumber(() => 1);
                }
                
                setFromOpen(() => false);

            }

            if(response.errors) return
            
        }
    }, [response, title, setPageNumber, setFromOpen, pageNumber, setRefetch])


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new object to store updated values
        const updatedInputValues = {};

        Object.keys(inputValues).forEach(name => {

            const newValue = sortedColumns[name] === "bool" ? (inputValues[name] === true || inputValues[name] === 1 ? 1 : 0) : inputValues[name]
            // Change the key name if necessary and update the value
            const newKeyName = sortedColumns[name] === "many-to-one" ? `${name}_id` : name;
            updatedInputValues[newKeyName] = newValue;

            // Delete the old key if it's different from the new one
            if (newKeyName !== name) {
                delete updatedInputValues[name];
            }
        });

        //send the add request
        // console.log(updatedInputValues)
        const res = handleCustomAddData ? await handleCustomAddData(updatedInputValues) : await handleAddData(updatedInputValues)
        setResponse(() => res)
    }

    return (
        <form method='post' onSubmit={handleSubmit} encType="multipart/form-data" >
            <StyledCustomFormModal>
            <Grid container spacing={2}>
                {
                    sortedColumns && Object.entries(sortedColumns).map(([column, type], key) => {
                        const updatedType = type.split("|")[0];   
                        return (
                            returnInputs(column, updatedType, response, key)
                        )
                    })
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
        </form>
    );
};

CustomFormModal.propTypes = {
    columns: propTypes.object,
    customRelationships: propTypes.object,
    title: propTypes.string,
    setFromOpen: propTypes.func,
    handleCustomAddData: propTypes.func,
}

export default CustomFormModal;