//React
import {  } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { handleCloseSnackbar} from '../../Redux/Slices/snackbarOpenSlice';

//Components


//MUI
import {
    IconButton, Snackbar, SnackbarContent,
} from '@mui/material'


import CloseIcon from '@mui/icons-material/Close';

const CustomSnackBar = () => {
    const openSnackbar = useSelector(state => state.snackbarOpenSlice.openSnackbar);
    const snackbarMessage = useSelector(state => state.snackbarOpenSlice.snackbarMessage);
    const isError = useSelector(state => state.snackbarOpenSlice.isError);


    const dispatch = useDispatch()
;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        dispatch(handleCloseSnackbar())
    };


    //action
    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="primary.contrastText"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );


    return (
        <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleClose}
                    >
                    <SnackbarContent
                        sx={{ backgroundColor: isError ? "error.main" :'primary.main', color: "primary.contrastText" }} // Set your desired background color
                        message={snackbarMessage}
                        action={action}
                    />
                    
        </Snackbar>
    );
};

export default CustomSnackBar;