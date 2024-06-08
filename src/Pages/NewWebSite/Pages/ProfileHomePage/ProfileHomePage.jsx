//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {

    Container,
    Grid,
} from '@mui/material'
import { styled } from '@mui/system'
import UserInfo from './components/UserInfo/UserInfo'
import BalanceInfo from './components/BalanceInfo/BalanceInfo'
import NewMessages from './components/NewMessages/NewMessages'
import WebProjects from './components/WebProjects/WebProjects'

//Styled Components
const StyledProfileHomePage = styled(Grid)(
    () => ({
    
    })
)


const ProfileHomePage = () => {
    return (
        <Container maxWidth='xl' >
            <StyledProfileHomePage container spacing={2}>
                <Grid container item xxs={12} md={4} spacing={2}>
                    <Grid item xxs={12}>
                        <UserInfo />
                    </Grid>
                    <Grid item xxs={12}>
                        <NewMessages />
                    </Grid>
                </Grid>
                <Grid container item xxs={12} md={8} spacing={2}>
                    <Grid item xxs={12}>
                        <BalanceInfo />
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