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
} from '@mui/material'
import { styled } from '@mui/system'
import { useTheme } from '@emotion/react'

//icons


//propTypes 
import propTypes from 'prop-types'
import { useLoaderData } from 'react-router-dom'


//Styled Components
const StyledCustomTable = styled(TableContainer)(
    ({ theme }) => ({
        border: "1px solid",
        borderColor: theme.palette.divider,
        maxHeight: "530px"
    })
)


const CustomTable = (props) => {
    const {
        showTableHeaders,
        filteredColumnsArray,
        selectedState,
        dataWillAppearState,
        handleChangeData,
        handleEnterKeyDown
    } = props

    //data state
    const [dataWillAppear,] = dataWillAppearState
    //I get columns object to know the type of each column
    const {columns} = useLoaderData();
    
    
    //Styles
    const theme = useTheme()

    const StyleHeadTableCell = {
        fontSize: theme.typography.h7,
        textTransform: 'capitalize',
        borderRight: '1px solid',
        borderColor: theme.palette.divider,
        textAlign: 'center',
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
                                {filteredColumnsArray.length > 0 && filteredColumnsArray.map((key, i) => {
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
                            { 
                            dataWillAppear && dataWillAppear.length > 0 && dataWillAppear.map((row) => {
                                return (
                                    <CustomTableRow 
                                    key={row.id} 
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
}

export default CustomTable;