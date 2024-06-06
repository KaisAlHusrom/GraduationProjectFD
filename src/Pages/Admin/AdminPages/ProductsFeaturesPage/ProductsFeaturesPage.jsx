// React
import {
    
} from 'react'

//services
import { 
addProductsFeatures,
deleteProductsFeatures,
fetchProductsFeatures,
permanentDeleteProductsFeatures,
restoreProductsFeatures,
updateProductsFeatures,
} from '../../../../Services/AdminServices/Services/productsFeaturesService'


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
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { fetchProducts } from '../../../../Services/AdminServices/Services/productsService'
// Styled Components
const StyledProductsFeaturesPage = styled(Box)(
    () => ({
        // Add your styled components here
    })
)

const relationships = {
    manyToOne:[
        {
            "field_name": "product",
            "fetched_column": "product_name",
            "related_table_id": "id",
            add_to_add_form: true, 
            fetch_all_data: fetchProducts, 
        },
    ],
    manyToMany:[
    ],
    oneToMany:[
    ]
}

const columns = {
    "id": "pk",
    'product': "many-to-one",
    'product_feature_name': "string",
    'product_feature_description': "text",
    "created_at": "dateTime",
    "updated_at": "dateTime"
}


const ProductsFeaturesPage = () => {
    return (
        <StyledProductsFeaturesPage>
            <DatabaseView
                    title="Products Features"
                    icon={<StarBorderOutlinedIcon color='primary.contrastText' />}
                    handleFetchData={fetchProductsFeatures}
                    handleUpdateData={updateProductsFeatures}
                    handleDeleteData={deleteProductsFeatures}
                    handleRestoreData={restoreProductsFeatures}
                    handlePermanentDeleteData={permanentDeleteProductsFeatures}
                    handleAddData={addProductsFeatures}
                    softDeletes={false}
                    relationships={relationships}
                    columns={columns}
                />
        </StyledProductsFeaturesPage>
    );
};

export default ProductsFeaturesPage;