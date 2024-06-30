//React

//Components


//MUI
import {
    Box,
    Container,
    useMediaQuery,
    Grid
} from '@mui/material'
import { styled } from '@mui/system'
import ProfileAppBar from './Components/ProfileAppBar/ProfileAppBar'
import { Outlet } from 'react-router-dom'
import ProfileFooter from './Components/ProfileFooter/ProfileFooter';

import CheckPaymentPlanModel from './Components/CheckPaymentPlanModel/CheckPaymentPlanModel';
import ProfileNavBar from './Components/ProfileNavBar/ProfileNavBar';
import { useSelector } from 'react-redux';


//Styled Components
const StyledProfile = styled(Grid)(
    () => ({
    
    })
)


const Profile = () => {
    
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('lg'));

    //dir
    const dir = useSelector(state => state.langSlice.dir)

    const StyledProfilePageSection = styled(Box)(
        ({ theme }) => ({
            width: "calc(100% - 300px)",
            [dir === 'ltr' ? 'marginLeft' : 'marginRight']: 'auto',
            paddingTop: `${theme.spacing(6)}`,
            [theme.breakpoints.down('lg')]: {
                width:  "100%",
            },
        })
    )


    return (
        <StyledProfile container>
            <Grid item xxs={12} >
                <ProfileAppBar />
            </Grid>
            <Grid item >
                <ProfileNavBar />
            </Grid>
            <Grid item sx={{
                width: "100%"
            }}>
                <StyledProfilePageSection>
                    <Container maxWidth={'xl'} 
                    sx={{
                        mt: isSmallScreen ? -8 : 2,
                        padding: theme => `${theme.spacing(2)} ${theme.spacing()}`
                    }}
                    >
                            <Outlet />

                    </Container>
                    <ProfileFooter />
                </StyledProfilePageSection>
            </Grid>

            
            
            
            <CheckPaymentPlanModel />

        </StyledProfile>
    );
};

export default Profile;