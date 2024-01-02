//React
import { useState } from 'react'

import {
    
} from 'react-redux'

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


const AddUserModalForm = () => {



    const [userData, setUserData] = useState({
        "full_name": "",
        "email": "",
        "password": "",
        "password_confirmation": "",
        "is_admin": 0
    })

    const [errors, setErrors] = useState({})

    

    //handlers
    const handleChangeData = e => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === 'is_admin') {
            // Ensure that the value is a boolean, not a string or number
            value = e.target.checked;
        }
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }


    return (
        <form onSubmit={handleSubmit}>
            <StyledAddUserModalForm>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Full Name"
                        name="full_name"
                        onChange={handleChangeData}
                        value={userData.full_name}
                        color="primary"
                        required
                        size="small"
                        error={errors?.full_name ? true : false}
                        helperText={errors?.full_name ? errors?.full_name : ''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        onChange={handleChangeData}
                        value={userData.email}
                        color="primary"
                        required
                        size="small"
                        error={errors?.email ? true : false}
                        helperText={errors?.email ? errors?.email : ''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        onChange={handleChangeData}
                        value={userData.password}
                        color="primary"
                        required
                        error={errors?.password ? true : false}
                        helperText={errors?.password ? errors?.password : ''}
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
                            onChange={handleChangeData}
                            value={userData.is_admin}
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
        </form>
    );
};

export default AddUserModalForm;