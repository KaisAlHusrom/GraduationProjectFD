import { useCallback, useEffect, useRef, useState } from "react"

export default function useFetchData(
    fetchDataFunc,
    type = "all",
    filters,
    sorts,
    open = true,
    searchQuery = null,
    value,
    perPage,
) {
    const [data, setData] = useState(() => {
        if(value) {
            return Array.isArray(value) ? value : [value]
        }

        return []
    })

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(false)

    const [hasMore, setHasMore] = useState(true)

    const [pageNumber, setPageNumber] = useState(1)

    const [refetch, setRefetch] = useState(0)

    

    useEffect(() => {
        

        const fetchData = async () => {
            try {
                //fetch data only one time when perPage equal to all
                if(perPage === "all" && pageNumber !== 1) {
                    return
                }
                
                if(open && fetchDataFunc) {
                    setLoading(() => true)
                    setError(() => false)
                    const res = await fetchDataFunc(type, pageNumber, filters, sorts, searchQuery, perPage)
                    
                    
                    if(res.error) {
                        setError(() => true)
                        setLoading(() => false)
                    } else {
                        if (value) { //when value is not null, add it to the first, and delete it from the data that will be fetched
                            const array = Array.isArray(value) && value;
                            const filterData = (row) => { //TODO: check if every thing work correctly
                                if (Array.isArray(value)) {
                                    return value.some(valueRow => {
                                        return row.id !== valueRow.id
                                    })
                                }

                                return row.id !== value.id
                            }
                            
                            if (pageNumber === 1) {
                                setData(() => [...(array ? array : [value]), ...res.rows.filter(filterData)]);
                            } else {
                                setData((prev) => [...(array ? array : [value]), ...prev.filter(filterData), ...res.rows.filter(filterData)]);
                            }
                        }
                        else {
                            if(pageNumber === 1) {
                                setData(() => res.rows);
                            } else {
                                setData(prev => [...prev, ...res.rows]);
                            }
                        }
                        setHasMore(() => res?.rows?.length > 0)
                        setLoading(() => false)
                    }   
                }
            } catch (e) {
                setError(() => true)
                setLoading(() => false)
            }
        }

        fetchData()
    }, [type, pageNumber, filters, sorts, fetchDataFunc, open, searchQuery, refetch, value, perPage])

    const observer = useRef()
    const lastDataRecord = useCallback(node => {
        
        if (loading) return 

        if(observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore) {
                console.log("enter")
                setPageNumber(prev => {
                    return prev + 1
                });
            }
        })

        if (node) observer.current.observe(node)
    }, [loading, hasMore, setPageNumber])
    
    return { loading, error, hasMore, setPageNumber, data, setData, pageNumber, setRefetch, lastDataRecord}
    
}

