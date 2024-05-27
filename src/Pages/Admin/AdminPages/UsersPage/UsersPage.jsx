// React
import {
    
} from 'react'

import {
    
} from 'react-redux'

// Components
import { DatabaseView } from '../../../../Components'

// MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { addUsers, deleteUsers, fetchUsers, permanentDeleteUsers, restoreUsers, updateUsers } from '../../../../Services/usersService'

// icons
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
// Styled Components
const StyledUsersPage = styled(Box)(
    () => ({
        // Add your styled components here
    })
)

const relationships = {
    manyToOne:[
    ],
    manyToMany:[
        {
            "field_name": "paymentPlans",
            "fetched_column": "payment_plan_title",
            "related_table_id": "id",
            add_to_add_form: true,
            fetch_all_data: null, 
        },
    ],
    oneToMany:[
    ]
}

const columns = {
    "id": "pk",
    'first_name': "string",
    'last_name': "string",
    'profile_image': "image",
    'mobile_number': "mobileNumber",
    'is_admin': "bool",
    'birth_date': "date",
    'total_balance': "decimal",
    'withdrawable_balance': "decimal",
    'email': "email",
    'password': "password",
    'paymentPlans': "many-to-many",
    "created_at": "dateTime",
    "updated_at": "dateTime"
}

export const imagesFolderName = "UsersProfileImages"

const UsersPage = () => {
    return (
        <StyledUsersPage>
            <DatabaseView
                    title="Users"
                    icon={<PeopleOutlineOutlinedIcon />}
                    handleFetchData={fetchUsers}
                    handleUpdateData={updateUsers}
                    handleDeleteData={deleteUsers}
                    handleRestoreData={restoreUsers}
                    handlePermanentDeleteData={permanentDeleteUsers}
                    handleAddData={addUsers}
                    softDeletes={true}
                    relationships={relationships}
                    columns={columns}
                    imagesFolderName={imagesFolderName}
                />
        </StyledUsersPage>
    );
};

export default UsersPage;