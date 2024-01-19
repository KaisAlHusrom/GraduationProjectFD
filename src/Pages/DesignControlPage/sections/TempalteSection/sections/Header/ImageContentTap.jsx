//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components

// icons 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { AdminMainButton } from '../../../../../../Components'

//Styled Components
const StyledImageContentTap = styled(Box)(
    ({ theme }) => ({
    
    })
)


const ImageContentTap = ( {
    handleUploadImageClick,
    handleDeleteLogoClick , 
}) => {
    return (
        <StyledImageContentTap>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}>
            <AdminMainButton
                    title='Upload Image '
                    type='custom'
                    appearance='primary'
                    icon={<AddCircleOutlineIcon />}
                    onClick={handleUploadImageClick}
                            sx={{
                            marginTop: '10px',
                            width: '30%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white.main',
                            backgroundColor: 'success.dark',
                            }}
                            />
            <AdminMainButton
                    title='Delete Image '
                    type='custom'
                    appearance='primary'
                    icon={<DeleteIcon />}
                    onClick={handleDeleteLogoClick}
                        sx={{
                            marginTop: '10px',
                            width: '30%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white.main',
                            backgroundColor: 'success.dark',
                            }}
                />
            </Box>
        </StyledImageContentTap>
    );
};

export default ImageContentTap;