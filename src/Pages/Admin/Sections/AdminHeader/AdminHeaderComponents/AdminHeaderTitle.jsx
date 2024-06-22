//React
import {
    
} from 'react'

//MUI
import {
    Box,
    Typography
} from '@mui/material'
import { styled } from '@mui/system'
import CliserImageLogo from '../../../../Ecommerce/utils/CliserImageLogo';


//Styled Components
const StyledTitleBox = styled(Box)(
    ({ theme }) => ({
        padding: `0 ${theme.spacing(2)}`,
        height: "65px",
        display: "flex",
        alignItems: "center",
        // [theme.breakpoints.down("md")]: {
        //     display: "none",
        // }
    })
)


const AdminHeaderTitle = () => {
    return (
        <>
        <StyledTitleBox className='adminHeaderTitle'>
            <CliserImageLogo />
            
        </StyledTitleBox>
        </>
    );
};


export default AdminHeaderTitle;