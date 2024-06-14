import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdminMainButton } from '../../../Components';
import WarningIcon from '@mui/icons-material/Warning';
//propTypes 
import propTypes from 'prop-types'
import { ButtonStyle } from '../sections/EmptyDesign/StylesFunctions/SetStylesFunctions';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
const ConfirmationDialog = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose} 
        sx = {{
        }}
        >
            <DialogTitle sx = {{
                backgroundColor : '#070F2B' , 
                marginBottom : "20px",
                textTransform : 'uppercase',
                display : 'flex', 
                alignItems : 'center',
            }}>
                <WarningIcon sx = {{
                    color :'red' , 
                    marginRight : '10px',
                    width : '30px',
                    height : '30px',
                }}></WarningIcon>
                Confirm Deletion
                </DialogTitle>
                    <DialogContent>
                <DialogContentText 
                sx = {{
                    fontSize :'20px',
                    fontWeight : 'bold',
                }}
                >
                    Are you sure you want to delete all component elements?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx = {{
                display : 'flex', 
                justifyContent : 'center',
                alignItems : 'center',
                padding : '20px 0',
                width : '100%',
            }}>
                    <AdminMainButton
                        title="Cancel"
                        type="custom"
                        onClick={onClose}
                        appearance="primary"
                        putTooltip
                        icon={<CloseIcon />}
                        sx={{...ButtonStyle , width : '200px'}}
                    />
                    <AdminMainButton
                        title="Delete"
                        type="custom"
                        onClick={onConfirm}
                        appearance="primary"
                        putTooltip
                        icon={<DeleteIcon />}
                        sx={{...ButtonStyle , width : '200px' , backgroundColor: 'warning.dark' }}

                    />
            </DialogActions>
        </Dialog>
    );
};

ConfirmationDialog.propTypes = {
    open: propTypes.bool,
    onClose : propTypes.func,
    onConfirm : propTypes.func

}

export default ConfirmationDialog;
