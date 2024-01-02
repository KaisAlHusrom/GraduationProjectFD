//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Toolbar,
    AppBar,
    Box,
    Typography
} from '@mui/material'
import { styled } from '@mui/system'
import { useTheme } from '@mui/system';
//Styled Components
const StyledDesignPageAppBar = styled(Toolbar)(
    ({ theme }) => ({
    
    })
)


const DesignPageAppBar = () => {
    const theme = useTheme();

    return (
        <StyledDesignPageAppBar>
            <AppBar position="fixed"  >
            {/* KAIS: I changed the div to box here, because in div you can't use theme values, but in Box you can */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' , padding:theme.spacing(1.5)}}>
                <Typography variant="h6" noWrap component="div">
                Persistent drawer
                </Typography>
                {/* <AdminHeaderMenu />  */}
                {/* TODO: KAIS: There is no need to add the admin header to design page, Users will enter to this page to change their web pages, and this app bar shouldn't appear to them */}
            </Box>
            </AppBar>
        </StyledDesignPageAppBar>
    );
};

export default DesignPageAppBar;