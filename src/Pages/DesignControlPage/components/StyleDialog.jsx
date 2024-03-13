//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



//Styled Components
const StyledStyleDialog = styled(Box)(
    ({ theme }) => ({
        maxWidth:'1000px',
        backgroundColor:'#092635',

    })
)

const StyleDialog = ({title , OpenState , children}) => {
    
    const [open, setOpen] = OpenState;

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    return (
    <StyledStyleDialog>
            <Dialog
            open={open}
            onClose={handleClose}
            sx={{
                '& .MuiDialog-paper': {
                    backgroundColor:'rgb(0 9 16)',

                    maxWidth: '1000px', // Set maximum width
                    width: '1000px', // Set maximum width
                },
                '& .MuiDialogTitle-root': {
                    /* Your custom styles for DialogTitle */
                },
                '& .MuiDialogContent-root': {
                    /* Your custom styles for DialogContent */
                },
                '& .MuiDialogActions-root': {
                    /* Your custom styles for DialogActions */
                },
            }}
            >
            
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                        {children}
                </DialogContentText>
                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} sx = {{
                    color:'black',
                    backgroundColor : '#FFFFF',
                    fontWeight: 'bold',
                }}>Disagree</Button>
                <Button onClick={handleClose} autoFocus sx = {{
                    backgroundColor: '#092635',
                    color:'#eee',

                    fontWeight: 'bolder',
                }}>
                Save
            </Button>
            </DialogActions>
        </Dialog>
        </StyledStyleDialog>
    );
};

export default StyleDialog;