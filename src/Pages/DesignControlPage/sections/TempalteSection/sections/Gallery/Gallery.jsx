//React
import {
    useContext, useMemo  
} from 'react'

import {
    
} from 'react-redux'

//Components
import { MainTemplateSectionSet } from '../../UseContext/UserSetSections'
import galleryData2 from "./GalleryData2"
import GalleryComponent from './GalleryComponent';

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledGallery = styled(Box)(() => ({}))

const Gallery2 = () => {

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

export default Gallery2;




