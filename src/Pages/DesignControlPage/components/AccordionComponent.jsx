import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

    const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        marginTop : '20px', 
        borderRadius : '5px',
        borderLeft : '5px solid ', 
        borderColor : 'text.default',
        backgroundColor :"#c3dac37a",
        transition : 'all 0.3s ease-in-out',
        '&:hover' : {
            backgroundColor: '#ffffff24'
        },
    }));

    const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
    ))(({ theme }) => ({
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  
    }));

    export default function CustomizedAccordions({ panels }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div>
        {panels.map((panel, index) => (
            <Accordion
            key={index}
            expanded={expanded === panel.id}
            onChange={handleChange(panel.id)}
            >
            <AccordionSummary aria-controls={`${panel.id}-content`} id={`${panel.id}-header`}>
                <Typography>{panel.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{panel.content}</Typography>
            </AccordionDetails>
            </Accordion>
        ))}
        </div>
    );
    }
