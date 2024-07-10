//React
import {  createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

import { useDispatch } from 'react-redux'

//Components
import CustomTable from '../CustomTable/CustomTable'
import AdminMainButton from '../AdminMainButton/AdminMainButton'
import SortFilterSection from '../../Pages/Admin/AdminPages/UsersPage/UsersPageComponents/SortFilterSection'
//MUI
import {
    Alert,
    AlertTitle,
    Box, CardContent, CardHeader, Checkbox, Paper,
} from '@mui/material'
import { styled } from '@mui/system'
import { useTheme } from '@emotion/react'

//icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import FolderDeleteOutlinedIcon from '@mui/icons-material/FolderDeleteOutlined';
import RecyclingOutlinedIcon from '@mui/icons-material/RecyclingOutlined';
import LayersClearIcon from '@mui/icons-material/LayersClear';
//propTypes 
import propTypes from 'prop-types'
import { useMemo } from 'react'
import { CustomGalleryView } from '..'
import { handleOpenSnackbar as handleOpenSnackbar, setSnackbarIsError, setSnackbarMessage } from '../../Redux/Slices/snackbarOpenSlice'
import useFetchData from '../../Helpers/customHooks/useFetchData'
import { isArraysEqual } from '../../Helpers/DataStructureHelper'
import { MAX_FILE_SIZE } from '../../Services/AdminServices/Services/productsService'
// import usersService from '../../Services/usersService'


//Context
const MyContext = createContext();


//Styled Components
const StyledDatabaseView = styled(Box)(
    () => ({
    
    })
)


const DatabaseView = (props) => {
    const {
        title,
        icon,
        relationships,
        columns,
        handleFetchData,
        // loaderDataProp,
        handleUpdateData, //function to change data in database
        handleDeleteData,
        softDeletes,
        handleRestoreData,
        handlePermanentDeleteData,
        handleAddData,
        imagesFolderName,
        filesFolderName,
        disableUpdate,
        disableInsert,
        addingPage,
        customAppliedFilters
    } = props

    const theme = useTheme()
    
    //get the data from loader function or as prop
    // const loadedData = useLoaderData();
    // const initialData = loaderDataProp ? loaderDataProp : loadedData;
    // const [loaderData, setLoaderData] = useState(initialData);

    //show deleted records state
    const [showDeleted, setShowDeleted] = useState(false)
    
    //Split the columns and rows,
    // const {manyToOne, manyToMany} = relationships

    //***** CALLING NEW DATA WHEN SCROLLING TO THE LAST *********
    //-- Check if there is an applied filter --
    //Get filters from session storage
    //Filtered Data
    // const [filteredData, setFilteredData] = useState(null)
    const pageFilters = useMemo(() => {
        const storedFilters = JSON.parse(sessionStorage.getItem('filters')) || {};
        return storedFilters[title] || {};
    }, [title]);
    
    //get applied filters from SetFilter component
    const [appliedFilters, setAppliedFilters] = useState(() => pageFilters && Object.keys(pageFilters).length > 0 ? pageFilters.appliedFilters : [])

    const getAppliedFilters = (appliedFilters) => {
        setAppliedFilters(() => appliedFilters)
    }

    // filters count
    const [filtersCount, setFiltersCount] = useState(() => appliedFilters && appliedFilters.length)


    //Get sorts from session storage
    //Sorted Data
    const pageSorts = useMemo(() => {
        const storedSorts = JSON.parse(sessionStorage.getItem('sorts')) || {};
        return storedSorts[title] || {};
    }, [title]);
    const [appliedSorts, setAppliedSorts] = useState(() => pageSorts && pageSorts.appliedSorts)
    const getAppliedSorts = (appliedSorts) => {
        setAppliedSorts(() => appliedSorts)
    }

    // sorts count
    const [sortsCount, setSortsCount] = useState(() => appliedSorts && appliedSorts.length)


    const lastShapeAppliedFilters = useMemo(() => {
        return customAppliedFilters ? [...appliedFilters, ...customAppliedFilters] : appliedFilters
    }, [appliedFilters, customAppliedFilters])


    const {
        hasMore,
        // error,
        loading,
        setPageNumber,
        setData,
        data,
        setRefetch,
        pageNumber
    } = useFetchData(handleFetchData, showDeleted ? "deleted" : "all", lastShapeAppliedFilters, appliedSorts)

    const observer = useRef()
    const lastDataRowElementRef = useCallback(node => {
        
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

    useEffect(() => {
        if(data.length === 0) {
            // TODO: add error handling when no data passed;
            return
        }
    }, [data])


    //Sorting the columns
    const allSortedColumns = useMemo(() => {
        const storedColumns = JSON.parse(localStorage.getItem('sortedColumns'));
        const defaultColumns = Object.keys(columns);
    
        // If no data in local storage or no sorted columns for the given title,
        // or if there's a difference between columns data and stored data,
        // use default columns
        // console.log(storedColumns[title])
        if (!storedColumns || !storedColumns[title] || !isArraysEqual(storedColumns[title], defaultColumns)) {
            return { ...storedColumns, [title]: defaultColumns };
        }
    
        return storedColumns;
    }, [columns, title]);
    const storedSortedColumn = allSortedColumns[title] || {...allSortedColumns, [title]: Object.keys(columns)}[title];
    const [sortedColumns, setSortedColumns] = useState(storedSortedColumn);
    // Update local storage whenever 'updatedSortedColumns' changes
    useEffect(() => {
        // Create a copy of 'updatedSortedColumns' to avoid mutating the state directly
        const updatedSortedColumns = { ...allSortedColumns, [title]: sortedColumns };
        // Update local storage with the updated 'updatedSortedColumns'
        localStorage.setItem('sortedColumns', JSON.stringify(updatedSortedColumns));
    }, [allSortedColumns, sortedColumns, title]);


    //Data without hidden columns
    //Hidden Columns State
    const allHiddenColumns = useMemo(() => JSON.parse(localStorage.getItem('hiddenColumns')) || {}, []);
    const storedHiddenColumns = allHiddenColumns[title] || {...allHiddenColumns, [title]: []}[title];
    const [hiddenColumns, setHiddenColumns] = useState(storedHiddenColumns);
     // Update local storage whenever 'updatedHiddenColumns' changes
    useEffect(() => {
        // Create a copy of 'updatedHiddenColumns' to avoid mutating the state directly
        const updatedHiddenColumns = { ...allHiddenColumns, [title]: hiddenColumns };
        // Update local storage with the updated 'updatedHiddenColumns'
        localStorage.setItem('hiddenColumns', JSON.stringify(updatedHiddenColumns));
    }, [allHiddenColumns, hiddenColumns, title]);

    //Set columns and rows without hidden columns
    const filteredColumnsArray = sortedColumns.filter(column => !hiddenColumns.includes(column))

    const [rowsArray, setRowsArray] = useState([])
    useEffect(()=> {
        setRowsArray(() => {
            const newRowsArray = data.map(data => {
                const filteredData = {};
                for (const column in data) {
                    if (!hiddenColumns.includes(column)) {
                        filteredData[column] = data[column];
                    }
                }
                return filteredData;
                })
            return newRowsArray;
        })
    }, [hiddenColumns, data]) 



    
    // useEffect(() => {
    //     const storedFilters = pageFilters.appliedFilters || [];
    //     if(storedFilters.length > 0) {
    //         setFiltersCount(storedFilters.length)
    //         storedFilters.forEach(filter => {
    //             if(filter.process !== "") {
    //                 setFilteredData(() => filterData(rowsArray, storedFilters, relations, handleFetchData))
    //             }
    //         });
    //     }
    // }, [pageFilters.appliedFilters, relations, rowsArray])


    
    // useEffect(() => {
    //     const storedSorts = pageSorts.appliedSorts || [];
    //     if(storedSorts.length > 0) {
    //         setSortsCount(storedSorts.length)
    //         storedSorts.forEach(filter => {
    //             if(filter.process !== "") {
    //                 setSortedData(() => sortData(rowsArray, storedSorts))
    //             }
    //         });
    //     }
    // }, [pageSorts.appliedSorts, rowsArray])
    

    //States
    const [selected, setSelected] = useState([])
    const [isHeaderCheckboxChecked, setIsHeaderCheckboxChecked] = useState(false);

    // const [dataWillAppear, setDataWillAppear] = useState([])
    // //control the data will appear based on the filteredData and sortedData
    // useEffect(()=> {
    //     if(filteredData && sortedData) {
    //         const stored = JSON.parse(sessionStorage.getItem('sorts')) || {};
    //         const storedSorts = stored[title].appliedSorts || [];
    //         setDataWillAppear(sortData(filteredData, storedSorts))
    //     } else if(filteredData) {
    //         setDataWillAppear(filteredData)
    //     } else if(sortedData) {
    //         setDataWillAppear(sortedData)
    //     } else {
    //         setDataWillAppear(rowsArray)
    //     }
    // }, [filteredData, sortedData, rowsArray, pageSorts.appliedSorts, title])

    // --- View State ---
    
    const views = useMemo(() => JSON.parse(localStorage.getItem('views')) || {}, []);
    const storedView = views[title] || 'table'; // Default to 'table' if no view is stored
    const [view, setView] = useState(storedView);
     // Update local storage whenever 'view' changes
    useEffect(() => {
        // Create a copy of 'views' to avoid mutating the state directly
        const updatedViews = { ...views, [title]: view };

        // Update local storage with the updated 'views'
        localStorage.setItem('views', JSON.stringify(updatedViews));
    }, [title, view, views]);

    //all views
    const allViews = {
        table: {
            icon: <TableChartIcon color={view === "table" ? "primary" : ""} />,
            value: "Table",
            selected: view === "table",
            onClick: () => {setView("table")},
            viewSettings: {
                showHeaders: true,
                changeHeadersBackgroundColor: false,
                selectHeaderBackgroundColor: theme.palette.primary.main,
                showHeaderVerticalLines: true,
                showHeaderHorizontalLines: true,
                showVerticalLines: true,
                showHorizontalLines: true,
                changeEvenRowsBackgroundColor: false,
                selectEvenRowsBackgroundColor: theme.palette.primary.main,
            }
        },
        gallery: {
            icon: <CollectionsOutlinedIcon color={view === "gallery" ? "primary" : ""} />,
            value: "Gallery",
            selected: view === "gallery",
            onClick: () => {
                setView("gallery")
            },
            viewSettings: {
                showHeaders: true,
                showItemImage: true,
                contentPosition: [
                    {
                        name: "left",
                        value: false,
                        type: "position",
                    },
                    {
                        name: "center",
                        value: false,
                        type: "position",
                    },
                    {
                        name: "right",
                        value: true,
                        type: "position",
                    },
                ]
            }
        }
    }

    //Views Settings
    const allViewsSettings = useMemo(()=> JSON.parse(localStorage.getItem("viewsSettings")) || {}, []);
    let defaultViewsSettings = {}
    if(!allViewsSettings[title]) {
        // Set initial values for each view's settings in storedViewsSettings
        Object.entries(allViews).forEach(([key, value]) => {
            defaultViewsSettings[key] = value.viewSettings;
        });
    } else {
        defaultViewsSettings = allViewsSettings[title]
    }

    const [viewsSettings, setViewsSettings] = useState(defaultViewsSettings);
     // Update local storage whenever 'viewsSettings' changes
    useEffect(() => {
        // Create a copy of 'viewsSettings' to avoid mutating the state directly
        const updatedViewsSettings = { ...allViewsSettings, [title]: viewsSettings };
        // Update local storage with the updated 'viewsSettings'
        localStorage.setItem('viewsSettings', JSON.stringify(updatedViewsSettings));
    }, [allViewsSettings, viewsSettings, title]);


    
    

    //handlers
    const handleHeaderCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        setIsHeaderCheckboxChecked(isChecked);
        
        if (isChecked) {
            const pkColumn = Object.keys(columns).find(key => columns[key] === "pk");
    
            if (pkColumn) {
                const allIds = data
                    .map(row => row[pkColumn]); // Use the primary key column's value as ID
                setSelected(() => allIds);
            } else {
                setSelected(() => []);
            }
        } else {
            setSelected(() => []);
        }
    }
    
    
    

    //Handle update data when change
    const handleChangeData = async (e, type, setRowData, columnName, newValue, fileSetStates) => {
        
        let name = columnName
        let value = newValue
        if(type !== "many-to-many" && type !== "one-to-many" && type !== "many-to-one" && type !== "rate" && type !== "enum") {
            name = e.target.name;
            value = e.target.value;
            if(type === "bool") {
                value = e.target.checked;
            } else if(type === "image" || type === "file")  {
                value = e.target.files[0];
            } 
        } 

        if(type === "image") {
            value = e.target.files[0];
            //! because there is no any file in this project except products, I sue max file that in products service
            if (value.size > MAX_FILE_SIZE) {
                console.error(`File size should not exceed ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                    // Update the row data using the callback version of setRowData
                    setRowData((prev)=> {
                        const updatedRow = {...prev, [name]: event.target.result};
                        return updatedRow;
                    });

            };

            reader.readAsDataURL(value);
        }

        if(type === "image:video") {
            value = e.target.files[0];
            //! because there is no any file in this project except products, I sue max file that in products service
            if (value.size > MAX_FILE_SIZE) {
                console.error(`File size should not exceed ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                    // Update the row data using the callback version of setRowData
                    setRowData((prev)=> {
                        const updatedRow = {...prev, [name]: event.target.result};
                        return updatedRow;
                    });

            };

            reader.readAsDataURL(value);
        }

        if(type === "file") {
            const {setFileName, setFileSize, setUploadProgress} = fileSetStates

            value = e.target.files[0];
            //! because there is no any file in this project except products, I sue max file that in products service
            if (value.size > MAX_FILE_SIZE) {
                console.error(`File size should not exceed ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
                return;
            }
            console.log(value)

            setFileName(value.name);
            setFileSize(value.size);
            const reader = new FileReader();
            reader.onprogress = (event) => {
                
                if (event.lengthComputable) {
                    const progress = Math.round((event.loaded / event.total) * 100);
                    // console.log(progress)
                    setUploadProgress(progress);
                }
            };
            reader.onloadend = (event) => {
                // Update the row data using the callback version of setRowData
                setRowData((prev)=> {
                    const updatedRow = {...prev, [name]: event.target.result};
                    return updatedRow;
                });
            };
            reader.readAsDataURL(value);
        }
        // Update the row data using the callback version of setRowData
        setRowData((prev)=> {
            const updatedRow = {...prev, [name]: value};
            if(!disableUpdate) {
                updateData(updatedRow)
            }
            return updatedRow;
        });

    }

    // Update data in database when press Enter
    const handleEnterKeyDown = async (e, type, row, setShowTextField) => {
        if (e.key === 'Enter') {
            setShowTextField(() => null);
            updateData(row)
        }
    }

    //when click outside data cell, item
    const handleCellOutsideClick = async (bodyRef, clickedElement, withoutClasses, setShowAllCell, setShowTextField) => {
        
        const isSelectAutoCompleteOption = withoutClasses.some(className => clickedElement.closest(className) !== null);
            if (!isSelectAutoCompleteOption && bodyRef.current && !bodyRef.current.contains(clickedElement)) {
                // Clicked outside the table cell, so set showAllCell to null
                setShowAllCell(null);
                setShowTextField(null);
                //TODO: you can add that the data in database will change when press outside the table cell
                // updateData(row)
            }
    };

    //dispatch for Snackbar
    const dispatch = useDispatch()
    
    //state to show deleted records
    
    useEffect(() => {
        if(selected.length > 0){
            if(isHeaderCheckboxChecked) {
                setIsHeaderCheckboxChecked(() => false)
            }
            setSelected(() => [])
        }
        // setPageNumber(() => 2)
        // setLoaderData((prev) => {
        //     return {
        //         ...prev,
        //         rows: [],
        //     }
        // })

    // I DON"T WANT ANY DEPENDENCIES BUT showDELETED
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showDeleted])

    //UPDATE FUNCTION
    const updateData = async (row) => {
            const pkColumn = Object.keys(columns).find(key => columns[key] === "pk");
            console.log(row[pkColumn])
            // Await the update operation to complete
            const res = await handleUpdateData(row[pkColumn], row);
            if(res?.success) {
                await handleFetchData();
                // setLoaderData(() => result); //I remove this because the row is actually changed
            } 
        
    }


    //DELETE FUNCTION
    const deleteData = async (selectedIds) => {
        if(selectedIds.length === 0) {
            handleSnackbar("There is no item selected", true)
            return
        }
        // Await the update operation to complete
        const res = await handleDeleteData(selectedIds);        
        if(res.success) {
            // Fetch data after the delete is completed
            if(pageNumber === 1) {
                setRefetch(prev => prev + 1)
            } else {
                setPageNumber(() => 1);
            }
            setSelected(() => [])
        }
    }

    //RESTORE FUNCTION
    const restoreData = async (selectedIds) => {
        if(selectedIds.length === 0) {
            handleSnackbar("There is no item selected", true)
            return
        }
        // Await the update operation to complete
        const res = await handleRestoreData(selectedIds);        
        if(res.success) {
            // Fetch data after the delete is completed
            if(pageNumber === 1) {
                setRefetch(prev => prev + 1)
            } else {
                setPageNumber(() => 1);
            }
            setSelected(() => [])
        }
    }

    //PERMANENT DELETE FUNCTION
    const permanentDeleteData = async (selectedIds) => {
        if(selectedIds.length === 0) {
            handleSnackbar("There is no item selected", true)
            return
        }
        const res = await handlePermanentDeleteData(selectedIds);    

        if(res.success) {
            // Fetch data after the delete is completed
            if(pageNumber === 1) {
                setRefetch(prev => prev + 1)
            } else {
                setPageNumber(() => 1);
            }
            setSelected(() => [])
        }
    }
    


    const handleFetchDeletedItems = async () => {
        

        if(showDeleted) {
            // Fetch Deleted Data
            setShowDeleted(() => false)

            setPageNumber(() => 1)
        } else {
            // Fetch Deleted Data
            
            setShowDeleted(() => true)

            setPageNumber(() => 1)
        }
    }

    const handleSnackbar = (message, isError = false) => {
        dispatch(setSnackbarMessage({message: message}))
        dispatch(setSnackbarIsError({isError: isError}))
        dispatch(handleOpenSnackbar())
    }

    //View Options
    const viewOptions = [
        softDeletes && {
            value: showDeleted ? "Restore Selected" : "Delete Selected",
            icon: showDeleted ? <RecyclingOutlinedIcon /> : <DeleteOutlineOutlinedIcon />,
            onClick: showDeleted ? () => restoreData(selected) : () => deleteData(selected)
        },
        {
            value: "Delete Selected Permanently",
            icon: <LayersClearIcon />,
            onClick: () => permanentDeleteData(selected)
        },
        {
            value: "Duplicate Selected",
            icon: <ContentCopyOutlinedIcon />,
            onClick: () => { console.log(selected) }
        }
    ].filter(option => option);

    // useEffect(() => {
    //     console.log(rows);
    // }, [loaderData]); // This will trigger the effect whenever loaderData change
    
    //Styles

    const styleCardHeader = useMemo(() => {
        return {
            padding: `${theme.spacing()} ${theme.spacing()}`,
            backgroundColor: 'background.default',
            color: theme.palette.text.primary,
            border: '1px solid',
            borderColor: theme.palette.divider,
            display: 'flex',
            alignItems: 'center',
            ".MuiCardHeader-avatar": {
                marginRight: "4px",
            },
            ".MuiCardHeader-action": {
                margin: "0px"
            }
        }
    }, [theme])

    const styleTitleTypography = useMemo(() => {
        return {
            fontSize: theme.typography.h6.fontSize,
            fontWeight: theme.typography.h6.fontWeight,
            lineHeight: theme.typography.h6.lineHeight,
            textTransform: 'capitalize',
        }
    }, [theme])

    const styleCardContent = useMemo(() => {
        return {
            border: "1px solid", 
            borderColor: theme.palette.divider,
        }
    }, [theme])


    //open add form when press on ctrl + a
    const [modalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        const handleKeyDown = (event) => {
            
            // Check if Ctrl key is pressed and the pressed key is 'a' (for lowercase 'a')
            if (event.ctrlKey && event.key === 'a') {
                event.preventDefault()
                // open modal here
                setModalOpen(prev => !prev)
            }
        };
    
        // Add event listener when component mounts
        window.addEventListener('keydown', handleKeyDown);

        // Remove event listener when component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []); 
    

    return (
            <MyContext.Provider value={{
            filtersCount, 
            setFiltersCount, 
            sortsCount, 
            setSortsCount, 
            viewsSettings, 
            setViewsSettings, 
            handleCellOutsideClick, 
            handleAddData,
            handleFetchData, 
            lastDataRowElementRef,
            hasMore,
            loading,
            data,
            setData,
            setPageNumber,
            pageNumber,
            columns,
            relationships,
            getAppliedFilters,
            getAppliedSorts,
            imagesFolderName,
            filesFolderName,
            setRefetch,
            disableUpdate,
            disableInsert,
            addingPage
        }}
            >
                <StyledDatabaseView>
                    <SortFilterSection
                    // dataState={[loaderData, setLoaderData]}
                    rowsArrayState={[rowsArray, setRowsArray]}
                    // filteredDataState={[filteredData, setFilteredData]}
                    // sortedDataState={[sortedData, setSortedData]}
                    allViews={allViews}
                    currentView={view}
                    hiddenColumnsState={[hiddenColumns, setHiddenColumns]}
                    sortedColumnsState={[sortedColumns, setSortedColumns]}
                    title={title}
                    addModalOpenState={[modalOpen, setModalOpen]}
                    />
                    <Paper>
                        <CardHeader 
                            title={title}
                            action={
                                <>
                                    {
                                        softDeletes
                                        &&
                                        <AdminMainButton
                                        title='Show Deleted Items'
                                        icon={<FolderDeleteOutlinedIcon />}
                                        type='custom'
                                        appearance='secondary'
                                        putBorder
                                        onClick={handleFetchDeletedItems}
                                        sx={{
                                            backgroundColor: showDeleted ? theme.palette.action.selected : "transparent",
                                        }}
                                        />
                                    }
                                    <AdminMainButton
                                        icon={
                                        <MoreVertIcon sx={{
                                            color: theme.palette.text.primary
                                        }}/>
                                        }
                                        title='options'
                                        type='menu'
                                        appearance='iconButton'
                                        sx={{
                                            border: "0px"
                                        }}
                                        menuItems={viewOptions}
                                    />
                                </>
                            }
                            
                            avatar={
                                <Box display={{
                                    display: 'flex',
                                    alignItems: "center"
                                    }}>
                                    <Checkbox 
                                        checked={isHeaderCheckboxChecked}
                                        onChange={handleHeaderCheckboxChange}
                                    />
                                        {
                                            icon && icon
                                        }
                                    </Box>
                                
                            }
                            titleTypographyProps={{
                                sx: styleTitleTypography
                            }}
                            sx={styleCardHeader}
                        />
                        <CardContent sx={styleCardContent}>
                            {
                                isHeaderCheckboxChecked &&
                                <Alert severity="warning" variant='outlined'>
                                    <AlertTitle><strong>Warning, {selected.length} {title} are Selected</strong></AlertTitle>
                                    All {title} Are Selected
                                </Alert>

                                
                            }
                            {
                                view === "table"
                                ?
                                <CustomTable
                                    filteredColumnsArray={filteredColumnsArray}
                                    dataWillAppearState={{rowsArray}}
                                    selectedState={[selected, setSelected, setIsHeaderCheckboxChecked]}
                                    handleChangeData={handleChangeData}
                                    handleEnterKeyDown={handleEnterKeyDown}
                                />
                                :
                                view === "gallery" 
                                ?
                                <CustomGalleryView
                                    filteredColumnsArray={filteredColumnsArray}
                                    dataWillAppearState={{rowsArray}}
                                    selectedState={[selected, setSelected, setIsHeaderCheckboxChecked]}
                                    handleChangeData={handleChangeData}
                                    handleEnterKeyDown={handleEnterKeyDown}
                                />
                                :
                                null
                            }
                        </CardContent>
                    </Paper>
                    
                    
                </StyledDatabaseView>
            </MyContext.Provider>
        
        
    );
};

DatabaseView.propTypes = {
    title: propTypes.string.isRequired,
    icon: propTypes.element,
    relationships: propTypes.object.isRequired,
    columns: propTypes.object.isRequired,
    database: propTypes.array,
    hiddenColumns: propTypes.array,
    databaseOptions: propTypes.array,
    handleUpdateData: propTypes.func,
    handleFetchData: propTypes.func,
    handleDeleteData: propTypes.func,
    softDeletes: propTypes.bool,
    handleRestoreData: propTypes.func,
    handlePermanentDeleteData: propTypes.func,
    handleAddData: propTypes.func,
    loaderDataProp: propTypes.object,
    imagesFolderName: propTypes.string,
    filesFolderName: propTypes.string,
    disableUpdate: propTypes.bool,
    disableInsert: propTypes.bool,
    addingPage: propTypes.string,
    customAppliedFilters: propTypes.array,
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMyContext = () => {
    return useContext(MyContext);
};


export default DatabaseView;