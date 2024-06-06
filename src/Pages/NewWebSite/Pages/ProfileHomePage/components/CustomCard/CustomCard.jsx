//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Card,
    Divider
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledCustomCard = styled(Card)(
    ({ theme }) => ({
        width: "100%",
        height: "100%",
        borderRadius: theme.spacing(),
        padding: theme.spacing(2),
        minHeight: "260px"
    })
)


const CustomCard = ({children, cardTail}) => {

    return (
        <StyledCustomCard elevation={4}>
            {children}
            
            {cardTail && 
            
            <>
            <Divider />
            {cardTail}
            </>
            }
        </StyledCustomCard>
    );
};

CustomCard.propTypes = {
    children: propTypes.object,
    cardTail: propTypes.object,
    
}

export default CustomCard;