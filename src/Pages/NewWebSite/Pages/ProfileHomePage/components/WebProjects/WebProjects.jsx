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

//propTypes 
import propTypes from 'prop-types'

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

//Styled Components
const StyledWebProjects = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        padding: theme.spacing(),
    })
)

const StyledSwiperSlide = styled(SwiperSlide)(
    ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
    })
);

const WebProjects = () => {
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

    const {data} = useEffectFetchData(fetchUserProducts, params, true, false)
    console.log(data)
    return (
        <CustomCard>
                <StyledWebProjects>
                <Typography variant="h5" letterSpacing={1.5}>
                    My Products
                </Typography>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={() => {}}
                    onSlideChange={() => {}}
                >
                    
                        {
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
            </StyledWebProjects>
        </CustomCard>
    );
};

WebProjects.propTypes = {
    children: propTypes.array
}

export default WebProjects;