//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { AdminUploadImageComponent } from '../../../../Components'

//Styled Components
const StyledImageUpdateInput = styled(Box)(
    () => ({
    
    })
)


const ImageUpdateInput = (props) => {
    const {
        column,
        customHandleChange,
        value
    } = props

    const [image, setImage] = useState(null)

    return (
        <StyledImageUpdateInput>
            <AdminUploadImageComponent
                column={column}
                customOnChange={customHandleChange}
                imageState={[image, setImage]}
                value={value}
            />
        </StyledImageUpdateInput>
    );
};

ImageUpdateInput.propTypes = {
    column: propTypes.string,
    customHandleChange: propTypes.func,
    value: propTypes.any,
}

export default ImageUpdateInput;