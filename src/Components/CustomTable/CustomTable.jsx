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
} from '@mui/material'
import { styled } from '@mui/system'
import { useTheme } from '@emotion/react'

//icons
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

//propTypes 
import propTypes from 'prop-types'
import { useLoaderData } from 'react-router-dom'
import { useMyContext } from '../DatabaseView/DatabaseView'





const CustomTable = (props) => {
    const {
        filteredColumnsArray,
        selectedState,
        dataWillAppearState,
        handleChangeData,
        handleEnterKeyDown,
    } = props
    
    //data state
    const [dataWillAppear,] = dataWillAppearState
    //I get columns object to know the type of each column
    const {columns} = useLoaderData();
    //primary key
    const pk = Object.keys(columns).find(key => columns[key] === "pk");

    
    //view settings
    //I don't put a condition if null, because I solved it in DatabaseView component
    const {viewsSettings} = useMyContext()
    const {
        showHeaders,
        selectHeaderBackgroundColor,
        changeHeadersBackgroundColor,
        showHeaderVerticalLines,
        showHeaderHorizontalLines
    } = viewsSettings.table

    const selectedColor = selectHeaderBackgroundColor.find((item) => item.value)?.name

    
    //Styles
    const theme = useTheme()

    //Styled Components
    const StyledCustomTable = styled(TableContainer)(
        ({ theme }) => ({
            border: "1px solid",
            borderColor: theme.palette.divider,
            height: "530px"
        })
    )

    const StyleHeadTableCell = {
        fontSize: theme.typography.h7,
        textTransform: 'capitalize',
        borderRight: showHeaderVerticalLines ? '1px solid' : 'none',
        borderBottom: showHeaderHorizontalLines ? '1px solid' : 'none',
        borderColor: theme.palette.divider,
        textAlign: 'center',
        color: changeHeadersBackgroundColor && theme.palette.primary.contrastText,
        position: "relative",
    }

    const styleRelationIconBox = {
            position: "absolute",
            left: 5,
            top: 2,   
    }

    const StyledTableHead = styled(TableHead)(
        () => ({
            backgroundColor: changeHeadersBackgroundColor && selectedColor,
        })
    );

    return (
        <StyledCustomTable  
        >
                    <Table>
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
                            dataWillAppear && dataWillAppear.length > 0 && dataWillAppear.map((row) => {
                                

                                return (
                                    <CustomTableRow 
                                    key={row[pk]} 
                                    row={row}
                                    selectedState={selectedState}
                                    appearedDataCount={dataWillAppear.length}
                                    handleChangeData = {handleChangeData}
                                    handleEnterKeyDown = {handleEnterKeyDown}
                                    filteredColumnsArray = {filteredColumnsArray}
                                    />
                                );
                            })
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
    dataWillAppearState: propTypes.array,
    handleChangeData: propTypes.func,
    handleEnterKeyDown: propTypes.func,
    viewSettings: propTypes.object
}

export default CustomTable;