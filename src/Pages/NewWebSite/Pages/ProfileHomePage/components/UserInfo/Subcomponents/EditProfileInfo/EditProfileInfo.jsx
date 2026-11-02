//React
import { useEffect, useMemo, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import config from "../../../../../../../../../Config.json"
//Components


//MUI
import {
    Box,
    Grid,
    TextField,
    Button
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'


import { AdminUploadImageComponent } from '../../../../../../../../Components'
import { usersProfileImagesFolderName } from '../../../../../../../../Services/AdminServices/Services/usersService'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { updateUserUsers } from '../../../../../../../../Services/UserServices/Services/usersUsersService'
import { setUserInfo } from '../../../../../../../../Redux/Slices/authSlice'

//Styled Components
const StyledEditProfileInfo = styled(Box)(
    () => ({
    
    })
)


const EditProfileInfo = ({modalState}) => {
    const user = useSelector(state => state.authSlice.user)
    const imagePath = useMemo(() => {
        return `${config.ServerImageRoute}/${usersProfileImagesFolderName}/${user?.profile_image}`;

    }, [user?.profile_image])

    const [, setUpdateModalOpen] = modalState

    //values
    const [inputValues, setInputValues] = useState({});

    
    //if data exist set input values to selected template
    useEffect(() => {
        if(user) {
            setInputValues((prevInputValues) => ({
                ...prevInputValues,
                ['first_name']: user['first_name'],
                ['last_name']: user['last_name'],
                ['mobile_number']: user['mobile_number'],
                ['birth_date']: user['birth_date'],
                ['profile_image']: user['profile_image'],
            }));

            if(user['profile_image']) {
                setImage(() => imagePath)
            }
        }
    }, [imagePath, user])

    //mobile number
    // const extractedData = useMemo(() => {
    //     return inputValues['mobile_number'] ? extractCountryCodeAndNumber(inputValues['mobile_number']) : {countryCode: null, number: null};
    // }, [inputValues]);
    
    // const countryCode = extractedData ? extractedData.countryCode : null;
    // const number = extractedData ? extractedData.number : null;


    //change image
    // Handle change for image field
    const [image, setImage] = useState(null)
    const handleChangeImage = (e) => {
        const value = e.target.files[0];

        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(() => event.target.result)
        };
        reader.readAsDataURL(value);

        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            "profile_image": value,
        }));
    }

    
    

    // const [countryCodeState, setCountryCodeState] = useState(countryCode || '+90')
    //handle change all fields
    const handleChange = (e, fieldName) => {
        const name = fieldName || e?.target?.name;
        let value = e?.target?.value;
        if(name === "birth_date") {
            value = `${e['$y']}-${e['$M']}-${e['$D']}`;
        }

        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [name]: value,
        }));
    };

    //Response
    const [errors, setErrors] = useState(null)
    


    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {...user, ...inputValues}

        delete data.created_at;
        delete data.updated_at;
        delete data.total_balance;
        delete data.withdrawable_balance;
        delete data.payment_plans;

        const res = await updateUserUsers(user?.id, data)
        if (res.success) {
            setUpdateModalOpen(() => false)
            dispatch(setUserInfo({user: res.data}))

        } else {
            setErrors(() => res?.errors)
            console.error(res.message)
        }
    }

    return (
        
            <form method='post' onSubmit={handleSubmit} encType="multipart/form-data" >
                <StyledEditProfileInfo>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <AdminUploadImageComponent
                                column={"profile_image"}
                                customOnChange={(event) => handleChangeImage(event)}
                                error={errors?.profile_image}
                                imageState={[image, setImage]}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth={true}
                                label={"First Name"}
                                name={"first_name"}
                                color="primary"
                                size="small"
                                onChange={(event) => handleChange(event)}
                                value={inputValues['first_name'] || ""}
                                error={errors?.first_name}
                                helperText={errors && errors?.first_name}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth={true}
                                label={"Last Name"}
                                name={"last_name"}
                                color="primary"
                                size="small"
                                onChange={(event) => handleChange(event)}
                                value={inputValues['last_name'] || ""}
                                error={errors?.last_name}
                                helperText={errors && errors?.last_name}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            {/* <MobileNumberTextField 
                                formData={inputValues}
                                handleChangeFormData={handleChange}
                                item={{
                                    name: "mobile_number",
                                    label: "Mobile Number",
                                    required: false,
                                    autoFocus: false,
                                    type: 'text'
                                }}
                                setFormData={setInputValues}
                                countryCodeState={[countryCodeState, setCountryCodeState]}
                                // errors={errors}
                            /> */}
                            <TextField
                                fullWidth={true}
                                label={"Mobile Number"}
                                name={"mobile_number"}
                                color="primary"
                                size="small"
                                onChange={(event) => handleChange(event)}
                                value={inputValues['mobile_number'] || ""}
                                error={errors?.mobile_number}
                                helperText={errors && errors?.mobile_number}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <DatePicker 
                                type='date'
                                label={"Birth Date"}
                                name={'birth_date'}
                                value={dayjs(inputValues['birth_date'])}
                                onChange={(event) => handleChange(event, 'birth_date')}
                                size= "small"
                                sx={{
                                    width: "100%",
                                }}
                                error={errors?.birth_date}
                                helperText={errors && errors?.birth_date}
                            />
                        </Grid>
                        <Grid item xxs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </StyledEditProfileInfo>
            </form>
    );
};

EditProfileInfo.propTypes = {
    modalState: propTypes.array
}

export default EditProfileInfo;