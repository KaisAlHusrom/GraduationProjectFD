// React
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleCloseLinearProgress, handleOpenLinearProgress } from '../../Redux/Slices/DownloadPageSlice';

const useEffectFetchData = (handleFetchData, params, condition = true, specific = false) => {
    // for linear progress
    const dispatch = useDispatch();
    const [download, setDownload] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            if(condition) {
                setDownload(() => true)
                if(specific) {
                    const row = await handleFetchData(...params)
                    setData(() => row)
                    setDownload(() => false)
                    
                } else {
                    const {rows} = await handleFetchData(...params)
                    setData(() => rows)
                    setDownload(() => false)
                }
                
            }
        }

        fetchCategories()
    }, [dispatch, condition, handleFetchData, params, specific])

    //to add linear progress when changing category id
    useEffect(() => {
        if(download) {
            dispatch(handleOpenLinearProgress())
        } else {
            dispatch(handleCloseLinearProgress())
        }
    }, [dispatch, download])

    return {data, setData, download, setDownload};
};

export default useEffectFetchData;
