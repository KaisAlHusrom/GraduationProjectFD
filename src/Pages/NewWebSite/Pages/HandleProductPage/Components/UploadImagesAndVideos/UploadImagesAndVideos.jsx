import { useEffect, useRef, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import {
    Box,
    IconButton,
    Card,
    CardHeader,
    Avatar,
    CardContent,
    Grid
} from '@mui/material';
import { styled } from '@mui/system';
import propTypes from 'prop-types';
import NumberHelper from '../../../../../../Helpers/NumberHelper';
import { LinearProgressWithLabel } from '../../../../../../Components';
import { useDispatch } from 'react-redux';
import { handleOpenSnackbar, setSnackbarIsError, setSnackbarMessage } from '../../../../../../Redux/Slices/snackbarOpenSlice';
import { MAX_FILE_SIZE } from '../../../../../../Services/AdminServices/Services/productsService';


import config from "../../../../../../../Config.json"
import { mediaFolderName } from '../../../../../../Services/UserServices/Services/productsMediaUsersService';
import FullScreenModal from '../../../../../../Components/FullScreenModal/FullScreenModal';



const StyledUploadImageByDragDrop = styled(Box)(
    ({ theme }) => ({
        width: "100%",
        minHeight: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px dashed #ccc",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    })
);

const StyledImagesBox = styled(Grid)(
    () => ({
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        width: '100%',
    })
);

const UploadImagesAndVideos = ({ limit, values, handleLoadEnd, columnName }) => {
    const dispatch = useDispatch();

    const [uploadProgress, setUploadProgress] = useState({});
    const [media, setMedia] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState(null);



    useEffect(() => {
        if (values && values.length > 0) {
            setMedia(values.map(item => {
                

                if (item instanceof File) {
                    return {
                        file: item,
                        name: item.name,
                        type: 'new',
                        size: item.size,
                        isVideo: item.type.startsWith('video/')
                    };
                }

                if(item?.product_media_name instanceof File){
                    return {
                        file: item?.product_media_name,
                        name: item?.product_media_name.name,
                        type: 'new',
                        size: item?.product_media_name.size,
                        isVideo: item?.product_media_name.type.startsWith('video/')
                    }
                }
                
                const path = item.is_video
                ?
                    `${config.ServerVideoRoute}/${mediaFolderName}/${item.product_media_name}`
                :
                    `${config.ServerImageRoute}/${mediaFolderName}/${item.product_media_name}`
                return {
                    path: path,
                    name: path.split('/').pop(),
                    type: 'existing',
                    size: 10, //! fixed number
                    isVideo: item.is_video
                };
            }));
        }
    }, [values]);

    const fileInputRef = useRef(null);

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        const validFiles = files.filter(file => file.type.startsWith('image/') || file.type.startsWith('video/'));
        if (limit && media.length + validFiles.length > limit) {
            dispatch(setSnackbarMessage({ message: `You can only upload up to ${limit} files.` }));
            dispatch(setSnackbarIsError({ isError: true }));
            dispatch(handleOpenSnackbar());
            return;
        }

        uploadFiles(validFiles);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleRemoveMedia = (item) => {
        setMedia(media.filter((mediaItem) => mediaItem.name !== item.name));
        handleLoadEnd(item, 'removeMedia', columnName);
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const validFiles = files.filter(file => file.type.startsWith('image/') || file.type.startsWith('video/'));

        if (limit && media.length + validFiles.length > limit) {
            dispatch(setSnackbarMessage({ message: `You can only upload up to ${limit} files.` }));
            dispatch(setSnackbarIsError({ isError: true }));
            dispatch(handleOpenSnackbar());
            return;
        }

        if (validFiles.some(file => file.size > MAX_FILE_SIZE)) {
            dispatch(setSnackbarMessage({ message: `You can only upload files up to ${NumberHelper.formatFileSize(MAX_FILE_SIZE)}` }));
            dispatch(setSnackbarIsError({ isError: true }));
            dispatch(handleOpenSnackbar());
            return;
        }

        uploadFiles(validFiles);
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const uploadFiles = (files) => {
        const newUploadProgress = {};
        files.forEach(file => {
            newUploadProgress[file.name] = 0;
            setUploadProgress(prevProgress => ({
                ...prevProgress,
                ...newUploadProgress
            }));

            const reader = new FileReader();
            reader.onprogress = (event) => {
                if (event.lengthComputable) {
                    const progress = Math.round((event.loaded / event.total) * 100);
                    setUploadProgress((prevProgress) => ({
                        ...prevProgress,
                        [file.name]: progress,
                    }));
                }
            };

            reader.onloadend = () => {
                
            };

            reader.readAsDataURL(file);
        });

        const newMedia = files.map(file => ({
            file,
            name: file.name,
            type: 'new',
            size: file.size,
            isVideo: file.type.startsWith('video/')
        }));

        setMedia(prevMedia => [...prevMedia, ...newMedia]);

        handleLoadEnd(newMedia, 'media', columnName);
    };

    const handleClickMedia = (item) => {
        setSelectedMedia(item);

    }

    return (
        <Grid container spacing={2} width='100%' >
            <Grid item xxs={12}>
            <input
                type="file"
                multiple
                accept="image/*,video/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            {
                media.length < limit && (
                    <StyledUploadImageByDragDrop
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={handleClick}
                    >
                        Drop images or videos here or click to select, (upload up to {limit} files)
                    </StyledUploadImageByDragDrop>
                )
            }
            {media.length > 0 &&
                <StyledImagesBox container spacing={2} mt={2}>
                    {media.map((item, index) => (
                        <Grid key={index} item xxs={12}>
                            <Card elevation={3} sx={{ width: '100%' }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: theme => theme.spacing(),
                                            cursor: 'pointer'
                                        }} >
                                            {item.isVideo ? (
                                                <video
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    autoPlay
                                                    muted
                                                    onClick={() => handleClickMedia(item)}
                                                >
                                                    <source 
                                                    src={item.type === 'existing' ? item.path : URL.createObjectURL(item.file)}
                                                    // type="video/mp4"
                                                    ></source>
                                                </video>
                                            ) : (
                                                <img
                                                    onClick={() => handleClickMedia(item)}
                                                    src={item.type === 'existing' ? item.path : URL.createObjectURL(item.file)}
                                                    alt={`preview-${index}`}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            )}
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton onClick={() => handleRemoveMedia(item)} aria-label="settings">
                                            <ClearIcon color='error' />
                                        </IconButton>
                                    }
                                    title={item?.name}
                                    subheader={item.type !== 'existing' && NumberHelper.formatFileSize(item.size)}
                                />
                                {item.type !== 'existing' && (
                                    <CardContent>
                                        <LinearProgressWithLabel value={uploadProgress[item.name]} />
                                    </CardContent>
                                )}
                            </Card>
                        </Grid>
                    ))}
                </StyledImagesBox>
            }
            
            </Grid>
            {selectedMedia && (
                <FullScreenModal
                    open={Boolean(selectedMedia)}
                    onClose={() => setSelectedMedia(null)}
                    media={[selectedMedia]}
                />
            )}
        </Grid>
    );
};

UploadImagesAndVideos.propTypes = {
    limit: propTypes.number,
    values: propTypes.array,
    handleLoadEnd: propTypes.func,
    columnName: propTypes.string,
};

export default UploadImagesAndVideos;
