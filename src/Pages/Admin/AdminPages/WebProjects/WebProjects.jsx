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
import { addWebProject, deleteWebProject, fetchWebProject, permanentDeleteWebProject, restoreWebProject, updateWebProject } from '../../../../Services/AdminServices/Services/webProjectsService'
import { fetchUsers } from '../../../../Services/AdminServices/Services/usersService'
import { fetchPages } from '../../../../Services/AdminServices/Services/pagesService'

// icons

// Styled Components
const StyledWebProjects = styled(Box)(
    () => ({
        // Add your styled components here
    })
)

const relationships = {
    manyToOne:[
        {
            "field_name": "user",
            "fetched_column": "first_name",
            "related_table_id": "id",
            add_to_add_form: true,
            fetch_all_data: fetchUsers, 
        },
    ],
    manyToMany:[
        
    ],
    oneToMany:[
        {
            "field_name": "user",
            "fetched_column": "page_title",
            "related_table_id": "id",
            add_to_add_form: false,
            fetch_all_data: fetchPages, 
        },
        //TODO: add database
    ]
}

const columns = {
    "id": "pk",
    'user': "many-to-one",
    'project_title': "string",
    'project_logo': "image",
    'project_type': "string",
    'project_job': "string",
    'project_description': "text",
    'pages': "one-to-many",
    'is_template': "bool",
    'is_own_project': "bool",
    "created_at": "dateTime",
    "updated_at": "dateTime"
}

export const imagesFolderName = "web_project_Logos"

const WebProjects = () => {
    return (
        <StyledWebProjects>
            <DatabaseView
                    title="Web Projects"
                    icon={null} 
                    handleFetchData={fetchWebProject}
                    handleUpdateData={updateWebProject}
                    handleDeleteData={deleteWebProject}
                    handleRestoreData={restoreWebProject}
                    handlePermanentDeleteData={permanentDeleteWebProject}
                    handleAddData={addWebProject}
                    softDeletes={true}
                    relationships={relationships}
                    columns={columns}
                    imagesFolderName={imagesFolderName}
                />
        </StyledWebProjects>
    );
};

export default WebProjects;