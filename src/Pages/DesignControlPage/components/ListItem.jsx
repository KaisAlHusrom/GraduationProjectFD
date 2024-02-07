import { Box, FormControl, InputLabel, ListItem, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/system';

const StyledListItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const ListItemCom = ({ selected, handleChange, items, label }) => {
  console.log('selected:', selected); // Add logging to see the selected value
  console.log('items:', items); // Add logging to see the items

  return (
    <StyledListItem>
      <ListItem disablePadding>
        <FormControl sx={{ width: '200px' }}>
          <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
          <Select
            labelId={`${label}-select-label`}
            id={`${label}-select`}
            value={selected || ''} // Use selected directly
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
