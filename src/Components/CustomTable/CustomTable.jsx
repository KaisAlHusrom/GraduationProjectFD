//React
import {  } from 'react'

import {
    
} from 'react-redux'

//Components

//Helpers
import DateHelper from "../../Helpers/DateHelper"


//images
import businessman from "../../Assets/Images/businessman.png"

//MUI
import {
    TableContainer,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
    Checkbox,
    Table,
    IconButton,
} from '@mui/material'
import { styled } from '@mui/system'
import { useTheme } from '@emotion/react'

//icons
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

//propTypes 
import propTypes from 'prop-types'
import { NavLink, useLoaderData } from 'react-router-dom'


//Styled Components
const StyledCustomTable = styled(TableContainer)(
    ({ theme }) => ({
        border: "1px solid",
        borderColor: theme.palette.divider,
        maxHeight: "530px"
    })
)

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

        return cell
    }else {
        if(columns[column] === "image") {
            return <img src={`${businessman}`} style={imageStyle} alt="image"  />
        } else {
            return <CloseIcon color="error" />
        }
    }
}

const CustomTable = (props) => {
    const {
        showTableHeaders,
        columns,
        rows,
        selectedState
    } = props

    const loaderData = useLoaderData();

    //States
    const [selected, setSelected, setIsHeaderCheckboxChecked] = selectedState

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
            updatedUsersWillDelete.length === rows.length
        );
    };
    
    
    //Styles
    const theme = useTheme()
    const StyleTableRow = {
        cursor: "pointer",

        "&:hover": {
            backgroundColor: theme.palette.action.hover,
        }
    }

    const StyleHeadTableCell = {
        fontSize: theme.typography.h7,
        textTransform: 'capitalize',
        borderRight: '1px solid',
        borderColor: theme.palette.divider,
        textAlign: 'center',
    }

    const StyleTableCell = {
        maxWidth: "150px",
        overflow: 'hidden', 
        whiteSpace: 'nowrap', 
        textOverflow: 'ellipsis',
        borderRight: '1px solid',
        textAlign: 'center',
        borderColor: theme.palette.divider,
        "&:hover": {
            fontWeight: "bold",
        }
    }

    const styleIconButtonLink = {
        margin: "0px",
        padding: "0px",
        fontSize: "0px",
    }


    return (
        <StyledCustomTable>
                    <Table>
                        {
                            showTableHeaders && columns
                            ?
                            <TableHead>
                                <TableRow>
                                <TableCell sx={StyleHeadTableCell}>
                                    Action
                                </TableCell>
                                {columns.length > 0 && columns.map((key, i) => {
                                    return (
                                        <TableCell sx={StyleHeadTableCell} key={i}>
                                            {key.split('_').join(" ")}
                                        </TableCell>
                                    );
                                })}
                                </TableRow>
                                
                            </TableHead>
                            :
                            null
                        }
                        
                        <TableBody>
                            {rows && rows.length > 0 && rows.map((row, rowIndex) => {
                                return (
                                    <TableRow sx={StyleTableRow} key={row.id}>
                                        <TableCell
                                        sx={StyleTableCell}
                                        >
                                            
                                        <Checkbox 
                                        checked={selected.includes(row.id)}
                                        onChange={(event) => handleRowCheckboxChange(event, row.id)}
                                        />
                                        <IconButton 
                                        disableRipple
                                        sx={styleIconButtonLink}>
                                            <StyledNavLink 
                                                to={`${row.id}`}
                                                >
                                                <OpenInNewIcon />
                                            </StyledNavLink>
                                        </IconButton>
                                        </TableCell>

                                        {columns.map((column, colIndex) => (
                                            <TableCell sx={StyleTableCell} key={`${rowIndex}-${colIndex}`}>
                                                {
                                                    checkDatabaseDataInTable(loaderData[0], column, row[column])
                                                }
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
        </StyledCustomTable>
    );
};

CustomTable.propTypes = {
    showTableHeaders: propTypes.bool,
    selectedState: propTypes.array,
    columns: propTypes.array,
    rows: propTypes.array,
}

export default CustomTable;