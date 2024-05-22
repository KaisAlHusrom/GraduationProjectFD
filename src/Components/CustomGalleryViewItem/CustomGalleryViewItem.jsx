//React
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'

import {
    
} from 'react-redux'

//images
import businessman from "../../Assets/Images/kais_image.jpeg"
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
//Components


//MUI
import {
    Box,
    Checkbox,
    Fade,
    Grid,
    IconButton,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { NavLink, useLoaderData } from 'react-router-dom'
import ViewDataHelper from '../../Helpers/ViewDataHelper'
import { useMyContext } from '../DatabaseView/DatabaseView';
import { useTheme } from '@emotion/react';
import StringHelper from '../../Helpers/StringsHelper';

//Styled Components
const StyledCustomGalleryViewItem = styled(Grid)(
    ({ theme }) => ({
        border: "1px solid",
        borderColor: theme.palette.divider,
        padding: theme.spacing(),
        position: 'relative',
        // backgroundColor: theme.palette.primary.main,
        borderRadius: "10px",
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: theme.spacing(),
        transition: theme.transitions.create(['background-color', 'opacity'], {
            duration: theme.transitions.duration.short
        }),
        "&:hover": {
            backgroundColor: theme.palette.action.hover,
            opacity: "0.8",
            "& .MuiBox-root": {
                opacity: "1"
            }
        },
        
    })
)



const StyledPreviewBox = styled(Box)(
    () => ({
        width: '100%',
        height: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        "& img": {
            width: '100%',
            height: '100%',
            borderRadius: "20px"
        }
    })
);

const StyledDataBox = styled(Box)(
    () => ({
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
        width: "95%",
    })
);


const StyledColumnsDataBox = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        gap: theme.spacing(),
        position: 'relative',
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

const styleIconButtonLink = {
    margin: "0px",
    // padding: "0px",
    fontSize: "0px",
}



//return database data
const {getAppropriateTextField, checkDatabaseDataInTable} = ViewDataHelper

const CustomGalleryViewItem = (props) => {
    const {
        selectedState,
        row,
        appearedDataCount,
        filteredColumnsArray,
        handleChangeData,
        handleEnterKeyDown,
        lastRowRef
    } = props

    //view settings
    //I don't put a condition if null, because I solved it in DatabaseView component
    const {viewsSettings} = useMyContext()
    const {
        showHeaders,
        showItemImage,
        contentPosition,
    } = viewsSettings.gallery
    const currentPosition = contentPosition.find((item) => item.value)?.name
    //selectedColor

    //Cells Ref
    const galleryItemRef = useRef(null);

    //I get columns object to know the type of each column, and the relationships
    const {columns, relationships, handleCellOutsideClick, disableUpdate} = useMyContext();



    ///States
    //make another state for row, to give the ability to change the cell directly, the data will change in database when press Enter
    const [galleryItemData, setGalleryItemData] = useState(() => row);
    // I add the useEffect because when change hidden column to be appear, the data of them be null, for this I wanted to update the 
    // rowData when row changed.
    useEffect(()=> {
        setGalleryItemData(() => row)
    }, [row]) 

    const [selected, setSelected, setIsHeaderCheckboxChecked] = selectedState
    const [showAllCell, setShowAllCell] = useState(null)
    const [showTextField, setShowTextField] = useState(null)
    //when press outside the table content showAllCell will set as null
    useEffect(() => {
            const handleOutsideClick = (event) => {
                const clickedElement = event.target;
                const withoutClasses = ['.MuiAutocomplete-option', '.MuiModal-root']
                
                handleCellOutsideClick(galleryItemRef, clickedElement, withoutClasses, setShowAllCell, setShowTextField, galleryItemData)
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

    //Styles
    const theme = useTheme()

    const StyledHeadersBox = {
        display: showHeaders ? "flex" : "none",
        flexDirection: 'column',
        alignItems: "center",
        gap: theme.spacing(),
        "& h6": {
            fontWeight: "bold",
        },
    }


    const StyleDataBox =  {
        display: 'flex',
        justifyContent: "space-between",
        flexDirection: showHeaders ? "row" : "column",
        alignItems: showHeaders ? "center" : (currentPosition === "left" ? "flex-start" : currentPosition === "center" ? "center" : "flex-end"),
        width: "95%",
    }

    const styleDataTypo = {
        whiteSpace: "nowrap",
        overflow: "hidden",
        width: showHeaders ? "100px" : "250px",
        textOverflow: "ellipsis",
        display: "flex",
        justifyContent: currentPosition === "left" ? "flex-start" : currentPosition === "center" ? "center" : "flex-end",
    }

    const styleShowAllDataTypo = useMemo(() => {
        return {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(2),
            borderRadius: theme.spacing(2),
            position: "sticky",
            zIndex: 500,
            width: showHeaders ? "150px" : "250px",
            maxHeight: "100px",
            overflowX: "auto",
            display: "flex",
            justifyContent: currentPosition === "left" ? "flex-start" : currentPosition === "center" ? "center" : "flex-end",
        }
    }, [currentPosition, showHeaders, theme])

    const styleTextFieldTypo = useMemo(() => {
        return {
            width: showHeaders ? "120px" :"250px",
            display: "flex",
            zIndex: 500,
            justifyContent: currentPosition === "left" ? "flex-start" : currentPosition === "center" ? "center" : "flex-end",
        }
    }, [currentPosition, showHeaders])

    const StyledCheckboxBox = useMemo(()=> {
        return {
            position: 'absolute',
            left: 5,
            top: 5,
            zIndex: 100,
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            alignItems: 'center',
            width: "fit-content",
            borderRadius: "15px",
            opacity: selected.includes(galleryItemData[Object.keys(columns).find(key => columns[key] === "pk")]) ? "1" : "0",
            transition: theme.transitions.create(['background-color', 'opacity'], {
                duration: theme.transitions.duration.short
            }),
            "&:hover": {
                backgroundColor: theme.palette.background.paper,
            }
        }
    }, [theme.palette.background.paper, theme.transitions, selected, galleryItemData, columns])

    return (
        <StyledCustomGalleryViewItem  ref={galleryItemRef} item xxs={12} sm={4} md={3} lg={3} xl={3}>
            <Box ref={lastRowRef}  sx={StyledCheckboxBox}>
                <Checkbox 
                size='small'
                checked={selected.includes(galleryItemData[Object.keys(columns).find(key => columns[key] === "pk")])}
                onChange={(event) => handleRowCheckboxChange(event, galleryItemData[Object.keys(columns).find(key => columns[key] === "pk")])}
                name='checkbox'
                id='checkbox'
                />
                <IconButton 
                disableRipple
                sx={styleIconButtonLink}>
                    <StyledNavLink 
                        to={`${galleryItemData[Object.keys(columns).find(key => columns[key] === "pk")]}`}
                        >
                        <OpenInNewIcon />
                    </StyledNavLink>
            </IconButton>
            </Box>
            {filteredColumnsArray.map((column, colIndex) => {
                const cellKey = `${galleryItemData.id}-${colIndex}`;
                return (
                    <Fragment key={cellKey}>
                        {columns[column] === "image" && (
                            <StyledPreviewBox key={cellKey}>
                                {checkDatabaseDataInTable(columns, column, galleryItemData[column], undefined, relationships)}
                            </StyledPreviewBox>
                        )}
                        <StyledDataBox sx={StyleDataBox}>
                            <Box sx={StyledHeadersBox}>
                                {columns[column] !== "image" && (
                                    <Typography component="h6" variant="subtitle1">
                                        {StringHelper.capitalizeEachWord(column.split("_").join(" "))}
                                    </Typography>
                                )}
                            </Box>
                            <StyledColumnsDataBox>
                                {showHeaders ? (
                                    showAllCell === cellKey
                                    ?
                                        (
                                            <Fade in={showAllCell === cellKey}>
                                                <Box onClick={()=>handleShowTextField(cellKey)} sx={styleShowAllDataTypo} variant="body1">
                                                    {columns[column] !== "image" && checkDatabaseDataInTable(columns, column, galleryItemData[column], showAllCell, relationships)}
                                                </Box>
                                            </Fade>
                                        )
                                    :
                                    showTextField === cellKey && !disableUpdate
                                    ?
                                            (
                                                <Fade in={showTextField === cellKey}>
                                                    <Box sx={styleTextFieldTypo} variant="body1">
                                                        {columns[column] !== "image" && getAppropriateTextField(setShowTextField, columns, column, galleryItemData[column], handleChangeData, galleryItemData, handleEnterKeyDown, setGalleryItemData, relationships)}
                                                    </Box>
                                                </Fade>
                                            )
                                    :
                                        (
                                        <Box onClick={()=>handleShowAllCell(cellKey)} sx={styleDataTypo} variant="body1">
                                            {columns[column] !== "image" && checkDatabaseDataInTable(columns, column, galleryItemData[column], showAllCell, relationships)}
                                        </Box>
                                        )
                                ) : (
                                    showAllCell === cellKey
                                    ?
                                        (
                                            <Fade in={showAllCell === cellKey}>
                                                <Box onClick={()=>handleShowTextField(cellKey)} sx={styleShowAllDataTypo} variant="body1">
                                                    {columns[column] !== "image" && checkDatabaseDataInTable(columns, column, galleryItemData[column], showAllCell, relationships)}
                                                </Box>
                                            </Fade>
                                        )
                                    :
                                    showTextField === cellKey && !disableUpdate
                                    ?
                                            (
                                                <Fade in={showTextField === cellKey}>
                                                    <Box sx={styleTextFieldTypo} variant="body1">
                                                        {columns[column] !== "image" && getAppropriateTextField(setShowTextField, columns, column, galleryItemData[column], handleChangeData, galleryItemData, handleEnterKeyDown, setGalleryItemData)}
                                                    </Box>
                                                </Fade>
                                            )
                                    :
                                        (
                                        <Tooltip title={column} placement='left'>
                                            <Box onClick={()=>handleShowAllCell(cellKey)} sx={styleDataTypo} variant="body1">
                                                {columns[column] !== "image" && checkDatabaseDataInTable(columns, column, galleryItemData[column], showAllCell, relationships)}
                                            </Box>
                                        </Tooltip>
                                        )
                                )}
                            </StyledColumnsDataBox>
                        </StyledDataBox>
                    </Fragment>
                );
            })}

            
        </StyledCustomGalleryViewItem>
    );
};

CustomGalleryViewItem.propTypes = {
    selectedState: propTypes.array,
    row: propTypes.object.isRequired,
    appearedDataCount: propTypes.number,
    filteredColumnsArray: propTypes.array.isRequired,
    handleChangeData: propTypes.func,
    handleEnterKeyDown: propTypes.func,
}

export default CustomGalleryViewItem;