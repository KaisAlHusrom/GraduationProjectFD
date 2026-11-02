import axios from "axios";
import config from "../../../Config.json"
import store from "../../Redux/Store";
import { handleCloseLinearProgress, handleOpenLinearProgress } from "../../Redux/Slices/DownloadPageSlice";
import { handleOpenSnackbar, setSnackbarIsError, setSnackbarMessage } from "../../Redux/Slices/snackbarOpenSlice";

const FetchUserRoute = config.ServerMainRoute + "/user/subscription";
const checkoutInstance = axios.create({
    baseURL: FetchUserRoute,
    headers: {
        "Accept": "application/json",
        'Authorization': `Bearer ${store.getState().authSlice.auth_token}`,  //TODO: will change to use cookies
    }
    // withCredentials: true,
});


export const cancelSubscriptionService = async (userPaymentPlanId, subscription_id) => {
    try {

        store.dispatch(handleOpenLinearProgress())
        const response = await checkoutInstance.post('/cancel', {
            user_payment_plan_id: userPaymentPlanId,
            subscription_id: subscription_id,
        });
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
        // console.log("checkout ,", response)
        return response.data
        
    } catch (error) {
        store.dispatch(handleCloseLinearProgress())
        store.dispatch(setSnackbarMessage({message: error.response.data.error}))
        store.dispatch(setSnackbarIsError({isError: true}))
        store.dispatch(handleOpenSnackbar())
        console.error('Error posting data:', error);
        return error.response.data;
    }
}

export const resumeSubscriptionService = async (userPaymentPlanId, subscription_id) => {
    try {

        store.dispatch(handleOpenLinearProgress())
        const response = await checkoutInstance.post('/resume', {
            user_payment_plan_id: userPaymentPlanId,
            subscription_id: subscription_id,
        });
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
        // console.log("checkout ,", response)
        return response.data
        
    } catch (error) {
        store.dispatch(handleCloseLinearProgress())
        store.dispatch(setSnackbarMessage({message: error.response.data.error}))
        store.dispatch(setSnackbarIsError({isError: true}))
        store.dispatch(handleOpenSnackbar())
        console.error('Error posting data:', error);
        return error.response.data;
    }
}