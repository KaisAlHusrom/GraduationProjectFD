//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import SideBar from './components/SideBar'

//Styled Components
const StyledDesignControlPage = styled(Box)(
    ({ theme }) => ({
        padding:theme.spacing(2),
    })
)


const DesignControlPage = () => {
    return (
        <StyledDesignControlPage>
            <SideBar></SideBar>
        </StyledDesignControlPage>
    );
};

export default DesignControlPage;