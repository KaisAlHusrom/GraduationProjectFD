//material imports
import {Modal, Fade, Card, CardHeader, CardContent, IconButton, Backdrop } from "@mui/material"
import { styled } from '@mui/system'
import { useTheme } from '@mui/material/styles';
//propTypes
import PropTypes from "prop-types"

//icons
import CloseIcon from '@mui/icons-material/Close';


const StyledCard = styled(Card)(
    ({ theme }) => ({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "700px",
        bgcolor: 'background.paper',
        boxShadow: 24,
        [theme.breakpoints.down('sm')]: {
            width: "100%"
        },
        ".MuiCardHeader-avatar": {
            margin: "0",

        },
        ".MuiCardHeader-action": {
            margin: "0",
            
        }
    })
)

const ScrollableCardContent = styled(CardContent)({
    overflowY: 'auto',
    maxHeight: '600px', // Adjust the maxHeight as needed
});

const CustomModal = ({title, modalOpenState, children, modalIcon}) => {
    const [modalOpen, setModalOpen] = modalOpenState

    //theme
    const theme = useTheme();

    const handleClose = () => {
        setModalOpen(false)
    }


    return (
        <Modal
                // keepMounted 
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
                >
                <Fade in={modalOpen}>
                    <StyledCard 
                    >
                        <CardHeader 
                            title={title}
                            action={
                                <IconButton size='small' aria-label='delete' className='card-more-options' 
                                onClick={handleClose}
                                >
                                    <CloseIcon sx={{
                                        color: theme.palette.primary.contrastText
                                    }}/>
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

export default CustomModal