//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box, FormControl, InputLabel, ListItem, MenuItem, Select,
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledListItem = styled(Box)(
    ({ theme }) => ({
        padding:theme.spacing(2), 

        
    })
)



const ListItemCom = ({ selected, handleChange, items, label }) => {
    return (
    <StyledListItem>
        <ListItem disablePadding>
        <FormControl sx={{ width: '200px' }}>
          <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
          <Select
            labelId={`${label}-select-label`}
            id={`${label}-select`}
            value={selected[label] || ''}
            label={label}
            onChange={(e) => handleChange(label, e.target.value)}
          >
            {items.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ListItem>
    </StyledListItem>
    );
  };

export default ListItemCom;