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
import { writeFilterObject } from '../../../../../../Helpers/filterData'
import CustomCard from '../CustomCard/CustomCard'
import { AdminMainButton } from '../../../../../../Components'
import AddIcon from '@mui/icons-material/Add';
import CustomWebProductCard from './Subcomponents/CustomWebProductCard';
import { fetchUserWebProject } from '../../../../../../Services/UserServices/Services/webProjectsUsersService';
import { getSlidesPerView } from '../../Utils/getSlidesPerView';
import useScreenWidth from '../../../../../../Helpers/customHooks/useScreenWidth'
import WebProjectCard from '../../../../Components/WebProjectCard/WebProjectCard';


//Styled Components
const StyledWebProjects = styled(Box)(
    ({ theme }) => ({
        // display: 'flex',
        // flexDirection: 'column',
        // gap: theme.spacing(2),
        // padding: theme.spacing(),
    })
)

const StyledHeaderBox = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginBottom: theme.spacing(),
    })
);

const StyledSwiperSlide = styled(SwiperSlide)(
    ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        textAlign: 'left'
    })
);

const WebProjects = () => {
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

    const {data, download} = useEffectFetchData(fetchUserWebProject, params, true, false)

    
    return (
        <CustomCard>
                <StyledWebProjects>
                <StyledHeaderBox>
                    <Typography variant="h5" letterSpacing={1.5}>
                        My Web Projects
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
                    spaceBetween={10}
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
                                data.map((webProject, key) => {
                                    return (
                                        <StyledSwiperSlide key={key}>
                                            <WebProjectCard
                                                project={webProject}
                                                profilePage={true}
                                            />
                                        </StyledSwiperSlide>
                                    )
                                })
                                :
                                <Box width={"100%"} height={"100%"} display={"flex"} justifyContent={'center'} alignItems={'center'}>
                                    <AdminMainButton
                                        title='Add First Project'
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
            </StyledWebProjects>
        </CustomCard>
    );
};

WebProjects.propTypes = {

}

export default WebProjects;