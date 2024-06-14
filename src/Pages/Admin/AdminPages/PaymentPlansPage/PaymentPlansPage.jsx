// React
import {
    
} from 'react'

//services
import { 
addPaymentPlans,
deletePaymentPlans,
fetchPaymentPlans,
permanentDeletePaymentPlans,
restorePaymentPlans,
updatePaymentPlans,
} from '../../../../Services/AdminServices/Services/paymentPlans';


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
import PaymentsIcon from '@mui/icons-material/Payments';
import { fetchUsers } from '../../../../Services/AdminServices/Services/usersService';
import { fetchPaymentPlanFeatures } from '../../../../Services/AdminServices/Services/paymentPlanFeatures';

// Styled Components
const StyledPaymentPlansPage = styled(Box)(
    () => ({
        // Add your styled components here
    })
)

const relationships = {
    manyToOne:[
    ],
    manyToMany:[
        
        {
            "field_name": "users",
            "fetched_column": "first_name",
            "related_table_id": "id",
            add_to_add_form: false, //TODO: I have to add this to the form, and when add it, there is other fields in many-to-many table for that it's not being added
            fetch_all_data: fetchUsers, 
        },
    ],
    oneToMany:[
        {
            "field_name": "features",
            "fetched_column": "payment_plan_feature_name",
            "related_table_id": "id",
            fetch_all_data: fetchPaymentPlanFeatures,
            add_to_add_form: false,
        },
    ]
}

const columns = {
    "id": "pk",
    'payment_plan_title': "string",
    'payment_plan_monthly_price': "decimal",
    'payment_plan_yearly_price': "decimal",
    'payment_plan_description': "text",
    'is_active': "bool",
    'features': "one-to-many",
    'users': "many-to-many",
    "created_at": "dateTime",
    "updated_at": "dateTime"
}


const PaymentPlansPage = () => {
    return (
        <StyledPaymentPlansPage>
            <DatabaseView
                    title="Payment Plans"
                    icon={<PaymentsIcon color='primary.contrastText' />}
                    handleFetchData={fetchPaymentPlans}
                    handleUpdateData={updatePaymentPlans}
                    handleDeleteData={deletePaymentPlans}
                    handleRestoreData={restorePaymentPlans}
                    handlePermanentDeleteData={permanentDeletePaymentPlans}
                    handleAddData={addPaymentPlans}
                    softDeletes={true}
                    relationships={relationships}
                    columns={columns}
                />
        </StyledPaymentPlansPage>
    );
};

export default PaymentPlansPage;