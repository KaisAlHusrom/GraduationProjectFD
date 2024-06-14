//React
import {
    
} from 'react'

import { useSelector } from 'react-redux'

//Components
import MoveDownIcon from '@mui/icons-material/MoveDown';

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import CustomCard from '../CustomCard/CustomCard'
import BalanceBox from './Subcomponents/BalanceBox/BalanceBox'
import { AdminMainButton } from '../../../../../../Components'
import { formatPrice } from '../../../../../../Helpers/priceHelpers';

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
        gap: theme.spacing(2),
        padding: `${theme.spacing(3.4)} ${theme.spacing()}`,

    })
);

const StyledTail = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(2)
    })
);
const BalanceInfo = () => {
    const user = useSelector(state => state.authSlice.user)
    return (
        <StyledBalanceInfo>
            <CustomCard 
            cardTail={
                <StyledTail>
                <AdminMainButton 
                    type='modal'
                    title='Withdraw Money'
                    appearance='primary'
                    putBorder
                    icon={<MoveDownIcon />}
                    willShow={<Box></Box>}
                    sx={{
                        fontWeight: "normal",
                        textTransform: "capitalize",
                        letterSpacing: "1.2px"
                    }}
                />
            </StyledTail>
            }
            >
                {
                    user 
                    ?
                    <StyledBalancesBox>
                        <BalanceBox
                            title={"Total Balance"}
                            total={formatPrice(user.total_balance)}
                            colored
                        />
                        <BalanceBox 
                            title={"Withdrawable Balance"}
                            total={formatPrice(user.withdrawable_balance)}
                        />
                    </StyledBalancesBox>
                    :
                    null
                }
            </CustomCard>
        </StyledBalanceInfo>
    );
};

export default BalanceInfo;