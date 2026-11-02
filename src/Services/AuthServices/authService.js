import axios from "axios";
// axios.defaults.withCredentials = true;
// import Cookies from 'js-cookie';
// -------------------------------------- 
import config from "../../../Config.json";
import store from "../../Redux/Store";

import { handleOpenSnackbar, setSnackbarIsError, setSnackbarMessage } from "../../Redux/Slices/snackbarOpenSlice";
import { logoutRedux, setTokenInfo, setUserInfo } from "../../Redux/Slices/authSlice";
import { handleCloseLinearProgress, handleOpenLinearProgress } from "../../Redux/Slices/DownloadPageSlice";
const authServiceRoute = config.ServerMainRoute + "/auth";

const authServiceAPI = axios.create({
    baseURL: authServiceRoute,
});


// instance for fetch user
const FetchUserRoute = config.ServerMainRoute + "/auth";
const AfterLoginInstance = axios.create({
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
        store.dispatch(handleOpenLinearProgress())
        const response = await authServiceAPI.post('/register', updatedData);
        store.dispatch(handleCloseLinearProgress())
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
        store.dispatch(handleCloseLinearProgress())
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
        store.dispatch(handleOpenLinearProgress())
        const response = await authServiceAPI.post('/login', updatedData);
        store.dispatch(handleCloseLinearProgress())
        console.log("login ,", response)

        if(response.data.success) {
                store.dispatch(setTokenInfo({token: response.data.token})) //?after set token, page will be reloaded and using UserProvider, the logged user will be fetching


                store.dispatch(setSnackbarMessage({message: response.data.message}))
                store.dispatch(setSnackbarIsError({isError: false}))
                store.dispatch(handleOpenSnackbar())

                return response.data;

            
        } else {
            store.dispatch(setSnackbarMessage({message: response.data.error}))
            store.dispatch(setSnackbarIsError({isError: true}))
            store.dispatch(handleOpenSnackbar())
        }

        
    } catch (error) {
        console.error('Error posting data:', error);
        store.dispatch(handleCloseLinearProgress())
        store.dispatch(setSnackbarMessage({message: error.response.data.error}))
        store.dispatch(setSnackbarIsError({isError: true}))
        store.dispatch(handleOpenSnackbar())

        return error.response.data;
    }
}

// Example protected request function
export const fetchUserData = async () => {
    try {

        const response = await AfterLoginInstance.get('/user');
        return response.data
    } catch (error) {

        console.error('Error fetching user data:', error);
        return error.response.data
    }
};

// Example protected request function
export const logOut = async () => {
    try {
        store.dispatch(handleOpenLinearProgress())
        const response = await AfterLoginInstance.get('/logout');
        store.dispatch(handleCloseLinearProgress())

        if(response.data.success) {
            store.dispatch(logoutRedux())
        }

        return response.data

    } catch (error) {

        store.dispatch(handleCloseLinearProgress())
        console.error('Error fetching user data:', error);
        return error.response.data
    }
};

export const ProvideUser = async () => {
    const res2 = await fetchUserData();
    if(res2.success) {
        store.dispatch(setUserInfo({user: res2.data}))
        return res2.data;
    } 
    store.dispatch(setUserInfo({user: null}))
    store.dispatch(setTokenInfo({token: null}))
    return null;
}
