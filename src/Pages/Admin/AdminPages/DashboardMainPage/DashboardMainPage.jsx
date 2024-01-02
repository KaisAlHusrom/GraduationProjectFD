//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components
import Statics from './DashboardMainPageComponents/Statics'

//MUI
import {
    Grid,
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledDashboardMainPage = styled(Grid)(
    () => ({
    
    })
)


const DashboardMainPage = () => {
    return (
        <StyledDashboardMainPage container>
            <Grid item xs={12}>
                <Statics />
            </Grid>
        </StyledDashboardMainPage>
    );
};

export default DashboardMainPage;