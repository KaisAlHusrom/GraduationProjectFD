//React
import { useCallback, useEffect, useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Grid
} from '@mui/material'
import { styled } from '@mui/system'
import { useParams } from 'react-router-dom'
import useEffectFetchData from '../../../../Helpers/customHooks/useEffectFetchData'
import { fetchSpecificUserProducts } from '../../../../Services/UserServices/Services/productsUsersService'
import ProductMainInfo from './Components/ProductMainInfo/ProductMainInfo'

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


    console.log(productData)

    
    const handleOnChange = (e, type, column_name) => {
        if(type === 'image') {
            const name = column_name
            const value = e; // here I send the e as File object
            setProductData(prev => ({...prev, [name]: value}))
        } else {
            const name = e.target.name
            const value = e.target.value

            setProductData(prev => ({...prev, [name]: value}))
        }
    }


    return (
        <StyledHandleProductPage container spacing={2}>
            <Grid item xxs={12}>
                <ProductMainInfo 
                    data={{productData, setProductData}} 
                    handleOnChange={handleOnChange}
                />
            </Grid>
        </StyledHandleProductPage>
    );
};

export default HandleProductPage;