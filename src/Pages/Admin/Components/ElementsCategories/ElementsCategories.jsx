//React
import { useMemo, useState } from 'react'


//config 
import config from "../../../../../Config.json"
import { elementTypesCategoriesImagesFolderName } from '../../AdminPages/ElementTypesCategoriesPage/ElementTypesCategoriesPage'

//Components


//MUI
import {
    Box,
    Skeleton,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { fetchElementTypesCategories } from '../../../../Services/AdminServices/Services/elementTypesCategories'
import { CustomDrawer } from '../../../../Components'
import { defaultDrawerWidth } from '../../../../Components/CustomDrawer/CustomDrawer'
import CategorizedElements from '../CategorizedElements/CategorizedElements'
import { useTheme } from '@emotion/react'
import useEffectFetchData from '../../../../Helpers/customHooks/useEffectFetchData'
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate'
import { writeFilterObject } from '../../../../Helpers/filterData'



//Styled Components
const StyledElementsCategories = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(),
        padding: theme.spacing(2),
        marginTop: theme.spacing(6)
    })
)

const StyledElementCategoryBox = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        alignItems: "center",
        padding: `${theme.spacing(2)} ${theme.spacing()}`,
        border: '1px solid',
        borderColor: theme.palette.divider,
        width: "100%",
        cursor: "pointer",
        transition: theme.transitions.create(['background-color'], {
            duration: theme.transitions.duration.standard,
        }),
        "&:hover": {
            backgroundColor: theme.palette.action.hover
        },
        borderRadius: theme.spacing(2)
    })
);

const StyledBoxImage = styled(Box)(
    () => ({
        width: 40,
        height: 40,
        borderRadius: "50%"
    })
);

const StyledImage = styled("img")(
    () => ({
        width: "100%",
        height: "100%",
        objectFit: "contain",
        borderRadius: "50%"
    })
)

const StyledCategoryNameBox = styled(Box)(
    ({ theme }) => ({
        marginLeft: theme.spacing(2)
    })
);

const ElementsCategories = (props) => {
    const {
        handleCloseMenus,
        drawerOpen
    } = props
    const theme = useTheme()

    const [selectedCategoryId, setSelectedCategoryId] = useState(null)
    const {
        elementStructureDrawer,
        mode,
    } = useMyCreateElementContext()

    //TODO: you can add rule that is the user can't add component or sections to elements, 
    const params = useMemo(() => {
        return [null, null, [
            (mode === "element") && writeFilterObject("category_name", "string", "!=", "Containers") ,
            // (mode === "section") && writeFilterObject("category_name", "string", "!=", "Containers")
        ], null, null, 15]
    }, [mode])

    const {
        data,
        // setData,
        download,
        // setDownload
    } = useEffectFetchData(fetchElementTypesCategories, params, drawerOpen ? drawerOpen : elementStructureDrawer);
    

    //open element drawer
    const [elementsDrawerOpen, setElementsDrawerOpen] = useState(false)


    const handleSelectCategory = (id) => {
        
        if(selectedCategoryId === id){
            if(elementsDrawerOpen) {
                setElementsDrawerOpen(false)
            }
            setSelectedCategoryId(null)
        } else {
            setElementsDrawerOpen(() => true)
            setSelectedCategoryId(id)
        }
    }

    return (
        <StyledElementsCategories>
            {
                !download && data && data.length > 0 ?
                data.map((category, key) => {
                        return (
                            <StyledElementCategoryBox sx={{backgroundColor: selectedCategoryId === category.id && theme.palette.action.selected}} onClick={() => handleSelectCategory(category.id)} key={key}>
                                <StyledBoxImage>
                                    <StyledImage src={`${config.ServerImageRoute}/${elementTypesCategoriesImagesFolderName}/${category.category_image}`} alt="" />
                                </StyledBoxImage>
                                <StyledCategoryNameBox>
                                    <Typography letterSpacing={2} variant='h6' textAlign={"left"}>{category.category_name}</Typography>
                                </StyledCategoryNameBox>
                            </StyledElementCategoryBox>
                        )
                    })
                :
                <>
                    <Skeleton width={"90%"} height={100}></Skeleton>
                    <Skeleton width={"90%"} height={100}></Skeleton>
                    <Skeleton width={"90%"} height={100}></Skeleton>
                </>
            }
            <CustomDrawer
                title={"Categories"}
                withoutDrawerHeader
                drawerOpenState={[elementsDrawerOpen, setElementsDrawerOpen]}
                variant={"persistent"}
                putDrawerCloseButton
                drawerZIndex={-1} // * make the zIndex under 0 because this drawer is already renders inside ElementsCategories Drawer
                drawerStyle={{
                    marginLeft: drawerOpen ? `${defaultDrawerWidth}px` :`${defaultDrawerWidth + 250}px`,
                    width: 250,
                }}
            >
                <CategorizedElements 
                    handleCloseMenus={handleCloseMenus}
                    selectedCategoryState={[selectedCategoryId, setSelectedCategoryId]}
                />
            </CustomDrawer>
        </StyledElementsCategories>
    );
};

ElementsCategories.propTypes = {
    parentElementId: propTypes.string,
    handleCloseMenus: propTypes.func,
    drawerOpen: propTypes.bool,
}

export default ElementsCategories;