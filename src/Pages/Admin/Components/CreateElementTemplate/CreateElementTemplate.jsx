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

//propTypes 
// import propTypes from 'prop-types'

//Styled Components
const StyledCreateElementTemplate = styled(Stack)(
    () => ({
    
    })
)


const CreateElementTemplate = () => {


    const [elementTypes, setElementTypes] = useState([]);
    useEffect(() => {
        const fetchElementTypes1 = async () => {
            const {rows} = await fetchElementsTypes();
            setElementTypes(rows);
        }

        fetchElementTypes1();
    }, [])

    const [selectedElement, setSelectedElement] = useState({})
    useEffect(() => {
        if(elementTypes && elementTypes.length > 0) {
            setSelectedElement(elementTypes[0]);
        }
    }, [elementTypes])

    console.log(elementTypes)

    console.log(selectedElement)


    return (
        <StyledCreateElementTemplate spacing={4} direction="column" alignItems="center">
            <TemplateDevView selectedElementState={{selectedElement, setSelectedElement}} />

            <TemplateElementSettings elementTypesState={{elementTypes}} selectedElementState={{selectedElement, setSelectedElement}} />
        </StyledCreateElementTemplate>
    );
};

CreateElementTemplate.propTypes = {
    // type: propTypes.oneOf(["element", "section", "component"]).isRequired,
}

export default CreateElementTemplate;