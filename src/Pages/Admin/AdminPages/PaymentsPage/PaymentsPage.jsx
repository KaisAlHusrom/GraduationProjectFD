// React
import {
    
} from 'react'

//services
import { 
addUsersPayments,
deleteUsersPayments,
fetchUsersPayments,
permanentDeleteUsersPayments,
restoreUsersPayments,
updateUsersPayments,
} from '../../../../Services/AdminServices/Services/userPayments'


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
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import { fetchUsers } from '../../../../Services/AdminServices/Services/usersService'
import { fetchUsersPaymentPlans } from '../../../../Services/AdminServices/Services/userPaymentPlan'
import { fetchOrders } from '../../../../Services/AdminServices/Services/ordersService'
import { fetchBankCards } from '../../../../Services/AdminServices/Services/bankCardsService'

// Styled Components
const StyledPaymentsPage = styled(Box)(
    () => ({
        // Add your styled components here
    })
)

const relationships = {
    manyToOne:[
        {
            "field_name": "user",
            "fetched_column": "first_name",
            "related_table_id": "id",
            fetch_all_data: fetchUsers,
            add_to_add_form: true,
        },
        {
            "field_name": "user_payment_plan",
            "fetched_column": "payment_plan.payment_plan_title",
            "related_table_id": "id",
            fetch_all_data: fetchUsersPaymentPlans,
            add_to_add_form: true,
        },
        {
            "field_name": "order",
            "fetched_column": "id",
            "related_table_id": "id",
            fetch_all_data: fetchOrders,
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
    'user': 'many-to-one',
    'user_payment_plan': "many-to-one",
    'order': 'many-to-one',
    'bank_card': 'many-to-one',
    'amount':"decimal",
    'status':"enum|accepted,rejected,pending",
    "created_at": "dateTime",
    "updated_at": "dateTime"
}


const PaymentsPage = () => {
    return (
        <StyledPaymentsPage>
            <DatabaseView
                    title="Payments"
                    icon={<PaymentOutlinedIcon />}
                    handleFetchData={fetchUsersPayments}
                    handleUpdateData={updateUsersPayments}
                    handleDeleteData={deleteUsersPayments}
                    handleRestoreData={restoreUsersPayments}
                    handlePermanentDeleteData={permanentDeleteUsersPayments}
                    handleAddData={addUsersPayments}
                    softDeletes={false}
                    relationships={relationships}
                    columns={columns}
                />
        </StyledPaymentsPage>
    );
};

export default PaymentsPage;