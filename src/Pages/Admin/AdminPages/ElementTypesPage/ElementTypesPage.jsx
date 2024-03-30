//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { DatabaseView } from '../../../../Components'


import CodeIcon from '@mui/icons-material/Code';
import { addElementType, deleteElementType, fetchElementTypesRows, permanentDeleteElementType, restoreElementType, updateElementType } from '../../../../Services/elementsTypesService'
import { fetchElementProps } from '../../../../Services/elementPropsService'


//Styled Components
const StyledElementTypesPage = styled(Box)(
    () => ({
    
    })
)

const relationships = {
    manyToOne:[
        {
            "field_name": "parent",
            "fetched_column": "element_type_name",
            "related_table_id": "id",
            add_to_add_form: true,
            fetch_all_data: fetchElementTypesRows, //TODO: convert this to fetch the elements that has true value in is_child column
        }
    ],
    manyToMany:[
        {
            "field_name": "element_props",
            "fetched_column": "element_prop_name",
            "related_table_id": "id",
            add_to_add_form: true,
            fetch_all_data: fetchElementProps,
        }
    ],
    oneToMany:[
        {
            "field_name": "children",
            "fetched_column": "element_type_name",
            "related_table_id": "id",
            add_to_add_form: false,
            fetch_all_data: fetchElementTypesRows, //TODO: convert this to fetch the elements that has true value in is_child column
        }
    ]
}

const columns = {
    id: "pk",
    element_type_name: "string",
    element_type_description: "text",
    element_props: "many-to-many",
    is_child: "bool",
    children: "one-to-many",
    parent: "many-to-one",
    created_at: "dateTime",
    updated_at: "dateTime",
}

const ElementTypesPage = () => {
    return (
        <StyledElementTypesPage>
            <DatabaseView
            title={"Elements Types"}
            icon={<CodeIcon />}
            relationships={relationships}
            columns={columns}
            handleFetchData={fetchElementTypesRows}
            handleUpdateData={updateElementType}
            handleDeleteData={deleteElementType}
            softDeletes={true}
            handleRestoreData={restoreElementType}
            handlePermanentDeleteData={permanentDeleteElementType}
            handleAddData={addElementType}
            />
        </StyledElementTypesPage>
    );
};

export default ElementTypesPage;