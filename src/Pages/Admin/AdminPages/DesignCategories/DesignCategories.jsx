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
import { addDesignCategories, deleteDesignCategories, fetchDesignCategories, permanentDeleteDesignCategories, restoreDesignCategories, updateDesignCategories } from '../../../../Services/AdminServices/Services/designCategoriesService'

// icons

// Styled Components
const StyledDesignCategories = styled(Box)(
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
            "field_name": "designs",
            "fetched_column": "design_title",
            "related_table_id": "id",
            add_to_add_form: false,
            fetch_all_data: null, 
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
    'design_type': "enum|element,component,section",
    'designs': "one-to-many",
    "created_at": "dateTime",
    "updated_at": "dateTime"
}

export const imagesFolderName = "DesignCategoriesImages"
const DesignCategories = () => {
    return (
        <StyledDesignCategories>
            <DatabaseView
                    title="Design Categories"
                    icon={null}
                    handleFetchData={fetchDesignCategories}
                    handleUpdateData={updateDesignCategories}
                    handleDeleteData={deleteDesignCategories}
                    handleRestoreData={restoreDesignCategories}
                    handlePermanentDeleteData={permanentDeleteDesignCategories}
                    handleAddData={addDesignCategories}
                    softDeletes={true}
                    relationships={relationships}
                    columns={columns}
                    imagesFolderName={imagesFolderName}
                />
        </StyledDesignCategories>
    );
};

export default DesignCategories;