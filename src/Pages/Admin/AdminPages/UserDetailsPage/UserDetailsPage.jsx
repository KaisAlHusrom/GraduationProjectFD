//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components
import {RowDetailsView} from '../../../../Components'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'


//Styled Components
const StyledUserDetailsPage = styled(Box)(
    () => ({
    
    })
)


const UserDetailsPage = () => {

    return (
        <StyledUserDetailsPage>
            <RowDetailsView />
        </StyledUserDetailsPage>
    );
};

export default UserDetailsPage;