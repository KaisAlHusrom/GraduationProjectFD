//React
import 
{ createContext,
    useContext,
useMemo }from 'react'

import {writeFilterObject} from "../../Helpers/filterData"

import {
    
} from 'react-redux'

//Components
import NavBar from './Components/NavBar'


//MUI
import {
    Box
    
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'

import { Outlet, useLocation} from 'react-router-dom';
import useEffectFetchData from '../../Helpers/customHooks/useEffectFetchData'
import { fetchUserProductsCategories } from '../../Services/UserServices/Services/productCategoriesUsersService'
import {CartProvider } from '../Ecommerce/utils/CartContext'
import ProfileFooter from '../NewWebSite/Components/ProfileFooter/ProfileFooter'


//Context
const CliserMarketContext = createContext();


//Styled Components
const StyledEcommerceMain = styled(Box)(
    () => ({
    })
)


const EcommerceMain = () => {
    const location = useLocation();
    const isCheckoutPage = location.pathname.includes('/checkout');
    
    const params = useMemo(() => {
        return [
            null,
            null,
            null,
            null,
            null,
            20
        ]
    }, [])

    const {data: categories, download: categoriesDownload} = useEffectFetchData(fetchUserProductsCategories, params, true, false )
    console.log(categories)

    return (
        <CartProvider>
        <CliserMarketContext.Provider value={{
            categories,
            categoriesDownload
        }}>
                <StyledEcommerceMain>
                    {!isCheckoutPage && <NavBar />}
                    <Outlet />
                    <ProfileFooter />
                </StyledEcommerceMain>

        </CliserMarketContext.Provider>
            </CartProvider >
    );
};

EcommerceMain.propTypes = {
    children: propTypes.array
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCliserMarketContext = () => {
    return useContext(CliserMarketContext);
};

export default EcommerceMain;