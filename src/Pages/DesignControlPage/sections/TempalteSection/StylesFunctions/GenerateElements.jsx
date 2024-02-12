// NavbarElementUtils.js

import { Typography, Link } from '@mui/material';

export const getAppropriateTag = (element, elementContent, elementStyle) => {
    let modifiedElementStyle = { ...elementStyle }; 
    if (element?.element_type === "Head3") {
        return (
            <Typography sx={modifiedElementStyle} variant="h3">{elementContent}</Typography>
        );
    }
    if (element?.element_type === "text") {
        return (
            <Typography sx={elementStyle} variant="h6">{elementContent}</Typography>
        );
    }
    if (element?.element_type === "image") {
        return (
            <img style={elementStyle} src={elementContent} alt={elementContent} />
        );
    }
    if (element?.element_type === "link") {
        return (
            <Link href="#" style={elementStyle}>{elementContent}</Link>
        );
    }

    
};
