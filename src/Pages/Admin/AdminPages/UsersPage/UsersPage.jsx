//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components
import SortFilterSection from './UsersPageComponents/SortFilterSection'

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledUsersPage = styled(Box)(
    () => ({
    
    })
)


const UsersPage = () => {
    // Fetch the users from loader function in the route of the page
    // const users = useLoaderData() 

    return (
        <StyledUsersPage>
            <SortFilterSection />
        </StyledUsersPage>
    );
};

export default UsersPage;