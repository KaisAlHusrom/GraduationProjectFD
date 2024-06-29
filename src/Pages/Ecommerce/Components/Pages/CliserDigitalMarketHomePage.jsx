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
            <Container maxWidth="lg">
                <Grid container
                justifyContent={'center'} // Center the content on small screens
                alignItems="center"
                style={{ minHeight: '20px',marginTop:'10px'}}
                sx={{
                    '@media (max-width: 430px)': { // Apply styles for screens under 430px
                        display: 'block', // Turn off display flex for screens under 430px
                        },
                    }}
                
                >
                    {
                        !categoriesDownload
                        ?

                            categories && categories?.length > 0
                            ?
                            categories.map((category, key) => {
                                return (
                                    <ProductsTape key={key} 
                                    title={category.category_name} 
                                    Cat={category}
                                    />
                                )
                            })
                            :
                            null
                        : <>
                        <Grid item xxs={12}>
                            <Skeleton width={'100%'} height={400}></Skeleton>

                        </Grid>
                        <Grid item xxs={12}>
                            <Skeleton width={'100%'} height={400}></Skeleton>

                        </Grid>
                        <Grid item xxs={12}>
                            <Skeleton width={'100%'} height={400}></Skeleton>

                        </Grid>
                        </>
                    }
                </Grid>
            </Container>
        </StyledCliserDigitalMarketHomePage>
    );
};

export default CliserDigitalMarketHomePage;