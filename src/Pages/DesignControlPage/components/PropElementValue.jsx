//React
import { useEffect, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    TextField
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { changeElementPropValues, changeElementPropValuesEditPage, writePropValueObject } from '../../../Helpers/RecursiveHelpers/elementPropValuesHelpers'

//Styled Components
const StyledPropElementValue = styled(Box)(
    ({ theme }) => ({
    
    })
)

 

const PropElementValue = ({prop ,     
    elementDataSet , 
    sectionDataState,
    propValue
}) => {

    const [value , setValue] = useState(propValue)
    const [elementData, setElementData] = elementDataSet;
    const [sectionData, setSectionData] = sectionDataState;

    const handleTextFieldChange = (event) => {
        setValue(event.target.value)
    

    }


    useEffect(() => {
        if(value !== ""){
            const updatedSelectedTemplate = JSON.parse(JSON.stringify(elementData));
            const parentTemplateFound =  changeElementPropValuesEditPage(updatedSelectedTemplate , elementData.id, prop , value)
            setElementData(updatedSelectedTemplate)
        }
      
    }, [ value])


    useEffect(()=> {
        setSectionData((prevSectionData) => {
            const updatedSectionData = { ...prevSectionData };
            updatedSectionData.children = updatedSectionData.children.map(component => {
                if (component.id === elementData.parent_id) {
                    return {
                        ...component,
                        children: component.children.map(child => {
                            if (child.id === elementData.id) {
                                return elementData;
                            }
                            return child;
                        })
                    };
                }
                return component;
            });
            return updatedSectionData;
        });

    } , [elementData, setSectionData])


    return <TextField
                    label={prop.element_prop_name}
                    type="string"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                    value={value}
                    onChange={handleTextFieldChange}
                    sx = {{
                        width: '900px'
                    }}
    />

    
};

PropElementValue.propTypes = {
    prop: propTypes.object
}

export default PropElementValue;