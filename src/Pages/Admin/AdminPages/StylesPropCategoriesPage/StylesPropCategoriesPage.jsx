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

// icons
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined';

// Styled Components
const StyledStylesPropCategoriesPage = styled(Box)(
    () => ({
        // Add your styled components here
    })
)

//sever
import { addStylePropCategory, deleteStylePropCategory, fetchStylePropCategory, permanentDeleteStylePropCategory, restoreStylePropCategory, updateStylePropCategory } from '../../../../Services/AdminServices/Services/StylePropCategory'
import { fetchStyleProps } from '../../../../Services/AdminServices/Services/stylePropsService'

const relationships = {
    manyToOne:[
    ],
    manyToMany:[
    ],
    oneToMany:[
        {
            "field_name": "style_props",
            "fetched_column": "style_prop_normal_name",
            "related_table_id": "id",
            fetch_all_data: fetchStyleProps,
            add_to_add_form: false,
        }
    ]
}

const columns = {
    "id": "pk",
    "category_name": "string",
    "category_description": "text",
    "style_props": "one-to-many",
    "category_image": "image",
    "created_at": "dateTime",
    "updated_at": "dateTime"
}


const StyleStylesPropCategoriesPage = () => {
    return (
        <StyledStylesPropCategoriesPage>
            <DatabaseView
                    title="Styles Prop Categories"
                    icon={<WorkspacesOutlinedIcon />}
                    handleFetchData={fetchStylePropCategory}
                    handleUpdateData={updateStylePropCategory}
                    handleDeleteData={deleteStylePropCategory}
                    handleRestoreData={restoreStylePropCategory}
                    handlePermanentDeleteData={permanentDeleteStylePropCategory}
                    handleAddData={addStylePropCategory}
                    softDeletes={true}
                    relationships={relationships}
                    columns={columns}
                    imagesFolderName={"StylePropsCategoryImages"}
                />
        </StyledStylesPropCategoriesPage>
    );
};

export default StyleStylesPropCategoriesPage;