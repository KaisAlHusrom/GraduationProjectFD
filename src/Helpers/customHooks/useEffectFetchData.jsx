// React
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleCloseLinearProgress, handleOpenLinearProgress } from '../../Redux/Slices/DownloadPageSlice';

const useEffectFetchData = (handleFetchData, params, condition = true) => {
    // for linear progress
    const dispatch = useDispatch();
    const [download, setDownload] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            if(condition) {
                setDownload(() => true)
                const {rows} = await handleFetchData(...params)
                setData(() => rows)
                if(rows && rows.length > 0) {
                    setDownload(() => false)
                }
            }
        }

        fetchCategories()
    }, [dispatch, condition, handleFetchData, params])

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
