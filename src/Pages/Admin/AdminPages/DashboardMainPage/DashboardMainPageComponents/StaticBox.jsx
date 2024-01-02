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

//Styled Components
const StyledStaticBox = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        gap: theme.spacing(),
        alignItems: "center",
    })
)

const StyledImageBox = styled(Box)(
    ({ theme }) => ({
        width: "50px",
        height: "50px"
    })
)


const StaticBox = ({image, title, number}) => {
    return (
        <StyledStaticBox>
                <StyledImageBox>
                    <img src={image} alt="" width="100%" height="100%" />
                </StyledImageBox>
                <Box>
                    <Typography variant='body'>
                        {number}
                    </Typography>
                    <Typography variant='subtitle2'>
                        {title}
                    </Typography>
                </Box>
        </StyledStaticBox>
    );
};

StaticBox.propTypes = {
    image: propTypes.any,
    title: propTypes.string,
    number: propTypes.string,
}

export default StaticBox;