//React
import {  } from 'react'

import {
    
} from 'react-redux'

//Routers
import { Form, useActionData } from 'react-router-dom'

//Components


//MUI
import {
    Grid,
    TextField,
    FormControlLabel,
    Switch,
    Button
} from '@mui/material'
import { styled } from '@mui/system'


//Styled Components
const StyledAddUserModalForm = styled(Grid)(
    () => ({
    
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


const AddUserModalForm = () => {
    const data = useActionData() //The data that come from the action method in the CustomRouterProvider





    return (
        //The method will be called is the method in the router that in action prop
        <Form method='post' action='/admin-dashboard/users'>
            <StyledAddUserModalForm>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Full Name"
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
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        // onChange={handleChangeData}
                        // value={userData.email}
                        color="primary"
                        required
                        size="small"
                        // error={errors?.email ? true : false}
                        // helperText={errors?.email ? errors?.email : ''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        // onChange={handleChangeData}
                        // value={userData.password}
                        color="primary"
                        required
                        error={data?.error ? true : false}
                        helperText={data?.error ? data.error : ''}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        label="Set As Admin"
                        size="small"
                        control={
                            <Switch 
                            name="is_admin"
                            // onChange={handleChangeData}
                            // value={userData.is_admin}
                            // error={errors?.is_admin ? true : false}
                            // helperText={errors?.is_admin ? errors.is_admin : ''}
                            />
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <StyledSubmitButton 
                    type="submit"
                    >
                        Add
                    </StyledSubmitButton>
                </Grid>
                </Grid>
            </StyledAddUserModalForm>
        </Form>
    );
};

export default AddUserModalForm;