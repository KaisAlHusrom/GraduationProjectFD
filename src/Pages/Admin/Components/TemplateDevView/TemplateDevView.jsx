//React
import { useEffect, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box, Card, Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { GenerateTag } from '../../../../Helpers/GenerateTag'
import ViewElements from '../ViewElements/ViewElements'

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

const StyledViewElements = styled(Card)(
    ({ theme }) => ({
        position: "absolute",
        left: "0",
        top: "0",
        padding: theme.spacing(),
        borderRight: "1px solid",
        borderColor: theme.palette.divider,
        height: "100%",
        overflow: 'auto',
        width: "25%"
    })
);


const TemplateDevView = ({selectedElementState}) => {


    const {selectedElement, elementStyle} = selectedElementState

    const [editableElement, setEditableElement] = useState(null)
    useEffect(() => {
        setEditableElement(() => selectedElement ? <GenerateTag elementStyle={elementStyle} key={selectedElement.id} selectedElement={selectedElement} /> : null)
    }, [elementStyle, selectedElement])


    console.log(editableElement)
    return (
        <StyledTemplateDevView>
            
            {
                editableElement ?
                <>
                    <StyledViewElements>
                        <Typography width={150} variant='body2' color="warning.main">select element</Typography>
                        <ViewElements selectedElement={selectedElement} />
                    </StyledViewElements>
                    {editableElement}
                </>
                :
                <Typography variant='h4' color="warning.main">
                    Choose an element to begin editing the template!
                </Typography>
            }
        </StyledTemplateDevView>
    );
};

TemplateDevView.propTypes = {
    selectedElementState: propTypes.object
}

export default TemplateDevView;