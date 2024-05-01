//React
import { useEffect, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    MenuItem,
    MenuList,
    Paper,
    TextField,
} from '@mui/material'
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';

//propTypes 
import propTypes from 'prop-types'
import { AdminMainButton } from '../../../../Components';
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate';
import { changeElementContentByParentId, currentElementContent } from '../../../../Helpers/RecursiveHelpers/changeElementContent';


const ChangeElementContent = ({parentElementId, handleCloseMenus}) => {

    const {template, setTemplate} = useMyCreateElementContext()

    const [content, setContent] = useState("")
    useEffect(() => {
        const updatedSelectedTemplate = JSON.parse(JSON.stringify(template));
        const content = currentElementContent([updatedSelectedTemplate], parentElementId)

        if(content) {
            setContent(() => content)
        } else {
            //TODO: handle not found 
            
        }
    }, [parentElementId, template])

    const handleChangeElementContent = () => {
        if(parentElementId && content) {
            // Clone the selectedElement array to avoid mutating state directly
            const updatedSelectedTemplate = JSON.parse(JSON.stringify(template));

            // Add the new element to the parent element in the selectedElement array
            const parentTemplateFound = changeElementContentByParentId([updatedSelectedTemplate], parentElementId, content);
            
            // If the parent element is found and updated, set the new state

            if (parentTemplateFound) {
                handleCloseMenus()

                setTemplate(() => updatedSelectedTemplate);

            } else {
                //TODO: something happen when changing not working
            }
        }
    }

    const handleEnterKeyDown = (e) => {
        if(e.key === 'Enter') {
            handleChangeElementContent()
        }
    }

    return (
        <Paper sx={{ width: 320, maxWidth: '100%', overflow: 'visible' }}>
            <MenuList>
                <MenuItem>
                    <TextField value={content} onKeyDown={handleEnterKeyDown} onChange={(e) => setContent(() => e.target.value)} label={"content"} size='small' fullWidth />
                    <AdminMainButton 
                        appearance='iconButton'
                        type='custom'
                        icon={<ChangeCircleOutlinedIcon />}
                        title='add new element'
                        sx={{
                            marginLeft: 2
                        }}
                        onClick={handleChangeElementContent}
                    />
                </MenuItem>
            </MenuList>
        </Paper>
    );
};

ChangeElementContent.propTypes = {
    parentElementId: propTypes.string,
    handleCloseMenus: propTypes.func
}

export default ChangeElementContent;