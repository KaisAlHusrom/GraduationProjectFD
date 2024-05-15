//React
import { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

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
import { fetchElementTypesCategories } from '../../../../Services/elementTypesCategories'
import { CustomDrawer } from '../../../../Components'
import { defaultDrawerWidth } from '../../../../Components/CustomDrawer/CustomDrawer'
import CategorizedElements from '../CategorizedElements/CategorizedElements'
import { useTheme } from '@emotion/react'



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
        parentElementId,
        handleCloseMenus
    } = props
    const theme = useTheme()

    //for linear progress
    const [download, setDownload] = useState(false)
    

    const [selectedCategoryId, setSelectedCategoryId] = useState(null)

    const [categories, setCategories] = useState(null)
    useEffect(() => {
        const fetchCategories = async () => {
            setDownload(() => true)
            const {rows} = await fetchElementTypesCategories(null, null, null, null, null, 15   )
            setCategories(() => rows)
            if(rows && rows.length > 0) {
                setDownload(() => false)
            }
        }

        fetchCategories()
    }, [])
    


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
                !download && categories && categories.length > 0 ?
                    categories.map((category, key) => {
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
                drawerStyle={{
                    marginLeft: `${defaultDrawerWidth + 250}px`,
                    width: 250,
                }}
            >
                <CategorizedElements 
                    parentElementId={parentElementId}
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
}

export default ElementsCategories;