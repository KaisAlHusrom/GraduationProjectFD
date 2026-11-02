// React
import {
    
} from 'react'

//services
import { 
addPaymentPlanFeatures,
deletePaymentPlanFeatures,
fetchPaymentPlanFeatures,
permanentDeletePaymentPlanFeatures,
restorePaymentPlanFeatures,
updatePaymentPlanFeatures,
paymentPlaneFeaturesImagesFolderName
} from '../../../../Services/AdminServices/Services/paymentPlanFeatures'


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
import StarRateIcon from '@mui/icons-material/StarRate';
import { fetchPaymentPlans } from '../../../../Services/AdminServices/Services/paymentPlans'
// Styled Components
const StyledPaymentPlanFeaturesPage = styled(Box)(
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
    ],
    manyToMany:[
        
    ],
    oneToMany:[
    ]
}

const columns = {
    "id": "pk",
    'payment_plan_feature_name': "string",
    'payment_plan_feature_image': "image",
    'payment_plan_feature_description': "text",
    'payment_plan': "many-to-one",
    "created_at": "dateTime",
    "updated_at": "dateTime"
}


const PaymentPlanFeaturesPage = () => {
    return (
        <StyledPaymentPlanFeaturesPage>
            <DatabaseView
                    title="Payment Plan Features"
                    icon={<StarRateIcon color='primary.contrastText' />}
                    handleFetchData={fetchPaymentPlanFeatures}
                    handleUpdateData={updatePaymentPlanFeatures}
                    handleDeleteData={deletePaymentPlanFeatures}
                    handleRestoreData={restorePaymentPlanFeatures}
                    handlePermanentDeleteData={permanentDeletePaymentPlanFeatures}
                    handleAddData={addPaymentPlanFeatures}
                    softDeletes={false}
                    relationships={relationships}
                    columns={columns}
                    imagesFolderName={paymentPlaneFeaturesImagesFolderName}
                />
        </StyledPaymentPlanFeaturesPage>
    );
};

export default PaymentPlanFeaturesPage;