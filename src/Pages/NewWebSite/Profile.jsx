//React

//Components


//MUI
import {
    Box,
    Container,
} from '@mui/material'
import { styled } from '@mui/system'
import ProfileAppBar from './Components/ProfileAppBar/ProfileAppBar'
import { Outlet } from 'react-router-dom'
import ProfileFooter from './Components/ProfileFooter/ProfileFooter';

import CheckPaymentPlanModel from './Components/CheckPaymentPlanModel/CheckPaymentPlanModel';

//Styled Components
const StyledProfile = styled(Box)(
    () => ({
    
    })
)


const Profile = () => {
    



    return (
        <StyledProfile>
            <ProfileAppBar />
            <Container maxWidth={'xl'} 
            sx={{
                mt: 6,
                padding: theme => `${theme.spacing(4)} ${theme.spacing()}`
            }}
            >
                    <Outlet />

            </Container>
            <ProfileFooter />
            
            <CheckPaymentPlanModel />

        </StyledProfile>
    );
};

export default Profile;