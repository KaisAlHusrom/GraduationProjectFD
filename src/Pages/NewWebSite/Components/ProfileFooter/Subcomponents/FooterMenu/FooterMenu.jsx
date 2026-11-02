//React
import { useEffect, useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Typography,
    ListItem,
    List,
    ListItemText,
    Skeleton
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import useEffectFetchData from '../../../../../../Helpers/customHooks/useEffectFetchData'
import { fetchUserProductsCategories } from '../../../../../../Services/UserServices/Services/productCategoriesUsersService'
import { writeFilterObject } from '../../../../../../Helpers/filterData'

//Styled Components

const StyledNavLink = styled(NavLink)(
    ({ theme }) => ({
        color: theme.palette.text.primary,
        textDecoration: 'none',
        
    })
);

const FooterMenu = ({title, ListMenu, withoutTitle, sx, fetchProductsCategories, addListStyle}) => {
    const params = useMemo(() => {
        return [
            null,
            null,
            [
                writeFilterObject("is_in_the_main_page", "bool", "=", "true")
            ],
            null,
            null,
            null
        ]
    }, [])

    const {data: categories, download: categoriesDownload} = useEffectFetchData(fetchUserProductsCategories, params, fetchProductsCategories, false)
    const [productsCategories, setProductCategories] = useState(null)
    useEffect(() => {
        if (categories) {
            setProductCategories(() => {
                return categories.map(category => {
                    return {
                        path: "products/" + category.category_name, //TODO: this will change to products page route
                        title: category.category_name,
                    }
                })
            })
        }
    }, [categories])


    return (
        <Box sx={sx}>
            {
                !withoutTitle
                &&
                <Typography variant='h5'>
                {title}
                </Typography>
            }
                        <List disablePadding sx={{listStyle: addListStyle ? "circle" :"none", pt: 2}}>
                            {
                                fetchProductsCategories
                                // PRODUCTS CATEGORIES
                                ?
                                    !categoriesDownload 
                                    ?
                                        productsCategories?.map((item, key) => {
                                            return (
                                                <StyledNavLink key={key} to={item.path}>
                                                    <ListItem disablePadding sx={{paddingBottom:theme => theme.spacing()}}>
                                                        <ListItemText
                                                            primary={item.title}
                                                            sx={{
                                                                letterSpacing: 2,
                                                                textTransform: 'capitalize',
                                                                fontSize: 14
                                                            }}
                                                        />
                                                    </ListItem>
                                                </StyledNavLink>
                                            )
                                        })
                                    :
                                    <>
                                        <ListItem disablePadding sx={{paddingBottom:theme => theme.spacing()}}>
                                            <Skeleton variant="text" sx={{ fontSize: '1rem', width: 200 }} />
                                        </ListItem>
                                        <ListItem disablePadding sx={{paddingBottom:theme => theme.spacing()}}>
                                        <   Skeleton variant="text" sx={{ fontSize: '1rem', width: 200 }} />
                                        </ListItem>
                                        <ListItem disablePadding sx={{paddingBottom:theme => theme.spacing()}}>
                                            <Skeleton variant="text" sx={{ fontSize: '1rem', width: 200 }} />
                                        </ListItem>
                                    </>
                                :
                                // STATIC MENU
                                ListMenu?.map((item, key) => {
                                    return (
                                        <StyledNavLink key={key} to={item.path}>
                                            <ListItem disablePadding sx={{paddingBottom:theme => theme.spacing()}}>
                                                <ListItemText
                                                    primary={item.title}
                                                    sx={{
                                                        letterSpacing: 2,
                                                        textTransform: 'capitalize',
                                                        fontSize: 14
                                                    }}
                                                />
                                            </ListItem>
                                        </StyledNavLink>
                                    )
                                })
                            }
                            
                        </List>
        </Box>
    );
};

FooterMenu.propTypes = {
    title: propTypes.string,
    ListMenu: propTypes.array,
    download: propTypes.bool,
}

export default FooterMenu;