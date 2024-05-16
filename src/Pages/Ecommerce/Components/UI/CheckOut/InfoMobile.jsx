//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components

import Info from './Info';

//MUI
import {
    Box,Button,Drawer,IconButton,
} from '@mui/material'
import { styled } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledInfoMobile = styled(Box)(
    () => ({
    
    })
)


const InfoMobile = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };
  
    const DrawerList = (
      <Box sx={{ width: 'auto', px: 3, pb: 3, pt: 8 }} role="presentation">
        <IconButton
          onClick={toggleDrawer(false)}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Info/>
      </Box>
    );
    return (
        <StyledInfoMobile>
            <div>
                <Button
                    variant="text"
                    endIcon={<ExpandMoreRoundedIcon />}
                    onClick={toggleDrawer(true)}
                >
                    View details
                </Button>
                <Drawer open={open} anchor="top" onClose={toggleDrawer(false)}>
                  {DrawerList}
                </Drawer>
            </div>
        </StyledInfoMobile>
    );
};

InfoMobile.propTypes = {
    children: propTypes.array,
}

export default InfoMobile;