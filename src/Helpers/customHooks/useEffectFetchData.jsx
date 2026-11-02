// React
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleCloseLinearProgress, handleOpenLinearProgress } from '../../Redux/Slices/DownloadPageSlice';

const useEffectFetchData = (handleFetchData, params, condition = true, specific = false) => {
    // for linear progress
    const dispatch = useDispatch();
    const [download, setDownload] = useState(false);
    const [data, setData] = useState(null);
    const [trigger, setTrigger] = useState(0)


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
    }, [dispatch, condition, handleFetchData, params, specific, trigger])

    const fetchAgain= () => {
        setTrigger(prev => prev + 1)
    }

    //to add linear progress when changing category id
    useEffect(() => {
        if(download) {
            dispatch(handleOpenLinearProgress())
        } else {
            dispatch(handleCloseLinearProgress())
        }
    }, [dispatch, download])

    return {data, setData, download, setDownload, fetchAgain};
};

export default useEffectFetchData;
