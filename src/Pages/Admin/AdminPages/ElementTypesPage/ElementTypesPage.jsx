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
import { addElementType, deleteElementType, fetchElementTypesRows, permanentDeleteElementType, restoreElementType, updateElementType } from '../../../../Services/AdminServices/Services/elementsTypesService'
import { fetchElementProps } from '../../../../Services/AdminServices/Services/elementPropsService'
import { writeFilterObject } from '../../../../Helpers/filterData'
import { fetchElementTypesCategories } from '../../../../Services/AdminServices/Services/elementTypesCategories'


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
            fetch_all_data: fetchElementTypesRows,
            filters: [
                writeFilterObject("is_child", "bool", "=", "false")
            ] // to get only parent elements
        },
        {
            "field_name": "category",
            "fetched_column": "category_name",
            "related_table_id": "id",
            add_to_add_form: true,
            fetch_all_data: fetchElementTypesCategories,
        },
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
            fetch_all_data: fetchElementTypesRows, 
            filters: [
                writeFilterObject("is_child", "bool", "=", "true")
            ] // to get only children elements
        }
    ]
}

const columns = {
    id: "pk",
    element_type_image: "image",
    category: "many-to-one",
    element_type_name: "string",
    element_type_description: "text",
    element_props: "many-to-many",
    sequence_number: "int",
    not_has_end_tag: "bool",
    is_child: "bool",
    children: "one-to-many",
    parent: "many-to-one",
    created_at: "dateTime",
    updated_at: "dateTime",
}

export const elementTypesImagesFolderName = "ElementTypesImages"

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
            imagesFolderName={elementTypesImagesFolderName}
            />
        </StyledElementTypesPage>
    );
};

export default ElementTypesPage;