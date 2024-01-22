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

const StyledCheckboxBox = styled(Box)(
    ({ theme }) => ({
        position: 'absolute',
        left: 5,
        top: 5,
        zIndex: 100,
        backgroundColor: theme.palette.secondary.main,
        display: 'flex',
        alignItems: 'center',
        width: "fit-content",
        borderRadius: "15px",
        opacity: "0",
        transition: theme.transitions.create(['background-color', 'opacity'], {
            duration: theme.transitions.duration.short
        }),
        "&:hover": {
            backgroundColor: theme.palette.background.paper,
        }
    })
);

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
const {getConvenientTextfield, checkDatabaseDataInTable} = ViewDataHelper

const CustomGalleryViewItem = (props) => {
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
        showHeaders,
        showItemImage,
        contentPosition,
    } = viewsSettings.gallery
    const currentPosition = contentPosition.find((item) => item.value)?.name
    //selectedColor

    //Cells Ref
    const galleryItemRef = useRef(null);

    //I get columns object to know the type of each column
    const {columns} = useLoaderData();

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
        
            if (galleryItemRef.current && !galleryItemRef.current.contains(clickedElement)) {
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
        textAlign: currentPosition === "left" ? "left" : currentPosition === "center" ? "center" : "right"
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
            textAlign: currentPosition === "left" ? "left" : currentPosition === "center" ? "center" : "right"
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

    return (
        <StyledCustomGalleryViewItem ref={galleryItemRef} item xxs={12} sm={4} md={3} lg={3} xl={3}>
            <StyledCheckboxBox>
                <Checkbox 
                size='small'
                checked={selected.includes(galleryItemData.id)}
                onChange={(event) => handleRowCheckboxChange(event, galleryItemData.id)}
                name='checkbox'
                id='checkbox'
                />
                <IconButton 
                disableRipple
                sx={styleIconButtonLink}>
                    <StyledNavLink 
                        to="/"
                        >
                        <OpenInNewIcon />
                    </StyledNavLink>
            </IconButton>
            </StyledCheckboxBox>
            {filteredColumnsArray.map((column, colIndex) => {
                const cellKey = `${galleryItemData.id}-${colIndex}`;
                return (
                    <Fragment key={cellKey}>
                        {columns[column] === "image" && (
                            <StyledPreviewBox key={cellKey}>
                                {checkDatabaseDataInTable(columns, column, galleryItemData[column])}
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
                                                <Typography onClick={()=>handleShowTextField(cellKey)} sx={styleShowAllDataTypo} variant="body1">
                                                    {columns[column] !== "image" && checkDatabaseDataInTable(columns, column, galleryItemData[column])}
                                                </Typography>
                                            </Fade>
                                        )
                                    :
                                    showTextField === cellKey
                                    ?
                                            (
                                                <Fade in={showTextField === cellKey}>
                                                    <Box sx={styleTextFieldTypo} variant="body1">
                                                        {columns[column] !== "image" && getConvenientTextfield(setShowTextField, columns, column, galleryItemData[column], handleChangeData, galleryItemData, handleEnterKeyDown, setGalleryItemData)}
                                                    </Box>
                                                </Fade>
                                            )
                                    :
                                        (
                                        <Typography onClick={()=>handleShowAllCell(cellKey)} sx={styleDataTypo} variant="body1">
                                            {columns[column] !== "image" && checkDatabaseDataInTable(columns, column, galleryItemData[column])}
                                        </Typography>
                                        )
                                ) : (
                                    showAllCell === cellKey
                                    ?
                                        (
                                            <Fade in={showAllCell === cellKey}>
                                                <Typography onClick={()=>handleShowTextField(cellKey)} sx={styleShowAllDataTypo} variant="body1">
                                                    {columns[column] !== "image" && checkDatabaseDataInTable(columns, column, galleryItemData[column])}
                                                </Typography>
                                            </Fade>
                                        )
                                    :
                                    showTextField === cellKey
                                    ?
                                            (
                                                <Fade in={showTextField === cellKey}>
                                                    <Box sx={styleTextFieldTypo} variant="body1">
                                                        {columns[column] !== "image" && getConvenientTextfield(setShowTextField, columns, column, galleryItemData[column], handleChangeData, galleryItemData, handleEnterKeyDown, setGalleryItemData)}
                                                    </Box>
                                                </Fade>
                                            )
                                    :
                                        (
                                        <Tooltip title={column} placement='left'>
                                            <Typography onClick={()=>handleShowAllCell(cellKey)} sx={styleDataTypo} variant="body1">
                                                {columns[column] !== "image" && checkDatabaseDataInTable(columns, column, galleryItemData[column])}
                                            </Typography>
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