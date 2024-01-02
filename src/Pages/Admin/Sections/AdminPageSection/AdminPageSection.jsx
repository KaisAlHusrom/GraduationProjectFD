//React
import {
    
} from 'react'

import {
    useSelector
} from 'react-redux'

//router
import { Route, Routes } from 'react-router-dom';

//Components
import {
    DashboardMainPage,
    UsersPage
} from "../../AdminPages"

//MUI
import {
    Box,
    Container,
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components



const AdminPageSection = () => {
    const dir = useSelector(state => state.langSlice.dir)

    const StyledAdminPageSection = styled(Box)(
        ({ theme }) => ({
            width: "calc(100% - 300px)",
            [dir === 'ltr' ? 'marginLeft' : 'marginRight']: 'auto',
            height: "calc(100vh - 65px)",
            overflowY: "auto",
            paddingTop: `${theme.spacing(6)}`,
            [theme.breakpoints.down('lg')]: {
                width:  "100%",
            },
        })
    )

    return (
        <StyledAdminPageSection>
            <Container maxWidth="lg">
                <Routes>
                    <Route exact path="" element={<DashboardMainPage />} />
                    <Route path="users" element={<UsersPage />} />
                </Routes>
            </Container>
        </StyledAdminPageSection>
    );
};

export default AdminPageSection;