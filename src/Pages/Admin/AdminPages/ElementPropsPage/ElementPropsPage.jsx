//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components
import { DatabaseView } from '../../../../Components'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

import TuneIcon from '@mui/icons-material/Tune';


//Styled Components
const StyledElementPropsPage = styled(Box)(
    () => ({
    
    })
)


const ElementPropsPage = () => {
    return (
        <StyledElementPropsPage>
            <DatabaseView
            title={"Elements Props"}
            icon={<TuneIcon />}
            />
        </StyledElementPropsPage>   
    );
};

export default ElementPropsPage;