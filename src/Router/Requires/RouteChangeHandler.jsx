// RouteChangeHandler.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { handleCloseLinearProgress } from '../../Redux/Slices/DownloadPageSlice';
import { handleCloseSnackbar } from '../../Redux/Slices/snackbarOpenSlice';

const RouteChangeHandler = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(handleCloseLinearProgress())
        dispatch(handleCloseSnackbar())
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    }, [dispatch, location]);

    return null;
};

export default RouteChangeHandler;
