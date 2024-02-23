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
import { generateTag } from '../../../../Helpers/GenerateTag'

//Styled Components
const StyledTemplateDevView = styled(Box)(
    ({ theme }) => ({
        width: "100%",
        minHeight: "250px",
        border: "1px solid",
        borderColor: theme.palette.divider,
        borderRadius: theme.spacing(2),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    })
)


const TemplateDevView = ({selectedElementState}) => {


    const {selectedElement, setSelectedElement} = selectedElementState

    return (
        <StyledTemplateDevView>
            {
                generateTag(selectedElement)
            }
        </StyledTemplateDevView>
    );
};

TemplateDevView.propTypes = {
    selectedElementState: propTypes.object
}

export default TemplateDevView;