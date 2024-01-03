//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components
import AppBarCom  from '../DesignControlPage/components/AppbarCom'

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
            <AppBarCom></AppBarCom>
        </StyledDesignControlPage>
    );
};

export default DesignControlPage;