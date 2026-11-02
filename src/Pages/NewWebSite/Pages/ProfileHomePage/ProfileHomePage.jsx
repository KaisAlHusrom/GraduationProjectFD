//React
import {
    
} from 'react'

import {
    
} from 'react-redux'



//MUI
import {

    Container,
    Grid,
} from '@mui/material'
import { styled } from '@mui/system'

//Components
import UserInfo from './components/UserInfo/UserInfo'
import BalanceInfo from './components/BalanceInfo/BalanceInfo'
import NewMessages from './components/NewMessages/NewMessages'
import MyProducts from './components/MyProducts/MyProducts'
import WebProjects from './components/WebProjects/WebProjects'
import MySells from './components/MySells/MySells'

//Styled Components
const StyledProfileHomePage = styled(Grid)(
    () => ({
    
    })
)


const ProfileHomePage = () => {
    return (
        <Container maxWidth='xl' sx={{mt: 4}} >
            <StyledProfileHomePage container spacing={2}>

                <Grid container item xxs={12} md={4} gap={2} height={'fit-content'}>
                    <Grid item xxs={12} height={260}>
                        <UserInfo />
                    </Grid>
                    <Grid item xxs={12}>
                        <NewMessages />
                    </Grid>
                    <Grid item xxs={12}>
                        <MySells />
                    </Grid>
                </Grid>

                <Grid container item xxs={12} md={8} spacing={2}>
                    <Grid item xxs={12}>
                        <BalanceInfo />
                    </Grid>
                    <Grid item xxs={12}>
                        <MyProducts />
                    </Grid>
                    <Grid item xxs={12}>
                        <WebProjects />
                    </Grid>
                </Grid>
                
            
            </StyledProfileHomePage>
        </Container>
    );
};

export default ProfileHomePage;