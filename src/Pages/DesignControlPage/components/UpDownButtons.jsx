//React
import {
    
} from 'react'

import {
    
} from 'react-redux'
import PropTypes from 'prop-types';

//Components
import { AdminMainButton } from '../../../Components'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
//Styled Components
const StyledUpDownButtons = styled(Box)(
    () => ({
    
    })
)

const UpDownButtonsStyle = {
    border: '1px solid red',
    fontWeight: 'bold',
    color: 'white.main',
    backgroundColor: '#304D30',
    transition: 'background-color 0.3s',
    '&:hover': {
        backgroundColor: 'rgb(7, 15, 43)',
    },
}

const UpDownButtons = ({moveSectionUp , moveSectionDown}) => {
    return (
        <StyledUpDownButtons>
             {/* Up , Down buttons  */}

                <AdminMainButton
                        title="Move Section"
                        type="custom"
                        onClick={moveSectionUp}
                        appearance="iconButton"
                        putTooltip
                        icon={<ArrowUpwardIcon />}
                        sx={UpDownButtonsStyle}
                    />
            <AdminMainButton
                        title="Move Section"
                        type="custom"
                        onClick={moveSectionDown}
                        appearance="iconButton"
                        putTooltip
                        icon={<ArrowDownwardIcon />}
                        sx={UpDownButtonsStyle}
                    />

        </StyledUpDownButtons>
    );
};
UpDownButtons.propTypes = {
    moveSectionUp: PropTypes.func,
    moveSectionDown: PropTypes.func,
};
export default UpDownButtons;