import axios from "axios";
// axios.defaults.withCredentials = true;
// import Cookies from 'js-cookie';
// -------------------------------------- 
import config from "../../../Config.json";
import store from "../../Redux/Store";

import { handleOpenSnackbar, setSnackbarIsError, setSnackbarMessage } from "../../Redux/Slices/snackbarOpenSlice";
import { setAuthInfo } from "../../Redux/Slices/authSlice";
const authServiceRoute = config.ServerMainRoute + "/auth";

const authServiceAPI = axios.create({
    baseURL: authServiceRoute,
});


// instance for fetch user
const FetchUserRoute = config.ServerMainRoute + "/auth";
const FetchUserInstance = axios.create({
    baseURL: FetchUserRoute,
    headers: {
        "Accept": "application/json",
        'Authorization': `Bearer ${store.getState().authSlice.auth_token}`,  //TODO: will change to use cookies
    }
    // withCredentials: true,
});



/*
// authServiceAPI.interceptors.request.use((config) => {
//     const token = decodeURIComponent(document.cookie.replace('XSRF-TOKEN=', ''));
//     authServiceAPI.defaults.headers['X-XSRF-TOKEN'] = token;

//     return config;
// });*/


// --- ADD DATA TEMPLATE
export const handleRegister = async (data) => {
    try {
        const updatedData = data
        const response = await authServiceAPI.post('/register', updatedData);
        if(response.data.success) {
            store.dispatch(setSnackbarMessage({message: response.data.message}))
            store.dispatch(setSnackbarIsError({isError: false}))
            store.dispatch(handleOpenSnackbar())
        } else {
            store.dispatch(setSnackbarMessage({message: response.data.error}))
            store.dispatch(setSnackbarIsError({isError: true}))
            store.dispatch(handleOpenSnackbar())
        }

        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);

        store.dispatch(setSnackbarMessage({message: error.response.data.error}))
        store.dispatch(setSnackbarIsError({isError: true}))
        store.dispatch(handleOpenSnackbar())

        return error.response.data;
    }
}

// Function to initialize CSRF protection
export const initializeCsrfProtection = async () => {
    const res = await axios.get(config.ServerMainRouteWithoutApi + '/sanctum/csrf-cookie');
    return res
};

//Log in
export const handleLogin = async (data) => {
    try {
        const updatedData = data
        // Get CSRF token
        // const res = await initializeCsrfProtection();
        // console.log("csrf ,", res)

        const response = await authServiceAPI.post('/login', updatedData);
        console.log("login ,", response)

        if(response.data.success) {
                // const userRes = await fetchUserData()
                // console.log("user res: ", userRes)
                
                // if(userRes.success) {
                store.dispatch(setAuthInfo({token: response.data.token, user: response.data.data}))
                store.dispatch(setSnackbarMessage({message: response.data.message}))
                store.dispatch(setSnackbarIsError({isError: false}))
                store.dispatch(handleOpenSnackbar())
                
                return response.data;
                // }
            
        } else {
            store.dispatch(setSnackbarMessage({message: response.data.error}))
            store.dispatch(setSnackbarIsError({isError: true}))
            store.dispatch(handleOpenSnackbar())
        }

        
    } catch (error) {
        console.error('Error posting data:', error);

        store.dispatch(setSnackbarMessage({message: error.response.data.error}))
        store.dispatch(setSnackbarIsError({isError: true}))
        store.dispatch(handleOpenSnackbar())

        return error.response.data;
    }
}

// Example protected request function
export const fetchUserData = async () => {
    try {

        const response = await FetchUserInstance.get('/user');
        return response.data
    } catch (error) {

        console.error('Error fetching user data:', error);
        return error.response.data
    }
};

