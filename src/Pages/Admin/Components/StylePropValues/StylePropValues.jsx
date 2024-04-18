//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Autocomplete,
    Box,
    TextField,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { CustomLazyAutoComplete } from '../../../../Components'


//Styled Components
const StyledStylePropValues = styled(Box)(
    ({ theme }) => ({
    
    })
)


const StylePropValues = ({label, stylePropValueType, stylePropValues}) => {

    const [stylePropValue, setStylePropValue] = useState(null)

    const handleChangeStylePropValue = (event, newValue) => {
        setStylePropValue(() => newValue)
    }
    return (
        <StyledStylePropValues>
            {
                stylePropValueType === "string"
                ?
                    <Autocomplete
                        options={stylePropValues}
                        getOptionLabel={option => option['style_prop_value_normal_name']}
                        getOptionKey={option => option['id']}
                        value={stylePropValue}
                        onChange={(event, newValue) => handleChangeStylePropValue(event, newValue)}
                        renderInput={(params) => <TextField {...params} label={label} />}
                        fullWidth
                        size='small'
                    />
                :
                null
            }
            
        </StyledStylePropValues>
    );
};

StylePropValues.propTypes = {
    stylePropValueType: propTypes.string,
    stylePropValues: propTypes.array,
    label: propTypes.string,
}

export default StylePropValues;