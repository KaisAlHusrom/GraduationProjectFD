//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components
import { DatabaseView } from '../../../../Components'

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
//Styled Components
const StyledPaymentPlansPage = styled(Box)(
    () => ({
    
    })
)


const PaymentPlansPage = () => {
    return (
        <StyledPaymentPlansPage>
            <DatabaseView
                // databaseOptions={featuresOptions}
                title="Payment Plans"
                icon={<ImportContactsIcon />}
                // handleUpdateData={productFeaturesService.fetchProductsFeatures}
            />
        </StyledPaymentPlansPage>
    );
};

export default PaymentPlansPage;