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

//Styled Components
const StyledProductsPage = styled(Box)(
    () => ({
    
    })
)

//icons
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';



const ProductsPage = () => {
    return (
        <StyledProductsPage>
            <DatabaseView
                title="Products"
                icon={<Inventory2OutlinedIcon />}
                showTableHeaders
            />
        </StyledProductsPage>
    );
};

export default ProductsPage;