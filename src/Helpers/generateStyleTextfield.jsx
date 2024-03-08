import { Autocomplete, TextField } from "@mui/material";
import { MuiColorInput } from "mui-color-input";


export const generateStyleTextfield = (styleProp, onChange, value) => {
    const type = styleProp.style_prop_value_type;
    const prop_css_name = styleProp.style_prop_css_name;
    const prop_normal_name = styleProp.style_prop_normal_name;
    const property_values = styleProp.property_values;
    const currentValue = value[prop_css_name]
    switch (type) {
        case "string": 
            return <Autocomplete
            options={property_values}
            getOptionLabel={option => option.style_prop_value_normal_name}
            getOptionKey={option => option.style_prop_value_id}
            disablePortal
            renderInput={(params) => <TextField {...params} label="Style Status" />}
            onChange={(event, newValue) => onChange(prop_css_name, newValue.style_prop_value_css_name, type)}
            defaultValue={property_values[0]}
            size='small'
            fullWidth
        />  
        case "number": 
            return (<TextField 
                size="small" 
                type="number" 
                label={prop_normal_name}
                InputProps={{endAdornment: "px"}} 
                fullWidth
                onChange={(event) => onChange(prop_css_name, event.target.value, type)}
                />)
        case "color": 
            return <MuiColorInput 
            format="hex" 
            label={prop_normal_name} 
            onChange={(event, newValue) => onChange(prop_css_name, newValue, type)} 
            size="small"
            value={currentValue}
            isAlphaHidden
            fullWidth
            />
    }
}