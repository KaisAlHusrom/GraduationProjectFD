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
import { deleteElementProp, fetchElementProps, permanentDeleteElementProp, restoreElementProp, updateElementProp } from '../../../../Services/elementPropsService'


//Styled Components
const StyledElementPropsPage = styled(Box)(
    () => ({
    
    })
)


const ElementPropsPage = () => {
    return (
        <StyledElementPropsPage>
            <DatabaseView
            title={"Elements Props"}
            icon={<TuneIcon />}
            handleUpdateData={updateElementProp}
            handleFetchData={fetchElementProps}
            handleDeleteData={deleteElementProp}
            softDeletes={true}
            handleRestoreData={restoreElementProp}
            handlePermanentDeleteData={permanentDeleteElementProp}
            />
        </StyledElementPropsPage>   
    );
};

export default ElementPropsPage;