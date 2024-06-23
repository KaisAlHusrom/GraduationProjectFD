//React
import { useEffect, useMemo, useState } from 'react'

import { useDispatch } from 'react-redux'

//Components

import AddIcon from '@mui/icons-material/Add';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

//MUI
import {
    Box,
    Chip,
    Grid,
    FormLabel
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import useFetchData from '../../../../../../Helpers/customHooks/useFetchData'


// service
import {fetchUserProductsCategories} from "../../../../../../Services/UserServices/Services/productCategoriesUsersService"
import { writeFilterObject } from '../../../../../../Helpers/filterData';
import { handleOpenSnackbar, setSnackbarIsError, setSnackbarMessage } from '../../../../../../Redux/Slices/snackbarOpenSlice';


//Styled Components
const StyledProductCategoryInfo = styled(Grid)(
    ({ theme }) => ({
        padding: theme.spacing()
    })
)

const AllCategories = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        gap: theme.spacing(),
        width: "100%",
        overflow: 'hidden',
        flexWrap: 'wrap'
    })
);

const ProductCategoryInfo = ({data, handleOnChange}) => {
    const dispatch = useDispatch()
    const {productData} = data;

    const [categories, setCategories] = useState(() => [])
    useEffect(() => {
        if(productData && Object.keys(productData).length > 0) {
            if(productData.categories !== undefined) {
                setCategories(productData.categories)
            } 
        }
    }, [productData])
    console.log(categories)


    const {data: allCategories, loading

    } = useFetchData(fetchUserProductsCategories, 'all', null, null, true, null, null, 30)
    const mainCategories = allCategories.filter(category => category.parent_id === null)
    const subCategories = allCategories.filter(category => category.parent_id !== null)
    

    const handleClick = (cat) => {
        if(categories?.some(category => category.category_name === cat.category_name)) {
            return
        }

        if(categories?.some(category => category.parent_id === null) && cat.parent_id === null) {
            dispatch(setSnackbarMessage({message: `You can only add one main category`}))
            dispatch(setSnackbarIsError({isError: true}))
            dispatch(handleOpenSnackbar())
            return
        }
        const updated = categories !== undefined ? [...categories, cat] : [cat]
        setCategories(updated)
        handleOnChange(null, 'categories', 'categories', updated)
    }

    const handleDelete = (cat) => {
        const updated = categories.filter(category => category.id !== cat.id)
        setCategories(updated)
        handleOnChange(null, 'categories', 'categories', updated)

    }
    return (
        <StyledProductCategoryInfo container spacing={2}>
            <Grid item xxs={12}>
                <FormLabel
                    >
                    Added Categories
                </FormLabel>
                <AllCategories>
                    {
                    categories && categories.length > 0 
                        ?
                        categories.map((cat, key) => {
                                return (
                                    <Chip
                                        key={key}
                                        label={cat.category_name}
                                        onDelete={() => handleDelete(cat)}
                                        // deleteIcon={}
                                        icon={cat.parent_id === null ? <StarBorderOutlinedIcon color='warning' /> : null}
                                        />
                                )
                            })
                        :null
                    }
                
                </AllCategories>
            </Grid>
            <Grid item xxs={12}>
                <FormLabel
                    >
                    Main Categories
                </FormLabel>
                <AllCategories>
                    {
                    !loading
                        ? mainCategories && mainCategories.length > 0 
                        ?
                        mainCategories
                        .filter(cat => !categories?.some(c => c.category_name === cat.category_name))
                        .map((cat, key) => {
                            return (
                            <Chip
                                key={key}
                                label={cat.category_name}
                                onClick={() => handleClick(cat)}
                                // onDelete={handleDelete}
                                // deleteIcon={}
                                icon={<AddIcon color='primary' />}
                            />
                            );
                        })
                        :null
                    :null
                    }
                
                </AllCategories>
            </Grid>
            <Grid item xxs={12}>
                <FormLabel
                    >
                    Sub Categories
                </FormLabel>
                <AllCategories>
                    {
                    !loading
                        ? subCategories && subCategories.length > 0 
                        ?
                        subCategories
                        .filter(cat => !categories?.some(c => c.category_name === cat.category_name))
                        .map((cat, key) => {
                            return (
                            <Chip
                                key={key}
                                label={cat.category_name}
                                onClick={() => handleClick(cat)}
                                // onDelete={handleDelete}
                                // deleteIcon={}
                                icon={<AddIcon color='primary' />}
                            />
                            );
                        })
                        :null
                    :null
                    }
                
                </AllCategories>
            </Grid>
        </StyledProductCategoryInfo>
    );
};

ProductCategoryInfo.propTypes = {
    data: propTypes.object,
    handleOnChange: propTypes.func,
}

export default ProductCategoryInfo;