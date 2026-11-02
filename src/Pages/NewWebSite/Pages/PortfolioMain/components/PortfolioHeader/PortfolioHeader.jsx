//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import UserMainInfo from '../UserMainInfo/UserMainInfo'

//Styled Components
const StyledPortfolioHeader = styled(Box)(
    () => ({
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40vh',
    })
)


const PortfolioHeader = () => {
    return (
        <StyledPortfolioHeader>
            <UserMainInfo />
        </StyledPortfolioHeader>
    );
};

PortfolioHeader.propTypes = {
    children: propTypes.array
}

export default PortfolioHeader;