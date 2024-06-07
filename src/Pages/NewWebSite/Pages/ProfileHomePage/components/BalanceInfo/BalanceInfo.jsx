//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import CustomCard from '../CustomCard/CustomCard'
import BalanceBox from './Subcomponents/BalanceBox/BalanceBox'

//Styled Components
const StyledBalanceInfo = styled(Box)(
    () => ({
    })
)

const StyledBalancesBox = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        width: "100%",
        justifyContent: 'center',
        gap: theme.spacing(2)
    })
);

const BalanceInfo = () => {
    return (
        <StyledBalanceInfo>
            <CustomCard 
            >
                <StyledBalancesBox>
                    <BalanceBox
                        title={"Total Balance"}
                        total={20}
                        colored
                    />
                    <BalanceBox 
                        title={"Withdrawable Balance"}
                        total={10}
                    />
                </StyledBalancesBox>
            </CustomCard>
        </StyledBalanceInfo>
    );
};

export default BalanceInfo;