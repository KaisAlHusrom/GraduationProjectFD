import { useEffect, useRef, useState } from "react"

export default function useFetchDataOutsideState(
    fetchDataFunc,
    type = "all",
    filters,
    sorts,
    open = true,
    searchQuery = null,
    dataState
) {
    const [, setData] = dataState

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(false)

    const [hasMore, setHasMore] = useState(true)

    const [pageNumber, setPageNumber] = useState(1)

    

    

    useEffect(() => {
        

        const fetchData = async () => {
            try {
                if(open && fetchDataFunc) {
                    setLoading(() => true)
                    setError(() => false)
                    const res = await fetchDataFunc(type, pageNumber, filters, sorts, searchQuery)
                    
                    
                    if(res.error) {
                        setError(() => true)
                        setLoading(() => false)
                    } else {
                        if(pageNumber === 1) {
                            setData(() => res.rows);
                        } else {
                            setData(prev => [...prev, ...res.rows]);
                        }
                        console.log(res.rows)
                        setHasMore(() => res.rows.length > 0)
                        setLoading(() => false)
                    }   
                }
            } catch (e) {
                setError(() => true)
                setLoading(() => false)
            }
        }

        fetchData()
    }, [type, pageNumber, filters, sorts, fetchDataFunc, open, searchQuery, setData])
    
    return { loading, error, hasMore, setPageNumber, pageNumber}
    
}

