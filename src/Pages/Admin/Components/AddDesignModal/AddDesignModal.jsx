//React
import { useEffect, useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//config
import config from "../../../../../Config.json"
export const designImagesFolderName = "DesignsImages"

//Components


//MUI
import {
    Box,
    Button,
    FormLabel,
    Grid,
    Skeleton,
    TextField,
    TextareaAutosize,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { AdminUploadImageComponent, CustomLazyAutoComplete } from '../../../../Components'
import { fetchDesignCategories } from '../../../../Services/AdminServices/Services/designCategoriesService'
import { writeFilterObject } from '../../../../Helpers/filterData'
import StringHelper from '../../../../Helpers/StringsHelper'
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate'

import { fetchSpecificDesign } from '../../../../Services/AdminServices/Services/designService'
import useEffectFetchData from '../../../../Helpers/customHooks/useEffectFetchData'

//Styled Components
const StyledAddDesignModal = styled(Box)(
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

const AddDesignModal = ({handleAddData, handleUpdateData, setModalOpen}) => {
    const {mode, template} = useMyCreateElementContext()
    const params = useMemo(() => {
        return template?.id ? [template['id']] : []
    }, [template])

    const {data, download} = useEffectFetchData(fetchSpecificDesign, params, template, true)


    const [inputValues, setInputValues] = useState({});
    const [autoCompleteValue, setAutoCompleteValue] = useState(null)
    const [image, setImage] = useState(null)
    //if data exist set input values to selected template
    useEffect(() => {
        if(data) {
            setInputValues((prevInputValues) => ({
                ...prevInputValues,
                ['design_title']: data['design_title'],
                ['design_description']: data['design_description'],
                ['category_id']: data['category_id'],
                ['design_image']: data['design_image'],
            }));

            if(data['category']) {
                setAutoCompleteValue(data['category'])
            }

            if(data['design_image']) {
                const stylePropRoute = `${config.ServerImageRoute}/${designImagesFolderName}/${data['design_image']}`;
                setImage(() => stylePropRoute)
            }
        }
    }, [data])




    


    // Handle change for image field
    const handleChangeImage = (e) => {
        const value = e.target.files[0];

        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(() => event.target.result)
        };
        reader.readAsDataURL(value);

        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            "design_image": value,
        }));
    }

    // handle changes all fields 
    


    const handleChange = (e, newValue) => {
        const name = e.target.name;
        const value = e.target.value;
        
        if (newValue) {
            setAutoCompleteValue(() => newValue)

            setInputValues((prevInputValues) => ({
                ...prevInputValues,
                ['category_id']: newValue['id'],
            }));
        } else{
            setInputValues((prevInputValues) => ({
                ...prevInputValues,
                [name]: value,
            }));
        }
        

    };

    const [response, setResponse] = useState(null);
    // const error = !!(response?.errors && response.errors[column]);

    //when response be setted
    useEffect(() => {
        if(response) {
            if(response.success) {
                //
            }

            if(response.errors) return
            
        }
    }, [response])

    // add new template
    const handleSubmit = async (e) => {
        e.preventDefault();
        setModalOpen(() => false)
        //send the add request
        const res = await handleAddData(inputValues)
        setResponse(() => res)
    }

    // update current exists template
    const handleUpdate = async (e) => {
        e.preventDefault();
        setModalOpen(() => false)
        //send the add request
        const res = await handleUpdateData(inputValues)
        setResponse(() => res)
    }

    

    

    return (
        download 
        ?
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Skeleton width={"100%"} variant='rectangular' animation={"wave"} height={50}></Skeleton>
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={"100%"} variant='rectangular' animation={"wave"} height={50}></Skeleton>
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={"100%"} variant='rectangular' animation={"wave"} height={50}></Skeleton>
                </Grid>
            </Grid>
        :
        <form method='post' onSubmit={data ? handleUpdate :handleSubmit} encType="multipart/form-data" >
            <StyledAddDesignModal>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <AdminUploadImageComponent
                        column={"design_image"}
                        customOnChange={(event) => handleChangeImage(event)}
                        response={response}
                        imageState={[image, setImage]}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomLazyAutoComplete 
                        handleFetchData={fetchDesignCategories}
                        filters={[writeFilterObject("design_type", "string", "=", mode)]}
                        perPage={"all"}
                        label='Category'
                        optionId='id'
                        optionName='category_name'
                        valueState={[autoCompleteValue, setAutoCompleteValue]}
                        customHandleChange={(e, newValue) => handleChange(e, newValue)}
                        sx={{
                            width: "100%",
                        }}
                        
                    />
                </Grid>
                
                
                <Grid item xs={6}>
                    <TextField
                        fullWidth={true}
                        label={"design_title"}
                        name={"design_title"}
                        color="primary"
                        size="small"
                        // error={error}
                        // helperText={errorMessage}
                        onChange={(event) => handleChange(event)}
                        value={inputValues['design_title'] || ""}
                    />
                </Grid>
                <Grid  item xs={12}>
                    <FormLabel
                    // error={error}
                    >{"design_description"}</FormLabel>
                    <StyledTextArea
                        minRows={3} // Adjust the minimum number of rows as needed
                        maxRows={10} // Adjust the maximum number of rows as needed
                        placeholder={StringHelper.capitalizeEachWord("design_description".split("_").join(" "))}
                        name={"design_description"}
                        aria-label={StringHelper.capitalizeEachWord("design_description".split("_").join(" "))}
                        // sx={{
                        //     borderColor: error ? "error.main" : "transparent"
                        // }}
                        onChange= {(event) => handleChange(event)}
                        value= {inputValues["design_description"] || ""}
                    />
                    {/* {
                    error
                    ? 
                    <Box ml={2} component="span">
                        <Typography variant="body2" component="span" color="error">
                            {errorMessage}
                        </Typography>
                    </Box>
                    
                    : null
                    
                    } */}
                </Grid>
                
                
                <Grid item xs={12}>
                    <StyledSubmitButton 
                    type="submit"
                    >
                        {
                        data
                        ?
                            "Update"
                        :   "Add"
                        }
                    </StyledSubmitButton>
                </Grid>
                </Grid>
            </StyledAddDesignModal>
        </form>
    );
};

AddDesignModal.propTypes = {
    handleAddData: propTypes.func,
    handleUpdateData: propTypes.func,
}

export default AddDesignModal;