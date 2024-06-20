// React
import {
    
} from 'react'

//services
import { 
addProducts,
deleteProducts,
fetchProducts,
permanentDeleteProducts,
restoreProducts,
updateProducts,
productsImagesFolderName,
productsFilesFolderName
} from '../../../../Services/AdminServices/Services/productsService'


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
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { fetchUsers } from '../../../../Services/AdminServices/Services/usersService'
import { fetchProductsCategories } from '../../../../Services/AdminServices/Services/categoriesService'
import { fetchProductsFeatures } from '../../../../Services/AdminServices/Services/productsFeaturesService'
import { fetchProductsMedia } from '../../../../Services/AdminServices/Services/productsMedia'
import { fetchProductsUsedSkills } from '../../../../Services/AdminServices/Services/productsUsedSkills'
import { fetchProductsReviews } from '../../../../Services/AdminServices/Services/productReviewsService'
// Styled Components
const StyledProductsPage = styled(Box)(
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
    ],
    manyToMany:[
        {
            "field_name": "categories",
            "fetched_column": "category_name",
            "related_table_id": "id",
            add_to_add_form: true, 
            fetch_all_data: fetchProductsCategories, 
        },
    ],
    oneToMany:[
        {
            "field_name": "product_media",
            "fetched_column": "product_media_name",
            "related_table_id": "id",
            add_to_add_form: false, 
            fetch_all_data: fetchProductsMedia, 
        },
        {
            "field_name": "product_used_skills",
            "fetched_column": "product_used_skill_name",
            "related_table_id": "id",
            add_to_add_form: false, 
            fetch_all_data: fetchProductsUsedSkills, 
        },
        {
            "field_name": "product_features",
            "fetched_column": "product_feature_name",
            "related_table_id": "id",
            add_to_add_form: false, 
            fetch_all_data: fetchProductsFeatures, 
        },
        {
            "field_name": "product_reviews",
            "fetched_column": "comment",
            "related_table_id": "id",
            add_to_add_form: false, 
            fetch_all_data: fetchProductsReviews, 
        },
    ]
}

const columns = {
    "id": "pk",
    'product_name': "string",
    'user': "many-to-one",
    'product_short_description': "string",
    'product_long_description': "text",
    'product_price': "decimal",
    'product_main_image_name': "image",
    'product_file_name': "file",
    'product_media': "one-to-many",
    'product_used_skills': "one-to-many",
    'product_features': "one-to-many",
    'product_reviews': "one-to-many",
    'categories': "many-to-many",
    "created_at": "dateTime",
    "updated_at": "dateTime"
}

//TODO: there is messages and orderItems relationships too


const ProductsPage = () => {
    return (
        <StyledProductsPage>
            <DatabaseView
                    title="Products"
                    icon={<Inventory2OutlinedIcon color='primary.contrastText' />}
                    handleFetchData={fetchProducts}
                    handleUpdateData={updateProducts}
                    handleDeleteData={deleteProducts}
                    handleRestoreData={restoreProducts}
                    handlePermanentDeleteData={permanentDeleteProducts}
                    handleAddData={addProducts}
                    softDeletes={true}
                    relationships={relationships}
                    columns={columns}
                    imagesFolderName={productsImagesFolderName}
                    filesFolderName={productsFilesFolderName}
                />
        </StyledProductsPage>
    );
};

export default ProductsPage;