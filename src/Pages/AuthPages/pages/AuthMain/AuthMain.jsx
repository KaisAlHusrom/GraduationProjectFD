//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Container,
} from '@mui/material'
import { styled } from '@mui/system'
import MainAppBar from '../../../../Components/MainAppBar/MainAppBar'
import { Outlet } from 'react-router-dom'

//Styled Components
const StyledAuthMain = styled(Box)(
    () => ({
    
    })
)


const AuthMain = () => {

    const containerStyle = useMemo(() => {
        return {
            minHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }
    }, [])

    return (
        <StyledAuthMain>
            <MainAppBar auth={true} />

            <Container sx={containerStyle} component="main" maxWidth="xs">
                <Outlet />

            </Container>
        </StyledAuthMain>
    );
};

export default AuthMain;