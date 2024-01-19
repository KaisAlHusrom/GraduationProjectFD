//React
import { useEffect, useRef, useState } from 'react'

import {
    
} from 'react-redux'

//images
import businessman from "../../Assets/Images/businessman.png"

//Components


//MUI
import {
    Checkbox, Fade, IconButton, InputAdornment, Switch, TableCell, TableRow, TextField,
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

//propTypes 
import propTypes from 'prop-types'
import { NavLink, useLoaderData } from 'react-router-dom';
import DateHelper from '../../Helpers/DateHelper'
import StringHelper from '../../Helpers/StringsHelper'

//Styled Components
const StyledCustomTableRow = styled(TableRow)(
    ({ theme }) => ({
        cursor: "pointer",
        position: "relative",
        "&:hover": {
            backgroundColor: theme.palette.action.hover,
        }
    })
)

const StyledTableCell = styled(TableCell)(
    ({ theme }) => ({
        maxWidth: "200px",
        overflow: 'hidden', 
        whiteSpace: 'nowrap', 
        textOverflow: 'ellipsis',
        borderRight: '1px solid',
        textAlign: 'center',
        borderColor: theme.palette.divider,
        "&:hover": {
            fontWeight: "bold",
        }
    })
);

const StyledNavLink = styled(NavLink)(
    ({theme}) => ({
        color: theme.palette.text.primary,
        "&:hover": {
            color: theme.palette.primary.main,
        }
    })
)

const imageStyle = {
    width: "60px",
    height: "60px",
    objectFit: "contain",
    borderRadius: "50%"
}

const StyledTableCellShowAllData = styled(TableCell)(
    ({ theme }) => ({
        textAlign: 'center',
        borderColor: theme.palette.primary.main,
        fontWeight: "bold",
        zIndex: 500,
        backgroundColor: theme.palette.background.paper,
        maxWidth: "200px",
        overflow: "auto",
        height: "100%", 
        // position: "absolute",
        // whiteSpace: 'nowrap', 
    })
);

const StyledNormalCell = styled(TableCell)(
    ({ theme }) => ({
        maxWidth: "200px",
        overflow: 'hidden', 
        whiteSpace: 'nowrap', 
        textOverflow: 'ellipsis',
        borderRight: '1px solid',
        textAlign: 'center',
        borderColor: theme.palette.divider,
        "&:hover": {
            fontWeight: "bold",
        }
    })
);

const StyledTextFieldCell = styled(TableCell)(
    ({ theme }) => ({
        maxWidth: "200px",
        borderRight: '1px solid',
        textAlign: 'center',
        borderColor: theme.palette.divider,
    })
);

const styleIconButtonLink = {
    margin: "0px",
    padding: "0px",
    fontSize: "0px",
}

//RETURN DATA
//return database data
const checkDatabaseDataInTable = (columns, column, cell) => {
    if(cell){
        if(columns[column] === "bool") {
            if(cell === true) {
                return <CheckIcon color='success' />
            } else {
                return <CloseIcon color="error" />
            }
        }

        if(columns[column] === "image") {
            return <img src={`${cell}`} style={imageStyle} alt="image"  />
        } 

        if(columns[column] === "date" || columns[column] === "dateTime") {
            return DateHelper.formattedDate(cell)
        }

        if(columns[column] === "decimal") {
            return `${cell}$`
        }

        return cell
    }else {
        if(columns[column] === "image") {
            return <img loading='lazy' src={`${businessman}`} style={imageStyle} alt="image"  />
        } else {
            return <CloseIcon color="error" />
        }
    }
}

const getConvenientTextfield = (setShowTextField, columns, column, cell, handleChangeData, row, handleEnterKeyDown, setRowData) => {
    if(cell !== null){
        if (column === "id") return "Can't Update The Id";
        if(columns[column] === "bool") {
            return (

                            <Switch 
                            onChange={(event) => handleChangeData(event, columns[column], setRowData)}
                            onKeyDown={(event) => handleEnterKeyDown(event, columns[column], row, setShowTextField)}
                            name={column}
                            checked={cell}
                            // error={errors?.is_admin ? true : false}
                            // helperText={errors?.is_admin ? errors.is_admin : ''}
                            />

            )
            
        }

        if(columns[column] === "image" || columns[column] === "file") {
            return "Can't update"
        } 

        if(columns[column] === "date" || columns[column] === "dateTime") {
            return <TextField
                    focused
                    type='date'
                    fullWidth
                    label={StringHelper.capitalizeEachWord(column.split("_").join(" "))}
                    name={column}
                    value={cell}
                    onChange={(event) => handleChangeData(event, columns[column], setRowData)}
                    onKeyDown={(event) => handleEnterKeyDown(event, columns[column], row, setShowTextField)}
                    color="primary"
                    required
                    size="small"
                    // error={data?.error ? true : false}
                    // helperText={data?.error ? data.error : ''}
                    />
        }

        if(columns[column] === "decimal") {
            return <TextField
                    label={StringHelper.capitalizeEachWord(column.split("_").join(" "))}
                    // sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    name={column}
                    value={cell}
                    onChange={(event) => handleChangeData(event, columns[column], setRowData)}
                    onKeyDown={(event) => handleEnterKeyDown(event, columns[column], row, setShowTextField)}
                />
        }

        if(columns[column] === "int") {
            return <TextField
                    type="number"
                    label={StringHelper.capitalizeEachWord(column.split("_").join(" "))}
                    size="small"
                    name={column}
                    value={cell}
                    onChange={(event) => handleChangeData(event, columns[column], setRowData)}
                    onKeyDown={(event) => handleEnterKeyDown(event, columns[column], row, setShowTextField)}
                    // error={data?.error ? true : false}
                    // helperText={data?.error ? data.error : ''}
                    />
                
        }

        if(columns[column] === "string" || columns[column] === "text" || columns[column] === "email") {
            return <TextField
            label={StringHelper.capitalizeEachWord(column.split("_").join(" "))}
            size="small"
            name={column}
            value={cell}
            onChange={(event) => handleChangeData(event, columns[column], setRowData)}
            onKeyDown={(event) => handleEnterKeyDown(event, columns[column], row, setShowTextField)}
            // error={data?.error ? true : false}
            // helperText={data?.error ? data.error : ''}
            />
        }

        if(columns[column] === "mobileNumber") {
            return <TextField
            label={StringHelper.capitalizeEachWord(column.split("_").join(" "))}
            size="small"
            name={column}
            value={cell}
            onChange={(event) => handleChangeData(event, columns[column], setRowData)}
            inputProps={{ maxLength: 14 }}
            onKeyDown={(event) => handleEnterKeyDown(event, columns[column], row, setShowTextField)}
            // error={data?.error ? true : false}
            // helperText={data?.error ? data.error : ''}
            />
        }

    }else {
        if(columns[column] === "image") {
            return <img loading='lazy' src={`${businessman}`} style={imageStyle} alt="image"  />
        } else {
            return <CloseIcon color="error" />
        }
    }
}

const CustomTableRow = (props) => {
    const {
        selectedState,
        row,
        appearedDataCount,
        filteredColumnsArray,
        handleChangeData,
        handleEnterKeyDown
    } = props

    //Cells Ref
    const tableBodyRef = useRef(null);

    //I get columns object to know the type of each column
    const {columns} = useLoaderData();

    ///States
    //make another state for row, to give the ability to change the cell directly, the data will change in database when press Enter
    const [rowData, setRowData] = useState(row);

    const [selected, setSelected, setIsHeaderCheckboxChecked] = selectedState
    const [showAllCell, setShowAllCell] = useState(null)
    const [showTextField, setShowTextField] = useState(null)
    //when press outside the table content showAllCell will set as null
    useEffect(() => {
            const handleOutsideClick = (event) => {
            const clickedElement = event.target;
        
            if (tableBodyRef.current && !tableBodyRef.current.contains(clickedElement)) {
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
        setSelected(updatedUsersWillDelete);
        // Update the header checkbox state based on the selected row checkboxes
        setIsHeaderCheckboxChecked(
            updatedUsersWillDelete.length === appearedDataCount
        );
    };

    const handleShowAllCell = (cell_index) => {
        setShowAllCell(() => cell_index)
        setShowTextField(null)
    }

    const handleShowTextField = (cell_index) => {
        setShowTextField(() => cell_index)
        setShowAllCell(null);
    }


    
    return (
        <StyledCustomTableRow ref={tableBodyRef}>
            <StyledTableCell
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
            </StyledTableCell>
            {filteredColumnsArray.map((column, colIndex) => (
                showAllCell === `${rowData.id}-${colIndex}` ? (
                    // Content to render when showAllCell is true
                    <Fade key={`${rowData.id}-${colIndex}`} in={showAllCell === `${rowData.id}-${colIndex}`}>
                        <StyledTableCellShowAllData onClick={() => handleShowTextField(`${rowData.id}-${colIndex}`)}>
                            {checkDatabaseDataInTable(columns, column, rowData[column])}
                        </StyledTableCellShowAllData>
                    </Fade>
                ) : showTextField === `${rowData.id}-${colIndex}` ? (
                    // Content to render when showTextField is true
                    <StyledTextFieldCell key={`${rowData.id}-${colIndex}`}>
                        {
                            getConvenientTextfield(setShowTextField, columns, column, rowData[column], handleChangeData, rowData, handleEnterKeyDown, setRowData)
                        }
                    </StyledTextFieldCell>
                    
                ) : (
                    // Content to render when showAllCell and showTextField are false
                    <StyledNormalCell
                        onClick={() => handleShowAllCell(`${rowData.id}-${colIndex}`)}
                        key={`${rowData.id}-${colIndex}`}
                    >
                        {checkDatabaseDataInTable(columns, column, rowData[column])}
                    </StyledNormalCell>
                )
            ))}
        </StyledCustomTableRow>
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