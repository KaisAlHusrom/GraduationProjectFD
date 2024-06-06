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
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledProfileHomePage = styled(Grid)(
    ({ theme }) => ({
    
    })
)


const ProfileHomePage = () => {
    return (
        <Container maxWidth='xl' >
            <StyledProfileHomePage container spacing={2}>
                <Grid item xs={12} md={4}>
                    <UserInfo />
                </Grid>
                <Grid item xs={12} md={8}>
                StoreOutlinedIcon
                </Grid>
            </StyledProfileHomePage>
        </Container>
    );
};

export default ProfileHomePage;