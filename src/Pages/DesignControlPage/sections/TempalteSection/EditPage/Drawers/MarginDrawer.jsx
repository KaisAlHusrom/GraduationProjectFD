//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box, MenuItem,
} from '@mui/material'
import { styled } from '@mui/system'
import CustomSelectInput from '../../../../../../Components/CustomSelectInput/CustomSelectInput'
import * as utils from '../../StylesFunctions/SetStylesFunctions.js';

//Styled Components
const StyledMarginDrawer = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        justifyContent: 'center'
    })
)
const customSelectStyle = {
    '&:hover': {
        transition: 'all 0.3s ease',
        backgroundColor: "#09263529",
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
    },
};


const MarginDrawer = ({handleSectionStyleChange}) => {

    const [selectedMargin, setSelectedMargin] = useState(null);

    return (
        <StyledMarginDrawer>
            <CustomSelectInput
            name="Margin"
            className={customSelectStyle}
            onChange={(e) => handleSectionStyleChange(e.target.value)}
            valueSet={selectedMargin}
            >
            {utils["marginBottom"]?.map((item, index) => (
                <MenuItem key={index} value={item}>{item}</MenuItem>
            ))}
            </CustomSelectInput>
        </StyledMarginDrawer>
    );
};

export default MarginDrawer;