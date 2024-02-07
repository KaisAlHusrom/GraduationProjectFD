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
import { DatabaseView } from '../../../../Components'

import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
//Styled Components
const StyledOrdersPage = styled(Box)(
    ({ theme }) => ({
    
    })
)


const OrdersPage = () => {
    return (
        <StyledOrdersPage>
            <DatabaseView
                // databaseOptions={usersOptions}
                title="Orders"
                icon={<BorderColorOutlinedIcon />}
                // handleUpdateData={}
            />
        </StyledOrdersPage>
    );
};

export default OrdersPage;