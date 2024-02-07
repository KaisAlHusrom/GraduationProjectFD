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

//icon
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';

//Styled Components
const StyledProductReviewsPage = styled(Box)(
    () => ({
    
    })
)


const ProductReviewsPage = () => {
    return (
        <StyledProductReviewsPage>
            <DatabaseView
                // databaseOptions={usersOptions}
                title="Products Reviews"
                icon={<ThumbsUpDownOutlinedIcon />}
                // handleUpdateData={}
            />
        </StyledProductReviewsPage>
    );
};

export default ProductReviewsPage;