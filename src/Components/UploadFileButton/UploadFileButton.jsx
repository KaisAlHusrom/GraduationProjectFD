//React
import { useMemo, useState } from 'react'

import fs from 'fs';



import config from "../.././../Config.json"
import {
    
} from 'react-redux'

//Components

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FolderZipIcon from '@mui/icons-material/FolderZip';
//MUI
import {
    Box,
    Button,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import LinearProgressWithLabel from '../LinearProgressWithLabel/LinearProgressWithLabel';
import NumberHelper from '../../Helpers/NumberHelper';
import { MAX_FILE_SIZE } from '../../Services/AdminServices/Services/productsService';

//Styled Components
const StyledFileBox = styled(Box)(
    () => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
    })
)

const StyledUploadedFileBox = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.palette.action.selected,
        padding: `0 ${theme.spacing()}`,
        borderRadius: "8px",
    })
)

const StyledFileNameProgress = styled(Box)(
    ({theme}) => ({
        maxWidth: "280px",
        margin: theme.spacing()
    })
)

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const UploadFileButton = (props) => {
    const {
        label,
        name,
        errorMessage,
        fileStates,
        customOnChange,
        value
    } = props

    const [privateUploadProgress, setPrivateUploadProgress] = useState(0);
    const [privateFileName, setPrivateFileName] = useState("");
    const [privateFileSize, setPrivateFileSize] = useState(0);

    // Conditional destructuring based on whether fileStates is null
    const {
        fileName = privateFileName,
        setFileName = setPrivateFileName,
        fileSize = privateFileSize,
        setFileSize = setPrivateFileSize,
        uploadProgress = privateUploadProgress,
        setUploadProgress = setPrivateUploadProgress,
    } = fileStates || {};

    //if there is a value 
    const savedFile =  useMemo(async () => {
        if(value) {
            // try {
            //     const response = await fetch(`${config.ServerFilesRoute}/${config.productsFilesFolderName}/${value}`, { method: 'HEAD' });
            //     return response;
            // } catch (error) {
            //     console.error('Error fetching file size:', error);
            //     return null
            // }
        }
    }, [value]);


    // Extract the file size (assuming the file exists on the server)
    const savedFileSize = useMemo(() => {
        // if(savedFile) {
        //     const size = savedFile?.headers?.get('content-length');
        //     return size
        // }
        return null
        
    }, [])

    const handleFileChange = (e) => {
        const customValue = e.target.files[0];
        if (customValue.size > MAX_FILE_SIZE) {
            console.error(`File size should not exceed ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
            return;
        }

        setFileName(customValue.name);
        setFileSize(customValue.size);
        const reader = new FileReader();
        reader.onprogress = (event) => {
            
            if (event.lengthComputable) {
                const progress = Math.round((event.loaded / event.total) * 100);
                // console.log(progress)
                setUploadProgress(progress);
            }
        };

        reader.onloadend = () => {
            
            // Perform other operations after the file has been read (e.g., setting the image source)
            // setImageSrc(reader.result);
        };

        reader.readAsDataURL(customValue);
            
    }
    return (
        <StyledFileBox>
                    <Button size='small' component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload {label}
                        <VisuallyHiddenInput 
                        type="file" 
                        accept='.zip,.rar,application/zip,application/x-rar-compressed,application/octet-stream' 
                        name={name}
                        onChange={customOnChange ? (event) => customOnChange(event) : (event) => handleFileChange(event)}
                        />
                    </Button>
                    <Box mt={1}>
                        {uploadProgress > 0 && (
                        <StyledUploadedFileBox>
                            <Box>
                                <FolderZipIcon color='primary' />
                            </Box>
                            <StyledFileNameProgress>
                                <Typography variant='body1' sx={{
                                    overflow: 'hidden', 
                                    whiteSpace: 'nowrap', 
                                    textOverflow: 'ellipsis',
                                }}>
                                    {fileName || value} | {NumberHelper.formatFileSize(fileSize || savedFileSize)}
                                </Typography>
                                <LinearProgressWithLabel value={uploadProgress} />
                            </StyledFileNameProgress>
                        </StyledUploadedFileBox>
                        )}
                        <Typography variant="subtitle1" component="span" color="error">
                            {errorMessage}
                        </Typography>
                    </Box>

                </StyledFileBox>
    );
};

UploadFileButton.propTypes = {
    label: propTypes.string,
    name: propTypes.string,
    errorMessage: propTypes.string,
    fileStates: propTypes.object,
    customOnChange: propTypes.func,
    value: propTypes.any,
}

export default UploadFileButton;