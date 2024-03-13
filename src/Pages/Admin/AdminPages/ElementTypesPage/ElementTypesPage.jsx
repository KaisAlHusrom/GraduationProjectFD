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
import { deleteElementType, fetchElementsTypes, permanentDeleteElementType, restoreElementType, updateElementType } from '../../../../Services/elementsTypesService'


//Styled Components
const StyledElementTypesPage = styled(Box)(
    () => ({
    
    })
)


const ElementTypesPage = () => {
    return (
        <StyledElementTypesPage>
            <DatabaseView
            title={"Elements Types"}
            icon={<CodeIcon />}
            handleUpdateData={updateElementType}
            handleFetchData={fetchElementsTypes}
            handleDeleteData={deleteElementType}
            softDeletes={true}
            handleRestoreData={restoreElementType}
            handlePermanentDeleteData={permanentDeleteElementType}
            />
        </StyledElementTypesPage>
    );
};

export default ElementTypesPage;