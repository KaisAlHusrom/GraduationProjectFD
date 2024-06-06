//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Card, Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { useTheme } from '@emotion/react'
import { BarChart } from '@mui/x-charts'

//Styled Components
const StyledSalesReport = styled(Card)(
    () => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    })
)

const SData = [100, 20, 30, 80, 40, 105, 42];
const PData = [150, 200, 220, 223, 180, 42, 22];
const FData = [500, 552, 402, 603, 630, 500, 100];
const xLabels = [
1,2,3,4,5,6,7
];


const SalesReport = () => {
    const theme = useTheme()
    return (
        <StyledSalesReport>
            <Typography mt={2} variant='h7'>Users Subscriptions Report</Typography>
            <BarChart
                xAxis={[{ scaleType: 'band', data: xLabels }]}
                series={[
                    { data: SData, label: "Super Plan", color: theme.palette.primary.main },
                    { data: PData, label: "Premium Plan", color: theme.palette.secondary.main },
                    { data: FData, label: "Free Plan", color: theme.palette.primary.light }
                ]}
                height={300}
                sx={{
                    width:"100%",
                    '.MuiLineElement-root': {
                    // display: 'none',
                    },
                }}
                
                />
        </StyledSalesReport>
    );
};

export default SalesReport;