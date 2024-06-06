import {  } from 'react';
import { Box} from '@mui/material';
import { styled } from '@mui/system';



const StyledHomeDrawerList = styled(Box)(
    ({ theme }) => ({
        color: theme.palette.success.main,
        marginTop : '0px'
    })
);




const HomeDrawerList = () => {



  return (
    <StyledHomeDrawerList>
            Home



    </StyledHomeDrawerList>
);
};

export default HomeDrawerList;
