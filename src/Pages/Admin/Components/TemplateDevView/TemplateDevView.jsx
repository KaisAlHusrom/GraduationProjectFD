//React
import { useCallback, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { handleCloseLinearProgress, handleOpenLinearProgress } from '../../../../Redux/Slices/DownloadPageSlice'
//Components


//MUI
import {
    Box, Button, Chip, Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { GenerateTag } from '../../../../Helpers/GenerateTag'
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate'
import { AdminMainButton, CustomLazyAutoComplete } from '../../../../Components'
import { fetchElementTypesRows } from '../../../../Services/elementsTypesService'
import { writeFilterObject } from '../../../../Helpers/filterData'

//icons
import UndoIcon from '@mui/icons-material/Undo';
import PreviousComponentsTemplates from '../PreviousComponentsTemplates/PreviousComponentsTemplates'
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';
import CropSquareOutlinedIcon from '@mui/icons-material/CropSquareOutlined';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
//Styled Components
const StyledTemplateDevView = styled(Box)(
    ({ theme }) => ({
        width: "90%",
        minHeight: "calc(100vh - 200px)",
        border: "4px solid",
        borderColor: theme.palette.divider,
        borderRadius: theme.spacing(2),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "999", // Set z-index to ensure it's above other content
        backgroundColor: theme.palette.background.paper,
        height: "100%",
        position: "relative"
    })
)

const StyledModBox = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
        cursor: "pointer",
        border: "1px solid",
        borderColor: theme.palette.divider,
        borderRadius: theme.spacing(2),
        transition: theme.transitions.create("background-color", {
            duration: theme.transitions.duration.standard,
        }),
        "&:hover" : {
            backgroundColor: theme.palette.action.hover,
        }
    })
);

// const StyledViewElements = styled(Box)(
//     ({ theme }) => ({
//         position: "absolute",
//         left: theme.spacing(3),
//         top: theme.spacing(),
//         display: "flex",
//         gap: theme.spacing()
//     })
// );

const StyledChip = styled(Chip)(
    ({ theme }) => ({
        cursor: 'pointer',
        marginRight: theme.spacing(),
        fontSize: theme.spacing(2),
        // "&:hover": {
        //     backgroundColor: theme.palette.primary.main,
        // }
    })
);

const TemplateDevView = () => {


    const {template, elementsStyle, mode, setMode} = useMyCreateElementContext()

    const [editableElement, setEditableElement] = useState(null)
    useEffect(() => {
        setEditableElement(() => template ? <GenerateTag key={template.id} selectedTemplate={template} /> : null)
    }, [elementsStyle, template])


    return (
        <StyledTemplateDevView>
            {
                (mode !== null && editableElement === null) &&
                <PreviousButton />
            }
            {
                editableElement ?
                <>
                    {editableElement}
                </>
                :
                mode === null
                ?
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                }}>
                    <StyledModBox onClick={() => setMode(() => "element")}>
                        <IntegrationInstructionsOutlinedIcon fontSize={"large"} color='primary' />
                        <Typography variant='h7' fontSize={20} textTransform={"capitalize"} letterSpacing={2}>
                            Element
                        </Typography>
                    </StyledModBox>
                    <StyledModBox onClick={() => setMode(() => "component")}>
                        <CropSquareOutlinedIcon fontSize={"large"} color='primary' />
                        <Typography variant='h7' fontSize={20} textTransform={"capitalize"} letterSpacing={2}>
                            Component
                        </Typography>
                    </StyledModBox>
                    <StyledModBox onClick={() => setMode(() => "section")}>
                        <TableRowsOutlinedIcon fontSize={"large"} color='primary' />
                        <Typography variant='h7' fontSize={20} textTransform={"capitalize"} letterSpacing={2}>
                            Section
                        </Typography>
                    </StyledModBox>
                </Box>
                : 
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',   
                }}>
                    {
                        //when user select element mode
                        mode === 'element'
                        ?
                            <ElementModeOptions />
                        : 
                        // When the user select component mode
                        mode === "component"
                        ?
                            <ComponentModeOptions />
                        :
                            // when user select section mode
                            <SectionModeOptions />
                    }
                    
                </Box>
                
            }
        </StyledTemplateDevView>
    );
};

TemplateDevView.propTypes = {
    selectedElementState: propTypes.object
}

export default TemplateDevView;


// to select the element that user want to edit on it
const ElementModeOptions = () => {
    const {selectedElement, setSelectedElement} = useMyCreateElementContext()

    return (
        <>
        <Typography mb={1} variant='h4' color="warning.main">
            Choose an element type to begin editing
        </Typography>
        <Box>
            <CustomLazyAutoComplete
                optionId='id'
                optionName='element_type_name'
                label='Element Types'
                handleFetchData={fetchElementTypesRows}
                valueState={[selectedElement, setSelectedElement]}
                filters={[writeFilterObject("is_child", "bool", "=", "false")]} // to get wanted data,
                sx={{
                    width: "300px"
                }}
            />
        </Box>
        </>
    )
}


// the options that will appear when user select component mode
const ComponentModeOptions = () => {
    const {selectedElement, setSelectedElement} = useMyCreateElementContext()
    const dispatch = useDispatch()
    const openLinearProgress = useSelector(state => state.downloadPageSlice.openLinearProgress)

    const handleOpenBlankComponent = useCallback(async () => {
        if(!selectedElement){
            dispatch(handleOpenLinearProgress())
        }
        
        const emptyComponent = await fetchElementTypesRows(
            null,
            null,
            [writeFilterObject('element_type_name', 'string', '=', 'component')]
        )


        setSelectedElement(() => emptyComponent.rows[0])
    }, [dispatch, selectedElement, setSelectedElement])

    useEffect(() => {
        if(openLinearProgress) {
            if(selectedElement) {
                dispatch(handleCloseLinearProgress())
            }
        }
    }, [dispatch, openLinearProgress, selectedElement])


    return (
            <Box>
                <AdminMainButton
                    appearance='primary'
                    putBorder
                    type='drawer'
                    willShow={<PreviousComponentsTemplates />}
                    title='Select From Previous Templates'
                    drawerAnchor={'right'}
                    sx={{
                        marginRight: 2,
                        fontWeight: 'normal',
                        textTransform: "capitalize",
                    }}
                    icon={<PhotoLibraryOutlinedIcon />}
                />
                <AdminMainButton
                    appearance='primary'
                    putBorder
                    type='custom'
                    onClick={handleOpenBlankComponent}
                    title='New Blank Component'
                    sx={{
                        fontWeight: 'normal',
                        textTransform: "capitalize",
                    }}
                    icon={<CheckBoxOutlineBlankOutlinedIcon />}
                    
                />
            </Box>
    )
}


// the options that will appear when user select section mode
const SectionModeOptions = () => {
    return (
        <>
            <Typography mb={1} variant='h4' color="warning.main">
                Choose first element to add to the section
            </Typography>
            <Box>
                {/* <CustomLazyAutoComplete
                    optionId='id'
                    optionName='element_type_name'
                    label='Element Types'
                    handleFetchData={fetchElementTypesRows}
                    valueState={[selectedElement, setSelectedElement]}
                    filters={[writeFilterObject("is_child", "bool", "=", "false")]} // to get wanted data,
                    sx={{
                        width: "300px"
                    }}
                /> */}
            </Box>
        </>
    )
}


// -------------- PREV BUTTON ---------------
const StyledPrevButton = styled(Button)(
    () => ({
        position: "absolute",
        top: 0,
        left: 0,
        borderRadius: "0 0 8px 0"
    })
);
const PreviousButton = () => {
    const {mode, setMode} = useMyCreateElementContext()
    const handleClick = () => {
        if(mode) {
            setMode(null)
        }
    }
    return (
        <StyledPrevButton onClick={handleClick} variant="outlined" startIcon={<UndoIcon />}>
            Previous
        </StyledPrevButton>
    )
}