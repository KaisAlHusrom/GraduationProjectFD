//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import CustomTextField from '../../../../../../Components/CustomTextField/CustomTextField'

//Styled Components
const StyledTextContentTaP = styled(Box)(
    ({ theme }) => ({
    
    })
)


const TextContentTaP = ({TextOfHeader , textHeaderChange}) => {
    return (
        <StyledTextContentTaP>
            <Box>
                <CustomTextField 
                      id={`name`}
                      label='Text'
                      variant='filled'
                      value={TextOfHeader}
                      onChange={textHeaderChange}
                />

            </Box>
        </StyledTextContentTaP>
    );
};

export default TextContentTaP;