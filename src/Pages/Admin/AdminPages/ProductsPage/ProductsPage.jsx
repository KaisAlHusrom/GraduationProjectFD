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
import usersService from '../../../../Services/usersService'
import categoriesService from '../../../../Services/categoriesService'




const ProductsPage = () => {
    return (
        <StyledProductsPage>
            <DatabaseView
                title="Products"
                icon={<Inventory2OutlinedIcon />}
                manyToOne={
                    [
                        {
                            "field_name": "user",
                            "fetched_column": "first_name",
                            fetch_all_data: usersService.fetchUsers()
                        },
                    ]
                }
                manyToMany={
                    [
                        {
                            "field_name": "categories",
                            "fetched_column": "category_name",
                            fetch_all_data: categoriesService.fetchCategories(),
                        }
                    ]
                }
            />
        </StyledProductsPage>
    );
};

export default ProductsPage;