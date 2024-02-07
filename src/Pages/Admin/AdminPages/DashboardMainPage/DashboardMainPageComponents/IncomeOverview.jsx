//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Card,
} from '@mui/material'
import { styled } from '@mui/system'
import { useTheme } from '@emotion/react'
import { BarChart } from '@mui/x-charts'

//Styled Components
const StyledIncomeOverview = styled(Card)(
    () => ({
    
    })
)

const pData = [2000, 2500, 1000, 500, 1300, 800, 900];
const xLabels = [
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
    'SUN',
];


const IncomeOverview = () => {
    const theme = useTheme()

    return (
        <StyledIncomeOverview>
            <BarChart
                xAxis={[{ scaleType: 'band', data: xLabels }]}
                series={[{ data: pData, label: "Income Overview", color: theme.palette.primary.light }]}
                
                width={500}
                height={300}
                
                />
        </StyledIncomeOverview>
    );
};

export default IncomeOverview;