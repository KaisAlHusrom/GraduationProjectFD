//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import GalleryHeader from './GalleryHeader'

//Styled Components
const StyledEditGallery = styled(Box)(
    ({ theme }) => ({
    paddingTop:theme.spacing(8),
    paddingBottom:theme.spacing(8)
    })
)


const EditGallery = () => {
    return (
        <StyledEditGallery>
            <GalleryHeader></GalleryHeader>
        </StyledEditGallery>
    );
};

export default EditGallery;