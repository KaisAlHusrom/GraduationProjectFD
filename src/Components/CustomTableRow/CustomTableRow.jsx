//React
import { useEffect, useMemo, useRef, useState } from 'react'

import {
    
} from 'react-redux'


//Components


//MUI
import {
    Box,
    Checkbox, Fade, IconButton, TableCell, TableRow, 
} from '@mui/material'
import { styled } from '@mui/system'

//icons

import OpenInNewIcon from '@mui/icons-material/OpenInNew';

//propTypes 
import propTypes from 'prop-types'
import { NavLink, useLoaderData } from 'react-router-dom';

import { useMyContext } from '../DatabaseView/DatabaseView'
import ViewDataHelper from '../../Helpers/ViewDataHelper'
import { useTheme } from '@emotion/react';
import RelationTextField from '../RelationTextField/RelationTextField';



//Styled Components

const StyledNavLink = styled(NavLink)(
    ({theme}) => ({
        color: theme.palette.text.primary,
        "&:hover": {
            color: theme.palette.primary.main,
        }
    })
)




const styleIconButtonLink = {
    margin: "0px",
    padding: "0px",
    fontSize: "0px",
}

//TODO: resolve rerender every time I click on table cell, or change the field
//RETURN DATA
//return database data
const {getAppropriateTextField, checkDatabaseDataInTable} = ViewDataHelper

const CustomTableRow = (props) => {
    const {
        selectedState,
        row,
        appearedDataCount,
        filteredColumnsArray,
        handleChangeData,
        handleEnterKeyDown
    } = props

    //view settings
    //I don't put a condition if null, because I solved it in DatabaseView component
    const {viewsSettings} = useMyContext()
    const {
        showVerticalLines,
        showHorizontalLines,
        changeEvenRowsBackgroundColor,
        selectEvenRowsBackgroundColor
    } = viewsSettings.table
    //selectedColor
    const selectedColor = useMemo(()=> {
        return selectEvenRowsBackgroundColor.find((item) => item.value)?.name
    }, [selectEvenRowsBackgroundColor])

    //Cells Ref
    const tableBodyRef = useRef(null);

    //I get columns object to know the type of each column
    const {columns} = useLoaderData();

    //Relations
    const {relations} = useLoaderData();


    ///States
    //make another state for row, to give the ability to change the cell directly, the data will change in database when press Enter
    const [rowData, setRowData] = useState(() => row);
    // I add the useEffect because when change hidden column to be appear, the data of them be null, for this I wanted to update the 
    // rowData when row changed.
    useEffect(()=> {
        setRowData(() => row)
    }, [row]) 

    const [selected, setSelected, setIsHeaderCheckboxChecked] = useMemo(()=> selectedState, [selectedState])
    const [showAllCell, setShowAllCell] = useState(null)
    const [showTextField, setShowTextField] = useState(null)
    //when press outside the table content showAllCell will set as null
    useEffect(() => {
            const handleOutsideClick = (event) => {
            const clickedElement = event.target;
            const isSelectAutoCompleteOption = clickedElement.closest('.MuiAutocomplete-option')

            if (!isSelectAutoCompleteOption && tableBodyRef.current && !tableBodyRef.current.contains(clickedElement)) {
                // Clicked outside the table cell, so set showAllCell to null
                setShowAllCell(null);
                setShowTextField(null);
                //TODO: you can add that the data in database will change when press outside the table cell
            }
            };
        
            document.body.addEventListener('mousedown', handleOutsideClick);
        
            return () => {
            document.body.removeEventListener('mousedown', handleOutsideClick);
            };
    }, []);

    //handlers
    const handleRowCheckboxChange = (event, userId) => {
        const isChecked = event.target.checked;
        let updatedUsersWillDelete = [...selected];
        if (isChecked) {
          // Add the user ID to usersWillDelete
            updatedUsersWillDelete.push(userId);
        } else {
          // Remove the user ID from usersWillDelete
            updatedUsersWillDelete = updatedUsersWillDelete.filter((id) => id !== userId);
        }
        setSelected(() => updatedUsersWillDelete);
        // Update the header checkbox state based on the selected row checkboxes
        setIsHeaderCheckboxChecked(
            () => updatedUsersWillDelete.length === appearedDataCount
        );
    };

    const handleShowAllCell = (cell_index) => {
        setShowAllCell(() => cell_index)
        setShowTextField(() => null)
    }

    const handleShowTextField = (cell_index) => {
        setShowTextField(() => cell_index)
        setShowAllCell(() => null);
    }

    
    // Styled Components
    const theme = useTheme()

    const StyledCustomTableRow = useMemo(() => {
        return {
                cursor: "pointer",
                position: "relative",
                "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                },
                height: "30px",
                "&:nth-of-type(2n)": {
                    backgroundColor: changeEvenRowsBackgroundColor && selectedColor,
                    "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    },
                },
        }
    }, [changeEvenRowsBackgroundColor, selectedColor, theme]);

    const StyledTableCell = useMemo(() => {
        return {
                maxWidth: "200px",
                overflow: 'hidden', 
                whiteSpace: 'nowrap', 
                textOverflow: 'ellipsis',
                borderRight: showVerticalLines ? '1px solid' : 'none',
                borderBottom: showHorizontalLines ? '1px solid' : 'none',
                textAlign: 'center',
                borderColor: theme.palette.divider,
                "&:hover": {
                    fontWeight: "bold",
                }
        }
    }, [showVerticalLines, showHorizontalLines, theme.palette.divider]);

        const StyledTableCellShowAllData = useMemo(() => {
            return {
                
                
                position: "relative",
            }
        }, []);
        
        const StyledNormalCell = useMemo(() => {
            return {
                minWidth: "120px",
                maxWidth: "200px",
                overflow: 'hidden', 
                whiteSpace: 'nowrap', 
                textOverflow: 'ellipsis',
                borderRight: showVerticalLines ? '1px solid' : 'none',
                borderBottom: showHorizontalLines ? '1px solid' : 'none',
                textAlign: 'center',
                borderColor: theme.palette.divider,
                "&:hover": {
                    fontWeight: "bold",
                },
            }
        }, [showVerticalLines, showHorizontalLines, theme.palette.divider]);
        
        const StyledTextFieldCell = useMemo(() => {
            return {
                maxWidth: "200px",
                overflow: 'hidden',
                borderRight: showVerticalLines ? '1px solid' : 'none',
                textAlign: 'center',
                borderColor: theme.palette.divider,
            }
        }, [showVerticalLines, theme.palette.divider]);

        const StyledRelativeBox = useMemo(() => {
            return {
                width: "calc(100% + 20px)",
                height: "calc(100% + 20px)",
                position: "absolute",
                left: "-10px",
                top: "-10px",
                zIndex: 1300,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflowY: "auto",
                textAlign: 'center',
                borderColor: theme.palette.primary.main,
                fontWeight: "bold",
                backgroundColor: theme.palette.background.paper,
                padding: theme.spacing(),
            }
        }, [theme])

    return (
        <TableRow sx={StyledCustomTableRow} ref={tableBodyRef}>
            <TableCell
            sx={StyledTableCell}
            >
                
            <Checkbox 
            checked={selected.includes(rowData.id)}
            onChange={(event) => handleRowCheckboxChange(event, rowData.id)}
            />
            <IconButton 
            disableRipple
            sx={styleIconButtonLink}>
                <StyledNavLink 
                    to={`${rowData.id}`}
                    >
                    <OpenInNewIcon />
                </StyledNavLink>
            </IconButton>
            </TableCell>
            {filteredColumnsArray.map((column, colIndex) => (
                showAllCell === `${rowData.id}-${colIndex}` ? (
                    // Content to render when showAllCell is true
                    
                    <Fade key={`${rowData.id}-${colIndex}`} in={showAllCell === `${rowData.id}-${colIndex}`}>
                        <TableCell sx={StyledTableCellShowAllData} onClick={() => handleShowTextField(`${rowData.id}-${colIndex}`)}>
                            <Box sx={StyledRelativeBox}>
                            {checkDatabaseDataInTable(columns, column, rowData[column], showAllCell, relations)}
                            </Box>
                        </TableCell>
                    </Fade>
                ) : showTextField === `${rowData.id}-${colIndex}` ? (
                    // Content to render when showTextField is true
                    <TableCell sx={StyledTextFieldCell} key={`${rowData.id}-${colIndex}`}>
                        {
                            getAppropriateTextField(setShowTextField, columns, column, rowData[column], handleChangeData, rowData, handleEnterKeyDown, setRowData, relations)
                        }
                    </TableCell>
                    
                ) : (
                    // Content to render when showAllCell and showTextField are false
                    <TableCell
                        sx={StyledNormalCell}
                        onClick={() => handleShowAllCell(`${rowData.id}-${colIndex}`)}
                        key={`${rowData.id}-${colIndex}`}
                    >
                        {checkDatabaseDataInTable(columns, column, rowData[column], undefined, relations)}
                    </TableCell>
                )
            ))}
        </TableRow>
    );
};

CustomTableRow.propTypes = {
    selectedState: propTypes.array,
    row: propTypes.object.isRequired,
    appearedDataCount: propTypes.number,
    filteredColumnsArray: propTypes.array.isRequired,
    handleChangeData: propTypes.func,
    handleEnterKeyDown: propTypes.func,
}

export default CustomTableRow;