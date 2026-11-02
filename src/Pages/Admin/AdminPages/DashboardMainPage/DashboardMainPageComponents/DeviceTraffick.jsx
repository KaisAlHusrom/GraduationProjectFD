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
import { PieChart } from '@mui/x-charts'

//Styled Components
const StyledDeviceTraffick = styled(Card)(
    () => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        // padding: theme.spacing(2)
    })
)


const DeviceTraffick = () => {
    const theme = useTheme()
    return (
        <StyledDeviceTraffick>
            <Typography mt={2} variant='h7'>Device Traffic</Typography>
            <PieChart
            
            series={[
                {
                    data: [
                        { id: '1', value: 63, label: 'Desktop', color: theme.palette.primary.main },
                        { id: '2', value: 15, label: 'Tablet', color: theme.palette.primary.light },
                        { id: '3', value: 23, label: 'Mobile', color: theme.palette.secondary.main },
                    ],
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        startAngle: -90,
                        endAngle: 180,
                        cx: 150,
                        cy: 150,
                },
            ]}
            
            height={265}
            sx={{
                width:"100%"
            }}
            />
        </StyledDeviceTraffick>
    );
};

export default DeviceTraffick;