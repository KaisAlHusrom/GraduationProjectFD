//React
import { useMemo, useState } from 'react'

import { useSelector } from 'react-redux'

//config
import config from "../../../../../../../Config.json"

import empty from "../../../../../../Assets/Images/emptyProduct.webp"

//Components


//MUI
import {
    Card,
    Box,
    Typography,
    Grid,
    TextField,
    TextareaAutosize,
    FormLabel,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    Button
} from '@mui/material'
import { styled } from '@mui/system'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

//propTypes 
import propTypes from 'prop-types'
import { productsImagesFolderName } from '../../../../../../Services/UserServices/Services/productsUsersService'
import UploadImageByDragDrop from '../UploadImageByDragDrop/UploadImageByDragDrop'

//Styled Components
const StyledProductMainInfo = styled(Card)(
    ({ theme }) => ({
        border: '1px solid',
        borderColor: theme.palette.divider,
        position: 'relative',
        minHeight: 100,
        overflow: 'visible',
        transition: '0.5s',
        padding: theme.spacing(2),
        "&:hover": {
            borderColor: theme.palette.primary.main,
        }
    })
)

const CardHeader = styled(Box)(
    ({ theme }) => ({
        position: 'absolute',
        top: theme.spacing(-2),
        left: theme.spacing(4),
    })
);

const CardContent = styled(Grid)(
    ({ theme }) => ({
        // Your styles here
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
    width: 150,
    height: 150,
    
}

const ProductMainInfo = ({data, handleOnChange}) => {
    const currency = useSelector(state => state.currencySlice.currency);

    const {productData, setProductData} = data;

    //for image
    const mainImagePath = useMemo(() => productData?.product_main_image_name ? `${config.ServerImageRoute}/${productsImagesFolderName}/${productData?.product_main_image_name}` : null, [productData?.product_main_image_name])

    return (
        <StyledProductMainInfo>
            <CardHeader>
                <Typography variant='h6' letterSpacing={1.5}>
                    Main Info
                </Typography>
            </CardHeader>
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
                <Grid item xxs={12} sm={4} lg={3}>
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
                <Grid item xxs={12} sm={4} lg={3}>
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
                            />
                            {/* {error
                            ?
                            <Typography ml={2} variant='body2' color="error">
                                {errorMessage}
                            </Typography>
                            : null} */}
                    </FormControl>
                </Grid>
                <Grid item xxs={12} sm={4} lg={3}>
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
                        Product Long Description
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
        </StyledProductMainInfo>
    );
};

ProductMainInfo.propTypes = {
    data: propTypes.object
}

export default ProductMainInfo;