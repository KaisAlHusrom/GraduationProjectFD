//React
import { useEffect, useMemo, useState } from 'react'

import { useSelector } from 'react-redux'

//Components
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
//MUI
import {
    Grid,
    Box
} from '@mui/material'
import { styled } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom'
import useEffectFetchData from '../../../../Helpers/customHooks/useEffectFetchData'
import { addUserProducts, fetchSpecificUserProducts, updateUserProducts } from '../../../../Services/UserServices/Services/productsUsersService'
import ProductMainInfo from './Components/ProductMainInfo/ProductMainInfo'
import TextFieldsGroup from './Components/TextFieldsGroup/TextFieldsGroup'
import ProductCategoryInfo from './Components/ProductCategoryInfo/ProductCategoryInfo'
import ProductMediaInfo from './Components/ProductMediaInfo/ProductMediaInfo'
import ProductUsedSkills from './Components/ProductUsedSkills/ProductUsedSkills'
import ProductFeatures from './Components/ProductFeatures/ProductFeatures'
import { AdminMainButton } from '../../../../Components'
import UploadProductFile from './Components/UploadProductFile/UploadProductFile';

//Styled Components
const StyledHandleProductPage = styled(Grid)(
    ({ theme }) => ({
        width: "100%",
        padding: theme.spacing(2),
    })
)





const HandleProductPage = () => {

    const {id} = useParams()

    const params = useMemo(() => {
        return [id]
    }, [id])
    const {data: product} = useEffectFetchData(fetchSpecificUserProducts, params, id !== undefined, true)
    
    
    const [productData, setProductData] = useState({})
    useEffect(() => {
        if(product) {
            setProductData(product)
        }
    }, [product])

    useEffect(() => {
        if(!id) {
            setProductData({})
        }
    }, [id])


    console.log(productData)

    
    const handleOnChange = (e, type, column_name, customValue) => {
        if(type === "removeMedia") {
            const name = column_name
            const value = e; // here I send the e as File object\
            setProductData(prev => ({
                ...prev,
                [name]: prev.product_media.filter(item => {
                    if (item.product_media_name instanceof File) {
                        return item.product_media_name.name !== value.name;
                    }

                    if (item.product_media_name) {
                        return item.product_media_name !== value.name;
                    }
                    
                    return true;
                })
            }));

        }else if(type === "media") {
            const name = column_name
            const value = e; // here I send the e as File object

            const fileObjects = value.map(item => {
                return {
                    is_video: item.isVideo,
                    product_id: productData && productData.id ? productData.id : null,
                    product_media_name: item.file,
                }
            })
            setProductData(prev => {
                if(prev.product_media && prev.product_media?.length > 0) {
                    return ({...prev, [name]: [...prev.product_media, ...fileObjects]})
                }

                return  ({...prev, [name]: fileObjects})
            })
        }
        else if(type === 'categories') {
            setProductData(prev => ({...prev, [column_name]: customValue}))

        } else if(type === 'image') {
            const name = column_name
            const value = e; // here I send the e as File object
            setProductData(prev => ({...prev, [name]: value}))
        } else {
            const name = e.target.name
            const value = e.target.value

            setProductData(prev => ({...prev, [name]: value}))
        }
    }

    const navigate = useNavigate()
    const user = useSelector(state => state.authSlice.user)

    const handleSaveProduct = async () => {
        const updated = {
            ...productData, 
            'user_id': user.id, 
            product_media: productData.product_media.map(media => (
                {
                    ...media, 
                    is_video: media.is_video ? 1 : 0
                }
            ))
        }
        const res = await addUserProducts(updated)
        if(res.success) {
            navigate("/")
        }
    }


    const handleUpdateProduct = async () => {
        const updated = {
            ...productData, 
            product_media: productData.product_media.map(media => (
                {
                    ...media, 
                    is_video: media.is_video ? 1 : 0
                }
            ))
        }
        const res = await updateUserProducts(id, updated)
        if(res.success) {
            navigate("/")
        }
    }


    return (
        <StyledHandleProductPage container spacing={3}>
            <Grid item xxs={12} md={8}>
                <TextFieldsGroup title={"Main Info"}>
                    <ProductMainInfo 
                        data={{productData, setProductData}} 
                        handleOnChange={handleOnChange}
                    />
                </TextFieldsGroup>
                
            </Grid>
            <Grid item xxs={12} md={4}>
                <TextFieldsGroup title={"Upload Product File"}>
                    <UploadProductFile 
                        data={{productData, setProductData}} 
                        handleOnChange={handleOnChange}
                    />
                </TextFieldsGroup>
                
            </Grid>
            <Grid item xxs={12} md={6}>
                <TextFieldsGroup title={"Category"}>
                    <ProductCategoryInfo 
                        data={{productData, setProductData}} 
                        handleOnChange={handleOnChange}
                    />
                </TextFieldsGroup>
                
            </Grid>
            <Grid item xxs={12} md={6}>
                <TextFieldsGroup title={"Product Media"}>
                    <ProductMediaInfo 
                        data={{productData, setProductData}} 
                        handleOnChange={handleOnChange}
                    />
                </TextFieldsGroup>
                
            </Grid>
            <Grid item xxs={12} md={6}>
                <TextFieldsGroup title={"Product Used Skills"}>
                    <ProductUsedSkills 
                        data={{productData, setProductData}} 
                        handleOnChange={handleOnChange}
                    />
                </TextFieldsGroup>
                
            </Grid>
            <Grid item xxs={12} md={6}>
                <TextFieldsGroup title={"Product Features"}>
                    <ProductFeatures 
                        data={{productData, setProductData}} 
                        handleOnChange={handleOnChange}
                    />
                </TextFieldsGroup>
                
            </Grid>
            <Grid item xxs={12}>
                    <Box
                        display={'flex'}
                        justifyContent={'flex-end'}
                        alignItems={'center'}
                        width="100%"
                    >
                        <AdminMainButton
                            title={id === undefined ? "Save" : "Update"}
                            type='custom'
                            appearance='primary'
                            icon={id === undefined ? <SaveAltIcon /> : <EditOutlinedIcon />}
                            onClick={id === undefined ? handleSaveProduct : handleUpdateProduct}
                            putBorder
                            filled
                        />
                    </Box>
                
            </Grid>
        </StyledHandleProductPage>
    );
};

export default HandleProductPage;

