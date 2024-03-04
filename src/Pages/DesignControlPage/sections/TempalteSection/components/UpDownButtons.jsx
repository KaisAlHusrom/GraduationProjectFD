//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components
import { AdminMainButton } from '../../../../../Components'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
//Styled Components
const StyledUpDownButtons = styled(Box)(
    ({ theme }) => ({
    
    })
)


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
                        sx={{
                            border: '1px solid red',
                            padding: '10px 15px',
                            fontWeight: 'bold',
                            color: 'white.main',
                            backgroundColor: 'warning.dark',
                        }}
                    />
            <AdminMainButton
                        title="Move Section"
                        type="custom"
                        onClick={moveSectionDown}
                        appearance="iconButton"
                        putTooltip
                        icon={<ArrowDownwardIcon />}
                        sx={{
                            border: '1px solid red',
                            padding: '10px 15px',
                            fontWeight: 'bold',
                            color: 'white.main',
                            backgroundColor: 'warning.dark',
                        }}
                    />

        </StyledUpDownButtons>
    );
};

export default UpDownButtons;