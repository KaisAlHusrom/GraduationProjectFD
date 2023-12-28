//React
import {
    
} from 'react'

//MUI
import {
    Box,
    Typography
} from '@mui/material'
import { styled } from '@mui/system'


//Styled Components
const StyledTitleBox = styled(Box)(
    ({ theme }) => ({
        padding: `0 ${theme.spacing(2)}`,
        height: "65px",
        display: "flex",
        alignItems: "center",
    })
)


const AdminHeaderTitle = () => {
    return (
        <StyledTitleBox className='adminHeaderTitle'>
            <Typography variant='h6' component="span">
                AdminHeaderTitle
            </Typography>
        </StyledTitleBox>
    );
};


export default AdminHeaderTitle;