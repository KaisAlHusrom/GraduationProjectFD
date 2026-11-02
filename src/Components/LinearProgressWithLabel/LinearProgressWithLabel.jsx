//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box, LinearProgress, Typography,
} from '@mui/material'


//propTypes 
import propTypes from 'prop-types'

//Styled Components



const LinearProgressWithLabel = (props) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', width:"100%" }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
};

LinearProgressWithLabel.propTypes = {
    value: propTypes.number
}

export default LinearProgressWithLabel;