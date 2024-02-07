//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { DatabaseView } from '../../../../Components'

//icons
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import productFeaturesService from '../../../../Services/productsFeaturesService'

//Styled Components
const StyledProductsFeaturesPage = styled(Box)(
    ({ theme }) => ({
    
    })
)

const featuresOptions = [

]

const ProductsFeaturesPage = () => {
    return (
        <StyledProductsFeaturesPage>
            <DatabaseView
                // databaseOptions={featuresOptions}
                title="Products Features"
                icon={<StarBorderOutlinedIcon />}
                // handleUpdateData={productFeaturesService.fetchProductsFeatures}
            />
        </StyledProductsFeaturesPage>
    );
};

export default ProductsFeaturesPage;