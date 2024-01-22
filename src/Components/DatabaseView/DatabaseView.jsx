//React
import {  createContext, useContext, useEffect, useState } from 'react'

import {
    
} from 'react-redux'

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
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
//propTypes 
import propTypes from 'prop-types'
import { useLoaderData } from 'react-router-dom'
import { useMemo } from 'react'
import filterData from '../../Helpers/FilterData'
import sortData from '../../Helpers/sortData'
import { CustomGalleryView, CustomListView } from '..'
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
        //handleUpdateData //function to change data in database
    } = props

    const theme = useTheme()
    
    //Split the columns and rows,
    const [loaderData, setLoaderData] = useState(useLoaderData());
    const {columns, rows} = loaderData;


    //Sorting the columns
    const allSortedColumns = useMemo(() => JSON.parse(localStorage.getItem('sortedColumns')) || {}, []);
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
            const newRowsArray = rows.map(data => {
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
    }, [hiddenColumns, rows]) 

    //Filtered Data
    const [filteredData, setFilteredData] = useState(null)

    //-- Check if there is an applied filter --
    //Get filters from session storage
    const pageFilters = useMemo(() => {
        const storedFilters = JSON.parse(sessionStorage.getItem('filters')) || {};
        return storedFilters[title] || {};
    }, [title]);
    // filters count
    const [filtersCount, setFiltersCount] = useState(null)
    useEffect(() => {
        const storedFilters = pageFilters.appliedFilters || [];
        if(storedFilters.length > 0) {
            setFiltersCount(storedFilters.length)
            storedFilters.forEach(filter => {
                if(filter.process !== "") {
                    setFilteredData(() => filterData(rowsArray, storedFilters))
                }
            });
        }
    }, [pageFilters.appliedFilters, rowsArray])


    //Get sorts from session storage
    //Sorted Data
    const [sortedData, setSortedData] = useState(null)
    const pageSorts = useMemo(() => {
        const storedSorts = JSON.parse(sessionStorage.getItem('sorts')) || {};
        return storedSorts[title] || {};
    }, [title]);
    // sorts count
    const [sortsCount, setSortsCount] = useState(null)
    useEffect(() => {
        const storedSorts = pageSorts.appliedSorts || [];
        if(storedSorts.length > 0) {
            setSortsCount(storedSorts.length)
            storedSorts.forEach(filter => {
                if(filter.process !== "") {
                    setSortedData(() => sortData(rowsArray, storedSorts))
                }
            });
        }
    }, [pageSorts.appliedSorts, rowsArray])
    

    //States
    const [selected, setSelected] = useState([])
    const [isHeaderCheckboxChecked, setIsHeaderCheckboxChecked] = useState(false);

    const [dataWillAppear, setDataWillAppear] = useState([])
    //control the data will appear based on the filteredData and sortedData
    useEffect(()=> {
        if(filteredData && sortedData) {
            const stored = JSON.parse(sessionStorage.getItem('sorts')) || {};
            const storedSorts = stored[title].appliedSorts || [];
            setDataWillAppear(sortData(filteredData, storedSorts))
        } else if(filteredData) {
            setDataWillAppear(filteredData)
        } else if(sortedData) {
            setDataWillAppear(sortedData)
        } else {
            setDataWillAppear(rowsArray)
        }
    }, [filteredData, sortedData, rowsArray, pageSorts.appliedSorts, title])

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
                selectHeaderBackgroundColor: [
                    {
                        name: theme.palette.primary.main,
                        value: false,
                        type: "color",
                    },
                    {
                        name: theme.palette.primary.dark,
                        value: true,
                        type: "color",
                    },
                    {
                        name: theme.palette.primary.light,
                        value: false,
                        type: "color",
                    },
                    {
                        name: theme.palette.secondary.main,
                        value: false,
                        type: "color",
                    },
                    {
                        name: theme.palette.secondary.dark,
                        value: false,
                        type: "color",
                    },
                    {
                        name: theme.palette.secondary.light,
                        value: false,
                        type: "color",
                    },
                ],
                showHeaderVerticalLines: true,
                showHeaderHorizontalLines: true,
                showVerticalLines: true,
                showHorizontalLines: true,
                changeEvenRowsBackgroundColor: false,
                selectEvenRowsBackgroundColor: [
                    {
                        name: theme.palette.action.selected,
                        value: true,
                        type: "color",
                    },
                    {
                        name: theme.palette.action.hover,
                        value: false,
                        type: "color",
                    },
                    {
                        name: theme.palette.action.active,
                        value: false,
                        type: "color",
                    },
                    {
                        name: theme.palette.action.disabled,
                        value: false,
                        type: "color",
                    },
                    {
                        name: theme.palette.action.disabledBackground,
                        value: false,
                        type: "color",
                    },
                    {
                        name: theme.palette.secondary.main,
                        value: false,
                        type: "color",
                    },
                    {
                        name: theme.palette.secondary.main,
                        value: false,
                        type: "color",
                    },
                    {
                        name: theme.palette.secondary.dark,
                        value: false,
                        type: "color",
                    },
                    {
                        name: theme.palette.secondary.light,
                        value: false,
                        type: "color",
                    },
                ],
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
                        value: true,
                        type: "position",
                    },
                    {
                        name: "center",
                        value: false,
                        type: "position",
                    },
                    {
                        name: "right",
                        value: false,
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


    //View Options
    const viewOptions = [
        {
            value: "Delete Selected",
            icon: <DeleteOutlineOutlinedIcon />,
            onClick: () => {console.log(selected)}
        },
        {
            value: "Duplicate Selected",
            icon: <ContentCopyOutlinedIcon />,
            onClick: () => {console.log(selected)}
        },
    ]
    

    //handlers
    const handleHeaderCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        setIsHeaderCheckboxChecked(isChecked);
        // If the header checkbox is checked, add all user IDs to usersWillDelete
        if (isChecked) {
            const allIds = dataWillAppear.map((row) => row.id);
            setSelected(() => allIds);
        } else {
          // If the header checkbox is unchecked, clear the usersWillDelete state
            setSelected(() => []);
        }
    };

    //Handle update data when change
    const handleChangeData = (e, type, setRowData) => {
        let name = e.target.name;
        let value = e.target.value;
        if(type === "bool") {
            value = e.target.checked;
        } else if(type === "image" || type === "file")  {
            value = e.target.files[0];
        } 

        setRowData((prev)=> {
            return {...prev, [name]: value}
        })
    }

    //Update data in database when press Enter
    const handleEnterKeyDown = (e, type, row, setShowTextField) => {
        if(e.key === 'Enter') {
            const updatedRows = [...rowsArray]
            let name = e.target.name;
            let value = e.target.value;

            if(type === "bool") {
                value = e.target.checked;
            } else if(type === "image" || type === "file")  {
                value = e.target.files[0];
            } 

            updatedRows.forEach((updatedRow) => {
                if(updatedRow.id === row.id) {
                    row[name] = value
                }
            })
            //TODO: the original data don't change, as I see, check it, and fix the problem.
            setLoaderData(() => {
                return {...loaderData, rows: updatedRows}
            })
            setShowTextField(()=> null);
        }
    }

    // useEffect(() => {
    //     console.log(rows);
    // }, [loaderData]); // This will trigger the effect whenever loaderData change
    
    //Styles

    const styleCardHeader = {
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

    const styleTitleTypography = {
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.h6.fontWeight,
        lineHeight: theme.typography.h6.lineHeight,
        textTransform: 'capitalize',
    }

    const styleCardContent = {
        border: "1px solid", 
        borderColor: theme.palette.divider
    }

    

    return (
        <MyContext.Provider value={{filtersCount, setFiltersCount, sortsCount, setSortsCount, viewsSettings, setViewsSettings}}>
            <StyledDatabaseView>
                <SortFilterSection
                dataState={[loaderData, setLoaderData]}
                rowsArrayState={[rowsArray, setRowsArray]}
                filteredDataState={[filteredData, setFilteredData]}
                sortedDataState={[sortedData, setSortedData]}
                allViews={allViews}
                currentView={view}
                hiddenColumnsState={[hiddenColumns, setHiddenColumns]}
                sortedColumnsState={[sortedColumns, setSortedColumns]}
                title={title}
                />
                <Paper>
                    <CardHeader 
                        title={title}
                        action={
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
                                dataWillAppearState={[dataWillAppear, setDataWillAppear]}
                                selectedState={[selected, setSelected, setIsHeaderCheckboxChecked]}
                                handleChangeData={handleChangeData}
                                handleEnterKeyDown={handleEnterKeyDown}
                            />
                            :
                            view === "gallery" 
                            ?
                            <CustomGalleryView
                                filteredColumnsArray={filteredColumnsArray}
                                dataWillAppearState={[dataWillAppear, setDataWillAppear]}
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
    title: propTypes.string,
    icon: propTypes.element,
    database: propTypes.array,
    hiddenColumns: propTypes.array,
    databaseOptions: propTypes.array,
    handleUpdateData: propTypes.func
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMyContext = () => {
    return useContext(MyContext);
  };

export default DatabaseView;