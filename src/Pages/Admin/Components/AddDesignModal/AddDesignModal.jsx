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

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledAddDesignModal = styled(Box)(
    ({ theme }) => ({
    
    })
)


const AddDesignModal = ({handleAddData}) => {
    return (
        <StyledAddDesignModal>
            AddDesignModal
        </StyledAddDesignModal>
    );
};

AddDesignModal.propTypes = {
    handleAddData: propTypes.func
}

export default AddDesignModal;