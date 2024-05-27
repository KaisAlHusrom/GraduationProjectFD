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
    if (element === "Head1") {
        return (
            <Typography sx={modifiedElementStyle} variant="h1" className={classname}>{elementContent}</Typography>
        );
    }
    if (element === "Head2") {
        return (
            <Typography sx={modifiedElementStyle} variant="h2" className={classname}>{elementContent}</Typography>
        );
    }
    if (element === "Head3") {
        return (
            <Typography sx={modifiedElementStyle} variant="h3" className={classname}>{elementContent}</Typography>
        );
    }
    if (element === "Head4") {
        return (
            <Typography sx={modifiedElementStyle} variant="h4" className={classname}>{elementContent}</Typography>
        );
    }
    if (element === "Head5") {
        return (
            <Typography sx={modifiedElementStyle} variant="h5">{elementContent}</Typography>
        );
    }
    if (element === "Head6") {
        return (
            <Typography sx={modifiedElementStyle} variant="h6">{elementContent}</Typography>
        );
    }
    if (element === "SubTitle1") {
        return (
            <Typography sx={modifiedElementStyle} variant="SubTitle1">{elementContent}</Typography>
        );
    }
    if (element === "SubTitle2") {
        return (
            <Typography sx={modifiedElementStyle} variant="SubTitle2">{elementContent}</Typography>
        );
    }
    if (element === "description") {
        return (
            <Typography sx={modifiedElementStyle} variant="p">{elementContent}</Typography>
        );
    }
    if (element === "text") {
        return (
            <Typography sx={elementStyle} variant="h6">{elementContent}</Typography>
        );
    }
    if (element === "image") {
        return (
            <img style={elementStyle} src={elementContent} alt={elementContent} />
        );
    }
    if (element === "link") {
        return (
            <Link href={elementContent} style={elementStyle} >{elementContent}</Link>
        );
    }
    if (element === "icon") {
        return (
            <FacebookIcon style={elementStyle}  />
        );
        
    }
    if (element === "UserIcon") {
        return (
            <PersonOutlineIcon style={elementStyle} />
        );  
    }
    if (element === "MoneyIcon") {
        return (
            <AttachMoneyIcon style={elementStyle} />
        );  
    }
    if (element === "ProjectIcon") {
        return (
            <AccountTreeIcon style={elementStyle} />
        );  
    }
    if (element === "Countries") {
        return (
            <LanguageIcon style={elementStyle} />
        );  
    }
    if (element === "AssessmentIcon") {
        return (
            <AssessmentIcon style={elementStyle} />
        );  
    }
    if (element === "ModeStandbyIcon") {
        return (
            <ModeStandbyIcon style={elementStyle} />
        );  
    }
    if (element === "ContactlessIcon") {
        return (
            <ContactlessIcon style={elementStyle} />
        );  
    }
    if (element === "Button") {
        return (
            <Button variant="contained" sx={{
                ...elementStyle,
                transition : 'all 0.5s ease-in-out',
                '&:hover': {
                backgroundColor: 'transparent', // Text color
                color : '#eee'

                },
            }}>
                {elementContent}
            </Button>
            );  
        }
        
    if (element === "Submit") {
        return (
                <Button variant="contained" style = {{
                    ...elementStyle,
                '&:hover': {
                backgroundColor: 'transparent', // Text color
                color : '#eee'
                },
                }}><SendIcon sx={{marginRight :'20px'}}/> {elementContent}</Button>
        );  
    }
    if (element === "input") {
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
    if (element === "textIconLocation") {
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
    if (element === "textIconPhone") {
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
    if (element === "textIconEmail") {
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
    if (element === "TextArea") {
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
    if (element === "Rating") {
        return (
            <Rating style = {elementStyle} name="read-only" value={5} readOnly />
        );  
    }
};
