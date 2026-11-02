//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Grid,
} from '@mui/material'
import { styled } from '@mui/system'
import Sells from './Components/Sells/Sells'

//Styled Components
const StyledMySellsPage = styled(Grid)(
    ({ theme }) => ({
        width: '100%',
        padding: `${theme.spacing(4)} ${theme.spacing(2)}`,
    })
)


const MySellsPage = () => {
    return (
        <StyledMySellsPage container spacing={2}>
            <Grid item xxs={12}>
                <Sells />
            </Grid>
        </StyledMySellsPage>
    );
};

export default MySellsPage;