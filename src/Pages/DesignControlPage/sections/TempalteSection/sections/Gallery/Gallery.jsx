//React
import {
    useContext, useMemo
} from 'react'

import {
    
} from 'react-redux'
import galleryData2 from "./GalleryData2.json"

//Components
import { MainTemplateSectionSet } from '../../UseContext/UserSetSections'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import GalleryComponent from './GalleryComponent'

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

    const sectionStyle = useMemo(() => {
        const styleObject = {};

        galleryData2.section_css_props.forEach((cssProp) => {
        const { css_prop, css_prop_value } = cssProp;

        if (css_prop.is_section) {
            styleObject[css_prop.prop_name] = css_prop_value;
        }
        });

        return styleObject;
    }, []);


    return (
        GalleryPage ? (
            <StyledGallery key={galleryData2.section_id} sx={sectionStyle}>
            {galleryData2 &&
                galleryData2.section_components.map((component, i) => {
                        return (
                            <GalleryComponent key={i} component={component} />
                        );
            })}
            </StyledGallery>
            ) : (
                null
            )
    );
};

export default Gallery;