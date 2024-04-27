//React
import { useCallback, useEffect, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box, Button, Card, Chip, Typography,
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

//Styled Components
const StyledTemplateDevView = styled(Box)(
    ({ theme }) => ({
        width: "100%",
        minHeight: "250px",
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

const StyledViewElements = styled(Card)(
    ({ theme }) => ({
        position: "absolute",
        left: "0",
        top: "0",
        padding: theme.spacing(),
        borderRight: "1px solid",
        borderColor: theme.palette.divider,
        height: "100%",
        overflow: 'auto',
        width: "25%"
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


    const {selectedElement, elementsStyle, mode, setMode} = useMyCreateElementContext()

    const [editableElement, setEditableElement] = useState(null)
    useEffect(() => {
        setEditableElement(() => selectedElement ? <GenerateTag elementStyle={elementsStyle} key={selectedElement.id} selectedElement={selectedElement} /> : null)
    }, [elementsStyle, selectedElement])

    // console.log(editableElement)
    return (
        <StyledTemplateDevView>
            {
                mode !== null &&
                <PreviousButton />
            }
            {
                editableElement ?
                <>
                    <StyledViewElements>
                        <Typography width={150} variant='body2' color="warning.main">select element</Typography>
                        <ViewElements selectedElement={selectedElement} />
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
                    Choose an Mode
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
    const {selectedElement, setSelectedElement} = useMyCreateElementContext()

    const handleOpenBlankComponent = useCallback(() => {
        const emptyComponent = {
            "id": "81e40cfe-d1ec-49db-8595-952909d2351c",
            "element_type_name": "Component",
            "element_type_description": "Defines a section in any place of the document",
            "is_child": false,
            "parent_id": null,
            "deleted_at": null,
            "created_at": "2024-03-31T23:25:02.000000Z",
            "updated_at": "2024-03-31T23:25:02.000000Z",
            "sequence_number": 1,
            "not_has_end_tag": false,
            "children": [],
            "element_props": [],
            "parent": null
        }

        setSelectedElement(() => emptyComponent)
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
                    willShow={<PreviousComponentsTemplates />}
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