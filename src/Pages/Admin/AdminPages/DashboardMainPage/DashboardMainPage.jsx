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
import WebsiteViews from './DashboardMainPageComponents/WebsiteViews'
import DailySales from './DashboardMainPageComponents/DailySales'
import IncomeOverview from './DashboardMainPageComponents/IncomeOverview'
import UniqueVisitors from './DashboardMainPageComponents/UniqueVisitors'
import DeviceTraffick from './DashboardMainPageComponents/DeviceTraffick'
import SalesReport from './DashboardMainPageComponents/SalesReport'

//Styled Components
const StyledDashboardMainPage = styled(Grid)(
    ({theme}) => ({
        marginBottom: theme.spacing(2)
    })
)


const DashboardMainPage = () => {
    return (
        <StyledDashboardMainPage container spacing={4}>
            <Grid item xs={12}>
                <Statics />
            </Grid>
            <Grid item xs={12} md={4}>
                <IncomeOverview />
            </Grid>
            <Grid item xs={12}  md={4}>
                <WebsiteViews />
            </Grid>
            <Grid item xs={12}  md={4}>
                <DailySales />
            </Grid>
            <Grid item xs={10} md={8}>
                <UniqueVisitors />
            </Grid>
            <Grid item xs={2} md={4}>
                <DeviceTraffick />
            </Grid>
            <Grid item xs={12}>
                <SalesReport />
            </Grid>
        </StyledDashboardMainPage>
    );
};

export default DashboardMainPage;