// React
import {
    
} from 'react'

//services
import { 
addDesignedElementsPropValues,
deleteDesignedElementsPropValues,
fetchDesignedElementsPropValues,
permanentDeleteDesignedElementsPropValues,
restoreDesignedElementsPropValues,
updateDesignedElementsPropValues,
} from '../../../../Services/AdminServices/Services/designedElementsPropValuesService'


import {
    
} from 'react-redux'

// Components
import { DatabaseView } from '../../../../Components'

// MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { fetchDesigns } from '../../../../Services/AdminServices/Services/designService'
import { fetchElementProps } from '../../../../Services/AdminServices/Services/elementPropsService'

// icons
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

// Styled Components
const StyledDesignedElementsPropValuesPage = styled(Box)(
    () => ({
        // Add your styled components here
    })
)

const relationships = {
    manyToOne:[
        {
            "field_name": "design",
            "fetched_column": "design_title",
            "related_table_id": "id",
            add_to_add_form: true,
            fetch_all_data: fetchDesigns, 
        },
        {
            "field_name": "element_prop",
            "fetched_column": "element_prop_name",
            "related_table_id": "id",
            add_to_add_form: true,
            fetch_all_data: fetchElementProps, 
        },
    ],
    manyToMany:[
    ],
    oneToMany:[
    ]
}

const columns = {
    "id": "pk",
    'design': "many-to-one",
    'element_prop': "many-to-one",
    'design_prop_value': "string",
    "created_at": "dateTime",
    "updated_at": "dateTime"
}


const DesignedElementsPropValuesPage = () => {
    return (
        <StyledDesignedElementsPropValuesPage>
            <DatabaseView
                    title="Designed Elements Prop Values"
                    icon={<StarBorderOutlinedIcon />}
                    handleFetchData={fetchDesignedElementsPropValues}
                    handleUpdateData={updateDesignedElementsPropValues}
                    handleDeleteData={deleteDesignedElementsPropValues}
                    handleRestoreData={restoreDesignedElementsPropValues}
                    handlePermanentDeleteData={permanentDeleteDesignedElementsPropValues}
                    handleAddData={addDesignedElementsPropValues}
                    softDeletes={false}
                    relationships={relationships}
                    columns={columns}
                />
        </StyledDesignedElementsPropValuesPage>
    );
};

export default DesignedElementsPropValuesPage;