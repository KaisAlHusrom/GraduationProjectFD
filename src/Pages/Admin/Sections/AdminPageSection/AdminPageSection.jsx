//React
import {
    
} from 'react'

import {
    useSelector
} from 'react-redux'

//router
import { Outlet } from 'react-router-dom';


import { CustomBreadcrumbs } from '../../../../Components';

//MUI
import {
    Box,
    Container,
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components



const AdminPageSection = () => {
    // --- Redux --- 
    //dir
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
            
            <Container maxWidth="xl">
                <CustomBreadcrumbs />
                <Outlet />
            </Container>
        </StyledAdminPageSection>
    );
};

export default AdminPageSection;