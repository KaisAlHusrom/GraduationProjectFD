// NavbarElementUtils.js
import FacebookIcon from '@mui/icons-material/Facebook';
import { Typography, Link, TextField, Box, Button, Rating } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LanguageIcon from '@mui/icons-material/Language';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import ContactlessIcon from '@mui/icons-material/Contactless'; 
import AddLocationIcon from '@mui/icons-material/AddLocation';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';

import './Style.css'


export const getAppropriateTag = (element, elementContent, elementStyle , classname) => {
    
    let modifiedElementStyle = { ...elementStyle }; 
    if (element?.element_type === "Head3") {
        return (
            <Typography sx={modifiedElementStyle} variant="h3" className={classname}>{elementContent}</Typography>
        );
    }
    if (element?.element_type === "Head5") {
        return (
            <Typography sx={modifiedElementStyle} variant="h4">{elementContent}</Typography>
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
            <Link href={elementContent} style={elementStyle} >{elementContent}</Link>
        );
    }
    if (element?.element_type === "icon") {
        return (
            <FacebookIcon style={elementStyle}  />
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
    if (element?.element_type === "Button") {
        return (
                <Button variant="contained" style = {elementStyle}>{elementContent}</Button>
        );  
    }
    if (element?.element_type === "Submit") {
        return (
                <Button variant="contained" style = {elementStyle}><SendIcon sx={{marginRight :'20px'}}/> {elementContent}</Button>
        );  
    }
    if (element?.element_type === "input") {
        return (
            <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
<TextField
    sx={{
        
        label: {
            color: elementStyle.labelColor || undefined, // Label color
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: 'none', // Remove border
            },
            '& input': {
                color: elementStyle.textColor || undefined, // Text color
            },
        },
    }}
    style={elementStyle}
    id="filled-basic"
    label={elementContent}
    variant="outlined"
/>
        </Box>        
        );  
    }
    if (element?.element_type === "textIconLocation") {
        return (
            <Box sx = {{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%'
            }}>
                <AddLocationIcon/>
                <Typography sx={elementStyle} variant="h6">{elementContent}</Typography>
            </Box>
        );  
    }
    if (element?.element_type === "textIconPhone") {
        return (
            <Box sx = {{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%'
            }}>
                <LocalPhoneIcon />
                <Typography sx={elementStyle} variant="h6">{elementContent}</Typography>
            </Box>
        );  
    }
    if (element?.element_type === "textIconEmail") {
        return (
            <Box sx = {{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%'
            }}>
                <EmailIcon />
                <Typography sx={elementStyle} variant="h6">{elementContent}</Typography>
            </Box>
        );  
    }
    if (element?.element_type === "TextArea") {
        return (
            <TextField
                sx={{
                    label: {
                        color: elementStyle.labelColor || undefined, // Label color
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            border: 'none', // Remove border
                        },
                        '& input': {
                            color: elementStyle.textColor || undefined, // Text color
                        },
                    },
                }}
                style={elementStyle}
                placeholder={elementContent}
                multiline
                minRows={2}
                maxRows={4}
            />
        );  
    }
    if (element?.element_type === "Rating") {
        return (
            <Rating style = {elementStyle} name="read-only" value={5} readOnly />
        );  
    }
};
