//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Container,
    Grid,
    Skeleton
} from '@mui/material'
import { styled } from '@mui/system'
import MainSlider from '../MainSlider'
import ProductsTape from '../UI/ProductsTape'
import { useCliserMarketContext } from '../../EcommerceMain'


//Styled Components
const StyledCliserDigitalMarketHomePage = styled(Box)(
    () => ({
    
    })
)


const CliserDigitalMarketHomePage = () => {

    const {categories, categoriesDownload} = useCliserMarketContext()


    return (
        <StyledCliserDigitalMarketHomePage>
            <MainSlider />
            <Container  maxWidth="lg" >
                <Grid container spacing={0} width={'100%'}
                >
                    {
                        !categoriesDownload
                        ?

                            categories && categories?.length > 0
                            ?
                            categories.map((category, key) => {
                                return (
                                    <Grid
                                    item
                                    key={key} 
                                    xxs={12}
                                    >
                                        <ProductsTape 
                                        title={category.category_name} 
                                        Cat={category}
                                        />
                                    </Grid>
                                )
                            })
                            :
                            null
                        : <>
                                <Grid item xxs={12}>
                                    <Skeleton width={'100%'} height={300}></Skeleton>

                                </Grid>
                                <Grid item xxs={12}>
                                    <Skeleton width={'100%'} height={300}></Skeleton>

                                </Grid>
                                <Grid item xxs={12}>
                                    <Skeleton width={'100%'} height={300}></Skeleton>

                                </Grid>
                            </>
                    }
                </Grid>
            </Container>
        </StyledCliserDigitalMarketHomePage>
    );
};

export default CliserDigitalMarketHomePage;