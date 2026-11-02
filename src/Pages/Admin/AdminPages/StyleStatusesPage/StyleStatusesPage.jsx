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
//icon
import MouseIcon from '@mui/icons-material/Mouse';

//server
import { addStyleStatuses, deleteStyleStatuses, fetchStyleStatuses, permanentDeleteStyleStatuses, restoreStyleStatuses, updateStyleStatuses } from '../../../../Services/AdminServices/Services/styleStatusesService'

// icons

// Styled Components
const StyledStyleStatusesPage = styled(Box)(
    () => ({
        // Add your styled components here
    })
)

const relationships = {
    manyToOne:[
    ],
    manyToMany:[
        //TODO: there is many to many, add it later 
    ],
    oneToMany:[
    ]
}

const columns = {
    "id": "pk",
    'style_status_normal_name': "string",
    'style_status_css_name': "string",
    'style_status_image': "image",
    'style_status_description': "text",
    "created_at": "dateTime",
    "updated_at": "dateTime"
}


const StyleStatusesPage = () => {
    return (
        <StyledStyleStatusesPage>
            <DatabaseView
                    title="Style Statuses"
                    icon={<MouseIcon />}
                    handleFetchData={fetchStyleStatuses}
                    handleUpdateData={updateStyleStatuses}
                    handleDeleteData={deleteStyleStatuses}
                    handleRestoreData={restoreStyleStatuses}
                    handlePermanentDeleteData={permanentDeleteStyleStatuses}
                    handleAddData={addStyleStatuses}
                    softDeletes={true}
                    relationships={relationships}
                    columns={columns}
                    imagesFolderName={"StyleStatusImages"}
                />
        </StyledStyleStatusesPage>
    );
};

export default StyleStatusesPage;