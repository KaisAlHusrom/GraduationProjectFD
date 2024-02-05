//React
import {
    useContext
} from 'react'

import {
    
} from 'react-redux'

//Components
import { MainTemplateSectionSet } from '../../UseContext/UserSetSections'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import GalleryHeader from './GalleryHeader'

//Styled Components
const StyledGallery = styled(Box)(
    ({ theme }) => ({
        paddingTop: theme.spacing(8),
        backgroundColor: 'grey',
        borderRadius: '10px',
        paddingBottom: theme.spacing(8),
        position: 'relative',
    })
)





const Gallery = () => {
    const {GalleryPage } = useContext(MainTemplateSectionSet)
    return (
        GalleryPage ? (
            <StyledGallery>
                    <GalleryHeader></GalleryHeader>
            </StyledGallery>
            ) : (
                null
            )
    );
};

export default Gallery;