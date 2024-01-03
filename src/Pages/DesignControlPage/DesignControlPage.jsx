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
import AppbarCom from './SideBar/Sections/AppbarCom'

//Styled Components
const StyledDesignControlPage = styled(Box)(
    ({ theme }) => ({
        padding:theme.spacing(2),
    })
)


const DesignControlPage = () => {
    return (
        <StyledDesignControlPage>
            <AppbarCom></AppbarCom>
        </StyledDesignControlPage>
    );
};

export default DesignControlPage;