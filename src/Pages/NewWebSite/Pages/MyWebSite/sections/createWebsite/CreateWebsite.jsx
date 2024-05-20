//React


//Components


//MUI
import {
    Box,

} from '@mui/material'
import { styled } from '@mui/system'
import Main from './Main'

//Styled Components
const StyledCreateWebsite = styled(Box)(
    () => ({
        minHeight : "100vh", 
    })
)


const CreateWebsite = () => {

    return (
        <StyledCreateWebsite sx={{ bgcolor: 'background.default' }}>
            <Main></Main>
        </StyledCreateWebsite>

        
    );
};

export default CreateWebsite;