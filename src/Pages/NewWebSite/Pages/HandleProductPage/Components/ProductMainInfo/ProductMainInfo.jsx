//React
import { useMemo, useState } from 'react'

import { useSelector } from 'react-redux'

//config
import config from "../../../../../../../Config.json"

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
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
    IconButton,
    Popover,
    Typography,
    Box
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { productsImagesFolderName } from '../../../../../../Services/UserServices/Services/productsUsersService'
import UploadImageByDragDrop from '../UploadImageByDragDrop/UploadImageByDragDrop'
import calculateProfit from '../../../../../../Helpers/calculateProfit'

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
    const {newCost: profit, serviceTaxPercentage} = calculateProfit(productData?.product_price)

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

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
                <Grid item xxs={12} sm={4} position={'relative'}>
                    <FormLabel
                    >
                        Product Price
                        <IconButton size='small'onMouseOver={handleClick}  sx={{position: 'absolute', right: -35, bottom: -5}}>
                            <InfoOutlinedIcon  />
                        </IconButton>
                        <Popover
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            >
                            <Box padding={2}>
                                <Typography variant='subtitle1'>
                                Profit is the amount of money you make after customers purchase your product.
                                </Typography>
                                <Typography variant='body2' color='text.secondary'>
                                Service Tax: {serviceTaxPercentage}%
                                </Typography>
                            </Box>
                        </Popover>
                    </FormLabel>
                    <FormControl
                        fullWidth
                        color="primary"
                        size="small" 
                        >
                            <OutlinedInput
                                startAdornment={<InputAdornment position="start">{currency}</InputAdornment>}
                                endAdornment={<InputAdornment position="end">Profit: {profit || "00"}{currency}</InputAdornment>}
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