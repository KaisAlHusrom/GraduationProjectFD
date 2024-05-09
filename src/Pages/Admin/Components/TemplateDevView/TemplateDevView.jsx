//React
import { useCallback, useEffect, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box, Button, Chip, Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { GenerateTag } from '../../../../Helpers/GenerateTag'
import ViewElements from '../ViewElements/ViewElements'
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate'
import { AdminMainButton, CustomLazyAutoComplete } from '../../../../Components'
import { fetchElementTypesRows } from '../../../../Services/elementsTypesService'
import { writeFilterObject } from '../../../../Helpers/filterData'

//icons
import UndoIcon from '@mui/icons-material/Undo';
import PreviousComponentsTemplates from '../PreviousComponentsTemplates/PreviousComponentsTemplates'
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import MediationOutlinedIcon from '@mui/icons-material/MediationOutlined';
import TemplateElementStyleSettings from '../TemplateElementStyleSettings/TemplateElementStyleSettings'
import FormatColorFillOutlinedIcon from '@mui/icons-material/FormatColorFillOutlined';

//Styled Components
const StyledTemplateDevView = styled(Box)(
    ({ theme }) => ({
        width: "90%",
        minHeight: "calc(100vh - 200px)",
        border: "1px solid",
        borderColor: theme.palette.divider,
        borderRadius: theme.spacing(2),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "sticky", // Change position to sticky
        top: "-50px", // Stick to the top of the container
        zIndex: "999", // Set z-index to ensure it's above other content
        backgroundColor: theme.palette.background.paper,
        
    })
)

const StyledViewElements = styled(Box)(
    ({ theme }) => ({
        position: "absolute",
        left: theme.spacing(3),
        top: theme.spacing(),
        display: "flex",
        gap: theme.spacing()
    })
);

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
        setEditableElement(() => template ? <GenerateTag elementStyle={elementsStyle} key={template.id} selectedTemplate={template} /> : null)
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
                    <StyledViewElements>
                        {/* <Typography width={150} variant='body2' color="warning.main">Design Structure</Typography> */}
                        
                        <AdminMainButton 
                            title='Design Structure'
                            appearance='iconButton'
                            type='drawer'
                            putBorder
                            icon={<MediationOutlinedIcon />}
                            willShow={<ViewElements />}
                            drawerVariant="persistent"
                            putDrawerCloseButton
                            drawerResizable={true}
                        />
                        <AdminMainButton 
                            title='Style Settings'
                            appearance='iconButton'
                            type='drawer'
                            putBorder
                            icon={<FormatColorFillOutlinedIcon />}
                            drawerAnchor={'right'}
                            willShow={<TemplateElementStyleSettings />}
                            drawerVariant="persistent"
                            putDrawerCloseButton
                            drawerResizable={true}
                        />
                    </StyledViewElements>
                    {editableElement}
                </>
                :
                mode === null
                ?
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',   
                }}>
                    <Typography mb={1} variant='h4' color="warning.main">
                    Select Mode
                    </Typography>
                    <Box>
                        <StyledChip onClick={() => setMode(() => "element")}  label="Element" variant='outlined' />
                        <StyledChip onClick={() => setMode(() => "component")}  label="Component" variant='outlined' />
                        <StyledChip onClick={() => setMode(() => "section")}  label="Section" variant='outlined' />
                    </Box>
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
    const {setSelectedElement} = useMyCreateElementContext()

    const handleOpenBlankComponent = useCallback(async () => {
        const emptyComponent = await fetchElementTypesRows(
            null,
            null,
            [writeFilterObject('element_type_name', 'string', '=', 'component')]
        )


        setSelectedElement(() => emptyComponent.rows[0])
    }, [setSelectedElement])


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


// the options that will appear when user select component mode
const SectionModeOptions = () => {
    return (
        <>
            <Typography mb={1} variant='h4' color="warning.main">
                Choose first element to add to the component
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