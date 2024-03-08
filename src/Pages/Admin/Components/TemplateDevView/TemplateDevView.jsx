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
        position: "sticky", // Change position to sticky
        top: "-50px", // Stick to the top of the container
        zIndex: "999", // Set z-index to ensure it's above other content
        backgroundColor: theme.palette.background.paper,
        
    })
)


const TemplateDevView = ({selectedElementState}) => {


    const {selectedElement, elementStyle} = selectedElementState

    console.log(elementStyle)

    return (
        <StyledTemplateDevView>
            {
                generateTag(selectedElement, elementStyle)
            }
        </StyledTemplateDevView>
    );
};

TemplateDevView.propTypes = {
    selectedElementState: propTypes.object
}

export default TemplateDevView;