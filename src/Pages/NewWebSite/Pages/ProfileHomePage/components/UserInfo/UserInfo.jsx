//React
import { useEffect, useMemo, useState } from 'react'

import { useSelector } from 'react-redux'
import config from "../../../../../../../Config.json"
//Components


//MUI
import {
    Box,
    Typography
} from '@mui/material'
import { styled } from '@mui/system'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
//propTypes 
import propTypes from 'prop-types'


import { usersProfileImagesFolderName } from '../../../../../../Services/AdminServices/Services/usersService'
import CustomCard from '../CustomCard/CustomCard'
import {AdminMainButtonOutsideState } from '../../../../../../Components'
import EditProfileInfo from './Subcomponents/EditProfileInfo/EditProfileInfo'
import useEffectFetchData from '../../../../../../Helpers/customHooks/useEffectFetchData'
import { fetchUserUsersPaymentPlans } from '../../../../../../Services/UserServices/Services/userPaymentPlanUsersService'
import { writeFilterObject } from '../../../../../../Helpers/filterData'
import { handleCheckDate } from './Utils/handleCheckData'

import {formattedDate} from "../../../../../../Helpers/DateHelper"
import { whitespace } from 'stylis'


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
    const params = useMemo(() => {
        return [
            null,
            null,
            [writeFilterObject("user_id", "string", "=", user?.id)],
            null,
            null,
            null,
        ]
    }, [user?.id])
    const {data, download} = useEffectFetchData(fetchUserUsersPaymentPlans, params, user, false)
    const [paymentPlan, setPaymentPlan] = useState(null)
    useEffect(() => {
        if(data) {
            setPaymentPlan(data[0])
        }
    }, [data])

    // plan expire date
    const expiryDatePaymentPlan = useMemo(() => {
        if(paymentPlan) {
            return new Date(paymentPlan?.expire_date)
        }
        return null
    }, [paymentPlan])

    //TODO: if plan expired modal will be shown, (doit here or other place, I'm not sure)
    // const []
    // useEffect(() => {
    //     if(paymentPlan && expiryDatePaymentPlan) {
    //         if(handleCheckDate(expiryDatePaymentPlan)) {
    //             set
    //         }
    //     }
    // }, [])

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
                        paymentPlan && expiryDatePaymentPlan
                        ?
                            
                                <Box sx={{opacity: handleCheckDate(expiryDatePaymentPlan) ? 1 : 0.5}}>
                                    <Typography variant='h5' color='secondary.light'>
                                        {paymentPlan?.payment_plan?.payment_plan_title}
                                    </Typography>
                                    <Typography variant='subtitle2' sx={dataTextStyle}>
                                        {expiryDatePaymentPlan ? `Expires at ${formattedDate(expiryDatePaymentPlan)}` : ''}
                                    </Typography>
                                </Box>
                        :
                        <Box sx={{opacity: handleCheckDate(expiryDateFreeTrial) ? 1 : 0.5}}>
                            <Typography variant='h5' color='secondary.light'>
                                Free Trial
                            </Typography>
                            <Typography variant='subtitle2' sx={dataTextStyle}>
                                {expiryDateFreeTrial ? `Expires at ${formattedDate(expiryDateFreeTrial)}` : ''}
                            </Typography>
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