//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components
import { DatabaseView } from '../../../../Components'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import { fetchStyleProps } from '../../../../Services/AdminServices/Services/stylePropsService'

//services
import { addStylePropValues, deleteStylePropValues, fetchStylePropValues, permanentDeleteStylePropValues, restoreStylePropValues, updateStylePropValues } from '../../../../Services/AdminServices/Services/stylePropValues'

//Styled Components
const StyledStylePropValuesPage = styled(Box)(
    ({ theme }) => ({
    
    })
)

//relations
const relations = {
    manyToOne:[
        {
            "field_name": "style_prop",
            "fetched_column": "style_prop_css_name",
            "related_table_id": "id",
            fetch_all_data: fetchStyleProps,
            add_to_add_form: true,
        }
    ],
    manyToMany:[
        
    ],
    oneToMany:[
        
    ]
}

//columns
const columns = {
    "id": "pk",
    style_prop: "many-to-one",
    style_prop_value_normal_name: "string",
    style_prop_value_css_name: "string",
    style_prop_value_description: "text",
    style_prop_value_image: "image",
    created_at: "dateTime",
    updated_at: "dateTime",
}


const StylePropValuesPage = () => {
    return (
        <StyledStylePropValuesPage>
            <DatabaseView
                    title="Styles Property Values"
                    icon={<FormatColorFillIcon />}
                    relationships={relations}
                    columns={columns}
                    handleAddData={addStylePropValues}
                    handleFetchData={fetchStylePropValues}
                    handleDeleteData={deleteStylePropValues}
                    handleUpdateData={updateStylePropValues}
                    handleRestoreData={restoreStylePropValues}
                    handlePermanentDeleteData={permanentDeleteStylePropValues}
                    imagesFolderName={"StylePropValuesImages"}
                />
        </StyledStylePropValuesPage>
    );
};

export default StylePropValuesPage;