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

import TuneIcon from '@mui/icons-material/Tune';
import { addElementProp, deleteElementProp, fetchElementProps, permanentDeleteElementProp, restoreElementProp, updateElementProp } from '../../../../Services/AdminServices/Services/elementPropsService'
import { fetchElementTypesRows } from '../../../../Services/AdminServices/Services/elementsTypesService'


//Styled Components
const StyledElementPropsPage = styled(Box)(
    () => ({
    
    })
)

//relationships
const relationships = {
    manyToOne:[
        
    ],
    manyToMany:[
        {
            "field_name": "element_types",
            "fetched_column": "element_type_name",
            "related_table_id": "id",
            add_to_add_form: true,
            fetch_all_data: fetchElementTypesRows,
        }
    ],
    oneToMany:[
        
    ]
}

//columns
const columns = {
    id: 'pk',
    element_prop_name: "string",
    element_prop_description: "text",
    element_types: "many-to-many",
    created_at: 'dateTime',
    updated_at: 'dateTime',
}


const ElementPropsPage = () => {
    return (
        <StyledElementPropsPage>
            <DatabaseView
            title={"Elements Props"}
            icon={<TuneIcon />}
            relationships={relationships}
            columns={columns}
            handleUpdateData={updateElementProp}
            handleFetchData={fetchElementProps}
            handleDeleteData={deleteElementProp}
            softDeletes={true}
            handleRestoreData={restoreElementProp}
            handlePermanentDeleteData={permanentDeleteElementProp}
            handleAddData={addElementProp}
            />
        </StyledElementPropsPage>   
    );
};

export default ElementPropsPage;