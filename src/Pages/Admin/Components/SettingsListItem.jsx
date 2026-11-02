//React
import {
    
} from 'react'

import {
    
} from 'react-redux'



//Components


//MUI
import {
    Box,
    Typography,
    ButtonGroup,
    Button
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledSettingsListItem = styled(Box)(
    ({ theme }) => ({
        width: "100%"
    })
)

const StyledButtonGroup = styled(ButtonGroup)(
    ({ theme }) => ({
        width: "100%",
    })
)

const StyledButton = styled(Button)(
    ({ theme }) => ({
        width: "100%",
    })
)


const SettingsListItem = ({title, groupButtons, value}) => {
    return (
        <StyledSettingsListItem>
            <Typography
                variant='subtitle1'
                color="text.secondary"
                fontWeight="bold"
                component="div"
                >
                    {title}
                </Typography>
                <StyledButtonGroup variant="outlined" aria-label="outlined button group">
                    {
                        groupButtons.map((button, i) => {
                            return (
                                <StyledButton
                                key={i}
                                value={button.value}
                                onClick={button.onClick}
                                sx={{
                                    backgroundColor: theme => value === button.value ? theme.palette.primary.main : undefined,
                                    color: theme => value === button.value ? theme.palette.primary.contrastText : undefined,
                                }}
                                >
                                    {button.icon}
                                    {button.name}
                                </StyledButton>
                            )
                        })
                    }
                    
                </StyledButtonGroup>
        </StyledSettingsListItem>
    );
};

SettingsListItem.propTypes = {
    title: propTypes.string,
    groupButtons: propTypes.array,
}

export default SettingsListItem;