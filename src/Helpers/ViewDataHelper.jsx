import { InputAdornment, Switch, TextField, TextareaAutosize, Typography } from "@mui/material"
import { styled } from '@mui/system'

//icons
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import DateHelper from "./DateHelper";

//images
//images
import noPicture from "../Assets/Images/no-pictures.png"
import StringHelper from "./StringsHelper";

//Styles
const StyledTextField = styled(TextField)(
    ({ theme }) => ({
        width: "100%",
        border: "none",
        outline: "none",
        background: theme.palette.background.paper,
    })
);

const imageStyle = {
    width: "60px",
    height: "60px",
    objectFit: "contain",
    borderRadius: "50%"
}

const StyledTextArea = styled(TextareaAutosize)(
    ({theme}) => ({
        backgroundColor: theme.palette.background.paper,
        border: "2px solid",
        borderColor: theme.palette.divider,
        resize: "none",
        width: "100%",
        borderRadius: theme.spacing(2),
        color: theme.palette.text.primary,
        outline: "none",
        fontSize: "1rem",
        letterSpacing: "2px",
        padding: theme.spacing(0.5),
        "&:focus": {
            borderColor: theme.palette.primary.main,
        }
    })
)


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
            return <img loading='lazy' src={`${noPicture}`} style={imageStyle} alt="image"  />
        } else {
            return <CloseIcon color="error" />
        }
    }
}

const getConvenientTextfield = (setShowTextField, columns, column, cell, handleChangeData, row, handleEnterKeyDown, setRowData) => {
    if(cell !== null){
        if (column === "id") return <Typography color="error" variant='body2'>Can not Update The Id</Typography>;
        if (columns[column] === "dateTime") return <Typography color="error" variant='body2'>Can not Update Timestamp fields</Typography>;
        
        if(columns[column] === "image" || columns[column] === "file") {
            return <Typography color="error" variant='body2'>Ca not Update folders fields</Typography>
        } 

        if(columns[column] === "bool") {
            return (
                            <Switch 
                            onChange={(event) => handleChangeData(event, columns[column], setRowData)}
                            onKeyDown={(event) => handleEnterKeyDown(event, columns[column], row, setShowTextField)}
                            name={column}
                            checked={cell}
                            id="switch"
                            // error={errors?.is_admin ? true : false}
                            // helperText={errors?.is_admin ? errors.is_admin : ''}
                            />
            )
            
        }

        if(columns[column] === "date") {
            return <StyledTextField
                    type='date'
                    name={column}
                    value={cell}
                    onChange={(event) => handleChangeData(event, columns[column], setRowData)}
                    onKeyDown={(event) => handleEnterKeyDown(event, columns[column], row, setShowTextField)}
                    size="small"
                    id="textField"
                    // error={data?.error ? true : false}
                    // helperText={data?.error ? data.error : ''}
                    />
        }

        if(columns[column] === "decimal") {
            return <StyledTextField
                    InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    name={column}
                    value={cell}
                    onChange={(event) => handleChangeData(event, columns[column], setRowData)}
                    onKeyDown={(event) => handleEnterKeyDown(event, columns[column], row, setShowTextField)}
                    size="small"
                />
        }

        if(columns[column] === "int") {
            return <StyledTextField
                    type="number"
                    size="small"
                    name={column}
                    value={cell}
                    onChange={(event) => handleChangeData(event, columns[column], setRowData)}
                    onKeyDown={(event) => handleEnterKeyDown(event, columns[column], row, setShowTextField)}
                    // error={data?.error ? true : false}
                    // helperText={data?.error ? data.error : ''}
                    />
                
        }

        if(columns[column] === "string" || columns[column] === "email" || columns[column] === "password") {
            return <StyledTextField
            size="small"
            name={column}
            value={cell}
            onChange={(event) => handleChangeData(event, columns[column], setRowData)}
            onKeyDown={(event) => handleEnterKeyDown(event, columns[column], row, setShowTextField)}
            />
        }

        if(columns[column] === "text") {
            return <StyledTextArea
                minRows={3} // Adjust the minimum number of rows as needed
                maxRows={5} // Adjust the maximum number of rows as needed
                placeholder={StringHelper.capitalizeEachWord(column.split("_").join(" "))}
                name={column}
                value={cell}
                onChange={(event) => handleChangeData(event, columns[column], setRowData)}
                onKeyDown={(event) => handleEnterKeyDown(event, columns[column], row, setShowTextField)}
                />
        }

        if(columns[column] === "mobileNumber") {
            return <StyledTextField
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
        if(columns[column] === "image" || columns[column] === "file") {
            return <Typography color="error" variant='body2'>Can not Update folders fields</Typography>
        } else {
            return <CloseIcon color="error" />
        }
    }
}

const ViewDataHelper = {
    checkDatabaseDataInTable,
    getConvenientTextfield
}

export default ViewDataHelper