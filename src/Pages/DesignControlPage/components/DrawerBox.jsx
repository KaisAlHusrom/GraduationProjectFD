

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';

const DrawerBox = (props)=> {

return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', padding: 1 }}>
    <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={props.handleSecondDrawerOpen}
                    edge="start"
        sx={{
          marginRight: 5,
          ...(props.open && { display: 'none' }),
        }}
      >
      
        <MenuIcon />
        {props.name}
      </IconButton>
      
    </Box>

)

}


export default DrawerBox;