//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components
import DesignPageAppBar from './components/DesignPageAppBar'
import SideBar from './SideBar/SideBar'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledDesignControlPage = styled(Box)(
    ({ theme }) => ({
        padding:theme.spacing(2),
    })
)


const DesignControlPage = () => {
    return (
        <StyledDesignControlPage>
            {/* <DesignPageAppBar /> */}
            <SideBar></SideBar>
        </StyledDesignControlPage>
    );
};

export default DesignControlPage;