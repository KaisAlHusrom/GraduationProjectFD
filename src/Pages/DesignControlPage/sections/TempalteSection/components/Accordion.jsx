//React
import { useState } from 'react';


// components
import * as utils from '../StylesFunctions/SetStylesFunctions.js';


// mui 
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

    //Styled Components
    const StyledAccordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
            ))(({ theme }) => ({
                border: `1px solid ${theme.palette.divider}`,
                '&:not(:last-child)': {
                    borderBottom: 0,
                },
                '&::before': {
                    display: 'none',
                },
            }));

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
            {...props}
        />
    ))(({ theme }) => ({
        backgroundColor:
            theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
        }));

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        display: 'flex',
        flexWrap: 'wrap',
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, .125)',
        }));

    const BorderBox = styled('div')(({ borderStyle, isSelected }) => ({
        width: '100%',
        height: '10px',
        margin: '20px',
        color: '#eee',
        border: borderStyle,
        cursor: 'pointer',
        backgroundColor: isSelected ? '#092635' : 'transparent',
        '&:hover': {
            opacity: 0.8,
        },
        }));

    const CustomAccordion = ({ handleSectionStyleChange }) => {
        
            const [expanded, setExpanded] = useState(null);
            const [selectedBorder, setSelectedBorder] = useState(null);

            const handleChange = (panel) => (event, newExpanded) => {
                setExpanded(newExpanded ? panel : null);
            };

            const handleBorderSelect = (borderGroup, borderStyle) => {
                if(borderGroup === 'borderTop'){
                    setSelectedBorder(borderStyle);
                    handleSectionStyleChange({ borderTop: borderStyle });
                }
                if(borderGroup === 'borderRight'){
                    setSelectedBorder(borderStyle);
                    handleSectionStyleChange({ borderRight: borderStyle });
                }
                if(borderGroup === 'borderLeft'){
                    setSelectedBorder(borderStyle);
                    handleSectionStyleChange({ borderLeft: borderStyle });
                } if(borderGroup === 'borderBottom'){
                    setSelectedBorder(borderStyle);
                    handleSectionStyleChange({ borderBottom: borderStyle });
                }if(borderGroup === 'border'){
                    setSelectedBorder(borderStyle);
                    handleSectionStyleChange({ border: borderStyle });
                }
            };

    return (
            <Box>
                {Object.entries(utils['borders']).map(([borderGroup, borderStyles]) => (
                    <StyledAccordion
                    key={borderGroup}
                    expanded={expanded === borderGroup}
                    onChange={handleChange(borderGroup)}
                    >
                    <AccordionSummary
                        aria-controls={`${borderGroup}-content`}
                        id={`${borderGroup}-header`}
                    >
                        <Typography>{borderGroup}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {Object.entries(borderStyles).map(([borderStyle, borderName]) => (
                            borderName === 'none' ? (
                                <Typography key={borderStyle} sx = {{
                                    fontWeight: 'bold',
                                    fontSize: '20px',
                                    margin : 'auto',
                                    cursor: 'pointer',
                                    backgroundColor: '#092635',
                                    padding : '10px',
                                    borderRadius:'10px'

                                }}onClick={() => handleBorderSelect(borderGroup, borderName)}>
                                    {borderName}
                                    </Typography>
                            ): <BorderBox
                            key={borderStyle}
                            borderStyle={borderName}
                            isSelected={selectedBorder === borderName}
                            onClick={() => handleBorderSelect(borderGroup, borderName)}
                        />
                        ))}
                    </AccordionDetails>
                    </StyledAccordion>
                ))}
                </Box>
            );
};

export default CustomAccordion;
