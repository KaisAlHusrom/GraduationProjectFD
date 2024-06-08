//React
import { useMemo } from 'react'

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
import { AdminMainButton } from '../../../../../../Components'
import EditProfileInfo from './Subcomponents/EditProfileInfo/EditProfileInfo'

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
    const expiryDateFreeTrial = user ? new Date(user.created_at) : null;
    if (expiryDateFreeTrial) {
        expiryDateFreeTrial.setDate(expiryDateFreeTrial.getDate() + 7);
    }

    //todo: you have to fetch the user payment plan information;
    // const expiryDateFreeTrial = user && user?.payment_plans && user?.payment_plans?.length > 0 ? new Date(user.payment_plans[0]) : null;
    // if (expiryDateFreeTrial) {
    //     expiryDateFreeTrial.setDate(expiryDateFreeTrial.getDate() + 7);
    // }

    return (
        <CustomCard 
            cardTail={
            <StyledUserInfoTail>
                <AdminMainButton 
                    type='modal'
                    title='Edit Profile Info'
                    appearance='primary'
                    putBorder
                    icon={<EditOutlinedIcon />}
                    willShow={<EditProfileInfo />}
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
                        user?.payment_plans && user?.payment_plans?.length > 0
                        ?
                        <>
                            <Typography variant='h5' color='secondary.light'>
                                {user?.payment_plans[0]?.payment_plan_title}
                            </Typography>
                            <Typography variant='subtitle2' letterSpacing={1.5}>
                                {/* TODO: change this to plan expire date */}
                                {expiryDateFreeTrial ? `Expires at ${expiryDateFreeTrial.toLocaleDateString()}` : ''}
                            </Typography>
                        </>
                        :
                        <>
                            <Typography variant='h5' color='secondary.light'>
                                Free Trial
                            </Typography>
                            <Typography variant='subtitle2' letterSpacing={1.5}>
                                {expiryDateFreeTrial ? `Expires at ${expiryDateFreeTrial.toLocaleDateString()}` : ''}
                            </Typography>
                        </>
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