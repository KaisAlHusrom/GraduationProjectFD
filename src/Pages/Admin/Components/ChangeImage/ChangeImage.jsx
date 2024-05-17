//React
import { useEffect, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Button,
    MenuItem,
    MenuList,
    Paper,
} from '@mui/material'

import CloudUploadIcon from '@mui/icons-material/CloudUpload';


//propTypes 
import propTypes from 'prop-types'
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate';
import { changeElementContentByParentId } from '../../../../Helpers/RecursiveHelpers/changeElementContent';




const ChangeImage = ({parentElementId, handleCloseMenus}) => {

    const {template, handleTemplateChange} = useMyCreateElementContext()

    const [image, setImage] = useState(null)
    useEffect(() => {
        if(image) {
            // Clone the selectedElement array to avoid mutating state directly
            const updatedSelectedTemplate = JSON.parse(JSON.stringify(template));

            // Add the new element to the parent element in the selectedElement array
            const parentTemplateFound = changeElementContentByParentId([updatedSelectedTemplate], parentElementId, image);
            
            // If the parent element is found and updated, set the new state

            if (parentTemplateFound) {
                handleCloseMenus()

                handleTemplateChange(updatedSelectedTemplate)

            } else {
                //TODO: something happen when changing not working
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleCloseMenus, image, parentElementId])


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target.result);
        };
        reader.readAsDataURL(file);
    }
    return (
        <Paper sx={{ width: 320, maxWidth: '100%', overflow: 'visible' }}>
            <MenuList>
                <MenuItem>
                    <Button size='small' component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload Element Image
                        <input
                        hidden 
                        type="file" 
                        accept='image/*' 
                        name={"element_image"}
                        onChange={handleImageChange}
                        />
                    </Button>
                </MenuItem>
            </MenuList>
        </Paper>
    );
};

ChangeImage.propTypes = {
    parentElementId: propTypes.string,
    handleCloseMenus: propTypes.func
}

export default ChangeImage;