/* eslint-disable no-unused-vars */
import { useContext, useMemo } from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { MainTemplateSectionSet } from '../../UseContext/UserSetSections'

const StyledGallery2 = styled(Box)(
    ({ theme }) => ({
        // Add default styles for StyledGallery2 here if needed
    })
    );

import galleryData2 from "./GalleryData2.json"
import GalleryComponent from './GalleryComponent';


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
        <StyledGallery2 key={galleryData2.section_id} sx={sectionStyle}>
        {galleryData2 &&
            galleryData2.section_components.map((component, i) => {
            return (
                <GalleryComponent key={i} component={component} />
            );
            })}
        </StyledGallery2>
            ) : (
            null
        )
    );
};

export default Gallery;
