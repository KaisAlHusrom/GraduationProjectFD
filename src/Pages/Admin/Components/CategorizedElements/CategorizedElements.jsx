//React
import { useMemo } from 'react'

import config from "../../../../../Config.json"

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
import { writeFilterObject } from '../../../../Helpers/filterData'
import { fetchElementTypesRows } from '../../../../Services/AdminServices/Services/elementsTypesService'
import { addElementToParent } from '../../../../Helpers/RecursiveHelpers/addNewElementToSpecificElement'
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate'
import useEffectFetchData from '../../../../Helpers/customHooks/useEffectFetchData'
import { elementTypesImagesFolderName } from '../../AdminPages/ElementTypesPage/ElementTypesPage'
import { transformElementTypeToDesignStructure } from '../../../../Helpers/transformData'

//Styled Components
const StyledCategorizedElements = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(),
        padding: theme.spacing(2),
        marginTop: theme.spacing(6)
    })
)

const StyledElementBox = styled(Box)(
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

const StyledElementNameBox = styled(Box)(
    ({ theme }) => ({
        marginLeft: theme.spacing(2)
    })
);


const CategorizedElements = (props) => {
    const {
        handleCloseMenus,
        selectedCategoryState
    } = props


    //get element to add the element to it
    const {
        template,
        setTemplate,
        handleTemplateChange,
        mode,
        parentElementId
    } = useMyCreateElementContext()


    //selected category
    const [selectedCategoryId] = selectedCategoryState;

    //fetch the data using useEffectFetchData
    const params = useMemo(() => {
        return [null, 
                null, 
                [
                    writeFilterObject("category_id", "many-to-one", "=", "", "", "", "", selectedCategoryId),
                    (mode === "section" || mode === "component") && writeFilterObject("element_type_name", 'string', '!=', "section")
                ], 
                null, 
                null, 
                30]
    }, [selectedCategoryId, mode])

    const {
        data,
        // setData,
        download,
        // setDownload
    } = useEffectFetchData(fetchElementTypesRows, params, selectedCategoryId);


    const handleAddSubElement = (id) => {
        const selectedWillBeAddedElement = data.find(e => e.id === id);
        if(parentElementId && selectedWillBeAddedElement) {
            
            // Clone the selectedElement array to avoid mutating state directly
            const updatedSelectedTemplate = JSON.parse(JSON.stringify(template));

            // Add the new element to the parent element in the selectedElement array
            const parentTemplateFound = addElementToParent([updatedSelectedTemplate], parentElementId, selectedWillBeAddedElement);
            
            // If the parent element is found and updated, set the new state

            if (parentTemplateFound) {
                handleCloseMenus()
                handleTemplateChange(updatedSelectedTemplate)


            } else {
                //TODO: something happen when insert not working
            }
        } else {
            //when there is on selected parent id, the parent will be the selected element
            const transformedTemplateData = transformElementTypeToDesignStructure(selectedWillBeAddedElement, null, mode);
            setTemplate(() => transformedTemplateData)

        }
    }

    return (
        <StyledCategorizedElements>
            {
                !download && data && data.length > 0 ?
                        data.map((element, key) => {
                            return (
                                <StyledElementBox onClick={() => handleAddSubElement(element.id)} key={key}>
                                    <StyledBoxImage>
                                        <StyledImage src={`${config.ServerImageRoute}/${elementTypesImagesFolderName}/${element.element_type_image}`} alt="" />
                                    </StyledBoxImage>
                                    <StyledElementNameBox>
                                        <Typography letterSpacing={2} variant='h7' textAlign={"left"}>{element.element_type_name}</Typography>
                                    </StyledElementNameBox>
                                </StyledElementBox>
                            )
                        })
                    :
                    <>
                        <Skeleton width={"100%"} height={100}></Skeleton>
                        <Skeleton width={"100%"} height={100}></Skeleton>
                        <Skeleton width={"100%"} height={100}></Skeleton>
                    </>
            }
        </StyledCategorizedElements>
    );
};

CategorizedElements.propTypes = {
    parentElementId: propTypes.string,
    handleCloseMenus: propTypes.func,
    selectedCategoryState: propTypes.array,
}

export default CategorizedElements;