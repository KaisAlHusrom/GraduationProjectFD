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
import { fetchStylePropCategory } from '../../../../Services/StylePropCategory'
import { addStyleProps, deleteStyleProps, fetchStyleProps, permanentDeleteStyleProps, restoreStyleProps, updateStyleProps } from '../../../../Services/stylePropsService'

// icons
import TuneIcon from '@mui/icons-material/Tune';
// Styled Components
const StyledStylesPropsPage = styled(Box)(
    () => ({
        // Add your styled components here
    })
)

const relationships = {
    manyToOne:[
        {
            "field_name": "category",
            "fetched_column": "category_name",
            "related_table_id": "id",
            fetch_all_data: fetchStylePropCategory,
            add_to_add_form: true,
        }
    ],
    manyToMany:[
    ],
    oneToMany:[
        {
            "field_name": "options",
            "fetched_column": "style_prop_value_normal_name",
            "related_table_id": "id",
            // fetch_all_data: fetchStylePropCategory,
            add_to_add_form: false,
        }
    ]
}

const columns = {
    "id": "pk",
    'style_prop_normal_name': "string",
    'style_prop_css_name': "string",
    'style_prop_image' : "image",
    'style_prop_description': "text",
    'style_prop_value_type': "string",
    'is_section': "bool",
    'is_component': "bool",
    'is_element': "bool",
    'options': "one-to-many",
    "category": "many-to-one",
    "created_at": "dateTime",
    "updated_at": "dateTime"
}


const StylesPropsPage = () => {
    return (
        <StyledStylesPropsPage>
            <DatabaseView
                    title="Style Props Page"
                    icon={<TuneIcon />}
                    handleFetchData={fetchStyleProps}
                    handleUpdateData={updateStyleProps}
                    handleDeleteData={deleteStyleProps}
                    handleRestoreData={restoreStyleProps}
                    handlePermanentDeleteData={permanentDeleteStyleProps}
                    handleAddData={addStyleProps}
                    softDeletes={true}
                    relationships={relationships}
                    columns={columns}
                    imagesFolderName={"StylePropsImages"} // get images folder from server
                />
        </StyledStylesPropsPage>
    );
};

export default StylesPropsPage;