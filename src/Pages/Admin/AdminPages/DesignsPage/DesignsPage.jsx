// React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

// Components
import { DatabaseView } from '../../../../Components'

// MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { deleteDesigns, fetchDesigns, permanentDeleteDesigns, restoreDesigns } from '../../../../Services/AdminServices/Services/designService'

// icons
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import { fetchElementTypesRows } from '../../../../Services/AdminServices/Services/elementsTypesService'
import { fetchDesignCategories } from '../../../../Services/AdminServices/Services/designCategoriesService'
import { writeFilterObject } from '../../../../Helpers/filterData'
import { fetchDesignedElementsPropValues } from '../../../../Services/AdminServices/Services/designedElementsPropValuesService'

// Styled Components
const StyledDesignsPage = styled(Box)(
    () => ({
        // Add your styled components here
    })
)

const relationships = {
    manyToOne:[
        {
            "field_name": "element_type",
            "fetched_column": "element_type_name",
            "related_table_id": "id",
            add_to_add_form: false,
            fetch_all_data: fetchElementTypesRows, 
        },
        {
            "field_name": "category",
            "fetched_column": "category_name",
            "related_table_id": "id",
            add_to_add_form: false,
            fetch_all_data: fetchDesignCategories, 
        },
    ],
    manyToMany:[
    ],
    oneToMany:[
        {
            "field_name": "children",
            "fetched_column": "element_content",
            "related_table_id": "id",
            add_to_add_form: false,
            fetch_all_data: fetchDesigns, 
        },
        {
            "field_name": "design_prop_values",
            "fetched_column": "design_prop_value",
            "related_table_id": "id",
            add_to_add_form: false,
            fetch_all_data: fetchDesignedElementsPropValues, 
        },
    ]
}

const columns = {
    "id": "pk",
    'design_image': "image",
    'design_title': "string",
    'design_description': "text",
    'design_prop_values': "one-to-many",
    'element_content': "string",
    'element_type': "many-to-one",
    'category': "many-to-one",
    'children': "one-to-many",
    'is_template': "bool",
    'is_child':"bool",
    'design_type': "enum|section,component,element",
    'sequence_number': "int",
    "created_at": "dateTime",
    "updated_at": "dateTime",
}

export const imagesFolderName = "DesignsImages"

const DesignsPage = () => {

    const appliedFilters = useMemo(() => {
        return [writeFilterObject('parent_id', 'string', '=', null)]
    }, [])
    return (
        <StyledDesignsPage>
            <DatabaseView
                    title="Designs"
                    icon={<PreviewOutlinedIcon />}
                    handleFetchData={fetchDesigns}
                    handleDeleteData={deleteDesigns}
                    handleRestoreData={restoreDesigns}
                    handlePermanentDeleteData={permanentDeleteDesigns}
                    disableUpdate
                    disableInsert
                    addingPage={"/create-template"}
                    softDeletes={true}
                    relationships={relationships}
                    columns={columns}
                    imagesFolderName={imagesFolderName}
                    customAppliedFilters={appliedFilters}
                />
        </StyledDesignsPage>
    );
};

export default DesignsPage;