//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box, Card, Grid, Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

//Styled Components
const StyledPageSettings = styled(Grid)(
    () => ({
    
    })
)

const StyledGridBox = styled(Card)(
    ({ theme }) => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: `${theme.spacing(2)} ${theme.spacing()}`,
        borderRadius: theme.spacing(2),
        transition: theme.transitions.create(['background-color', 'transform'], {
            duration: theme.transitions.duration.short,
        }),
        "&:hover": {
            cursor: "pointer",
            backgroundColor: theme.palette.action.hover,
        }
    })
);

const StyledGridBoxText = styled(Box)(
    () => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    })
);

const StyledGridBoxIcon = styled(Box)(
    () => ({
        // Your styles here
    })
);


const PageSettings = ({items}) => {
    const navigate = useNavigate()
    //handlers
    const handleClickPage = (path) => {
        navigate(path)
    }


    return (
        <StyledPageSettings container spacing={2}>
            {
                items.map((item, key) => {
                    return (
                        <Grid key={key} item xxs={12} xs={6} md={4}>
                            <StyledGridBox onClick={() => handleClickPage(item.path)} elevation={4}>
                                <StyledGridBoxIcon>
                                    {item.icon}
                                </StyledGridBoxIcon>
                                <StyledGridBoxText>
                                    <Typography variant="h6">
                                        {item.title}
                                    </Typography>
                                    <Typography sx={{
                                        maxWidth: "300px",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        textAlign: "center",
                                    }} variant="body1" color="text.secondary" mt={1}>
                                        {item.body}
                                    </Typography>
                                </StyledGridBoxText>
                            </StyledGridBox>
                        </Grid>
                    )
                })
            }
        </StyledPageSettings>
    );
};

PageSettings.propTypes = {
    items: propTypes.array
}

export default PageSettings;