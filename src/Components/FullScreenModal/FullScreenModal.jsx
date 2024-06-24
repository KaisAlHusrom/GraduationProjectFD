
import {  Dialog, DialogContent, IconButton,Box } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

//propTypes 
import propTypes from 'prop-types'

const FullScreenModal = ({ open, onClose, media }) => {
    const getMediaSource = (media) => {
        if (media.type === 'existing') {
            return media.path;
        }
        if (media.file instanceof File) {
            return URL.createObjectURL(media.file);
        }
        return '';
    };

    const mediaSource = getMediaSource(media);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogContent sx={{ width: "100%", height: "90vh", padding: 0, position: 'relative', overflow: "hidden" }}>
                <IconButton
                    onClick={onClose}
                    sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
                >
                    <ClearIcon color='error' />
                </IconButton>
                <Box
                    width={"100%"}
                    height={"100%"}
                >
                    {media.isVideo ? (
                        <video
                            src={mediaSource}
                            controls
                            autoPlay
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    ) : (
                        <img
                            src={mediaSource}
                            alt={media.name}
                            style={{ width: '100%', height: '100%'}}
                        />
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

FullScreenModal.propTypes = {
    open: propTypes.bool,
    onClose: propTypes.func,
    media: propTypes.any,
}

export default FullScreenModal;
