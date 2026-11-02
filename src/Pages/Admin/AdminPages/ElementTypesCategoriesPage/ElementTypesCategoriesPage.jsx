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
import { addElementTypesCategories, deleteElementTypesCategories, 
    fetchElementTypesCategories, 
    permanentDeleteElementTypesCategories, 
    restoreElementTypesCategories, 
    updateElementTypesCategories } from '../../../../Services/AdminServices/Services/elementTypesCategories'
import { fetchElementTypesRows } from '../../../../Services/AdminServices/Services/elementsTypesService'

// icons
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';

// Styled Components
const StyledElementTypesCategoriesPage = styled(Box)(
    () => ({
        // Add your styled components here
    })
)

const relationships = {
    manyToOne:[
    ],
    manyToMany:[
    ],
    oneToMany:[
        {
            "field_name": "element_types",
            "fetched_column": "element_type_name",
            "related_table_id": "id",
            add_to_add_form: false,
            fetch_all_data: fetchElementTypesRows, 
            // filters: [
            //     writeFilterObject("is_child", "bool", "=", "true")
            // ] // to get only children elements
        }
    ]
}

const columns = {
    "id": "pk",
    'category_name': "string",
    'category_image': "image",
    'category_description': "text",
    'element_types': "one-to-many",
    "created_at": "dateTime",
    "updated_at": "dateTime"
}

export const elementTypesCategoriesImagesFolderName = "ElementTypeCategoriesImages"

const ElementTypesCategoriesPage = () => {
    return (
        <StyledElementTypesCategoriesPage>
            <DatabaseView
                    title="Element Types Categories"
                    icon={<WidgetsOutlinedIcon />}
                    handleFetchData={fetchElementTypesCategories}
                    handleUpdateData={updateElementTypesCategories}
                    handleDeleteData={deleteElementTypesCategories}
                    handleRestoreData={restoreElementTypesCategories}
                    handlePermanentDeleteData={permanentDeleteElementTypesCategories}
                    handleAddData={addElementTypesCategories}
                    softDeletes={true}
                    relationships={relationships}
                    columns={columns}
                    imagesFolderName={elementTypesCategoriesImagesFolderName}
                />
        </StyledElementTypesCategoriesPage>
    );
};

export default ElementTypesCategoriesPage;