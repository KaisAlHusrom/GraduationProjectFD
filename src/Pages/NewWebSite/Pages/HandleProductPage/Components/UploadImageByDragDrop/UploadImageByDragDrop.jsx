import { useEffect, useRef, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import {
    Box,
    IconButton,
    Card,
    CardHeader,
    Avatar,
    CardContent,
} from '@mui/material';
import { styled } from '@mui/system';
import propTypes from 'prop-types';
import NumberHelper from '../../../../../../Helpers/NumberHelper';
import { LinearProgressWithLabel } from '../../../../../../Components';
import { useDispatch } from 'react-redux';
import { handleOpenSnackbar, setSnackbarIsError, setSnackbarMessage } from '../../../../../../Redux/Slices/snackbarOpenSlice';
import { MAX_FILE_SIZE } from '../../../../../../Services/AdminServices/Services/productsService';

const StyledUploadImageByDragDrop = styled(Box)(
    ({ theme }) => ({
        width: "100%",
        minHeight: 100,
        height: "100%",
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

const StyledImagesBox = styled(Box)(
    () => ({
        // Your styles here
    })
);

const UploadImageByDragDrop = ({ limit, values, handleLoadEnd, columnName}) => {
    const dispatch = useDispatch()

    const [uploadProgress, setUploadProgress] = useState({});
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (values && values.length > 0) {
            setImages(values.map(path => {
                if (path instanceof File) {
                    return { 
                        file: path, 
                        name: path.name, 
                        type: 'new', 
                        size: path.size 
                    };
                }
                return { 
                    path, 
                    name: path?.split('/').pop(), 
                    type: 'existing',
                    size: 10 //! fixed number
                };
            }));
        }
    }, [values]);

    const fileInputRef = useRef(null);

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        if (limit && images.length + imageFiles.length > limit) {
            dispatch(setSnackbarMessage({message: `You can only upload up to ${limit} images.`}))
            dispatch(setSnackbarIsError({isError: true}))
            dispatch(handleOpenSnackbar())
            return;
        }

        uploadFiles(imageFiles);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        if (limit && images.length + imageFiles.length > limit) {
            dispatch(setSnackbarMessage({message: `You can only upload up to ${limit} images.`}))
            dispatch(setSnackbarIsError({isError: true}))
            dispatch(handleOpenSnackbar())
            return;
        }

        if(imageFiles.some(image => image.size > MAX_FILE_SIZE)) {
            dispatch(setSnackbarMessage({message: `You can only upload up to ${NumberHelper.formatFileSize(MAX_FILE_SIZE)}`}))
            dispatch(setSnackbarIsError({isError: true}))
            dispatch(handleOpenSnackbar())
            return;
        }

        uploadFiles(imageFiles);
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
                    // console.log(progress)
                    setUploadProgress((prevProgress) => {
                        return {
                            ...prevProgress,
                            [file.name]: progress,
                        };
                    });
                }
            };

            reader.onloadend = () => {
                handleLoadEnd(file, 'image', columnName)
            };
    
            reader.readAsDataURL(file);

        });

        const newImages = files.map(file => ({
            file,
            name: file.name,
            type: 'new',
            size: file.size
        }));

        setImages(prevImages => [...prevImages, ...newImages]);
    };

    return (
        <Box>
            <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            {
                images.length < limit &&(
                    <StyledUploadImageByDragDrop 
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={handleClick}
                    >
                        Drop images here or click to select, (upload up to {limit} images)
                    </StyledUploadImageByDragDrop>
                )
            }
            {images.length > 0 && 
                <StyledImagesBox>
                    {images.map((image, index) => (
                        <Card key={index}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: theme => theme.spacing()
                                    }} >
                                        <img
                                            src={image.type === 'existing' ? image.path : URL.createObjectURL(image.file)}
                                            alt={`preview-${index}`}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </Avatar>
                                }
                                action={
                                    <IconButton onClick={() => handleRemoveImage(index)} aria-label="settings">
                                        <ClearIcon color='error' />
                                    </IconButton>
                                }
                                title={image?.name}
                                subheader={image.type !== 'existing' && NumberHelper.formatFileSize(image.size)}
                            />
                            {
                                image.type !== 'existing' &&
                                <CardContent>
                                    <LinearProgressWithLabel value={uploadProgress[image.name]} />
                                </CardContent>
                            }
                        </Card>
                    ))}
                </StyledImagesBox>
            }
        </Box>
    );
};

UploadImageByDragDrop.propTypes = {
    limit: propTypes.number,
    values: propTypes.array,
    handleLoadEnd: propTypes.func,
    columnName: propTypes.string,
};

export default UploadImageByDragDrop;
