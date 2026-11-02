// React
import {
    
} from 'react'

//services
import { 
addProductsReviews,
deleteProductsReviews,
fetchProductsReviews,
permanentDeleteProductsReviews,
restoreProductsReviews,
updateProductsReviews,
} from '../../../../Services/AdminServices/Services/productReviewsService'


import {
    
} from 'react-redux'

// Components
import { DatabaseView } from '../../../../Components'

// MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { fetchUsers } from '../../../../Services/AdminServices/Services/usersService'
import { fetchProducts } from '../../../../Services/AdminServices/Services/productsService'

// icons

// Styled Components
const StyledProductReviewsPage = styled(Box)(
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
            add_to_add_form: true, 
            fetch_all_data: fetchUsers, 
        },
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
    'user': "many-to-one",
    'product': "many-to-one",
    'design_quality_rate': "rate",
    'ease_of_use_rate': "rate",
    'communication_rate': "rate",
    'comment': "text",
    "created_at": "dateTime",
    "updated_at": "dateTime"
}


const ProductReviewsPage = () => {
    return (
        <StyledProductReviewsPage>
            <DatabaseView
                    title="Products Reviews"
                    icon={null}
                    handleFetchData={fetchProductsReviews}
                    handleUpdateData={updateProductsReviews}
                    handleDeleteData={deleteProductsReviews}
                    handleRestoreData={restoreProductsReviews}
                    handlePermanentDeleteData={permanentDeleteProductsReviews}
                    handleAddData={addProductsReviews}
                    softDeletes={false}
                    relationships={relationships}
                    columns={columns}
                />
        </StyledProductReviewsPage>
    );
};

export default ProductReviewsPage;