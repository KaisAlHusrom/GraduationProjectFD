
// Components
import {
    Box,
    Skeleton,
    Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { AdminMainButton, AdminMainButtonOutsideState } from '../../../Components';
import AddCardIcon from '@mui/icons-material/AddCard';
import useFetchData from '../../../Helpers/customHooks/useFetchData';
import DrawerSelectedCategoryDesigns from '../sections/EmptyDesign/EditPage/Drawers/ReadyDesign/DrawerSelectedCategoryDesigns';
import { fetchUserDesignCategories } from '../../../Services/UserServices/Services/designCategoriesUserService';
import { fetchUserElementTypesCategories } from '../../../Services/UserServices/Services/elementTypeCategoriesUsersService';
import { ButtonStyle, ModalTitleStyle } from '../sections/EmptyDesign/StylesFunctions/SetStylesFunctions';
import { useEffect, useState } from 'react';



// Styled Components
const StyledModalDesignCategories = styled(Box)(
    () => ({
        borderRadius: '10px',
        boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;",
        padding: (theme) => theme.spacing(4),
        textAlign : 'center'
    })
);645


const ModalDesignCategories = ({   appliedFilter, NameOfCategories  , customState , designState , drawerStates}) => {

    const fetchFunction = NameOfCategories === "Empty"
        ? fetchUserElementTypesCategories
        : fetchUserDesignCategories;

            const [dialogState , setDialogState] = customState;
            const [drawerState , setDrawerState] = drawerStates;
            const [design , setDesign] = designState 

            const handleSelectDesign = (Design) => {
                setDesign(Design);
                setDrawerState(true)
                setDialogState(false);
            }

    const { data, loading } = useFetchData(fetchFunction, 'all', appliedFilter, null, true, null, null, 100);
    return (
        <StyledModalDesignCategories>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
                    <Typography color = "text.default" sx = {ModalTitleStyle}>{NameOfCategories}</Typography>
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton key={index} sx={{ width: '300px', height: '200px' }} />
                    ))
                ) : (
                    data && data.length > 0 ? data.map((Design, index) => (
                    <AdminMainButton
                            key={index}
                            title={Design.category_name}
                            type="custom"
                            onClick={() => handleSelectDesign(Design)}
                            appearance="primary"
                            putTooltip
                            drawerZIndex={10000}
                            drawerStyle={{
                                width: '500px',
                            }}
                            icon={<AddCardIcon />}
                            
                            sx={{...ButtonStyle ,width: '320px' , height : '50px' }} 
                            />
                    )) : (
                        <Typography>No data available</Typography>
                    )
                )}
            </Box>
        </StyledModalDesignCategories>
    );
};

export default ModalDesignCategories;
