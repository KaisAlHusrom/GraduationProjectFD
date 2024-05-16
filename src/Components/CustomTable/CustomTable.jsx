import { useCallback, useEffect, useMemo, useRef, useState } from 'react'


import {
    
} from 'react-redux'

//Components
import CustomTableRow from '../CustomTableRow/CustomTableRow'


//MUI
import {
    TableContainer,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
    Table,
    Box,
    Skeleton,
} from '@mui/material'
import { styled } from '@mui/system'
import { useTheme } from '@emotion/react'

//icons
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

//propTypes 
import propTypes from 'prop-types'
import { useLoaderData } from 'react-router-dom'
import { useMyContext } from '../DatabaseView/DatabaseView'
import useFetchData from '../../Helpers/customHooks/useFetchData'





const CustomTable = (props) => {
    const {
        filteredColumnsArray,
        selectedState,
        dataWillAppearState,
        handleChangeData,
        handleEnterKeyDown,
    } = props
    
    //data state
    const {rowsArray} = dataWillAppearState

    //I get columns object to know the type of each column
    const {columns} = useMyContext();
    //primary key
    const pk = useMemo(() => Object.keys(columns).find(key => columns[key] === "pk"), [columns])

    
    //view settings
    //I don't put a condition if null, because I solved it in DatabaseView component
    const {
        viewsSettings,
        lastDataRowElementRef, //last data row ref
        hasMore, // has more data
        loading // loading new data
    } = useMyContext()
    
    const {
        showHeaders,
        selectHeaderBackgroundColor,
        changeHeadersBackgroundColor,
        showHeaderVerticalLines,
        showHeaderHorizontalLines
    } = viewsSettings.table

    const selectedColor = selectHeaderBackgroundColor

    //move to right and left when keep press on the mouse 
    // const tableRef = useRef(null);
    // const [startX, setStartX] = useState(null);
    // const [scrollLeft, setScrollLeft] = useState(0);
    // const isDragging = useRef(false); // Use a ref for dragging state

    // const handleMouseDown = (e) => {
    //     if(e.which  === 3) {
    //         e.preventDefault();
    //         isDragging.current = true; // Update ref value directly
    //         setStartX(e.pageX - tableRef.current.offsetLeft);
    //         setScrollLeft(tableRef.current.scrollLeft);
    //     }
    // };

    // const handleMouseMove = (e) => {
    //     console.log(e.button)
    //     if(e.which  === 3) {
    //         e.preventDefault();
    //         if (!isDragging.current) return; // Access ref value directly
    //         const x = e.pageX - tableRef.current.offsetLeft;
    //         const walk = (x - startX) * 1; // Adjust scrolling speed here
    //         tableRef.current.scrollLeft = scrollLeft - walk;

    //     }
    // };

    // const handleMouseUp = (e) => {
    //     if(e.which  === 3) {
    //         e.preventDefault();
    //         isDragging.current = false; // Update ref value directly
    //     }
        
    // };


    
    //Styles
    const theme = useTheme()

    //Styled Components
    const StyledCustomTable = useMemo(() => {
        return styled(TableContainer)(
            ({ theme }) => ({
                border: "1px solid",
                borderColor: theme.palette.divider,
                height: "570px",
                // borderCollapse: "collapse"
            })
        )
    }, [])

    const StyleHeadTableCell = useMemo(() => {
        return {
            fontSize: theme.typography.h7,
            textTransform: 'capitalize',
            borderRight: showHeaderVerticalLines ? '1px solid' : 'none',
            borderBottom: showHeaderHorizontalLines ? '1px solid' : 'none',
            borderColor: theme.palette.divider,
            textAlign: 'center',
            color: changeHeadersBackgroundColor && theme.palette.primary.contrastText,
            position: "relative",
        }
    }, [changeHeadersBackgroundColor, showHeaderHorizontalLines, showHeaderVerticalLines, theme.palette.divider, theme.palette.primary.contrastText, theme.typography.h7])

    const styleRelationIconBox = useMemo(() => {
        return {
            position: "absolute",
            left: 5,
            top: 2,   
        }
    }, [])

    const StyledTableHead = useMemo(() => {
        return styled(TableHead)(
            () => ({
                backgroundColor: changeHeadersBackgroundColor && selectedColor,
                position: 'sticky',
                top: 0,
                zIndex: 500,
            })
        );
    }, [changeHeadersBackgroundColor, selectedColor])

    return (
        <StyledCustomTable  
            // ref={tableRef}
            // onMouseDown={handleMouseDown}
            // onMouseMove={handleMouseMove}
            // onMouseUp={handleMouseUp}
            // onMouseLeave={handleMouseUp}
        >
                    <Table
                    >
                        {
                            showHeaders && columns
                            ?
                            <StyledTableHead>
                                <TableRow>
                                <TableCell
                                sx={StyleHeadTableCell}>
                                    Action
                                </TableCell>
                                {filteredColumnsArray.length > 0 && filteredColumnsArray.map((key, i) => {
                                    return (
                                        <TableCell sx={StyleHeadTableCell} key={i}>
                                            {key.split('_').join(" ")}
                                            {
                                            columns[key] === "one-to-many" || 
                                            columns[key] === "many-to-many" ||
                                            columns[key] === "many-to-one"
                                            ?
                                            <Box component="span" sx={styleRelationIconBox}>
                                                <AllInclusiveIcon
                                                color='secondary'
                                                />
                                            </Box>
                                            :null
                                            }
                                        </TableCell>
                                    );
                                })}
                                </TableRow>
                                
                            </StyledTableHead>
                            :
                            null
                        }
                        
                        <TableBody>
                            { 
                            rowsArray && rowsArray.length > 0 && rowsArray.map((row, index) => {
                                if(rowsArray.length === index + 1) {
                                    return <CustomTableRow 
                                    key={row[pk]} 
                                    row={row}
                                    selectedState={selectedState}
                                    appearedDataCount={rowsArray.length}
                                    handleChangeData = {handleChangeData}
                                    handleEnterKeyDown = {handleEnterKeyDown}
                                    filteredColumnsArray = {filteredColumnsArray}
                                    lastRowRef={lastDataRowElementRef}
                                    />
                                }
                                

                                return (
                                    <CustomTableRow 
                                    key={row[pk]} 
                                    row={row}
                                    selectedState={selectedState}
                                    appearedDataCount={rowsArray.length}
                                    handleChangeData = {handleChangeData}
                                    handleEnterKeyDown = {handleEnterKeyDown}
                                    filteredColumnsArray = {filteredColumnsArray}
                                    />
                                );
                            })
                        }
                        {
                            loading
                            &&
                            <TableRow>
                                <TableCell colSpan={filteredColumnsArray.length + 1 }>
                                    <Skeleton sx={{ height: 80 }} animation="wave" variant="rectangular" />
                                </TableCell>
                            </TableRow>
                        }
                        </TableBody>
                    </Table>
        </StyledCustomTable>
    );
};

CustomTable.propTypes = {
    showTableHeaders: propTypes.bool,
    selectedState: propTypes.array,
    filteredColumnsArray: propTypes.array,
    dataWillAppearState: propTypes.object,
    handleChangeData: propTypes.func,
    handleEnterKeyDown: propTypes.func,
    viewSettings: propTypes.object
}

export default CustomTable;