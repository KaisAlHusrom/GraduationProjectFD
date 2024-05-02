//React
import { useCallback, useMemo } from 'react'



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
import { MuiColorInput } from 'mui-color-input'
import { pixelValues } from '../../../../Helpers/DefaultValues/pixelValues'


//Styled Components
const StyledStylePropValues = styled(Box)(
    () => ({
        width: '100%'
    })
)


const StylePropValues = ({label, stylePropValueType, stylePropValues, valueState}) => {


    return (
        <StyledStylePropValues>
            <GetAppropriateStyleValues 
                type={stylePropValueType}
                values={stylePropValues}
                label={label}
                valueState={valueState}
            />
            
            
        </StyledStylePropValues>
    );
};

StylePropValues.propTypes = {
    stylePropValueType: propTypes.string,
    stylePropValues: propTypes.array,
    label: propTypes.string,
    valueState: propTypes.object,
}

export default StylePropValues;


const GetAppropriateStyleValues = ({type, values, label, valueState}) => {

    const {value, setValue }= valueState


    

    const handleChangeStylePropValue = useCallback((event, newValue) => {
        if(type === 'color') {
            setValue(() => newValue.hex8)
        }
        if(type === 'string') {
            setValue(() => newValue)
        }
        if(newValue === null) {

            setValue(() => event.target.value)
        }
        
    }, [setValue, type])

    const defaultProps = useMemo(() => {
        return {
            value: type === "color" ? value === null ? {} : value : value,
            onChange:(event, newValue) => handleChangeStylePropValue(event, newValue),
            fullWidth: true,
            size:'small'
        }
    }, [handleChangeStylePropValue, type, value])

    if(type  === "string") {
        return (
            <Autocomplete
                        {...defaultProps}
                        options={values}
                        getOptionLabel={option => option['style_prop_value_normal_name']}
                        getOptionKey={option => option['id']}
                        renderInput={(params) => <TextField {...params} label={label} />}
                    />
        )
    }

    if(type  === "color") {
        return (
            <MuiColorInput 
                {...defaultProps}
                format="hex"
                isAlphaHidden
            />
        )
    }


    if(type  === "px") {
        return (
            <Autocomplete
                {...defaultProps}
                options={pixelValues}
                getOptionLabel={option => option}
                getOptionKey={option => option}
                renderInput={(params) => <TextField {...params} label={label} />}
            />
        )
    }
}

GetAppropriateStyleValues.propTypes = {
    type: propTypes.string,
    values: propTypes.array,
    label: propTypes.string,
    valueState: propTypes.object,
}
