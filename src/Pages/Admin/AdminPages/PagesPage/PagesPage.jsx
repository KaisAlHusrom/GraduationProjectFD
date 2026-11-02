// React
import {
    
} from 'react'

//services
import { 
addPages,
deletePages,
fetchPages,
permanentDeletePages,
restorePages,
updatePages,
} from '../../../../Services/AdminServices/Services/pagesService'


import {
    
} from 'react-redux'

// Components
import { DatabaseView } from '../../../../Components'

// MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { fetchWebProject } from '../../../../Services/AdminServices/Services/webProjectsService'

// icons
import WebOutlinedIcon from '@mui/icons-material/WebOutlined';
// Styled Components
const StyledPagesPage = styled(Box)(
    () => ({
        // Add your styled components here
    })
)

const relationships = {
    manyToOne:[
        {
            "field_name": "web_project",
            "fetched_column": "project_title",
            "related_table_id": "id",
            fetch_all_data: fetchWebProject,
            add_to_add_form: true,
        },
    ],
    manyToMany:[
    ],
    oneToMany:[
    ]
}

const columns = {
    "id": "pk",
    'page_title': "string",
    'page_description': "text",
    'page_image': "image",
    'is_template': "bool",
    'web_project': "many-to-one",
    "created_at": "dateTime",
    "updated_at": "dateTime"
}


const PagesPage = () => {
    return (
        <StyledPagesPage>
            <DatabaseView
                    title="Pages"
                    icon={<WebOutlinedIcon />}
                    handleFetchData={fetchPages}
                    handleUpdateData={updatePages}
                    handleDeleteData={deletePages}
                    handleRestoreData={restorePages}
                    handlePermanentDeleteData={permanentDeletePages}
                    handleAddData={addPages}
                    softDeletes={true}
                    relationships={relationships}
                    columns={columns}
                    disableUpdate
                    disableInsert
                    addingPage={"/create-template"}
                />
        </StyledPagesPage>
    );
};

export default PagesPage;