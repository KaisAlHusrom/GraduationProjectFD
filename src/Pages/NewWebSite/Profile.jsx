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
import { alpha } from '@mui/material';
import ProfileFooter from './Components/ProfileFooter/ProfileFooter';

//Styled Components
const StyledProfile = styled(Box)(
    () => ({
    
    })
)


const Profile = () => {
   

    return (
        <StyledProfile>
            <ProfileAppBar></ProfileAppBar>
            <Container maxWidth={'xl'} 
            sx={{
                mt: 6,
                padding: theme => `${theme.spacing(4)} ${theme.spacing()}`
            }}
            >
                    <Outlet />

            </Container>
            <ProfileFooter />
            

        </StyledProfile>
    );
};

export default Profile;