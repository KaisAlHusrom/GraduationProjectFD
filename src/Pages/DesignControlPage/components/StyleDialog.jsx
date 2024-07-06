import { Dialog, DialogContent, DialogActions, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledStyleDialog = styled(Box)({
  backgroundColor: '#111111',
});

const StyleDialog = ({ title, OpenState, children }) => {
  const [open, setOpen] = OpenState;


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
            maxWidth: '1000px',
            minWidth : '800px',
            backgroundColor: 'theme.background.default',

          },
        }}
      >
        <DialogContent>
          <div id="alert-dialog-description">{children}</div>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} sx={{
            color: 'black',
            backgroundColor: '#FFFFF',
            fontWeight: 'bold',
          }}>Disagree</Button>
          <Button onClick={handleClose} autoFocus sx={{
            backgroundColor: '#092635',
            color: '#eee',
            fontWeight: 'bolder',
          }}>Save</Button> */}
        </DialogActions>
      </Dialog>
    </StyledStyleDialog>
  );
};

export default StyleDialog;
