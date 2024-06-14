//React
import { useEffect, useMemo, useState } from 'react'

import { useSelector } from 'react-redux'
import config from "../../../../../../../Config.json"
//Components


//MUI
import {
    Box,
    Typography,
    Skeleton
} from '@mui/material'
import { styled } from '@mui/system'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
//propTypes 
import propTypes from 'prop-types'


import { usersProfileImagesFolderName } from '../../../../../../Services/AdminServices/Services/usersService'
import CustomCard from '../CustomCard/CustomCard'
import {AdminMainButtonOutsideState } from '../../../../../../Components'
import EditProfileInfo from './Subcomponents/EditProfileInfo/EditProfileInfo'
import { daysUntil, handleCheckDate } from './Utils/handleCheckData'

import {formattedDate} from "../../../../../../Helpers/DateHelper"


//Styled Components
const StyledUserInfo = styled(Box)(
    ({theme}) => ({
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: theme.spacing(),
        padding: `${theme.spacing(2)} ${theme.spacing()}`,
    })
)

const StyledInfoBox = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: theme.spacing(),
    })
);

const StyledPaymentPlanBox = styled(Box)(
    () => ({
        // Your styles here
    })
);

const StyledImageBox = styled(Box)(
    () => ({
        width: "80px",
        height: "80px",
        borderRadius: "50%"
    })
);

const StyledImage = styled('img')(
    () => ({
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        objectFit: "contain"
    })
);

const StyledUserInfoTail = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(2)
    })
);
const UserInfo = () => {
    const user = useSelector(state => state.authSlice.user)

    const imagePath = useMemo(() => {
        return `${config.ServerImageRoute}/${usersProfileImagesFolderName}/${user?.profile_image}`;

    }, [user?.profile_image])

    // Calculate the expiry date 7 days from the account creation date
    const expiryDateFreeTrial = useMemo(() => {
        if (user) {
            const date = new Date(user.free_trial_expiration_date)
            return date;
        }
        return null;
    }, [user])
    
    //fetch payment plan info
    const [paymentPlan, setPaymentPlan] = useState(null)
    useEffect(() => {
        if (user && user?.payment_plans && user?.payment_plans?.length > 0) {
            setPaymentPlan(user.payment_plans[0]);
        }
    }, [user, setPaymentPlan]);

    // plan expire date
    const expiryDatePaymentPlan = useMemo(() => {
        if(paymentPlan) {
            return new Date(paymentPlan?.pivot?.expire_date)
        }
        return null
    }, [paymentPlan])


    const [updateModalOpen, setUpdateModalOpen] = useState(false)

    //styles
    const dataTextStyle = useMemo(() => {
        return {
            letterSpacing: 1.5,
            width: "150px",
            // whiteSpace: 'nowrap',
            overflow: "hidden",
        }
    }, [])

    const returnRemainDaysText = (date) => {
        return (
            
            <Typography 
                variant='subtitle2' 
                sx={dataTextStyle}
                color={
                    daysUntil(date) < 30 && daysUntil(date) > 7
                    ? 'warning.main'
                    : daysUntil(date) <= 7 
                    ? 'error.main' 
                    : 'primary'
                }
            >
                {daysUntil(date) > 0
                ? `Remain ${daysUntil(date)} days` 
                : `Finished`
            }
            </Typography>
        )
    }


    return (
        <CustomCard 
            cardTail={
            <StyledUserInfoTail>
                <AdminMainButtonOutsideState
                    customState={[updateModalOpen, setUpdateModalOpen]}
                    type='modal'
                    title='Edit Profile Info'
                    appearance='primary'
                    putBorder
                    icon={<EditOutlinedIcon />}
                    modalIcon={<EditOutlinedIcon />}
                    willShow={<EditProfileInfo modalState={[updateModalOpen, setUpdateModalOpen]} />}
                    sx={{
                        fontWeight: "normal",
                        textTransform: "capitalize",
                        letterSpacing: "1.2px"
                    }}
                />
            </StyledUserInfoTail>
            }
        >
            <StyledUserInfo>
                <StyledInfoBox>
                    <StyledImageBox>
                        <StyledImage src={imagePath} alt="" />
                    </StyledImageBox>
                    <Typography variant='h6'>
                        {user?.first_name + ' ' + user?.last_name}
                    </Typography>
                </StyledInfoBox>
                <StyledPaymentPlanBox>
                    {
                    expiryDateFreeTrial && user && expiryDatePaymentPlan
                        ?
                            // for not free plans
                            handleCheckDate(expiryDatePaymentPlan) && paymentPlan?.payment_plan_title !== "Free"
                            ?
                            <Box sx={{opacity: handleCheckDate(expiryDatePaymentPlan) ? 1 : 0.5}}>
                                <Typography variant='h5' color='secondary.light'>
                                    {paymentPlan?.payment_plan_title}
                                </Typography>
                                <Typography variant='subtitle2' sx={dataTextStyle}>
                                    {expiryDatePaymentPlan ? `Expires at ${formattedDate(expiryDatePaymentPlan)}` : ''}
                                </Typography>
                                {returnRemainDaysText(expiryDatePaymentPlan)}
                            </Box>
                            :
                            // for free plans
                            handleCheckDate(expiryDatePaymentPlan) && paymentPlan?.payment_plan_title === "Free"
                            ?
                                //free trial not finished and has free plan
                                handleCheckDate(expiryDateFreeTrial)
                                ?
                                <Box sx={{opacity: handleCheckDate(expiryDateFreeTrial) ? 1 : 0.5}}>
                                    <Typography variant='h5' color='secondary.light'>
                                        Free Trial
                                    </Typography>
                                    <Typography variant='subtitle2' sx={dataTextStyle}>
                                        {expiryDateFreeTrial ? `Expires at ${formattedDate(expiryDateFreeTrial)}` : ''}
                                    </Typography>
                                    {returnRemainDaysText(expiryDateFreeTrial)}
                                </Box>
                                //free trial finished and has free plan
                                :
                                <Box sx={{opacity: handleCheckDate(expiryDatePaymentPlan) ? 1 : 0.5}}>
                                    <Typography variant='h5' color='secondary.light'>
                                        {paymentPlan?.payment_plan_title}
                                    </Typography>
                                    <Typography variant='subtitle2' sx={dataTextStyle}>
                                        {expiryDatePaymentPlan ? `Expires at ${formattedDate(expiryDatePaymentPlan)}` : ''}
                                    </Typography>
                                    {returnRemainDaysText(expiryDatePaymentPlan)}
                                </Box>
                            : 
                            //free trial not finished and plan finished
                            handleCheckDate(expiryDateFreeTrial)
                            ?
                            <Box sx={{opacity: handleCheckDate(expiryDateFreeTrial) ? 1 : 0.5}}>
                                <Typography variant='h5' color='secondary.light'>
                                    Free Trial
                                </Typography>
                                <Typography variant='subtitle2' sx={dataTextStyle}>
                                    {expiryDateFreeTrial ? `Expires at ${formattedDate(expiryDateFreeTrial)}` : ''}
                                </Typography>
                                {returnRemainDaysText(expiryDateFreeTrial)}
                            </Box>
                            :
                            //free trial finished and plan finished
                            <Box sx={{opacity: handleCheckDate(expiryDatePaymentPlan) ? 1 : 0.5}}>
                                <Typography variant='h5' color='secondary.light'>
                                    {paymentPlan?.payment_plan_title}
                                </Typography>
                                <Typography variant='subtitle2' sx={dataTextStyle}>
                                    {expiryDatePaymentPlan ? `Expires at ${formattedDate(expiryDatePaymentPlan)}` : ''}
                                </Typography>
                                {returnRemainDaysText(expiryDatePaymentPlan)}
                            </Box>
                            
                            
                        :
                        //Free trial ends and there is no payment plan
                            <Box sx={{opacity: handleCheckDate(expiryDateFreeTrial) ? 1 : 0.5}}>
                                <Typography variant='h5' color='secondary.light'>
                                    Free Trial
                                </Typography>
                                <Typography variant='subtitle2' sx={dataTextStyle}>
                                    {expiryDateFreeTrial ? `Expires at ${formattedDate(expiryDateFreeTrial)}` : ''}
                                </Typography>
                                {returnRemainDaysText(expiryDateFreeTrial)}
                            </Box>

                    }
                    
                </StyledPaymentPlanBox>
            </StyledUserInfo>
        </CustomCard>
    );
};

UserInfo.propTypes = {
    children: propTypes.array
}

export default UserInfo;