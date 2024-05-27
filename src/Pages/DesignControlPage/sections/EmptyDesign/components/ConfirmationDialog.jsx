import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdminMainButton } from '../../../../../Components';
import WarningIcon from '@mui/icons-material/Warning';
//propTypes 
import propTypes from 'prop-types'


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
            <DialogActions>
                            <AdminMainButton
                                title="Cancel"
                                type="custom"
                                onClick={onClose}
                                appearance="primary"
                                putTooltip
                                // icon={<DeleteSweepIcon />}
                                sx={{
                                    border: '1px solid red',
                                    padding: '10px 15px',
                                    fontWeight: 'bold',
                                    color: 'white.main',
                                    backgroundColor: 'warning.dark',
                                    margin: '5px',
                                    transition: 'background-color 0.3s',
                                    '&:hover': {
                                        backgroundColor: 'rgb(7, 15, 43)',
                                    },
                                }}
                            />
                            <AdminMainButton
                                title="Delete"
                                type="custom"
                                onClick={onConfirm}
                                appearance="primary"
                                putTooltip
                                // icon={<DeleteSweepIcon />}
                                sx={{
                                    border: '1px solid red',
                                    padding: '10px 15px',
                                    fontWeight: 'bold',
                                    color: 'white.main',
                                    backgroundColor: 'warning.dark',
                                    margin: '5px',
                                    transition: 'background-color 0.3s',
                                    '&:hover': {
                                        backgroundColor: 'rgb(7, 15, 43)',
                                    },
                                }}
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
