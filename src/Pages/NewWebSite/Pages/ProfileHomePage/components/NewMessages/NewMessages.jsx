//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Typography
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import CustomCard from '../CustomCard/CustomCard'
import { useNavigate } from 'react-router-dom'

//Styled Components
const StyledNewMessages = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: theme.spacing(2),
        cursor: "pointer"
    })
)

const messagesBoxStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: theme => theme.spacing(1),
    width: "50%",
    height: "50%",
}
const NewMessages = () => {

    const navigate = useNavigate()
    const handleGoToMessages = () => {
        navigate("/profile/messages")
    }
    
    return (
        <CustomCard 
        cardTail={
            <Box sx={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                gap: theme => theme.spacing(2),
                height: '100%',
                width: '100%',
                cursor: "pointer"
            }}
            onClick={handleGoToMessages}
            >
                <Box sx={messagesBoxStyle}>
                    <Typography variant='h7'>
                        Incoming Messages
                    </Typography>
                    <Typography variant='h6'>
                        0
                    </Typography>
                </Box>
                <Box sx={messagesBoxStyle}>
                    <Typography variant='h7'>
                        Outgoing Messages
                    </Typography>
                    <Typography variant='h6'>
                        0
                    </Typography>
                </Box>

            </Box>
        }
        >
            <StyledNewMessages onClick={handleGoToMessages}>
                <Typography variant='h5'>
                    New Messages
                </Typography>
                <Typography variant='h4'>
                    0
                </Typography>
            </StyledNewMessages>
        </CustomCard>
    );
};

NewMessages.propTypes = {
    children: propTypes.array
}

export default NewMessages;