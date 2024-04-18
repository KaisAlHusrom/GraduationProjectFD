//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { BorderColor } from '@mui/icons-material'

//Styled Components
const StyledViewElements = styled(Box)(
    ({ theme }) => ({
    
    })
)

const StyledTypoItem = styled(Typography)(
    ({ theme }) => ({
        textTransform: 'capitalize',
        padding: theme.spacing(0.5),
        cursor: 'pointer',
        borderRadius: theme.spacing(2),
        "&:hover": {
            border: '1px solid',
            borderColor: theme.palette.warning.main,
            backgroundColor: theme.palette.action.hover
        }
    })
);

//functions
const RecursiveComponent = ({ data }) => {
    // Sort the data based on the sequence number
    const sortedData = data.sort((a, b) => a.sequence_number - b.sequence_number);

    return (
        <div style={{ paddingLeft: "20px" }}>
            {sortedData.map((parent) => {
                return (
                    <div key={parent?.id}>
                        <StyledTypoItem variant='subtitle1' component="span">- {parent?.element_type_name}</StyledTypoItem>
                        {/* Base Condition and Rendering recursive component from inside itself */}
                        <div>
                            {parent?.children && <RecursiveComponent data={parent?.children} />}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

RecursiveComponent.propTypes = {
    data: propTypes.array
}

const ViewElements = ({selectedElement}) => {
    return (
        <StyledViewElements>
            <RecursiveComponent data={[selectedElement]} />
        </StyledViewElements>
    );
};

ViewElements.propTypes = {
    selectedElement: propTypes.any
}

export default ViewElements;