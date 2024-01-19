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
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import usersService from '../../../../Services/usersService'


// import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';


//Styled Components
const StyledUsersPage = styled(Box)(
    () => ({
    
    })
)

const usersOptions = [
    {
        value: "Delete Users",
        icon: <DeleteOutlineOutlinedIcon />,
        onClick: () => {console.log("delete")}
    }
]




const UsersPage = () => {
    // Fetch the users from loader function in the route of the page
    // State to manage the users data


    

    
    

    

    return (
        <StyledUsersPage>
            
            <DatabaseView
                databaseOptions={usersOptions}
                title="Users"
                icon={<GroupOutlinedIcon />}
                hiddenColumns={["password"]}
                showTableHeaders
                handleUpdateData={usersService.updateUser}
            />
        </StyledUsersPage>
    );
};

export default UsersPage;