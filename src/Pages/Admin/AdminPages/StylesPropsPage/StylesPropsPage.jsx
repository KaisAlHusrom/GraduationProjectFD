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
import { fetchStylePropCategory } from '../../../../Services/AdminServices/Services/StylePropCategory'
import { addStyleProps, deleteStyleProps, fetchStyleProps, permanentDeleteStyleProps, restoreStyleProps, updateStyleProps } from '../../../../Services/AdminServices/Services/stylePropsService'

// icons
import TuneIcon from '@mui/icons-material/Tune';
import { writeFilterObject } from '../../../../Helpers/filterData'
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
        },
        {
            "field_name": "parent",
            "fetched_column": "style_prop_css_name",
            "related_table_id": "id",
            fetch_all_data: fetchStyleProps,
            add_to_add_form: true,
            filters: [
                writeFilterObject("is_child", "bool", "=", "false")
            ] // to get only parent elements
        },
    ],
    manyToMany:[
    ],
    oneToMany:[
        {
            "field_name": "options",
            "fetched_column": "style_prop_value_normal_name",
            "related_table_id": "id",
            // fetch_all_data: fetchStylePropCategory,
            add_to_add_form: true,
        },
        {
            "field_name": "children",
            "fetched_column": "style_prop_css_name",
            "related_table_id": "id",
            add_to_add_form: false,
            fetch_all_data: fetchStyleProps, 
            filters: [
                writeFilterObject("is_child", "bool", "=", "true")
            ] // to get only children elements
        }
    ]
}

const columns = {
    "id": "pk",
    'style_prop_normal_name': "string",
    'style_prop_css_name': "string",
    'style_prop_image' : "image",
    'style_prop_description': "text",
    'style_prop_value_type': "enum|none,color,px,string,number,vh,vw,%,px;vh;%,px;vw;%,background-image,shadow,image,fontWeight,opacity,position,time,props,gridTemplateRows,gridTemplateColumns",
    "locateTypes": "enum|Without Directions,Normal Directions,Corner Directions",
    'is_section': "bool",
    'is_child': "bool",
    'is_component': "bool",
    'is_element': "bool",
    'options': "one-to-many",
    'children': "one-to-many",
    "category": "many-to-one",
    "parent": "many-to-one",
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