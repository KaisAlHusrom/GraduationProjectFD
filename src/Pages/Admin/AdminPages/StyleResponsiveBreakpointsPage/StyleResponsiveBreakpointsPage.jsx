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
import { addStyleBreakpoints, deleteStyleBreakpoints, fetchStyleBreakpoints, permanentDeleteStyleBreakpoints, restoreStyleBreakpoints, updateStyleBreakpoints } from '../../../../Services/AdminServices/Services/StyleResponsiveBreakpointsServices'

// icons
import FitScreenIcon from '@mui/icons-material/FitScreen';

// Styled Components
const StyledStyleResponsiveBreakpointsPage = styled(Box)(
    () => ({
        // Add your styled components here
    })
)

const relationships = {
    manyToOne:[
    ],
    manyToMany:[
    ],
    oneToMany:[
    ]
}

const columns = {
    "id": "pk",
    'style_responsive_break_point_normal_name': "string",
    'style_responsive_break_point_css_name': "string",
    'style_responsive_break_point_number_value': "int",
    'style_responsive_break_point_image': "image",
    'style_responsive_break_point_description': "text",
    "created_at": "dateTime",
    "updated_at": "dateTime"
}


const StyleResponsiveBreakpointsPage = () => {
    return (
        <StyledStyleResponsiveBreakpointsPage>
            <DatabaseView
                    title="Style Responsive Breakpoints"
                    icon={<FitScreenIcon />}
                    handleFetchData={fetchStyleBreakpoints}
                    handleUpdateData={updateStyleBreakpoints}
                    handleDeleteData={deleteStyleBreakpoints}
                    handleRestoreData={restoreStyleBreakpoints}
                    handlePermanentDeleteData={permanentDeleteStyleBreakpoints}
                    handleAddData={addStyleBreakpoints}
                    softDeletes={true}
                    relationships={relationships}
                    columns={columns}
                    imagesFolderName={"StyleResponsiveBreakpointImages"}
                />
        </StyledStyleResponsiveBreakpointsPage>
    );
};

export default StyleResponsiveBreakpointsPage;