import { Autocomplete, Divider, InputAdornment, List, ListItem,  ListItemText , Rating, Switch, TextField, TextareaAutosize, Typography } from "@mui/material"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { styled } from '@mui/system'

//icons
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import DateHelper from "./DateHelper";


//images
//images
import noPicture from "../Assets/Images/no-pictures.png"
import StringHelper from "./StringsHelper";
import { Fragment } from "react";
import {  RelationTextField } from "../Components";

//get server api
import config from "../../Config.json";



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
const checkDatabaseDataInTable = (columns, column, cell, showAllCell, relations, imagesFolder) => {
    const {manyToMany, manyToOne, oneToMany} = relations
    if(cell){
        if(columns[column] === "bool") {
            if(cell === true) {
                return <CheckIcon color='success' />
            } else {
                return <CloseIcon color="error" />
            }
        }

        if(columns[column] === "image") {
            const stylePropRoute = cell.startsWith("data") ? cell : `${config.ServerImageRoute}/${imagesFolder}/${cell}`;
            return <img src={`${stylePropRoute}`} style={imageStyle} alt="image"  />
        } 

        if(columns[column] === "rate") {
            return <Rating name="read-only" value={cell} readOnly />
        } 

        if(columns[column] === "date" || columns[column] === "dateTime") {
            return DateHelper.formattedDate(cell)
        }

        if(columns[column] === "decimal") {
            return `${cell}$`
        }

        if(columns[column] === "one-to-many") {
            if(cell.length === 0) {
                return <CloseIcon color="error" />
            }
            const listStyle = {
                maxHeight: "100px",
                // overflow: "auto",
            }
            const listItemTextStyle = {
                "& .MuiTypography-root": {
                    minWidth: "80px",
                    maxWidth: "200px",
                    overflow: 'hidden', 
                    whiteSpace: 'nowrap', 
                    textOverflow: 'ellipsis',
                    textAlign: 'center',
                    "&:hover": {
                        fontWeight: "bold",
                    },
                }
                
            }
            const row = oneToMany.filter(relation => relation["field_name"] === column)[0]
            return (
                <List sx={listStyle}>
                    
                    {
                        showAllCell
                        ?
                        cell.map((item, key) => {
                            return (
                                <Fragment key={key}>
                                    <ListItem>
                                        <ListItemText primary={

                                            item[row["fetched_column"]]
                                        } />
                                    </ListItem>
                                    <Divider />
                                </Fragment>

                            )
                        })
                        :
                        (
                            <ListItem>
                                <ListItemText sx={listItemTextStyle} primary={
                                    cell[0][row["fetched_column"]]
                                } />
                            </ListItem>
                        )
                    }
                </List>
            )
        }

        if(columns[column] === "many-to-many") {
            if(cell.length === 0) {
                return <CloseIcon color="error" />
            }
            const listStyle = {
                maxHeight: "100px",
                // overflow: "auto",
            }
            const listItemTextStyle = {
                "& .MuiTypography-root": {
                    minWidth: "80px",
                    maxWidth: "200px",
                    overflow: 'hidden', 
                    whiteSpace: 'nowrap', 
                    textOverflow: 'ellipsis',
                    textAlign: 'center',
                    "&:hover": {
                        fontWeight: "bold",
                    },
                }
                
            }
            const row = manyToMany.filter(relation => relation["field_name"] === column)[0]
            return (
                <List sx={listStyle}>
                    
                    {
                        showAllCell
                        ?
                        cell.map((item, key) => {
                            return (
                                <Fragment key={key}>
                                    <ListItem>
                                        <ListItemText primary={item[row["fetched_column"]]} />
                                    </ListItem>
                                    <Divider />
                                </Fragment>
                            )
                        })
                        :
                        (
                            <ListItem>
                                <ListItemText  sx={listItemTextStyle} primary={cell[0][row["fetched_column"]]} />
                            </ListItem>
                        )
                    }
                </List>
            )
        }

        if(columns[column] === "many-to-one") {
            const row = manyToOne.filter(relation => relation["field_name"] === column)[0]

            return cell[row["fetched_column"]]
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

const getAppropriateTextField = (
    setShowTextField, 
    columns, 
    column, 
    cell, 
    handleChangeData, 
    row, 
    handleEnterKeyDown, 
    setRowData, 
    relations,
    pkColumnData
    ) => {
    const type = columns[column].split('|')[0]
    const values = type === "enum" ? columns[column].split('|')[1].split(",") : null;
    

    const changeFunc = (event) => handleChangeData(event, type, setRowData, null, null); 
    const enterKeyDownFunc = (event) => handleEnterKeyDown(event, columns[column], row, setShowTextField)

    // if(cell !== null){


        if (columns[column] === "pk") return <Typography color="error" variant='body2'>Can not Update The Id</Typography>;
        if (columns[column] === "dateTime") return <Typography color="error" variant='body2'>Can not Update Timestamp fields</Typography>;
        if (columns[column] === "one-to-many") return <Typography color="error" variant='body2'>Can not Update has many fields</Typography>;
        
        if(columns[column] === "file") {
            return <Typography color="error" variant='body2'>Ca not Update folders fields</Typography>
        } 

        if (columns[column] === "image") {
            return <Typography color="info.main" variant='body2'>Updating...</Typography>;
        }
        
        if(type === "enum") {
            return <Autocomplete
                    disablePortal
                    options={values}
                    fullWidth
                    size="small"
                    value={cell}
                    onChange={(event, newValue) => handleChangeData(event, type, setRowData, column, newValue)}
                    renderInput={(params) => <TextField {...params} label={column} />}
                />
        }

        if(columns[column] === "rate") {
            return <Rating

                value={cell}
                onChange={changeFunc}
                // onKeyDown={enterKeyDownFunc}            
        />
        } 

        if(columns[column] === "bool") {
            return (
                            <Switch 
                            onChange={changeFunc}
                            onKeyDown={enterKeyDownFunc}
                            name={column}
                            checked={cell}
                            id="switch"
                            // error={errors?.is_admin ? true : false}
                            // helperText={errors?.is_admin ? errors.is_admin : ''}
                            />
            )
            
        }

        if(columns[column] === "date") {
            return <DatePicker 
                        type='date'
                        name={column}
                        value={dayjs(cell)}
                        onChange={changeFunc}
                        onKeyDown={enterKeyDownFunc}
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
                    onChange={changeFunc}
                    onKeyDown={enterKeyDownFunc}
                    size="small"
                />
        }

        if(columns[column] === "int") {
            return <StyledTextField
                    type="number"
                    size="small"
                    name={column}
                    value={cell}
                    onChange={changeFunc}
                    onKeyDown={enterKeyDownFunc}
                    // error={data?.error ? true : false}
                    // helperText={data?.error ? data.error : ''}
                    />
                
        }

        if(columns[column] === "string" || columns[column] === "email" || columns[column] === "password") {
            return <StyledTextField
            size="small"
            name={column}
            value={cell}
            onChange={changeFunc}
            onKeyDown={enterKeyDownFunc}
            />
        }

        if(columns[column] === "text") {
            return <StyledTextArea
                minRows={3} // Adjust the minimum number of rows as needed
                maxRows={5} // Adjust the maximum number of rows as needed
                placeholder={StringHelper.capitalizeEachWord(column.split("_").join(" "))}
                name={column}
                value={cell ? cell : ""}
                onChange={changeFunc}
                onKeyDown={enterKeyDownFunc}
                
                />
        }

        if(columns[column] === "mobileNumber") {
            return <StyledTextField
            size="small"
            name={column}
            value={cell}
            inputProps={{ maxLength: 14 }}
            onChange={changeFunc}
            onKeyDown={enterKeyDownFunc}
            // error={data?.error ? true : false}
            // helperText={data?.error ? data.error : ''}
            />
        }


        if(columns[column] === "many-to-many" || columns[column] === "many-to-one") {
            return (
                                <RelationTextField
                                    relationType={columns[column]}
                                    columnName ={column}
                                    relations={relations}
                                    originalData={cell}
                                    setShowTextField={setShowTextField}
                                    handleChangeData={handleChangeData}
                                    handleEnterKeyDown={handleEnterKeyDown}
                                    setNewData={setRowData}
                                    pkColumnData={pkColumnData}
                                    row={row}
                                />  
                            )
        }
        

    }
    // else {
    //     if(columns[column] === "image" || columns[column] === "file") {
    //         return <Typography color="info.main" variant='body2'>Updating...</Typography>;
    //     } else {
    //         if(columns[column] === "many-to-many" || columns[column] === "many-to-one" || columns[column] === "one-to-many") {
    //             return (
    //                                 <RelationTextField
    //                                     relationType={columns[column]}
    //                                     columnName ={column}
    //                                     relations={relations}
    //                                     originalData={cell}
    //                                     setShowTextField={setShowTextField}
    //                                     handleChangeData={handleChangeData}
    //                                     handleEnterKeyDown={handleEnterKeyDown}
    //                                     setNewData={setRowData}
    //                                     pkColumnData={pkColumnData}
    //                                     row={row}
    //                                 />  
    //                             )
    //         }

    //         if(type === "enum") {
    //             return <Autocomplete
    //                 disablePortal
    //                 options={values}
    //                 fullWidth
    //                 size="small"
    //                 value={cell}
    //                 onChange={(event, newValue) => handleChangeData(event, type, setRowData, column, newValue)}
    //                 renderInput={(params) => <TextField {...params} label={column} />}
    //             />
    //         }

    //         if(type === "int") {
    //             return <StyledTextField
    //                 type="number"
    //                 size="small"
    //                 name={column}
    //                 value={cell}
    //                 onChange={changeFunc}
    //                 onKeyDown={enterKeyDownFunc}
    //                 // error={data?.error ? true : false}
    //                 // helperText={data?.error ? data.error : ''}
    //                 />
    //         }
            
    //         return <CloseIcon color="error" />
    //     }
    // }


const ViewDataHelper = {
    checkDatabaseDataInTable,
    getAppropriateTextField
}

export default ViewDataHelper