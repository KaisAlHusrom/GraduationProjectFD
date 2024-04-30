//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    MenuItem,
    MenuList,
    Paper,
} from '@mui/material'

//icons
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

//propTypes 
import propTypes from 'prop-types'
import { AdminMainButton, CustomLazyAutoComplete } from '../../../../Components';
import { fetchElementTypesRows } from '../../../../Services/elementsTypesService';
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate';
import { addElementToParent } from '../../../../Helpers/RecursiveHelpers/addNewElementToSpecificElement';


//Styled Components


const AddSubElementMenu = (props) => {
    const {
        parentElementId,
        handleCloseMenus
    } = props
    
    const {selectedElement, setSelectedElement} = useMyCreateElementContext()

    const [selectedWillBeAddedElement, setSelectWillBeAddedElement] = useState(null)

    const handleAddSubElement = () => {
        if(parentElementId && selectedWillBeAddedElement) {
            // Clone the selectedElement array to avoid mutating state directly
            const updatedSelectedElement = JSON.parse(JSON.stringify(selectedElement));

            // Add the new element to the parent element in the selectedElement array
            const parentElementFound = addElementToParent([updatedSelectedElement], parentElementId, selectedWillBeAddedElement);
            
            // If the parent element is found and updated, set the new state

            if (parentElementFound) {
                handleCloseMenus()

                setSelectedElement(updatedSelectedElement);
            }
        }
    }
    console.log(selectedElement);


    return (
        <Paper sx={{ width: 320, maxWidth: '100%', overflow: 'visible' }}>
            <MenuList>
                <MenuItem>
                    <CustomLazyAutoComplete
                        optionId='id'
                        optionName='element_type_name'
                        label='Element Types'
                        handleFetchData={fetchElementTypesRows}
                        valueState={[selectedWillBeAddedElement, setSelectWillBeAddedElement]}
                    />
                    <AdminMainButton 
                        appearance='iconButton'
                        type='custom'
                        icon={<AddOutlinedIcon />}
                        title='add new element'
                        sx={{
                            marginLeft: 2
                        }}
                        onClick={handleAddSubElement}
                    />
                </MenuItem>
            </MenuList>
        </Paper>
    );
};

AddSubElementMenu.propTypes = {
    parentElementId: propTypes.string,
    handleCloseMenus: propTypes.func,
}

export default AddSubElementMenu;