//React
import { useMemo } from 'react'

import { useSelector } from 'react-redux'

//Components


//MUI
import {
    Box,
    Skeleton,
    Typography
} from '@mui/material'
import { styled } from '@mui/system'


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import useEffectFetchData from '../../../../../../Helpers/customHooks/useEffectFetchData'
import { fetchUserProducts } from '../../../../../../Services/UserServices/Services/productsUsersService'
import { writeFilterObject } from '../../../../../../Helpers/filterData'
import { ReviewCalculateSMA } from '../../../../../Ecommerce/utils/functions'
import CustomCard from '../CustomCard/CustomCard'
import CustomProductCard from './Subcomponents/CustomProductCard'
import { AdminMainButton } from '../../../../../../Components'


import AddIcon from '@mui/icons-material/Add';
import useScreenWidth from '../../../../../../Helpers/customHooks/useScreenWidth';
import { getSlidesPerView } from '../../Utils/getSlidesPerView';
//Styled Components
const StyledMyProducts = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        padding: theme.spacing(),
    })
)

const StyledHeaderBox = styled(Box)(
    () => ({
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    })
);

const StyledSwiperSlide = styled(SwiperSlide)(
    ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
    })
);

const MyProducts = () => {
    const screenWidth = useScreenWidth();

    
    

    //fetch data
    const user = useSelector(state => state.authSlice.user);
    
    const params = useMemo(() => {
        return [
            null,
            null,
            [
                writeFilterObject("user_id", "string", "=", user?.id)
            ]
        ]
    }, [user?.id])

    const {data, download} = useEffectFetchData(fetchUserProducts, params, true, false)

    return (
        <CustomCard>
                <StyledMyProducts>
                <StyledHeaderBox>
                    <Typography variant="h5" letterSpacing={1.5}>
                        My Products
                    </Typography>
                    <Box>
                        <AdminMainButton
                            title='Add Product'
                            appearance='iconButton'
                            putBorder
                            type='custom'
                            icon={<AddIcon />}
                        />
                    </Box>
                </StyledHeaderBox>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={15}
                    slidesPerView={getSlidesPerView(screenWidth)}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={() => {}}
                    onSlideChange={() => {}}
                >
                    
                        {
                            !download
                            ?
                                data && data.length > 0 ?
                                data.map((product, key) => {
                                    return (
                                        <StyledSwiperSlide key={key}>
                                            <CustomProductCard
                                                title={product.product_name}
                                                description={product.product_short_description}
                                                image={product.product_media}
                                                price={product.product_price}
                                                rating={ReviewCalculateSMA(product.product_reviews)}
                                                category={product.categories}
                                            />
                                        </StyledSwiperSlide>
                                    )
                                })
                                :
                                <Box width={"100%"} height={"100%"} display={"flex"} justifyContent={'center'} alignItems={'center'}>
                                    <AdminMainButton
                                        title='Add First Product'
                                        appearance='primary'
                                        putBorder
                                        type='custom'
                                        icon={<AddIcon />}
                                    />
                                </Box>
                            :
                            <>
                            <StyledSwiperSlide>
                                <Skeleton width={'100%'} height={'100%'}></Skeleton>
                            </StyledSwiperSlide>
                            <StyledSwiperSlide>
                                <Skeleton width={'100%'} height={'100%'}></Skeleton>
                            </StyledSwiperSlide>
                            <StyledSwiperSlide>
                                <Skeleton width={'100%'} height={'100%'}></Skeleton>
                            </StyledSwiperSlide>
                            </>
                            
                        }
                    

                </Swiper>
            </StyledMyProducts>
        </CustomCard>
    );
};

MyProducts.propTypes = {

}

export default MyProducts;