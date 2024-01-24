//React
import {  } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box, Typography, Button, Tooltip
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

//propTypes 
import propTypes from 'prop-types'
import { useState } from 'react'

//Styled Components
const StyledSetHiddenColumns = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        // alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        [theme.breakpoints.down("xs")] : {
            flexDirection: "column",
            alignItems: "center",
        }
    })
)

const StyledShowHiddenBox = styled(Box)(
    ({ theme }) => ({
        width: '49%', 
        [theme.breakpoints.down("xs")] : {
            width: "100%"
        }
    })
)

const StyledSortColumnsBox = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '49%',
        gap: theme.spacing(),
        [theme.breakpoints.down("xs")] : {
            width: "100%"
        }
    })
)

const StyledColumnsGroup = styled(Box)(
    ({ theme }) => ({
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: theme.spacing(),
        marginBottom: theme.spacing(2),
    })
)

const StyledSortedColumnsGroup = styled(Box)(
    ({ theme }) => ({
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: theme.spacing(),
        borderLeft: '1px solid',
        borderColor: theme.palette.divider,
        [theme.breakpoints.down("xs")] : {
            borderLeft: "0"
        }
    })
)


const StyledButtonsBox = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        gap: theme.spacing(),
        flexWrap: "wrap",
        width: "100%"
    })
)

const StyledButton = styled(Button)(
    ({ theme }) => ({
        borderRadius: "100px",
        border: "1px solid",
        borderColor: theme.palette.divider,
        color: theme.palette.text.primary,
        "&:hover": {
            backgroundColor: theme.palette.primary.main,
        },
        "&:active": {
            backgroundColor: theme.palette.primary.dark,
        }
    })
)

const StyledSortButton = styled(Button)(
    ({ theme }) => ({
        borderRadius: "100px",
        border: "1px solid",
        borderColor: theme.palette.divider,
        color: theme.palette.text.primary,
        "&:hover": {
            backgroundColor: theme.palette.primary.main,
        },
        "&:active": {
            backgroundColor: theme.palette.primary.dark,
        }
    })
)

const StyledTitle = styled(Typography)(
    ({ theme }) => ({
        borderBottom: "1px solid",
        borderColor: theme.palette.divider,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: theme.spacing(),
        paddingTop: theme.spacing(),
        backgroundColor: theme.palette.primary.dark,
        marginBottom: theme.spacing(2),
        color: theme.palette.primary.contrastText,
        borderRadius: theme.spacing(2)
    })
)

const SetHiddenColumns = (props) => {
    const {
        hiddenColumnsState,
        sortedColumnsState,
        columns
    } = props

    //Hidden columns state
    const [hiddenColumns, setHiddenColumns] = hiddenColumnsState
    const columnsArray = Object.keys(columns).filter(column => !hiddenColumns.includes(column));
    
    //sorted columns state
    const [sortedColumns, setSortedColumns] = sortedColumnsState;
    const sortedColumnsArray = sortedColumns
    .sort((a, b) => sortedColumns[a] - sortedColumns[b]);

    const [draggedColumn, setDraggedColumn] = useState(null);
    const [dropTargetIndex, setDropTargetIndex] = useState(null);


    //Handlers

    const handleHiddenColumn = (column) => {
        if(column !== "id") {
            setHiddenColumns([...hiddenColumns, column]);
        }
    }

    const handleShowColumn = (columnToShow) => {
        setHiddenColumns(hiddenColumns.filter(column => column !== columnToShow));
    };

    const handleDragStart = (column) => {
        setDraggedColumn(column);
    };
    
    const handleDragOver = (event, index) => {
            event.preventDefault();
            setDropTargetIndex(index);
    };
    
    const handleDrop = () => {
        if (draggedColumn !== null && dropTargetIndex !== null) {
            const updatedColumns = [...sortedColumnsArray];
            const oldIndex = sortedColumnsArray.indexOf(draggedColumn);
    
            updatedColumns.splice(oldIndex, 1); // remove the old column first from its index;
            updatedColumns.splice(dropTargetIndex, 0, draggedColumn); // add the tragged column to wanted index
    
            setSortedColumns(updatedColumns);
        }
    
        setDraggedColumn(null);
        setDropTargetIndex(null);
    };

    return (
        <StyledSetHiddenColumns>
            <StyledShowHiddenBox>
                <StyledColumnsGroup>
                    <StyledTitle component="div" variant='subtitle1'>
                        Showed Columns
                    </StyledTitle>
                    
                    <StyledButtonsBox>
                        {
                            columnsArray && columnsArray.map((column, key) => (
                                <Tooltip placement='top' title="Hidden" key={key} >
                                    <StyledButton onClick={() => handleHiddenColumn(column)} >
                                        {column}
                                    </StyledButton>
                                </Tooltip>
                            ))
                        }
                    </StyledButtonsBox>
                </StyledColumnsGroup>
                <StyledColumnsGroup>
                    <StyledTitle component="div" variant='subtitle1'>
                        Hidden Columns
                    </StyledTitle>
                    
                    <StyledButtonsBox>
                        {
                            hiddenColumns && hiddenColumns.map((column, key) => (
                                <Tooltip placement='top' title="Show" key={key} >
                                    <StyledButton onClick={() => handleShowColumn(column)} >
                                        {column}
                                    </StyledButton>
                                </Tooltip>
                            ))
                        }
                    </StyledButtonsBox>
                </StyledColumnsGroup>
            </StyledShowHiddenBox>
            <StyledSortColumnsBox>
                <StyledTitle component="div" variant='subtitle1'>
                        Sort Columns
                </StyledTitle>
                <StyledSortedColumnsGroup  >
                    
                {
                    sortedColumnsArray && sortedColumnsArray.map((column, key) => {
                        return (
                            <Box 
                            onDragOver={() => handleDragOver(event, key)}
                            onDrop={handleDrop}
                            key={key}>
                                <Tooltip placement='left' title={key}>
                                    <StyledSortButton
                                    draggable
                                    onDragStart={() => handleDragStart(column)}
                                    startIcon={<DragIndicatorIcon />}
                                    >
                                        {column}
                                    </StyledSortButton>
                                </Tooltip>
                            
                            </Box>
                        )
                    })
                }
                
                </StyledSortedColumnsGroup>
                
            </StyledSortColumnsBox>
        </StyledSetHiddenColumns>
    );
};

SetHiddenColumns.propTypes = {
    hiddenColumnsState: propTypes.array,
    sortedColumnsState: propTypes.array,
    columns: propTypes.object
}

export default SetHiddenColumns;