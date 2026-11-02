//React


//Components


//MUI
import {
    Box,

} from '@mui/material'
import { styled } from '@mui/system'
import Header from './Header'
import WebSiteType from './WebSiteType'

//Styled Components
const StyledMyWebSite = styled(Box)(
    () => ({
        height : "100%", 
    })
)


const MyWebSite = () => {
    return (
        <StyledMyWebSite>
                <Header></Header>
                <WebSiteType></WebSiteType>
        </StyledMyWebSite>


    );
};

export default MyWebSite;