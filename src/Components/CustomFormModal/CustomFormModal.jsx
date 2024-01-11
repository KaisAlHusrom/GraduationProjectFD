//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

import { Form, useActionData, useLocation } from 'react-router-dom'


//Components


//MUI
import {
    Box, Button, FormControlLabel, Grid, Switch, TextField,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledCustomFormModal = styled(Box)(
    ({ theme }) => ({
    
    })
)

const StyledSubmitButton = styled(Button)(
    ({ theme }) => ({
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": {
                backgroundColor: theme.palette.primary.dark,
            }
    })
)


const CustomFormModal = (props) => {
    const {
        columns,
    } = props

    const data = useActionData() //The data that come from the action method in the CustomRouterProvider
    const location = useLocation();

    // Access the current path from the location object
    const currentPath = location.pathname;


    return (
        <Form method='post' action={currentPath}>
            <StyledCustomFormModal>
            <Grid container spacing={2}>
                {
                    columns && Object.entries(columns).map(([column, type], key) => (
                        <Grid key={key} item xs={12}>
                            <TextField
                                fullWidth
                                label={column.toString().toUpperCase()}
                                name="full_name"
                                // onChange={handleChangeData}
                                // value={userData.full_name}
                                color="primary"
                                required
                                size="small"
                                error={data?.error ? true : false}
                                helperText={data?.error ? data.error : ''}
                            />
                        </Grid>
                    ))
                }
                
                
                <Grid item xs={12}>
                    <StyledSubmitButton 
                    type="submit"
                    >
                        Add
                    </StyledSubmitButton>
                </Grid>
                </Grid>
            </StyledCustomFormModal>
        </Form>
    );
};

CustomFormModal.propTypes = {
    columns: propTypes.object
}

export default CustomFormModal;