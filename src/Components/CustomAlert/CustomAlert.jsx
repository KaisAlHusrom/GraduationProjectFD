//React
import { useEffect, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
//Styled Components
const StyledCustomAlert = styled(Box)(
    ({ theme }) => ({
    
    })
)


const CustomAlert = ({AlertOpenState ,title}) => {

    const [open, setOpen] = AlertOpenState;

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setOpen(false);
        }, 5000);
    
        // Komponentin unmount edilmesi durumunda timeout'ı temizle
        return () => clearTimeout(timeoutId);
      }, [open, setOpen]);
    

    return (
        <StyledCustomAlert>
            <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 ,
            width:'200px',
            position: 'fixed', // veya 'absolute' de kullanabilirsiniz
            bottom: 0,
            left: 0,
            right: 0,
        }}
        >
         {title}
        </Alert>
      </Collapse>
    </Box>
        </StyledCustomAlert>
    );
};

export default CustomAlert;