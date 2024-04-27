//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//image
import compExample from "../../../../Assets/Images/compExample.png"

//Components


//MUI
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Stack,
    Typography,
    duration,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledPreviousComponentsTemplates = styled(Stack)(
    ({ theme }) => ({
        width: "100%",
        marginTop: theme.spacing(2),
        overflowY: 'auto',
        backgroundColor: theme.palette.background.paper,
    })
)


const PreviousComponentsTemplates = () => {
    return (
        <StyledPreviousComponentsTemplates
            direction='column'
            gap={2}
            alignItems='center'
        >
            <ComponentTemplate />

        </StyledPreviousComponentsTemplates>
    );
};

PreviousComponentsTemplates.propTypes = {
    children: propTypes.array
}

export default PreviousComponentsTemplates;


//Component Template component
const StyledComponentTemplate = styled(Card)(
    ({ theme }) => ({
        width: '90%',
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        cursor: 'pointer',
        position: 'relative',
        "&:hover": {
            "& .cover": {
                opacity: "1",
            }
        },
        "& .cover": {
            backgroundColor: theme.palette.action.disabled,
            position: 'absolute',
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 500,
            fontSize: 32,
            textTransform: "capitalize",
            color: theme.palette.secondary.main,
            fontWeight: 'bold',
            opacity: 0,
            transition: [theme.transitions.create(['opacity']), {
                duration: theme.transitions.duration.standard,
            }],
            userSelect: "none",
        },
        '& .truncate': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        }
    })
);
export const ComponentTemplate = () => {
    return (
        <StyledComponentTemplate>
                <CardMedia
                    sx={{ height: 180, objectFit: 'contain', width: 200, transform: 'translate(25%, 0)' }}
                    image={compExample}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Template Name
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="truncate">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <Box className="cover">
                    Select this
                </Box>
        </StyledComponentTemplate>
    )
}