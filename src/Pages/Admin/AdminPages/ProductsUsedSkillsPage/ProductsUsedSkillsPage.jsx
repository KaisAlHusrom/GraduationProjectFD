// React
import {
    
} from 'react'

//services
import { 
addProductsUsedSkills,
deleteProductsUsedSkills,
fetchProductsUsedSkills,
permanentDeleteProductsUsedSkills,
restoreProductsUsedSkills,
updateProductsUsedSkills,
} from '../../../../Services/AdminServices/Services/productsUsedSkills'


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
import GestureIcon from '@mui/icons-material/Gesture';
import { fetchProducts } from '../../../../Services/AdminServices/Services/productsService'
// Styled Components
const StyledProductsUsedSkillsPage = styled(Box)(
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
    'product_used_skill_name': "string",
    'how_used': "text",
    "created_at": "dateTime",
    "updated_at": "dateTime"
}


const ProductsUsedSkillsPage = () => {
    return (
        <StyledProductsUsedSkillsPage>
            <DatabaseView
                    title="Products Used Skills"
                    icon={<GestureIcon color='primary.contrastText' />}
                    handleFetchData={fetchProductsUsedSkills}
                    handleUpdateData={updateProductsUsedSkills}
                    handleDeleteData={deleteProductsUsedSkills}
                    handleRestoreData={restoreProductsUsedSkills}
                    handlePermanentDeleteData={permanentDeleteProductsUsedSkills}
                    handleAddData={addProductsUsedSkills}
                    softDeletes={false}
                    relationships={relationships}
                    columns={columns}
                />
        </StyledProductsUsedSkillsPage>
    );
};

export default ProductsUsedSkillsPage;