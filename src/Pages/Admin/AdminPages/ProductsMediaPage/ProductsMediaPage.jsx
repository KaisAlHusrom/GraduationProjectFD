// React
import {
    
} from 'react'

//services
import { 
addProductsMedia,
deleteProductsMedia,
fetchProductsMedia,
permanentDeleteProductsMedia,
productsMediaImagesFolderName,
restoreProductsMedia,
updateProductsMedia,
} from '../../../../Services/AdminServices/Services/productsMedia'


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
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { fetchProducts } from '../../../../Services/AdminServices/Services/productsService'
// Styled Components
const StyledProductsMediaPage = styled(Box)(
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
    'product_media_name': "image:video",
    'is_video': "bool",
    "created_at": "dateTime",
    "updated_at": "dateTime"
}


const ProductsMediaPage = () => {
    return (
        <StyledProductsMediaPage>
            <DatabaseView
                    title="Products Media Page"
                    icon={<PermMediaIcon color='primary.contrastText' />}
                    handleFetchData={fetchProductsMedia}
                    handleUpdateData={updateProductsMedia}
                    handleDeleteData={deleteProductsMedia}
                    handleRestoreData={restoreProductsMedia}
                    handlePermanentDeleteData={permanentDeleteProductsMedia}
                    handleAddData={addProductsMedia}
                    softDeletes={false}
                    relationships={relationships}
                    columns={columns}
                    imagesFolderName={productsMediaImagesFolderName}
                />
        </StyledProductsMediaPage>
    );
};

export default ProductsMediaPage;