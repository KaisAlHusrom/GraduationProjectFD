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
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined';
import { deleteStylePropCategory, fetchStylePropCategory, permanentDeleteStylePropCategory, restoreStylePropCategory, updateStylePropCategory } from '../../../../Services/StylePropCategory'

//Styled Components
const StyledStylesPropCategoriesPage = styled(Box)(
    () => ({
    
    })
)


const StylesPropCategoriesPage = () => {
    return (
        <StyledStylesPropCategoriesPage>
            <DatabaseView
                    title="Styles Property Categories"
                    icon={<WorkspacesOutlinedIcon />}
                    handleFetchData={fetchStylePropCategory}
                    handleUpdateData={updateStylePropCategory}
                    handleDeleteData={deleteStylePropCategory}
                    softDeletes={true}
                    handleRestoreData={restoreStylePropCategory}
                    handlePermanentDeleteData={permanentDeleteStylePropCategory}
                />
        </StyledStylesPropCategoriesPage>
    );
};

export default StylesPropCategoriesPage;