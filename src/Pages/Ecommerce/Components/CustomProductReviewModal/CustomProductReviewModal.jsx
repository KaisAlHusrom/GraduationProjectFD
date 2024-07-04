//React
import { useEffect, useMemo, useState } from 'react'

import { useSelector } from 'react-redux'

//Components


//MUI
import {
    Box,
    Modal,
    Fade,
    Card,
    Backdrop,
    Typography,
    Stack,
    TextareaAutosize,
    Rating
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import useEffectFetchData from '../../../../Helpers/customHooks/useEffectFetchData'
import { hadBuyProduct } from '../../../../Services/UserServices/Services/ordersUsersService'
import { AdminMainButton } from '../../../../Components'
import { addUserProductsReviews } from '../../../../Services/UserServices/Services/productReviewUsersSevice'

//Styled Components
const StyledModal = styled(Card)(
    ({ theme }) => ({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "50%",
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        // overflow: 'auto',
        borderRadius: theme.spacing(2),
    })
);

const StyledTextArea = styled(TextareaAutosize)(
    ({theme}) => ({
        backgroundColor: theme.palette.background.paper,
        border: "2px solid",
        borderColor: theme.palette.divider,
        resize: "none",
        width: "100%",
        borderRadius: "6px",
        color: theme.palette.text.primary,
        outline: "none",
        fontSize: "1rem",
        padding: theme.spacing(),
        "&:focus": {
            borderColor: theme.palette.primary.main,
        }
    })
)

const CustomProductReviewModal = ({reviewedBefore, boughtBefore, productId}) => {
    //modal states
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const user = useSelector(state => state.authSlice.user);




    useEffect(() => {
        if(user) {
            if(reviewedBefore || !boughtBefore) {
                return
            }
            
            handleOpen()
        }
    }, [boughtBefore, user, reviewedBefore])

    //review fields
    const [quality, setQuality] = useState(0)
    const [easeOfUse, setEaseOfUse] = useState(0)
    const [communication, setCommunication] = useState(0)
    const [review, setReview] = useState('');

    const handleSaveReview = async () => {
        const data = {
            user_id: user?.id,
            product_id: productId,
            design_quality_rate: quality,
            ease_of_use_rate: easeOfUse,
            communication_rate: communication,
            comment: review,
        }

        const res = await addUserProductsReviews(data);
        if(res.success) {
            handleClose();
            
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
            backdrop: {
                timeout: 500,
            },
            }}
        >
            <Fade in={open}>
                <StyledModal elevation={2}>
                    <Box padding={theme => theme.spacing(2)}>
                        <Typography variant='h4' textTransform={'capitalize'} letterSpacing={2}>
                            You forgot to rating the product!
                        </Typography>
                    </Box>
                    <Stack direction={'column'} gap={2} padding={theme => theme.spacing(2)}>
                        <Stack direction={{xxs: "column", md: "row"}} gap={2} width={'100%'} >
                            <Stack direction={'column'} gap={1} width={'100%'}>
                                <Typography
                                    variant='h6'
                                >
                                    Quality
                                </Typography>
                                <Rating 
                                    name="quality" 
                                    value={quality} 
                                    size='large' 
                                    precision={0.5}
                                    onChange={(e, newValue) => setQuality(newValue)}
                                />                            
                            </Stack>
                            <Stack direction={'column'} gap={1} width={'100%'}>
                                <Typography
                                    variant='h6'
                                >
                                    Ease of use
                                </Typography>
                                <Rating 
                                    name="easeOfUse" 
                                    value={easeOfUse} 
                                    size='large' 
                                    precision={0.5}
                                    onChange={(e, newValue) => setEaseOfUse(newValue)}
                                />                            </Stack>
                            <Stack direction={'column'} gap={1} width={'100%'}>
                                <Typography
                                    variant='h6'
                                >
                                    Communication
                                </Typography>
                                <Rating 
                                name="communication" 
                                value={communication} 
                                size='large' 
                                precision={0.5}
                                onChange={(e, newValue) => setCommunication(newValue)}
                                />
                            </Stack>
                        </Stack>
                        <Box>
                            <Typography
                                variant='h6'
                            >
                                Review
                            </Typography>
                            <StyledTextArea
                                minRows={3} // Adjust the minimum number of rows as needed
                                maxRows={10} // Adjust the maximum number of rows as needed
                                name={"product_long_description"}
                                // sx={{
                                //     borderColor: error ? "error.main" : "transparent"
                                // }}
                                onChange= {(e) => setReview(e.target.value)}
                                value= {review}
                            />
                        </Box>
                        <Box alignSelf={'flex-end'} display={'flex'} gap={1}>
                            <AdminMainButton 
                                type='custom'
                                appearance='secondary'
                                putBorder
                                title='Later'
                                onClick={handleClose}
                            />
                            <AdminMainButton 
                                type='custom'
                                appearance='primary'
                                putBorder
                                filled
                                title='Save'
                                onClick={handleSaveReview}
                            />
                        </Box>
                    </Stack>
                </StyledModal>
            </Fade>
        </Modal>
    );
};

CustomProductReviewModal.propTypes = {
    children: propTypes.array
}

export default CustomProductReviewModal;