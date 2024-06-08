//React
import { useEffect, useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Container,

} from '@mui/material'
import { styled } from '@mui/system'
import { alpha } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { CliserMenu } from './Utils/Data';
import FooterMenu from './Subcomponents/FooterMenu/FooterMenu';
import useEffectFetchData from '../../../../Helpers/customHooks/useEffectFetchData';
import { fetchUserProductsCategories } from '../../../../Services/UserServices/Services/productCategoriesUsersService';
import SocialMedia from './Subcomponents/SocialMedia/SocialMedia';
import PaymentMethods from './Subcomponents/PaymentMethods/PaymentMethods';

//Styled Components
const StyledProfileFooter = styled(Box)(
    ({ theme }) => ({
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundImage: theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #FFF, #CEE5FD)'
            : `linear-gradient(${alpha('#090E10', 0.0)}, #02294F)`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        width: "100%",
        [theme.breakpoints.down("md")]: {
            display: "none"
        }
    })
)


const StyledSocialPaymentBox = styled(Box)(
    ({theme}) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',    
        gap: theme.spacing()
    })
);

const ProfileFooter = () => {

    


    return (
        <StyledProfileFooter>
            <Container maxWidth="xl">
                <Box display={'flex'} justifyContent={'space-evenly'}>

                    <FooterMenu 
                        title="Cliser"
                        ListMenu={CliserMenu}
                        download={false}
                    />
                    <FooterMenu 
                        title="Products"
                        fetchProductsCategories={true}
                    />
                    {/* TODO: change this to web projects categories, or anything else */}
                    <FooterMenu 
                        title="Web Projects"
                        ListMenu={CliserMenu}
                    />

                    <StyledSocialPaymentBox>
                        <SocialMedia 
                        />

                        <PaymentMethods 
                        
                        />
                    </StyledSocialPaymentBox>
                    
                </Box>
            </Container>
        </StyledProfileFooter>
    );
};

export default ProfileFooter;