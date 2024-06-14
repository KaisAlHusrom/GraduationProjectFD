//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'
import PropTypes from 'prop-types';
//Components
import { AdminMainButton } from '../../../../../../Components'


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



    return (
        <StyledElementsTypeModal>
              <Typography color = "text.default" sx = {ModalTitleStyle}>
                    Element Designs
            </Typography>
                <AdminMainButton
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
                                createDesignedDesign = {createDesignedDesign}
                                appliedFilter = {appliedFilterForDesignCategory}
                                selected_parent_id = {selected_parent_id} 
                                NameOfCategories = {"Template"}
                                ></ModalDesignCategories>
                            }
                            sx={{...ButtonStyle ,width: '320px' , height : '50px' }} 
                            />
                        <AdminMainButton
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
                                createDesignedDesign = {createDesignedDesign}
                                appliedFilter = {null}
                                selected_parent_id = {selected_parent_id} 
                                NameOfCategories = {"Empty"}
                                ></ModalDesignCategories>
                            }
                            icon={<AddCardIcon />}
                            sx={{...ButtonStyle ,width: '320px' , height : '50px' }} 
                        />
        </StyledElementsTypeModal>
    );
};
ElementsTypeModal.propTypes = {
    createDesignedDesign: PropTypes.func.isRequired,
    selected_parent_id: PropTypes.string.isRequired,
};
export default ElementsTypeModal;