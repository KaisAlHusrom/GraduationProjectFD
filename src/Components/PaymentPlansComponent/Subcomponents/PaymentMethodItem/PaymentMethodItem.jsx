//React
import { useMemo, useState } from 'react'

import { useSelector } from 'react-redux'

//Components


//MUI
import {
    Box,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    Tabs,
    Tab
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { getCardImage, getCardType } from '../../../../Helpers/getCardType'
import useEffectFetchData from '../../../../Helpers/customHooks/useEffectFetchData'
import { fetchUserBankCards } from '../../../../Services/UserServices/Services/bankCardsUsersService'
import { writeFilterObject } from '../../../../Helpers/filterData'
import CreditCardForm from '../../../CreditCardForm/CreditCardForm'

//Styled Components
const StyledPaymentMethodItem = styled(Box)(
    ({ theme }) => ({
    
    })
)

const YourPlan = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        flexDirection: 'column',
        gap: theme.spacing(3)
    })
);

const RadioItem = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        alignItems: "center",
        gap: theme.spacing(2)
    })
);


const PaymentMethodItem = (props) => {
    const {
        bankCardState,
        handleChangeBankCard
    } = props
    const user = useSelector(state => state.authSlice.user);

    const [selectedBankCard, setSelectedBankCard] = bankCardState

    //fetch bank cards
    const params = useMemo(() => {
        return [
            null,
            null,
            [
                writeFilterObject("user_id", "string", '=', user?.id)
            ]
        ]
    }, [user])
    const {data: userBankCards, download: downloadBankCards} = useEffectFetchData(fetchUserBankCards, params, true, false)


    const [tabsValue, setTabsValue] = useState(0)
    const handleChange = (e, newValue) => {
        setTabsValue(newValue)
    }

    return (
        <StyledPaymentMethodItem>
            <Typography variant='h6' letterSpacing={1.5} >
                Exiting payment method
            </Typography>
            <Tabs value={tabsValue} onChange={handleChange}>
                <Tab label="Existing Cards" id={0} />
                <Tab label="New Payment Method"  id={1}  />
            </Tabs>
            <CustomTabPanel value={tabsValue} index={0}>
            {
                !downloadBankCards
                ?
                    userBankCards && userBankCards.length > 0 
                    ?
                                <RadioGroup
                                name="credit-cards"
                                onChange={handleChangeBankCard}
                                value={selectedBankCard}
                                >
                                    <YourPlan>
                                            {
                                                userBankCards.map((card, key) => {
                                                    return (
                                                        <FormControlLabel
                                                            key={key}
                                                            value={card.id}
                                                            control={<Radio />}
                                                            label={
                                                                <RadioItem>
                                                                    <Box>
                                                                        <Typography variant='h7'>
                                                                        Starts In: {card.card_number.slice(0, 4)}
                                                                        </Typography>
                                                                        <Typography variant='body2'>
                                                                        Expiration: {card.expiry_date}
                                                                        </Typography>
                                                                        <Typography variant='body2'>
                                                                        Name: {card.card_holder_name}
                                                                        </Typography>
                                                                    </Box>
                                                                    <img 
                                                                        src={getCardImage(card?.card_number)} 
                                                                        label={getCardType(card?.card_number)}  
                                                                        width={50}
                                                                        height={50}
                                                                    />
                                                                </RadioItem>
                                                            }
                                                        />
                                                    )
                                                })
                                            }
                                    </YourPlan>
                                </RadioGroup>
                                :null
                        :null
                    }
            </CustomTabPanel>
            <CustomTabPanel value={tabsValue} index={1}>
                <CreditCardForm />
            </CustomTabPanel>
            
        </StyledPaymentMethodItem>
    );
};

PaymentMethodItem.propTypes = {
    bankCardState: propTypes.array,
    handleChangeBankCard: propTypes.func
}

export default PaymentMethodItem;

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}