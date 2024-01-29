//React
import { } from 'react'

import {
    
} from 'react-redux'


//Components
import {  DatabaseView } from '../../../../Components'

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import usersService from '../../../../Services/usersService'


// import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';


//Styled Components
const StyledUsersPage = styled(Box)(
    () => ({
    
    })
)



const UsersPage = () => {
    // Fetch the users from loader function in the route of the page
    // State to manage the users data


    

    
    

    

    return (
        <StyledUsersPage>
            
            <DatabaseView
                title="Users"
                icon={<GroupOutlinedIcon />}
                handleUpdateData={usersService.updateUser}
                manyToOne={
                    [
                    ]
                }
                manyToMany={
                    [
                    ]
                }
            />
        </StyledUsersPage>
    );
};

export default UsersPage;