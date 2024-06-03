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

// useContext 

//Styled Components
const StyledDesignControlPage = styled(Box)(
    () => ({
        backgroundColor:'white',
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