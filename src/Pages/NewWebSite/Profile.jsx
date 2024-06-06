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

//Styled Components
const StyledProfile = styled(Box)(
    () => ({
    
    })
)


const Profile = () => {
   

    return (
        <StyledProfile>
            <ProfileAppBar></ProfileAppBar>
            <Container maxWidth={'100%'} sx = {
                {
                    mt: 8,
                    padding: theme => `${theme.spacing(4)} ${theme.spacing()}`
                    // backgroundImage:
                    //     theme => theme.palette.mode === 'light'
                    //     ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                    //     : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
                    // backgroundSize: '100% 20%',
                    // backgroundRepeat: 'no-repeat',
                }
            }
            >
                <Outlet />
            </Container>


        </StyledProfile>
    );
};

export default Profile;