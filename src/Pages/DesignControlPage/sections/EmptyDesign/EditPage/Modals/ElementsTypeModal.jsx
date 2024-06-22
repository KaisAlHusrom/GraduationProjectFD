//React
import { useMemo, useState } from 'react'

import {
    
} from 'react-redux'
import PropTypes from 'prop-types';
//Components
import {  AdminMainButtonOutsideState, CustomDrawer } from '../../../../../../Components'


//MUI
import {
    Box,
    Typography
} from '@mui/material'
import { styled } from '@mui/system'
import AddCardIcon from '@mui/icons-material/AddCard';
import { writeFilterObject } from '../../../../../../Helpers/filterData'
import ModalDesignCategories from '../../../../components/ModalDesignCategories';
import { ButtonStyle, ModalTitleStyle } from '../../StylesFunctions/SetStylesFunctions';
import DrawerSelectedCategoryDesigns from '../Drawers/ReadyDesign/DrawerSelectedCategoryDesigns';

//Styled Components
const StyledElementsTypeModal = styled(Box)(
    () => ({
        display : 'flex', 
        flexWrap : 'wrap',
        justifyContent : 'center',
        alignItems : 'center',
        gap : 20,
        width : '100%',
        height : '100%',
        textAlign : 'center', 
    })
)




const ElementsTypeModal = ({
    createDesignedDesign, selected_parent_id
}) => {

    const appliedFilterForDesignCategory = useMemo(() => {
        return [
            writeFilterObject('design_type', 'string', '=', 'element'), 
        ];
    }, []);

        // for element 
        const [dialogDesignElementState , setDialogDesignElementState] = useState(false)
        const [drawerDesignElementState , setDrawerDesignElementState] = useState(false);
        const [design , setDesign] = useState(null)


        const [dialogDesignElementTemplateState , setDialogDesignElementTemplateState] = useState(false)


    return (
        <StyledElementsTypeModal>
              <Typography color = "text.default" sx = {ModalTitleStyle}>
                    Element Designs
            </Typography>
                <AdminMainButtonOutsideState
                            customState={[dialogDesignElementTemplateState , setDialogDesignElementTemplateState]}
                            title="Template"
                            type="drawer"
                            appearance="primary"
                            putTooltip
                            drawerZIndex={10000}
                            drawerStyle={{
                                width: '500px',
                            }}
                            icon={<AddCardIcon />}
                            willShow={
                                <ModalDesignCategories  
                                customState = {[dialogDesignElementTemplateState, setDialogDesignElementTemplateState]}
                                drawerStates = {[drawerDesignElementState , setDrawerDesignElementState]}
                                designState={[design, setDesign]}

                                createDesignedDesign = {createDesignedDesign}
                                appliedFilter = {appliedFilterForDesignCategory}
                                selected_parent_id = {selected_parent_id} 
                                NameOfCategories = {"Template"}
                                ></ModalDesignCategories>
                            }
                            sx={{...ButtonStyle ,width: '320px' , height : '50px' }} 
                            />  

                        <AdminMainButtonOutsideState
                            customState={[dialogDesignElementState , setDialogDesignElementState]}
                            title="Empty"
                            type="drawer"
                            appearance="primary"
                            putTooltip
                            drawerZIndex={10000}
                            drawerStyle={{
                                width: '500px',
                            }}
                            willShow={
                                <ModalDesignCategories  
                                customState = {[dialogDesignElementState, setDialogDesignElementState]}
                                drawerStates = {[drawerDesignElementState , setDrawerDesignElementState]}
                                designState={[design, setDesign]}
                                createDesignedDesign = {createDesignedDesign}
                                appliedFilter = {null}
                                selected_parent_id = {selected_parent_id} 
                                NameOfCategories = {"Empty"}
                                ></ModalDesignCategories>
                            }
                            icon={<AddCardIcon />}
                            sx={{...ButtonStyle ,width: '320px' , height : '50px' }} 
                        />

                        <CustomDrawer
                                drawerOpenState={[drawerDesignElementState , setDrawerDesignElementState]}
                                title={"Element Designs"}
                                drawerStyle={{
                                }}
                                putDrawerCloseButton={true}
                                anchor={"left"}
                                drawerZIndex = {10000}
                        >
                        <DrawerSelectedCategoryDesigns
                            design_category_id={design?.id}
                            createDesignedDesign={createDesignedDesign}
                            appliedFilterType={design?.id}
                            selected_parent_id={selected_parent_id}  
                            
                            />
                                            
                </CustomDrawer>

        </StyledElementsTypeModal>
    );
};
ElementsTypeModal.propTypes = {
    createDesignedDesign: PropTypes.func.isRequired,
    selected_parent_id: PropTypes.string.isRequired,
};
export default ElementsTypeModal;