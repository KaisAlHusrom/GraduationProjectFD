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
import AdminUploadVideoComponent from '../../../../Components/AdminUploadVideoComponent/AdminUploadVideoComponent'

//Styled Components
const StyledVideoUpdateInput = styled(Box)(
    ({ theme }) => ({
    
    })
)


const VideoUpdateInput = (props) => {
    const {
        column,
        customHandleChange,
        value
    } = props

    const [video, setVideo] = useState(null)

    return (
        <StyledVideoUpdateInput>
            <AdminUploadVideoComponent
                column={column}
                customOnChange={customHandleChange}
                videoState={[video, setVideo]}
                value={value}
            />
        </StyledVideoUpdateInput>
    );
};

VideoUpdateInput.propTypes = {
    column: propTypes.string,
    customHandleChange: propTypes.func,
    value: propTypes.any,
}

export default VideoUpdateInput;