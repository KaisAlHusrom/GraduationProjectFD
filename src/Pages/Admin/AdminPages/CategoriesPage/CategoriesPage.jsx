// React
import {
    
} from 'react'

import {
    
} from 'react-redux'

// Components
import { DatabaseView } from '../../../../Components'

// MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//services
import { addProductsCategories, deleteProductsCategories, fetchProductsCategories, permanentDeleteProductsCategories, restoreProductsCategories, updateProductsCategories } from '../../../../Services/AdminServices/Services/categoriesService'

// icons

// Styled Components
const StyledCategoriesPage = styled(Box)(
    () => ({
        // Add your styled components here
    })
)

const relationships = {
    manyToOne:[
        {
            "field_name": "parent",
            "fetched_column": "category_name",
            "related_table_id": "id",
            add_to_add_form: true,
            fetch_all_data: fetchProductsCategories, 
        }
    ],
    manyToMany:[
    ],
    oneToMany:[
    ]
}

const columns = {
    "id": "pk",
    'category_name': "string",
    'category_image': "image",
    'category_description': "text",
    'parent': "many-to-one",
    'is_in_the_main_page': "bool",
    "created_at": "dateTime",
    "updated_at": "dateTime"
}

const imagesFolderName = "ProductsCategoryImages"


const CategoriesPage = () => {
    return (
        <StyledCategoriesPage>
            <DatabaseView
                    title="Products Categories"
                    icon={null}
                    handleFetchData={fetchProductsCategories}
                    handleUpdateData={updateProductsCategories}
                    handleDeleteData={deleteProductsCategories}
                    handleRestoreData={restoreProductsCategories}
                    handlePermanentDeleteData={permanentDeleteProductsCategories}
                    handleAddData={addProductsCategories}
                    softDeletes={true}
                    relationships={relationships}
                    columns={columns}
                    imagesFolderName={imagesFolderName}
                />
        </StyledCategoriesPage>
    );
};

export default CategoriesPage;