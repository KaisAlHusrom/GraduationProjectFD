//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Chip,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledChipSet = styled(Box)(
    () => ({
    })
)


const ChipSet = ({title,label}) => {
    return (
        <div>
            <Typography variant="body1" sx={{ paddingBottom: 1 }}> {title} </Typography>
            <>
                {Object.keys(label).map((key, index) => (
                    <Chip
                        key={index}
                        label={label[key]}
                        color="primary"
                        clickable
                        style={{ marginRight: '10px' }}
                    />
                ))}
            </>
        </div>
        
    );
};

ChipSet.propTypes = {
    children: propTypes.array,
    title: propTypes.string,
    label: propTypes.array.isRequired
}

export default ChipSet;