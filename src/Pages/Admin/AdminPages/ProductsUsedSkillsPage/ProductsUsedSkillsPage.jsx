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
import GestureIcon from '@mui/icons-material/Gesture';

//Styled Components
const StyledProductsUsedSkillsPage = styled(Box)(
    () => ({
    
    })
)


const ProductsUsedSkillsPage = () => {
    return (
        <StyledProductsUsedSkillsPage>
            <DatabaseView
                // databaseOptions={featuresOptions}
                title="Products Used Skills"
                icon={<GestureIcon />}
                // handleUpdateData={productFeaturesService.fetchProductsFeatures}
            />
        </StyledProductsUsedSkillsPage>
    );
};

export default ProductsUsedSkillsPage;