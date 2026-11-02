//React
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { handleCloseLinearProgress, handleOpenLinearProgress } from '../../../../Redux/Slices/DownloadPageSlice'
//Components


//MUI
import {
    Box, Button, Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { GenerateTag } from '../../../../Helpers/GenerateTag'
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate'
import { AdminMainButton, AdminMainButtonOutsideState } from '../../../../Components'
import { fetchElementTypesRows } from '../../../../Services/AdminServices/Services/elementsTypesService'
import { writeFilterObject } from '../../../../Helpers/filterData'

//icons
import UndoIcon from '@mui/icons-material/Undo';
import PreviousTemplates from '../PreviousComponentsTemplates/PreviousTemplates'
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';
import CropSquareOutlinedIcon from '@mui/icons-material/CropSquareOutlined';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import ElementsCategories from '../ElementsCategories/ElementsCategories'
import WebOutlinedIcon from '@mui/icons-material/WebOutlined';
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


const TemplateDevView = () => {


    const {template, elementsStyle, mode, setMode} = useMyCreateElementContext()
    console.log(template)
    const [editableElement, setEditableElement] = useState(null)
    
    useEffect(() => {
        if(mode !== "page") {
            setEditableElement(() => template ? <GenerateTag key={template.id} selectedTemplate={template} /> : null)
        } else {
            //
        }
    }, [elementsStyle, mode, template])


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
                    <StyledModBox onClick={() => setMode(() => "page")}>
                        <WebOutlinedIcon fontSize={"large"} color='primary' />
                        <Typography variant='h7' fontSize={20} textTransform={"capitalize"} letterSpacing={2}>
                            Page
                        </Typography>
                    </StyledModBox>
                </Box>
                : 
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',   
                }}>
                    <ModeOptions />
                    
                </Box>
                
            }
        </StyledTemplateDevView>
    );
};

TemplateDevView.propTypes = {
    selectedElementState: propTypes.object
}

export default TemplateDevView;




// -------------- PREV BUTTON ---------------
const StyledPrevButton = styled(Button)(
    () => ({
        position: "absolute",
        top: 0,
        left: 0,
        borderRadius: "12px 0 8px 0"
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

const ModeOptions = () => {
    const {selectedElement, setSelectedElement} = useMyCreateElementContext()
    const [previousTemplatesDrawerOpen, setPreviousTemplatesDrawerOpen] = useState(false)
    const {mode} = useMyCreateElementContext()

    const dispatch = useDispatch()
    const openLinearProgress = useSelector(state => state.downloadPageSlice.openLinearProgress)

    const handleOpenBlank = useCallback(async () => {
        if(mode !== 'element' && mode !== 'page') {
            if(!selectedElement){
                dispatch(handleOpenLinearProgress())
            }
            
            const emptyComponent = await fetchElementTypesRows(
                null,
                null,
                [writeFilterObject('element_type_name', 'string', '=', mode)]
            )
    
    
            setSelectedElement(() => emptyComponent.rows[0])
        } 

        //when open new blank page
        if(mode === 'page') {
            setSelectedElement(() => 'blank page')
        }
    }, [dispatch, mode, selectedElement, setSelectedElement])

    useEffect(() => {
        if(openLinearProgress) {
            if(selectedElement) {
                dispatch(handleCloseLinearProgress())
            }
        }
    }, [dispatch, openLinearProgress, selectedElement])

    const [elementOpenDrawer, setElementOpenDrawer] = useState(false)
    const closeMenus = useCallback(() => {
        setElementOpenDrawer(false)
    }, [])

    //styles
    const buttonStyles = useMemo(() => {
        return {
            marginRight: 2,
            fontWeight: 'bold',
            fontSize: "16px",
            textTransform: "capitalize",
            borderRadius: theme => theme.spacing(1),
            padding: theme => `${theme.spacing(4)} ${theme.spacing(2)}`,
        }
    }, [])

    return (
            <Box>
                <AdminMainButtonOutsideState
                    appearance='primary'
                    putBorder
                    type='drawer'
                    willShow={<PreviousTemplates drawerState={[previousTemplatesDrawerOpen, setPreviousTemplatesDrawerOpen]} />}
                    title='Select From Previous Templates'
                    drawerAnchor={'right'}
                    customState={[previousTemplatesDrawerOpen, setPreviousTemplatesDrawerOpen]}
                    sx={buttonStyles}
                    icon={<PhotoLibraryOutlinedIcon />}
                />
                {
                    mode !== "element"
                    ?
                    <AdminMainButton
                        appearance='primary'
                        putBorder
                        type='custom'
                        onClick={handleOpenBlank}
                        title={'New Blank ' + mode}
                        sx={buttonStyles}
                        icon={<CheckBoxOutlineBlankOutlinedIcon />}    
                    />
                    :
                    <AdminMainButtonOutsideState
                        appearance='primary'
                        putBorder
                        type='drawer'
                        customState={[elementOpenDrawer, setElementOpenDrawer]}
                        title={'New Blank ' + mode}
                        drawerHeaderContent={"Element Categories"}
                        withoutDrawerHeader
                        sx={buttonStyles}
                        icon={<CheckBoxOutlineBlankOutlinedIcon />}
                        willShow={
                            <ElementsCategories 
                                handleCloseMenus={closeMenus}
                                drawerOpen={elementOpenDrawer}
                            />
                        }    
                    />
                }
            </Box>
    )
}