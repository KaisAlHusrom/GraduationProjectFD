import axios from "axios";
import config from "../../../Config.json"
import store from "../../Redux/Store";
import { handleCloseLinearProgress, handleOpenLinearProgress } from "../../Redux/Slices/DownloadPageSlice";

const FetchUserRoute = config.ServerMainRoute + "/user/checkout";
const checkoutInstance = axios.create({
    baseURL: FetchUserRoute,
    headers: {
        "Accept": "application/json",
        'Authorization': `Bearer ${store.getState().authSlice.auth_token}`,  //TODO: will change to use cookies
    }
    // withCredentials: true,
});

export const handleCheckoutPage= async (data) => {
    try {
        const updatedData = data
        store.dispatch(handleOpenLinearProgress())
        const response = await checkoutInstance.post('', updatedData);
        store.dispatch(handleCloseLinearProgress())
        // console.log("checkout ,", response)
        return response.data
        
    } catch (error) {
        store.dispatch(handleCloseLinearProgress())
        console.error('Error posting data:', error);
        return error.response.data;
    }
}