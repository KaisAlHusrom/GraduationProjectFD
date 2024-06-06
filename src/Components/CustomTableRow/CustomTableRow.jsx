//React
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'

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
import { NavLink } from 'react-router-dom';

import { useMyContext } from '../DatabaseView/DatabaseView'
import ViewDataHelper from '../../Helpers/ViewDataHelper'
import { useTheme } from '@emotion/react';
import CustomModal from '../CustomModal/CustomModal';
import ImageUpdateInput from '../../Pages/Admin/Components/ImageUpdateInput/ImageUpdateInput';
import UploadFileButton from '../UploadFileButton/UploadFileButton';
import VideoUpdateInput from '../../Pages/Admin/Components/VideoUpdateInput/VideoUpdateInput';




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
        handleEnterKeyDown,
        lastRowRef
    } = props

    const [modalOpen, setModalOpen] = useState(false)
    useEffect(() => {
        if(modalOpen === false) {
            setShowTextField(() => null);
        }
    }, [modalOpen])

    //view settings
    //I don't put a condition if null, because I solved it in DatabaseView component
    const {viewsSettings, disableUpdate} = useMyContext()
    const {
        showVerticalLines,
        showHorizontalLines,
        changeEvenRowsBackgroundColor,
        selectEvenRowsBackgroundColor,
    } = viewsSettings.table
    //selectedColor
    const selectedColor = useMemo(()=> {
        return selectEvenRowsBackgroundColor
    }, [selectEvenRowsBackgroundColor])

    //Cells Ref
    const tableBodyRef = useRef(null);

    //I get columns object to know the type of each column
    const {columns} = useMyContext();

    //Relations
    const {relationships} = useMyContext();

    //files states
    const [uploadProgress, setUploadProgress] = useState(0);
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState(0);

    ///States
    //make another state for row, to give the ability to change the cell directly, the data will change in database when press Enter
    const [rowData, setRowData] = useState(() => row);
    // I add the useEffect because when change hidden column to be appear, the data of them be null, for this I wanted to update the 
    // rowData when row changed.
    useEffect(()=> {
        setRowData(() => row)
    }, [row]) 

    //get the id of row
    const pkColumnData = useMemo(() => {
        return rowData[Object.keys(columns).find(key => columns[key] === "pk")]
    }, [columns, rowData]);


    const [selected, setSelected, setIsHeaderCheckboxChecked] = useMemo(()=> selectedState, [selectedState])
    const [showAllCell, setShowAllCell] = useState(null)
    const [showTextField, setShowTextField] = useState(null)
    const {handleCellOutsideClick} = useMyContext()
    //when press outside the table content showAllCell will set as null
    useEffect(() => {
        const handleOutsideClick = (event) => {
            const clickedElement = event.target;
            const withoutClasses = ['.MuiAutocomplete-option', '.MuiModal-root']
            
            handleCellOutsideClick(tableBodyRef, clickedElement, withoutClasses, setShowAllCell, setShowTextField, rowData)
        }
        document.body.addEventListener('mousedown', handleOutsideClick);
        
        return () => {
        document.body.removeEventListener('mousedown', handleOutsideClick);
        };

    }, [handleCellOutsideClick, rowData]);

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

    const handleShowTextField = (cell_index, type) => {
        if(type === 'image' || type === "file" || type === "image:video") {
            setModalOpen(() => true);
        }

        setShowTextField(() => cell_index)
        setShowAllCell(() => null);
    }

    //images folder name
    const {imagesFolderName, filesFolderName} = useMyContext()

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
                minWidth: "200px",
                maxWidth: "400px",
                overflow: 'hidden',
                borderRight: showVerticalLines ? '1px solid' : 'none',
                textAlign: 'center',
                borderColor: theme.palette.divider,
            }
        }, [showVerticalLines, theme.palette.divider]);

        const StyledRelativeBox = useMemo(() => {
            return {
                width: "200px",
                height: "200px",
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
        <>
            <TableRow sx={StyledCustomTableRow} ref={lastRowRef}>
                <TableCell
                sx={StyledTableCell}
                >
                    
                <Checkbox 
                checked={selected.includes(rowData[Object.keys(columns).find(key => columns[key] === "pk")])}
                onChange={(event) => handleRowCheckboxChange(event, rowData[Object.keys(columns).find(key => columns[key] === "pk")])}
                />

                <IconButton 
                disableRipple
                sx={styleIconButtonLink}>
                    <StyledNavLink 
                        to={`${rowData[Object.keys(columns).find(key => columns[key] === "pk")]}`}
                        >
                        <OpenInNewIcon />
                    </StyledNavLink>
                </IconButton>
                </TableCell>
                {filteredColumnsArray.map((column, colIndex) => (
                    showAllCell === `${rowData.id}-${colIndex}` ? (
                        // Content to render when showAllCell is true
                        
                        <Fade key={`${rowData.id}-${colIndex}`} in={showAllCell === `${rowData.id}-${colIndex}`}>
                            <TableCell ref={tableBodyRef} sx={StyledTableCellShowAllData} onClick={() => handleShowTextField(`${rowData.id}-${colIndex}`, columns[column])}>
                                <Box sx={StyledRelativeBox}>
                                {checkDatabaseDataInTable(columns, column, rowData[column], showAllCell, relationships, imagesFolderName, filesFolderName)}
                                </Box>
                            </TableCell>
                        </Fade>
                    ) : showTextField === `${rowData.id}-${colIndex}` && !disableUpdate ? (
                        // Content to render when showTextField is true
                        <Fragment key={`${rowData.id}-${colIndex}`}>
                            <TableCell ref={tableBodyRef} sx={StyledTextFieldCell} key={`${rowData.id}-${colIndex}`}>
                                {
                                    getAppropriateTextField(setShowTextField, columns, column, rowData[column], handleChangeData, rowData, handleEnterKeyDown, setRowData, relationships, pkColumnData)
                                }
                            </TableCell>
                            {
                                columns[column] === "image"
                                ?
                                <CustomModal 
                                title={"Update Image"} 
                                modalOpenState={[modalOpen, setModalOpen]}
                                // modalIcon={modalIcon}
                                >
                                    {
                                    <ImageUpdateInput
                                    customHandleChange={(event) => handleChangeData(event, 'image', setRowData, null, null)}
                                    column={column}
                                    value={rowData[column]}
                                    />
                                    }
                                </CustomModal>
                                : columns[column] === "file"
                                ?
                                <CustomModal 
                                title={"Update File"} 
                                modalOpenState={[modalOpen, setModalOpen]}
                                // modalIcon={modalIcon}
                                >
                                    {
                                    <UploadFileButton 
                                    customOnChange={(event) => handleChangeData(event, 'file', setRowData, null, null, {setFileName, setFileSize, setUploadProgress})}
                                    label={column + "File"}
                                    value={rowData[column]}
                                    name={column}
                                    fileStates={{fileName, setFileName, fileSize, setFileSize, uploadProgress, setUploadProgress}}
                                />
                                    }
                                </CustomModal>
                                : columns[column] === "image:video"
                                ?
                                <CustomModal 
                                title={"Update Image"} 
                                modalOpenState={[modalOpen, setModalOpen]}
                                // modalIcon={modalIcon}
                                >
                                    {
                                    rowData[column] instanceof File ? rowData[column]?.name?.match(/\.(mp4|webm|ogg)$/i) : rowData[column]?.match(/\.(mp4|webm|ogg)$/i)
                                    ?
                                        <VideoUpdateInput
                                            customHandleChange={(event) => handleChangeData(event, 'image:video', setRowData, null, null)}
                                            column={column}
                                            value={rowData[column]}
                                        />
                                    :
                                        <ImageUpdateInput
                                            customHandleChange={(event) => handleChangeData(event, 'image:video', setRowData, null, null)}
                                            column={column}
                                            value={rowData[column]}
                                        />
                                    }
                                </CustomModal>
                                :null
                            }
                        </Fragment>
                        
                    ) : (
                        // Content to render when showAllCell and showTextField are false
                        <TableCell
                            sx={StyledNormalCell}
                            onClick={() => handleShowAllCell(`${rowData.id}-${colIndex}`)}
                            key={`${rowData.id}-${colIndex}`}
                            ref={tableBodyRef}
                        >
                            {checkDatabaseDataInTable(columns, column, rowData[column], undefined, relationships, imagesFolderName, filesFolderName)}
                        </TableCell>
                    )
                ))}
            </TableRow>
            
        </>
    );
};

CustomTableRow.propTypes = {
    selectedState: propTypes.array,
    row: propTypes.object.isRequired,
    appearedDataCount: propTypes.number,
    filteredColumnsArray: propTypes.array.isRequired,
    handleChangeData: propTypes.func,
    handleEnterKeyDown: propTypes.func,
    lastRowRef: propTypes.any,
}

export default CustomTableRow;