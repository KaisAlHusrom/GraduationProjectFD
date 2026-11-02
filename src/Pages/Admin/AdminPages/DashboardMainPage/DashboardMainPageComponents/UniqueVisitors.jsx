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
const StyledUniqueVisitors = styled(Card)(
    () => ({
    
    })
)

const uvData = [2000, 2500, 1000, 500, 1300, 800, 900];
const sessions = [200, 350, 1000, 450, 600, 800, 300]
const xLabels = [
1,2,3,4,5,6,7
];

const UniqueVisitors = () => {
    const theme = useTheme()
    return (
        <StyledUniqueVisitors>
            <LineChart
                
                height={300}
                series={[
                    { data: uvData, label: 'Unique Visitors', area: true, color: theme.palette.primary.main},
                    { data: sessions, label: 'Sessions', area: true, color: theme.palette.secondary.main},
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
                sx={{
                    width:"100%",
                    '.MuiLineElement-root': {
                    // display: 'none',
                    },
                }}
                />
        </StyledUniqueVisitors>
    );
};

export default UniqueVisitors;