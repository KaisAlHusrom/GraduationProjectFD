
import { LineChart } from '@mui/x-charts/LineChart';

//MUI
import {
    Card,
} from '@mui/material'
import { styled } from '@mui/system'
import { useTheme } from '@emotion/react';




const pData = [0, 2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
    "",
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
    'SUN',
];

//Styles
const StyledWebsiteViews = styled(Card)(
    ({ theme }) => ({
        borderRadius: theme.spacing(2)
    })
);


export default function WebsiteViews() {
    const theme = useTheme()

    return (
        <StyledWebsiteViews>
            <LineChart
            width={500}
            height={300}
            series={[
                { data: pData, label: 'Views', color: theme.palette.primary.main },
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            />

        </StyledWebsiteViews>
    );
}