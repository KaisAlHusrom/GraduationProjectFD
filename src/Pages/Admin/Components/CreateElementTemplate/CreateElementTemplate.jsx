//React
import { useEffect, useState } from 'react'

import {
    
} from 'react-redux'

//Components
import TemplateDevView from '../TemplateDevView/TemplateDevView'


//MUI
import {
    Stack,
} from '@mui/material'
import { styled } from '@mui/system'

//services
import { fetchElementsTypes } from '../../../../Services/elementsTypesService'
import TemplateElementSettings from '../TemplateElementSettings/TemplateElementSettings'


import { useLoaderData } from 'react-router-dom'
import TemplateElementStyleSettings from '../TemplateElementStyleSettings/TemplateElementStyleSettings'

//propTypes 
// import propTypes from 'prop-types'

//Styled Components
const StyledCreateElementTemplate = styled(Stack)(
    () => ({
    
    })
)


const CreateElementTemplate = () => {

    const {allElementTypes} = useLoaderData()

    const [elementTypes, setElementTypes] = useState(allElementTypes);

    const [selectedElement, setSelectedElement] = useState(() => elementTypes && elementTypes.length > 0 ? elementTypes[0] : {})

    const [elementStyle, setElementStyle] = useState({})

    return (
        <StyledCreateElementTemplate spacing={4} direction="column" alignItems="center">
            <TemplateDevView selectedElementState={{selectedElement, setSelectedElement, elementStyle}} />

            <TemplateElementSettings elementTypesState={{elementTypes}} selectedElementState={{selectedElement, setSelectedElement}} />

            <TemplateElementStyleSettings elementStyleState={{elementStyle, setElementStyle}} />
        </StyledCreateElementTemplate>
    );
};

CreateElementTemplate.propTypes = {
    // type: propTypes.oneOf(["element", "section", "component"]).isRequired,
}

export default CreateElementTemplate;