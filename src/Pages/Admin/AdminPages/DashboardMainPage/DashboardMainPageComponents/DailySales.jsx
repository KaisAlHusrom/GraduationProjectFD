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
import { LineChart } from '@mui/x-charts'
import { useTheme } from '@emotion/react'

//Styled Components
const StyledDailySales = styled(Card)(
    () => ({
    
    })
)

const pData = [2000, 2500, 1000, 500, 1300, 800, 900];
const xLabels = [1, 2, 3, 4, 5, 6, 7];  // Mapping days to numbers


const DailySales = () => {
    const theme = useTheme()

    return (
        <StyledDailySales>
            <LineChart
                
                width={500}
                height={300}
                series={[
                    { data: pData, label: 'Daily Sales', color: theme.palette.secondary.main },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
            />
        </StyledDailySales>
    );
};

export default DailySales;