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
import StarRateIcon from '@mui/icons-material/StarRate';

//Styled Components
const StyledPaymentPlanFeaturesPage = styled(Box)(
    ({ theme }) => ({
    
    })
)


const PaymentPlanFeaturesPage = () => {
    return (
        <StyledPaymentPlanFeaturesPage>
            <DatabaseView
                // databaseOptions={featuresOptions}
                title="Payment Plans Features"
                icon={<StarRateIcon />}
                // handleUpdateData={productFeaturesService.fetchProductsFeatures}
            />
        </StyledPaymentPlanFeaturesPage>
    );
};

export default PaymentPlanFeaturesPage;