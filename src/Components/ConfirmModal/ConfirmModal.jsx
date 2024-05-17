//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,

} from '@mui/material'


//propTypes 
import propTypes from 'prop-types'
// import { useTheme } from '@emotion/react'




const ConfirmModal = ({confirmModalState, title,  ConfirmMessage, handleAgree}) => {
    const [modalOpen, setModalOpen] = confirmModalState;
    // const theme = useTheme();

    const handleClose = () => {
        setModalOpen(false);

    };

    const handleButtonAgree = () => {
        handleAgree()
        setModalOpen(false);
    }

    const buttonStyle = useMemo(() => {
        return {
            fontSize: 16,
            letterSpacing: 1,
            fontWeight: 'bold',
        }
    }, [])
    return (
        <Dialog
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            
            PaperProps={{
                sx: {
                    borderRadius: 2
                },
                elevation: 2, 
            }}
        >
            <DialogTitle color={"error.main"} id="alert-dialog-title">
                {title} !
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {
                ConfirmMessage
                }
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color='primary' sx={buttonStyle}>Disagree</Button>
            <Button onClick={handleButtonAgree} autoFocus color='error' sx={buttonStyle}>
                Agree
            </Button>
            </DialogActions>
        </Dialog>
    );
};

ConfirmModal.propTypes = {
    confirmModalState: propTypes.array,
    title: propTypes.string,
    ConfirmMessage: propTypes.string,
    handleAgree: propTypes.func
}

export default ConfirmModal;