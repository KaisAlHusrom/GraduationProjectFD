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
import PermMediaIcon from '@mui/icons-material/PermMedia';

//Styled Components
const StyledProductsMedia = styled(Box)(
    () => ({
    
    })
)


const ProductsMediaPage = () => {
    return (
        <StyledProductsMedia>
            <DatabaseView
                // databaseOptions={featuresOptions}
                title="Products Media"
                icon={<PermMediaIcon />}
                // handleUpdateData={productFeaturesService.fetchProductsFeatures}
            />
        </StyledProductsMedia>
    );
};

export default ProductsMediaPage;