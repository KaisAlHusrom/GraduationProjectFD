//React
import 
{ createContext,
    useContext,
useMemo }from 'react'

import {
    
} from 'react-redux'

//Components
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'

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
        ]
    }, [])

    const {data: categories, download: categoriesDownload} = useEffectFetchData(fetchUserProductsCategories, params, true, false )


    return (
        <CliserMarketContext.Provider value={{
            categories,
            categoriesDownload
        }}>
            <StyledEcommerceMain>
                {!isCheckoutPage && <NavBar />}
                <Outlet />
                <Footer />
            </StyledEcommerceMain>
        </CliserMarketContext.Provider>
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