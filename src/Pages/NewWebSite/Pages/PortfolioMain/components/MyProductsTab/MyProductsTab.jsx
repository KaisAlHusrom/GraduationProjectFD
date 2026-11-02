//React
import { useMemo } from 'react'



//Components


//MUI
import {
    Skeleton,
    Grid,
    Typography
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import CustomProductCard from '../../../ProfileHomePage/components/MyProducts/Subcomponents/CustomProductCard'
import useFetchData from '../../../../../../Helpers/customHooks/useFetchData'
import { fetchUserProducts } from '../../../../../../Services/UserServices/Services/productsUsersService'
import { writeFilterObject } from '../../../../../../Helpers/filterData'
import { useUserContext } from '../../PortfolioMain'
import ProductCard from '../../../../../Ecommerce/Components/ProductCard'


//Styled Components
const StyledMyProductsTab = styled(Grid)(
    ({ theme }) => ({
        width: '100%',

    })
)


const MyProductsTab = () => {

    //fetch the user
    const {user} = useUserContext()

    const filters = useMemo(() => {
        return [
            writeFilterObject('user_id', 'string', '=', user?.id)
        ]
    }, [user])

    const {
        loading,
        data: products,
        lastDataRecord
    } = useFetchData(fetchUserProducts, 'all', filters)


    return (
        <StyledMyProductsTab container spacing={2}  >
            {
                !loading
                ?
                    products && products?.length > 0 
                    ?
                        products.map((product, key) => {
                            return (
                                <Grid ref={products.length === key + 1 ? lastDataRecord : null} key={key} item xxs={12} xs={6} sm={3} md={3} lg={2} >
                                    <ProductCard
                                        product={product}
                                        notInStore
                                    />
                                </Grid>
                        )
                        })
                    :
                    <Grid item xxs={12}>
                        <Typography color={'info.main'}>
                            There are no products.
                        </Typography>
                    </Grid>
                : 
                <>
                    <Grid  item xxs={12} xs={6} sm={3} md={3} lg={2} height={200}>
                        <Skeleton width='100%' height='100%'   />
                    </Grid>
                    <Grid  item xxs={12} xs={6} sm={3} md={3} lg={2} height={200}>
                        <Skeleton width='100%' height='100%'   />
                    </Grid>
                    <Grid  item xxs={12} xs={6} sm={3} lg={2} height={200}>
                        <Skeleton width='100%' height='100%'   />
                    </Grid>
                    <Grid  item xxs={12} xs={6} sm={3} md={3} lg={2} height={200}>
                        <Skeleton width='100%' height='100%'   />
                    </Grid>
                    <Grid  item xxs={12} xs={6} sm={3} md={3} lg={2} height={200}>
                        <Skeleton width='100%' height='100%'   />
                    </Grid>
                    <Grid  item xxs={12} xs={6} sm={3} md={3} lg={2} height={200}>
                        <Skeleton width='100%' height='100%'   />
                    </Grid>

                </>
            }
        </StyledMyProductsTab>
    );
};

MyProductsTab.propTypes = {
    children: propTypes.array
}

export default MyProductsTab;