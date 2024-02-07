//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components
import { DatabaseView } from '../../../../Components'

//icons
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import categoriesService from '../../../../Services/categoriesService';

//Styled Components
const StyledCategoriesPage = styled(Box)(
    ({ theme }) => ({
    
    })
)

const usersOptions = [
    {
        value: "Delete Users",
        icon: <DeleteOutlineOutlinedIcon />,
        onClick: () => {console.log("delete")}
    }
]


const CategoriesPage = () => {
    return (
        <StyledCategoriesPage>
            <DatabaseView
                databaseOptions={usersOptions}
                title="Categories"
                icon={<CategoryOutlinedIcon />}
                handleUpdateData={categoriesService.updateCategory}
            />
        </StyledCategoriesPage>
    );
};

export default CategoriesPage;