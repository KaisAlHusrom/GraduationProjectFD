//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Typography
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'

// Icons
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { NavLink } from 'react-router-dom'

//Styled Components
const StyledSocialMedia = styled(Box)(
    ({ theme }) => ({
        width: "100%"
    })
)

const StyledSocialMediaBox = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        alignItems: "center",
        gap: theme.spacing()
    })
);

const StyledNavLink = styled(NavLink)(
    ({ theme }) => ({
        color: theme.palette.text.primary,
        textDecoration: 'none',
        transition: theme.transitions.create(['color'], {
            duration: theme.transitions.standard,
        }),
        "&:hover": {
            color: theme.palette.primary.main
        }
    })
);

const SocialMedia = () => {
    return (
        <StyledSocialMedia>
            <Typography variant='h5' mb={2}>
                Follow Cliser On
            </Typography>
            <StyledSocialMediaBox>
                <StyledNavLink to="#">
                    <LinkedInIcon fontSize='large' />
                </StyledNavLink>
                <StyledNavLink to="#">
                    <InstagramIcon fontSize='large' />
                </StyledNavLink>
            </StyledSocialMediaBox>
        </StyledSocialMedia>
    );
};

SocialMedia.propTypes = {
    children: propTypes.array
}

export default SocialMedia;