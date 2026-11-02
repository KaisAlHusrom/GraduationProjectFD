//React
import { useEffect, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    MenuItem,
    MenuList,
    Paper,
    TextareaAutosize,
} from '@mui/material'
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { AdminMainButton } from '../../../../Components';
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate';
import { changeElementContentByParentId, currentElementContent } from '../../../../Helpers/RecursiveHelpers/changeElementContent';


const StyledTextArea = styled(TextareaAutosize)(
    ({theme}) => ({
        backgroundColor: theme.palette.background.paper,
        border: "2px solid",
        borderColor: theme.palette.divider,
        resize: "none",
        width: "100%",
        borderRadius: "8px",
        color: theme.palette.text.primary,
        outline: "none",
        fontSize: "1rem",
        padding: theme.spacing(),
        "&:focus": {
            borderColor: theme.palette.primary.main,
        }
    })
)


const ChangeElementContent = ({parentElementId, handleCloseMenus}) => {

    const {template, handleTemplateChange} = useMyCreateElementContext()

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
                handleTemplateChange(updatedSelectedTemplate)


            } else {
                //TODO: something happen when changing not working
            }
        }
    }

    const handleEnterKeyDown = (e) => {
        // to go underline
        if(e.shiftKey && e.key === 'Enter') {
            return
        }

        if(e.key === 'Enter') {
            handleChangeElementContent()
        }

    }

    

    return (
        <Paper sx={{ width: 320, maxWidth: '100%', overflow: 'visible' }}>
            <MenuList>
                <MenuItem>
                    <StyledTextArea
                    minRows={3} // Adjust the minimum number of rows as needed
                    maxRows={10} // Adjust the maximum number of rows as needed
                    label={"content"} size='small'
                    onChange={(e) => setContent(() => e.target.value)}
                    onKeyDown={handleEnterKeyDown}
                    value= {content}
                    />
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