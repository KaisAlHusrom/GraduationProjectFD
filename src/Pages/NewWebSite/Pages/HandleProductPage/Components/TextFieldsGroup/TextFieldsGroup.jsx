//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Card,
    Box,
    Typography
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledTextFieldsGroup = styled(Card)(
    ({ theme }) => ({
        border: '1px solid',
        borderColor: theme.palette.divider,
        position: 'relative',
        minHeight: 100,
        overflow: 'visible',
        transition: '0.5s',
        padding: theme.spacing(2),
        "&:hover": {
            borderColor: theme.palette.primary.main,
        }
    })
)

const CardHeader = styled(Box)(
    ({ theme }) => ({
        position: 'absolute',
        top: theme.spacing(-2),
        left: theme.spacing(4),
    })
);


const TextFieldsGroup = ({title, children}) => {
    return (
        <StyledTextFieldsGroup elevation={1}>
            <CardHeader>
                <Typography variant='h6' letterSpacing={1.5}>
                    {title}
                </Typography>
            </CardHeader>
            {
                children
            }
        </StyledTextFieldsGroup>
    );
};

TextFieldsGroup.propTypes = {
    children: propTypes.element
}

export default TextFieldsGroup;