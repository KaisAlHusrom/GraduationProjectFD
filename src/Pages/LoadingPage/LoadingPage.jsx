//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box, CircularProgress, LinearProgress,
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledLoadingPage = styled(Box)(
    () => ({
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    })
)

const StyledLinearProgress = styled(Box)(
    () => ({
        width: "100%",
        position: "absolute",
        top: "0",
        left: "0",
    })
);

const LoadingPage = () => {
    return (
        <StyledLoadingPage>

            <StyledLinearProgress>
                <LinearProgress  />
            </StyledLinearProgress>
            <CircularProgress size={64} />
        </StyledLoadingPage>
    );
};

export default LoadingPage;