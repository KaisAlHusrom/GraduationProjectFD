
import {  Dialog, DialogContent, IconButton,Box } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

//propTypes 
import propTypes from 'prop-types'
import { useMemo } from 'react';

const FullScreenModal = ({open, onClose, media}) => {

    const styles = useMemo(() => {
        return {
            width: "100%", 
            height: "90vh", 
            padding: 0, 
            position: 'relative', 
            overflow: "hidden",
            '& .swiper': {
                width: "100%",
                height: "100%",
            },
            "& .swiper-slide img, & .swiper-slide video": {
                width: "100%",
                height: '100%',
                objectFit: "contain",
            }
        }
    }, [])
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" >
            <DialogContent sx={styles}>
                <IconButton
                    onClick={onClose}
                    sx={{ position: 'absolute', top: 8, right: 8, zIndex: 10000 }}
                >
                    <ClearIcon color='error' />
                </IconButton>
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={false}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                    >
                        {media.map((mediaItem, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <MediaItem  mediaItem={mediaItem} />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>

            </DialogContent>
        </Dialog>
    )
}

FullScreenModal.propTypes = {
    open: propTypes.bool,
    onClose: propTypes.func,
    media: propTypes.any,
}

export default FullScreenModal;


const MediaItem = ({ mediaItem }) => {
    
    const getMediaSource = (media) => {
        if (media.type === 'existing') {
            return media.path;
        }
        if (media.file instanceof File) {
            return URL.createObjectURL(media.file);
        }
        return '';
    };

    const mediaSource = getMediaSource(mediaItem);

    return (
        
        <Box
            width={"100%"}
            height={"100%"}
        >
            {mediaItem.isVideo ? (
                <video
                    src={mediaSource}
                    controls
                    autoPlay
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
            ) : (
                <img
                    src={mediaSource}
                    alt={mediaItem.name}
                    style={{ width: '100%', height: '100%'}}
                />
            )}
        </Box>
    );
};