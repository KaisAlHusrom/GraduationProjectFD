
// Components
import {
    Box,
    Skeleton,
    Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { AdminMainButton } from '../../../../../Components';
import AddCardIcon from '@mui/icons-material/AddCard';
import { fetchDesignCategories } from '../../../../../Services/designCategoriesService';
import useFetchData from '../../../../../Helpers/customHooks/useFetchData';
import DrawerSelectedCategoryDesigns from '../EditPage/Drawers/ReadyDesign/DrawerSelectedCategoryDesigns';
import { fetchElementTypesCategories } from '../../../../../Services/elementTypesCategories';

// Styled Components
const StyledModalDesignCategories = styled(Box)(
    () => ({
        borderRadius: '10px',
        boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;",
        padding: (theme) => theme.spacing(4),
    })
);

const ButtonStyle = {
    margin: "10px",
    display: 'block',
    width: '200px',
    padding: '10px',
    transition: 'all 0.5s ease',
    borderRadius: '10px',
    fontWeight: 'bold',
    color: "#eee",
    cursor: 'pointer',
    backgroundColor: 'success.dark',
    '&:hover': {
        backgroundColor: "white.dark",
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
    },
    boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
}

const ModalDesignCategories = ({  createDesignFunction, appliedFilter, selected_parent_id, NameOfCategories }) => {

    const fetchFunction = NameOfCategories === "Empty"
        ? fetchElementTypesCategories
        : fetchDesignCategories;

    const { data, loading } = useFetchData(fetchFunction, 'all', appliedFilter, null, true, null, null, 100);
    return (
        <StyledModalDesignCategories>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton key={index} sx={{ width: '300px', height: '200px' }} />
                    ))
                ) : (
                    data && data.length > 0 ? data.map((Design, index) => (
                        <AdminMainButton
                            key={index}
                            title={Design.category_name}
                            type="drawer"
                            appearance="primary"
                            putTooltip
                            drawerZIndex={10000}
                            drawerStyle={{
                                width: '500px',
                            }}
                            icon={<AddCardIcon />}
                            willShow={
                                <DrawerSelectedCategoryDesigns
                                    design_category_id={Design.id}
                                    createDesignedDesign={createDesignFunction}
                                    appliedFilterType={NameOfCategories === 'Empty' ? Design.id : Design.design_type}
                                    selected_parent_id={selected_parent_id}
                                />
                            }
                            sx={ButtonStyle}
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
