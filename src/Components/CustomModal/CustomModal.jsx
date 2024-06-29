import { Modal, Fade, Card, CardHeader, CardContent, IconButton, Backdrop } from "@mui/material";
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import PropTypes from "prop-types";
import CloseIcon from '@mui/icons-material/Close';

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "950px",
  bgcolor: 'background.paper',
  boxShadow: 24,
  [theme.breakpoints.down('md')]: {
    width: "100%"
  },
  ".MuiCardHeader-avatar": {
    margin: "0",
  },
  ".MuiCardHeader-action": {
    margin: "0",
  }
}));

const ScrollableCardContent = styled(CardContent)({
  overflowY: 'auto',
  maxHeight: '700px', // Adjust the maxHeight as needed
});

const CustomModal = ({ 
  title, 
  modalOpenState, 
  children, 
  modalIcon,
  withoutModalHeader,
  backdropClick,
  cardSx,
  maxWidth
}) => {
  const [modalOpen, setModalOpen] = modalOpenState;
  const theme = useTheme();

  const handleClose = (event, reason) => {
    if(backdropClick) {
      setModalOpen(false);
    } else if (reason !== 'backdropClick') {
      setModalOpen(false);
    }
  };

  const modalStyles = {
    root: {
      zIndex: 1, // set your desired default z-index value
    },
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby={"modal-modal-" + title}
      aria-describedby="modal-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      sx={{ ...modalStyles }}
      maxWidth={maxWidth}
    >
      <Fade in={modalOpen}>
        <StyledCard sx={cardSx}>
          {
            !withoutModalHeader
            &&
            (
            <CardHeader
                title={title}
                action={
                  <IconButton
                    size='small'
                    aria-label='delete'
                    className='card-more-options'
                    onClick={handleClose}
                  >
                    <CloseIcon sx={{
                      color: theme.palette.primary.contrastText
                    }} />
                  </IconButton>
                }
                avatar={
                  modalIcon &&
                  <IconButton
                    size="small"
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                    sx={
                      {
                        cursor: "auto",
                        color: theme.palette.primary.contrastText
                      }
                    }
                  >
                    {modalIcon}
                  </IconButton>
                }
                titleTypographyProps={{
                  sx: {
                    fontSize: theme.typography.h6.fontSize,
                    fontWeight: theme.typography.h6.fontWeight,
                    lineHeight: theme.typography.h6.lineHeight,
                    textTransform: 'capitalize',
                  }
                }}
                sx={{
                  padding: `${theme.spacing()} ${theme.spacing()}`,
                  backgroundColor: 'primary.main',
                  color: theme.palette.primary.contrastText
                }}
              />
            )
          }
          
          <CardContent>
            <ScrollableCardContent>
              {children}
            </ScrollableCardContent>
          </CardContent>
        </StyledCard>
      </Fade>
    </Modal>
  )
}

CustomModal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  modalOpenState: PropTypes.array,
  modalIcon: PropTypes.element
}

export default CustomModal;
