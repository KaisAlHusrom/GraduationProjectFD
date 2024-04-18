//React
import { useCallback, useEffect, useRef, useState } from 'react'

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
import { fetchElementTypesRows } from '../../../../Services/elementsTypesService'
import TemplateElementSettings from '../TemplateElementSettings/TemplateElementSettings'


import { useLoaderData } from 'react-router-dom'
import TemplateElementStyleSettings from '../TemplateElementStyleSettings/TemplateElementStyleSettings'
import useFetchDataOutsideState from '../../../../Helpers/useFetchDataOutsideState'

//propTypes 
// import propTypes from 'prop-types'

//Styled Components
const StyledCreateElementTemplate = styled(Stack)(
    () => ({
    
    })
)


const CreateElementTemplate = () => {

    

    



    const [selectedElement, setSelectedElement] = useState(null)

    const [elementStyle, setElementStyle] = useState(null)

    return (
        <StyledCreateElementTemplate spacing={4} direction="column" alignItems="center">
            <TemplateDevView selectedElementState={{selectedElement, setSelectedElement, elementStyle}} />

            <TemplateElementSettings selectedElementState={{selectedElement, setSelectedElement}} />

            <TemplateElementStyleSettings elementStyleState={{elementStyle, setElementStyle}} />
        </StyledCreateElementTemplate>
    );
};

CreateElementTemplate.propTypes = {
    // type: propTypes.oneOf(["element", "section", "component"]).isRequired,
}

export default CreateElementTemplate;