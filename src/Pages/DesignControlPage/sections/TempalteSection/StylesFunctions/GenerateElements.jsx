// NavbarElementUtils.js
import FacebookIcon from '@mui/icons-material/Facebook';
import { Typography, Link } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LanguageIcon from '@mui/icons-material/Language';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import ContactlessIcon from '@mui/icons-material/Contactless';
export const getAppropriateTag = (element, elementContent, elementStyle) => {
    
    let modifiedElementStyle = { ...elementStyle }; 
    if (element?.element_type === "Head3") {
        return (
            <Typography sx={modifiedElementStyle} variant="h3">{elementContent}</Typography>
        );
    }
    if (element?.element_type === "Head5") {
        return (
            <Typography sx={modifiedElementStyle} variant="h5">{elementContent}</Typography>
        );
    }
    if (element?.element_type === "description") {
        return (
            <Typography sx={modifiedElementStyle} variant="p">{elementContent}</Typography>
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
            <Link href={elementContent} style={elementStyle}>{elementContent}</Link>
        );
    }
    if (element?.element_type === "icon") {
        return (
            <FacebookIcon style={elementStyle} />
        );
        
    }
    if (element?.element_type === "UserIcon") {
        return (
            <PersonOutlineIcon style={elementStyle} />
        );  
    }
    if (element?.element_type === "MoneyIcon") {
        return (
            <AttachMoneyIcon style={elementStyle} />
        );  
    }
    if (element?.element_type === "ProjectIcon") {
        return (
            <AccountTreeIcon style={elementStyle} />
        );  
    }
    if (element?.element_type === "Countries") {
        return (
            <LanguageIcon style={elementStyle} />
        );  
    }
    if (element?.element_type === "AssessmentIcon") {
        return (
            <AssessmentIcon style={elementStyle} />
        );  
    }
    if (element?.element_type === "ModeStandbyIcon") {
        return (
            <ModeStandbyIcon style={elementStyle} />
        );  
    }
    if (element?.element_type === "ContactlessIcon") {
        return (
            <ContactlessIcon style={elementStyle} />
        );  
    }
};
