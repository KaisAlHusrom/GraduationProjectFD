//React
import { useState } from 'react'

import {
    
} from 'react-redux'

import _ from 'lodash';

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MediationOutlinedIcon from '@mui/icons-material/MediationOutlined';
import TemplateElementStyleSettings from '../TemplateElementStyleSettings/TemplateElementStyleSettings'
import FormatColorFillOutlinedIcon from '@mui/icons-material/FormatColorFillOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
//propTypes 
import propTypes from 'prop-types'
import { AdminMainButton, AdminMainButtonOutsideState } from '../../../../Components'
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate';
import { useNavigate } from 'react-router-dom';
import ViewElements from '../ViewElements/ViewElements';
import AddDesignModal from '../AddDesignModal/AddDesignModal';

import { cleanDesignData } from '../../../../Helpers/RecursiveHelpers/addNewElementToSpecificElement';
import ViewPageElements from '../ViewPageElements/ViewPageElements';

//Styled Components
const StyledDesignOptions = styled(Box)(
    ({ theme }) => ({
        width: "90%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `${0} ${theme.spacing(2)}`,
    })
)

const StyledSubOptions = styled(Box)(
    ({ theme }) => ({
        // width: "50%",
        display: "flex",
        alignItems: "center",
        gap: theme.spacing()
    })
);

const StyledControlOptions = styled(Box)(
    ({ theme }) => ({
        // width: "50%",
        display: "flex",
        alignItems: "center",
        gap: theme.spacing()
    })
);

const StyledSaveOptions = styled(Box)(
    ({ theme }) => ({
        // width: "50%",
        display: "flex",
        alignItems: "center",
        gap: theme.spacing()
    })
);


const DesignOptions = (props) => {
    const {
        handleRedo,
        handleUndo,
        history,
        redoHistory,
        handleNewBlank,
        saveTemplate,
        updateDataAdminTemplate
    } = props;

    const {
        elementStructureDrawer, setElementStructureDrawer,
        styleOptionsDrawer, setStyleOptionsDrawer
    } = useMyCreateElementContext()

    const navigate = useNavigate()
    //handle go dashboard
    const handleGoAdminDashboard =() => {
        navigate('/admin-dashboard')
    }


    const {
        mode,
        template
    } = useMyCreateElementContext()

    const handleCustomUndo = () => {
        handleUndo()
    }

    const handleCustomRedo = () => {
        handleRedo()
    }

    const handleCreateNew = () => {
        handleNewBlank()
    }

    const [modalOpen, setModalOpen] = useState(false)

    //save new template
    const handleSaveTemplate = (inputValues) => {
        let updatedTemplate = _.cloneDeep(template);
        updatedTemplate["is_template"] = 1,
        updatedTemplate["design_type"] = mode,
        updatedTemplate["design_title"] = inputValues["design_title"],
        updatedTemplate["category_id"] = inputValues["category_id"],
        updatedTemplate["design_description"] = inputValues["design_description"],
        updatedTemplate["design_image"] = inputValues["design_image"],

        cleanDesignData(updatedTemplate)
        console.log(updatedTemplate)
        saveTemplate(updatedTemplate)
    }

    //update existing template
    const handleupdateDataAdminTemplate = (inputValues) => {
        let updatedTemplate = _.cloneDeep(template);
        updatedTemplate["is_template"] = 1,
        updatedTemplate["design_type"] = mode,
        updatedTemplate["design_title"] = inputValues["design_title"],
        updatedTemplate["category_id"] = inputValues["category_id"],
        updatedTemplate["design_description"] = inputValues["design_description"],
        updatedTemplate["design_image"] = inputValues["design_image"],
        cleanDesignData(updatedTemplate)
        updateDataAdminTemplate(updatedTemplate)
    }


    return (
        <StyledDesignOptions>
            <StyledSubOptions>
                <AdminMainButton 
                    title='Dashboard'
                    type='custom'
                    appearance='primary'
                    putBorder
                    icon={<DashboardIcon />}
                    putTooltip
                    toolTipPosition={"top"}
                    onClick={handleGoAdminDashboard}
                />
                {
                    // mode &&
                    <AdminMainButton 
                        title={`Blank ${mode}`}
                        type='custom'
                        appearance='primary'
                        putBorder
                        icon={<AddBoxOutlinedIcon />}
                        putTooltip
                        toolTipPosition={"top"}
                        onClick={handleCreateNew}
                        disabled={template === null}
                    />
                }
                <AdminMainButton 
                    title='Undo (Ctrl + Z)'
                    type='custom'
                    appearance='iconButton'
                    putBorder
                    icon={<UndoIcon />}
                    putTooltip
                    toolTipPosition={"top"}
                    onClick={handleCustomUndo}
                    disabled={template === null || history.length === 0}
                />
                <AdminMainButton 
                    title='Redo (Ctrl + Y)'
                    type='custom'
                    appearance='iconButton'
                    putBorder
                    icon={<RedoIcon />}
                    putTooltip
                    toolTipPosition={"top"}
                    onClick={handleCustomRedo}
                    disabled={template === null || redoHistory.length === 0}
                />
                
                
            </StyledSubOptions>
            <StyledControlOptions>
                {/* elements */}
                <AdminMainButtonOutsideState 
                    title='Open Design Structure (ALT + E)'
                    appearance='iconButton'
                    type='drawer'
                    putBorder
                    icon={<MediationOutlinedIcon />}
                    willShow={mode === "page" ? <ViewPageElements /> :<ViewElements />}
                    drawerVariant="persistent"
                    putDrawerCloseButton
                    // drawerResizable={true}
                    drawerHeaderStyle={{
                        textTransform: "capitalize",
                        letterSpacing: 2,
                    }}
                    customState={[elementStructureDrawer, setElementStructureDrawer]}
                    putTooltip
                    toolTipPosition={"top"}
                    disabled={template === null}
                    drawerHeaderContent={"Design Structure"}
                />
                {/* styles */}
                <AdminMainButtonOutsideState 
                    title='Open Style Settings (ALT + S)'
                    appearance='iconButton'
                    type='drawer'
                    putBorder
                    icon={<FormatColorFillOutlinedIcon />}
                    drawerAnchor={'right'}
                    willShow={<TemplateElementStyleSettings />}
                    drawerVariant="persistent"
                    putDrawerCloseButton
                    drawerResizable={true}
                    withoutDrawerHeader
                    customState={[styleOptionsDrawer, setStyleOptionsDrawer]}
                    putTooltip
                    toolTipPosition={"top"}
                    disabled={template   === null}
                    
                />
                
            </StyledControlOptions>
            <StyledSaveOptions>
                <AdminMainButtonOutsideState 
                    title='Save Design'
                    type='modal'
                    appearance='primary'
                    customState={[modalOpen, setModalOpen]}
                    willShow={
                        <AddDesignModal
                        handleAddData={handleSaveTemplate}
                        handleUpdateData={handleupdateDataAdminTemplate}
                        setModalOpen={setModalOpen}
                        />
                    }
                    filled
                    putBorder
                    icon={<FileUploadOutlinedIcon />}
                    modalIcon={<FileUploadOutlinedIcon />}
                    putTooltip
                    toolTipPosition={"top"}
                    disabled={template === null}
                />
            </StyledSaveOptions>
        </StyledDesignOptions>
    );
};

DesignOptions.propTypes = {
    handleRedo: propTypes.func,
    handleUndo: propTypes.func,
    handleNewBlank: propTypes.func,
    saveTemplate: propTypes.func,
    updateDataAdminTemplate: propTypes.func,
    history: propTypes.array,
    redoHistory: propTypes.array,
}

export default DesignOptions;