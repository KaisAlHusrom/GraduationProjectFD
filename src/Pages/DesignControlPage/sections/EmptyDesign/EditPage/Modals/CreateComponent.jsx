//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components


// propTypes
import propTypes from 'prop-types';


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import EditComponent from '../EditComponent'
import DrawerSelectedCategoryDesigns from '../Drawers/ReadyDesign/DrawerSelectedCategoryDesigns'
import { AdminMainButton, AdminMainButtonOutsideState, CustomDrawer } from '../../../../../../Components'
import ModalDesignCategories from '../../../../components/ModalDesignCategories'
import ElementsTypeModal from './ElementsTypeModal'
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
//Styled Components
const StyledCreateComponent = styled(Box)(
    ({ theme }) => ({
    
    })
)


const ActionButtons = styled(Box)({
    position: 'relative',
    bottom: '0px',
    left: '50px',
    display: 'flex',
    gap :'10px',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity 0.3s ease',
    width :'100px'
});


const EditButtonsStyle = {
    border: '1px solid red',
    fontWeight: 'bold',
    color: 'white.main',
    backgroundColor: 'success.dark',
    transition: 'background-color 0.3s',
    '&:hover': {
        backgroundColor: 'rgb(7, 15, 43)',
    },

}

const CreateComponent = ({
    component , 
    AddElementToComponentId,
    handleAddNewElement,
    elements,
    sectionDataState,
    styleCategories,
    addComponentForComponent,
    // deleteComponentForComponent,
    handleConfirmation,
    appliedFilterForComponent,
    drawerOpenState,
    handleAddNewComponentElement,
}) => {
  
    const [dialogDesignState , setDialogDesignState] = useState(false)
    const [drawerDesignState , setDrawerDesignState] = useState(false);
    const [design , setDesign] = useState(null)    ;        
    const [sectionData, setSectionData] = sectionDataState;


    const deleteComponentForComponent = (section_component_id) => {
        console.log("delete")
        setSectionData((prevData) => {
            const index = prevData.children.findIndex(component => component.id === section_component_id);
    
            if (index !== -1) {
                const updatedComponents = [...prevData.children];
                updatedComponents.splice(index, 1);
    
                // Ensure components are sorted by sequence_number
                const sortedComponents = updatedComponents.sort((a, b) => a.sequence_number - b.sequence_number);
    
                // Update history for undo functionality
                // setHistory(prevHistory => [...prevHistory, prevData]);
    
                return {
                    ...prevData,
                    children: sortedComponents,
                };
            }
            return prevData;
        });
    };

    return (
        <StyledCreateComponent>
            <EditComponent 
                        key={component.id} 
                        component={component} 
                        componentId={AddElementToComponentId}
                        handleAddNewElement={handleAddNewElement} 
                        elements={elements}
                        sectionDataState={sectionDataState}
                        styleCategories={styleCategories}
                        />
                        
                        <ActionButtons className="action-buttons">

                        {sectionData.children.length - 1 && (
                                <AdminMainButton
                                    title="Duplicate"
                                    type="custom"
                                    onClick={() => addComponentForComponent(component.id)}
                                    appearance="iconButton"
                                    putTooltip                                
                                    icon={<AddBoxIcon />}
                                    sx={EditButtonsStyle}
                                />
                            )}  
                            <AdminMainButton
                                title="Delete"
                                type="custom"
                                onClick={()=> deleteComponentForComponent(component.id)}
                                appearance="iconButton"
                                putTooltip
                                icon={<DeleteSweepIcon />}
                                sx={{
                                    border: '1px solid red',
                                    fontWeight: 'bold',
                                    color: 'white.main',
                                    backgroundColor: 'warning.dark',
                                    transition: 'background-color 0.3s',
                                    '&:hover': {
                                        backgroundColor: 'rgb(7, 15, 43)',
                                    },
                                }}
                            />
                            <AdminMainButton
                                title="Delete All Component Elements"
                                type="custom"
                                appearance="iconButton"
                                putTooltip
                                onClick={() => handleConfirmation(component.id)}
                                icon={<DeleteSweepIcon />}
                                sx={{
                                    border: '1px solid red',
                                    fontWeight: 'bold',
                                    color: 'white.main',
                                    backgroundColor: 'warning.dark',
                                    margin: '5px',
                                    transition: 'background-color 0.3s',
                                    '&:hover': {
                                        backgroundColor: 'rgb(7, 15, 43)',
                                    },
                                    display:component.children.length === 0 ? 'none' : 'flex',
                                }}
                            />

                            <AdminMainButton
                                title="Add elements"
                                type="StyleDialog"
                                appearance="iconButton"
                                putTooltip
                                willShow={
                                    <ElementsTypeModal
                                    createDesignedDesign = {() => handleAddNewElement()}
                                    selected_parent_id = {component.id}                                     
                                    />
                                }
                                icon={<AddBoxIcon />}
                                sx={EditButtonsStyle}
                            />
                                <AdminMainButtonOutsideState
                                    customState={[dialogDesignState , setDialogDesignState] }
                                    title="Add Components"
                                    type="StyleDialog"
                                    appearance="iconButton"
                                    putTooltip
                                    icon={<AddBoxIcon />}
                                    willShow={
                                        <ModalDesignCategories  
                                        customState = {[dialogDesignState , setDialogDesignState] }
                                        drawerStates = {[drawerDesignState , setDrawerDesignState]}
                                        designState={[design , setDesign]}
                                        appliedFilter = {appliedFilterForComponent}
                                        NameOfCategories = {'Component Designs'}
                                        ></ModalDesignCategories>
                                        }
                                    sx={{...EditButtonsStyle , backgroundColor : 'warning.main'}}

                                />
                                <CustomDrawer
                                        drawerOpenState={[drawerDesignState , setDrawerDesignState]}
                                        title={"Component Designs"}
                                        drawerStyle={{
                                        paddingTop : '80px'
                                        }}
                                        putDrawerCloseButton={true}
                                        anchor={"left"}
                                >
                            <DrawerSelectedCategoryDesigns
                                    isCompoenntInside = {true}
                                    design_category_id={design?.id}
                                    createDesignedDesign={handleAddNewComponentElement}
                                    appliedFilterType={design?.design_type}
                                    selected_parent_id={component.id}  
                                    
                                    />
                                            
                        </CustomDrawer>

                        </ActionButtons>

        </StyledCreateComponent>
    );
};
CreateComponent.propTypes = {
    component: propTypes.object,
    deleteComponentForComponent: propTypes.func
 
};
export default CreateComponent;