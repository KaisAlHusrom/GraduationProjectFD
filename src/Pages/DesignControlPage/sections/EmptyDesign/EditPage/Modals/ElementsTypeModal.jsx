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
} from '@mui/material'
import { styled } from '@mui/system'
import AddCardIcon from '@mui/icons-material/AddCard';
import { writeFilterObject } from '../../../../../../Helpers/filterData'
import ModalDesignCategories from '../../../../components/ModalDesignCategories';

//Styled Components
const StyledElementsTypeModal = styled(Box)(
    () => ({
        display : 'flex', 
        flexWrap : 'wrap',
        justifyContent : 'center',
        alignItems : 'center',
        gap : 20,
        width : '100%',
        height : '100%'
    })
)


const ButtonStyle = {
    margin: "10px",
    display: 'block',
    width: '250px',
    padding: '10px',
    transition: 'all 0.5s ease',
    borderRadius: '10px',
    fontWeight: 'bold',
    color: "#eee",
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: "white.dark",
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
    },
    boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
}

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
                            sx={ButtonStyle}
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
                            sx={ButtonStyle}
                        />
        </StyledElementsTypeModal>
    );
};
ElementsTypeModal.propTypes = {
    createDesignedDesign: PropTypes.func.isRequired,
    selected_parent_id: PropTypes.string.isRequired,
};
export default ElementsTypeModal;