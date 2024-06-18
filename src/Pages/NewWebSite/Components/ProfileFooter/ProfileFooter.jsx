//React
import { } from 'react'

import {
    
} from 'react-redux'

//Components
import FooterMenu from './Subcomponents/FooterMenu/FooterMenu'
import SocialMedia from './Subcomponents/SocialMedia/SocialMedia';
import PaymentMethods from './Subcomponents/PaymentMethods/PaymentMethods';

//MUI
import {
    Box,
    Container,
    Typography,
    Divider,
    useMediaQuery
} from '@mui/material'
import { styled } from '@mui/system'

import { alpha } from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright';


//data
import { CliserMenu } from './Utils/Data';


//Styled Components
const StyledProfileFooter = styled(Box)(
    ({ theme }) => ({
        marginTop: theme.spacing(8),
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

const CopyRightStyledBox = styled(Box)(
    ({theme}) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(3),
        width: '100%',
        [theme.breakpoints.down("md")]: {
            marginBottom: theme.spacing(4)
        }
    })
);

const StyledBox = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        justifyContent: 'space-evenly',
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            gap: theme.spacing(2)
        }
    })
);

const ProfileFooter = () => {


    return (
        <StyledProfileFooter>
            <Container maxWidth="xl">
                <StyledBox >

                    <FooterMenu 
                        title="Cliser"
                        ListMenu={CliserMenu}
                        download={false}
                    />
                    <Divider />
                    <FooterMenu 
                        title="Products"
                        fetchProductsCategories={true}
                    />
                    <Divider />
                    {/* TODO: change this to web projects categories, or anything else */}
                    <FooterMenu 
                        title="Web Projects"
                        ListMenu={CliserMenu}
                    />
                    <Divider />
                    <StyledSocialPaymentBox>
                        <SocialMedia 
                        />

                        <PaymentMethods 
                        
                        />
                    </StyledSocialPaymentBox>
                    
                </StyledBox>
                <CopyRightStyledBox>
                    <Box  alignItems='center' display={'flex'} gap={1} >
                        <CopyrightIcon /> 
                        <Typography variant='subtitle1'>
                            2024 CLISER. All Rights Reserved
                        </Typography>
                    </Box>
                </CopyRightStyledBox>
            </Container>
        </StyledProfileFooter>
    );
};

export default ProfileFooter;