//React
import { useMemo, useState } from 'react'

import { useSelector } from 'react-redux'

//config
import config from "../../../../../../../Config.json"

import empty from "../../../../../../Assets/Images/emptyProduct.webp"

//Components


//MUI
import {
    Grid,
    TextField,
    TextareaAutosize,
    FormLabel,
    FormControl,
    OutlinedInput,
    InputAdornment,
} from '@mui/material'
import { styled } from '@mui/system'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

//propTypes 
import propTypes from 'prop-types'
import { productsImagesFolderName } from '../../../../../../Services/UserServices/Services/productsUsersService'
import UploadImageByDragDrop from '../UploadImageByDragDrop/UploadImageByDragDrop'

//Styled Components


const CardContent = styled(Grid)(
    ({ theme }) => ({
        padding: theme.spacing()
    })
);

const StyledTextArea = styled(TextareaAutosize)(
    ({theme}) => ({
        backgroundColor: theme.palette.background.paper,
        border: "2px solid",
        borderColor: theme.palette.divider,
        resize: "none",
        width: "100%",
        borderRadius: "6px",
        color: theme.palette.text.primary,
        outline: "none",
        fontSize: "1rem",
        padding: theme.spacing(),
        "&:focus": {
            borderColor: theme.palette.primary.main,
        }
    })
)


const ProductMainInfo = ({data, handleOnChange}) => {
    const currency = useSelector(state => state.currencySlice.currency);

    const {productData} = data;

    //for image
    const mainImagePath = useMemo(() => productData?.product_main_image_name ? `${config.ServerImageRoute}/${productsImagesFolderName}/${productData?.product_main_image_name}` : null, [productData?.product_main_image_name])

    return (
            <CardContent container spacing={2}>
                <Grid item xxs={12} >
                    <FormLabel
                        // error={error}
                        >
                        Product Main Image
                    </FormLabel>
                    <UploadImageByDragDrop 
                    limit={1} 
                    values={
                        productData?.product_main_image_name
                        ?
                        [productData?.product_main_image_name instanceof File ? productData?.product_main_image_name : mainImagePath]
                        :[]
                    } 
                    handleLoadEnd={handleOnChange} 
                    columnName={"product_main_image_name"}
                    />
                    {/* <Box>
                        <img 
                            src={image ? image : mainImagePath ? mainImagePath : empty} 
                            alt={"Product Main Image"} 
                            style={imageStyle}
                        
                        />
                        <Button size='small' component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload Product Main Image
                            <VisuallyHiddenInput 
                            type="file" 
                            accept='image/*' 
                            name={"product_main_image_name"}
                            onChange={handleImageChange}
                            />
                        </Button>
                    </Box> */}
                </Grid>
                <Grid item xxs={12} sm={4}>
                    <FormLabel
                        // error={error}
                        >
                        Product Name
                    </FormLabel>
                    <TextField 
                        fullWidth
                        size='small'
                        name='product_name'
                        value={productData?.product_name}
                        onChange={(e) => handleOnChange(e, "string")}
                    />
                </Grid>
                <Grid item xxs={12} sm={4}>
                    <FormLabel
                        // error={error}
                        >
                        Product Price
                    </FormLabel>
                    <FormControl
                        fullWidth
                        color="primary"
                        size="small" 
                        >
                            <OutlinedInput
                                startAdornment={<InputAdornment position="start">{currency}</InputAdornment>}
                                onChange= {(e) => handleOnChange(e, "decimal")}
                                value= {productData?.product_price}
                                name='product_price'
                            />
                            {/* {error
                            ?
                            <Typography ml={2} variant='body2' color="error">
                                {errorMessage}
                            </Typography>
                            : null} */}
                    </FormControl>
                </Grid>
                <Grid item xxs={12} sm={4}>
                    <FormLabel
                    // error={error}
                    >
                        Product Short Description
                    </FormLabel>
                    <TextField 
                        fullWidth
                        size='small'
                        name='product_short_description'
                        value={productData?.product_short_description}
                        onChange={(e) => handleOnChange(e, "string")}
                    />
                </Grid>
                <Grid item xxs={12}>
                    <FormLabel
                    // error={error}
                    >
                        Talk About Product
                    </FormLabel>
                    <StyledTextArea
                        minRows={3} // Adjust the minimum number of rows as needed
                        maxRows={10} // Adjust the maximum number of rows as needed
                        name={"product_long_description"}
                        // sx={{
                        //     borderColor: error ? "error.main" : "transparent"
                        // }}
                        onChange= {(e) => handleOnChange(e, "text")}
                        value= {productData?.product_long_description}
                    />
                </Grid>
            </CardContent>
    );
};

ProductMainInfo.propTypes = {
    data: propTypes.object,
    handleOnChange: propTypes.func,
}

export default ProductMainInfo;