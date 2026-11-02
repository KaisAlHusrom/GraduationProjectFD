// React
import {
    
} from 'react'

//services
import { 
addUsersPaymentPlans,
deleteUsersPaymentPlans,
fetchUsersPaymentPlans,
permanentDeleteUsersPaymentPlans,
restoreUsersPaymentPlans,
updateUsersPaymentPlans,
} from '../../../../Services/AdminServices/Services/userPaymentPlan'


import {
    
} from 'react-redux'

// Components
import { DatabaseView } from '../../../../Components'

// MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

// icons
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import { fetchPaymentPlans } from '../../../../Services/AdminServices/Services/paymentPlans'
import { fetchUsers } from '../../../../Services/AdminServices/Services/usersService'
import { fetchBankCards } from '../../../../Services/AdminServices/Services/bankCardsService'
// Styled Components
const StyledUsersPaymentsPlansPage = styled(Box)(
    () => ({
        // Add your styled components here
    })
)

const relationships = {
    manyToOne:[
        {
            "field_name": "payment_plan",
            "fetched_column": "payment_plan_title",
            "related_table_id": "id",
            fetch_all_data: fetchPaymentPlans,
            add_to_add_form: true,
        },
        {
            "field_name": "user",
            "fetched_column": "first_name",
            "related_table_id": "id",
            fetch_all_data: fetchUsers,
            add_to_add_form: true,
        },
        {
            "field_name": "bank_card",
            "fetched_column": "card_number",
            "related_table_id": "id",
            fetch_all_data: fetchBankCards,
            add_to_add_form: true,
        },
    ],
    manyToMany:[
    ],
    oneToMany:[
    ]
}

const columns = {
    "id": "pk",
    'payment_plan': "many-to-one",
    'bank_card': "many-to-one",
    'user': "many-to-one",
    'status': "enum|monthly,yearly",
    'is_active': "bool",
    'bill_date': "date",
    "created_at": "dateTime",
    "updated_at": "dateTime"
}


const UsersPaymentsPlansPage = () => {
    return (
        <StyledUsersPaymentsPlansPage>
            <DatabaseView
                    title="Users Payment Plans"
                    icon={<SubscriptionsOutlinedIcon />}
                    handleFetchData={fetchUsersPaymentPlans}
                    handleUpdateData={updateUsersPaymentPlans}
                    handleDeleteData={deleteUsersPaymentPlans}
                    handleRestoreData={restoreUsersPaymentPlans}
                    handlePermanentDeleteData={permanentDeleteUsersPaymentPlans}
                    handleAddData={addUsersPaymentPlans}
                    softDeletes={false}
                    relationships={relationships}
                    columns={columns}
                />
        </StyledUsersPaymentsPlansPage>
    );
};

export default UsersPaymentsPlansPage;