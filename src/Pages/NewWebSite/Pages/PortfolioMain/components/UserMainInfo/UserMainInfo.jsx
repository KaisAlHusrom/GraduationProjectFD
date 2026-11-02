//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

import config from "../../../../../../../Config.json"
import profileImage from "../../../../../../Assets/Images/businessman.png"
//Components


//MUI
import {
    Box,
    Typography,
    Skeleton
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { useUserContext } from '../../PortfolioMain'
import { usersProfileImagesFolderName } from '../../../../../../Services/AdminServices/Services/usersService'

//Styled Components
const StyledUserMainInfo = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme.spacing()
    })
)

const ImageBox = styled(Box)(
    () => ({
        width: 130,
        height: 130,
        borderRadius: '50%',
    })
);

const StyledImage = styled("img")(
    () => ({
        width: "100%",
        height: "100%",
        borderRadius: '50%',

    })
);

const UserMainInfo = () => {

    const {user} = useUserContext()

    const imagePath = useMemo(() => {
        return `${config.ServerImageRoute}/${usersProfileImagesFolderName}/${user?.profile_image}`;

    }, [user?.profile_image])

    return (
        <StyledUserMainInfo>
            <ImageBox>
                <StyledImage src={user && user?.profile_image ? imagePath : profileImage} alt={user?.first_name} />
            </ImageBox>
            {
                user ?
                    <Typography variant='h6' textTransform={'capitalize'} >
                                {user?.first_name + ' ' + user?.last_name}
                    </Typography>
                    :
                    <Skeleton variant='text' width={200} />

            }
            {/* TODO: ممكن نحط اوسمة هون بعدين */}
        </StyledUserMainInfo>
    );
};

UserMainInfo.propTypes = {
    children: propTypes.array
}

export default UserMainInfo;