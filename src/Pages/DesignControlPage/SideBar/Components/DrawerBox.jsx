

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { styled } from '@mui/system'

const StyledDrawerBox = styled(Box)(
  ({ theme }) => ({
      padding:theme.spacing(2),
  })
)


const DrawerBox = (props)=> {


return (

  <StyledDrawerBox>

<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
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
          {props.icon}
        <span style={{marginLeft:"20px"}} >{props.name}</span>

      </IconButton>
    </Box>

  </StyledDrawerBox>

)

}


export default DrawerBox;