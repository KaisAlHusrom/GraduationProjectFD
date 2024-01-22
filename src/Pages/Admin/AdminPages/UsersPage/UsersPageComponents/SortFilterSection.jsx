//React
import {  } from 'react'

import {
    
} from 'react-redux'

//icons

import AddIcon from "@mui/icons-material/Add"
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import SwapVertIcon from '@mui/icons-material/SwapVert';

//Components
import {
    CustomFormModal
} from '../../../../../Components';
import SetSort from '../../../Components/SetSort/SetSort';

import SetFilter from "../../../Components/SetFilter/SetFilter"
import SetHiddenColumns from "../../../Components/SetHiddenColumns/SetHiddenColumns"

//Helpers
import StringHelper from '../../../../../Helpers/StringsHelper';

//MUI
import {
    Box, useMediaQuery,
} from '@mui/material'
import { styled } from '@mui/system'
import { useTheme } from '@emotion/react';

//propTypes 
import propTypes from 'prop-types'
import { AdminMainButton } from '../../../../../Components';
import { useMyContext } from '../../../../../Components/DatabaseView/DatabaseView';
import SetViewSettings from '../../../Components/SetViewSettings/SetViewSettings';


//Styled Components
const StyledSortFilterSection = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: `${theme.spacing(2)} 0}`,
        [theme.breakpoints.down("sm")]: {

        }
    })
)

const StyledSecondaryButtonsBox = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        gap: theme.spacing()
    })
)

// const StyledSearchBox = styled(Box)(
//     () => ({
//         display: "flex",
//         alignItems: "center",
//         position: "relative",

//     })
// )


// const StyledSearchField = styled(TextField)(
//     () => ({
//         ".MuiInputBase-root.MuiOutlinedInput-root": {
            
//         }
//     })
// )


const SortFilterSection = (props) => {
    const {
        allViews,
        currentView,
        dataState,
        hiddenColumnsState,
        sortedColumnsState,
        rowsArrayState,
        filteredDataState,
        sortedDataState,
        title,
    } = props

    //data state
    const [loaderData, ] = dataState;
    const {columns} = loaderData;

    // //Rows State
    // const [rowsArray, setRowsArray] = rowsArrayState;

    //hidden columns state
    const [hiddenColumns, setHiddenColumns] = hiddenColumnsState;

    //sorted columns state
    const [sortedColumns, setSortedColumns] = sortedColumnsState;

    //Filters Count
    const {filtersCount, sortsCount} = useMyContext()
    

    //BUTTONS
    const primaryButtons = [
        <AdminMainButton
            key={0}
            filled
            title={"Add " + StringHelper.removeSAtEnd(title)}
            icon={<AddIcon />}
            appearance="primary"
            type='modal'
            willShow={
                <CustomFormModal
                    columns={columns}
                />
            }
            modalIcon={<PersonAddAltOutlinedIcon />}
        />,
    
    ]
    

    //Styles
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    // const styleSearchIcon = {
    //     position: 'absolute',
    //     right: theme.spacing(),
    // }


    return (
        <>
        <StyledSortFilterSection>
            <Box>
                {
                    primaryButtons.map(button => button)
                }
            </Box>
            <StyledSecondaryButtonsBox>
                
                <AdminMainButton
                badgeContent={filtersCount}
                title="Filter"
                icon={<FilterAltOutlinedIcon color='primary' />}
                appearance={isSmallScreen ? 'iconButton' : 'secondary'}
                willShow={
                    <SetFilter 
                        dataState={dataState} 
                        rowsArrayState={rowsArrayState}
                        filteredDataState={filteredDataState}
                        sortedDataState={sortedDataState}
                        title={title}
                    />
                }
                type='modal'
                sx={{
                    color: 'text.primary',
                    fontWeight: 'bold',
                    backgroundColor: filtersCount > 0 && theme.palette.action.selected,
                }}
                />  
                <AdminMainButton
                badgeContent={sortsCount}
                title="Sort"
                icon={<SwapVertIcon color='primary' />}
                appearance={isSmallScreen ? 'iconButton' : 'secondary'}
                willShow={
                    <SetSort 
                        dataState={dataState} 
                        rowsArrayState={rowsArrayState}
                        sortedDataState={sortedDataState}
                        filteredDataState={filteredDataState}
                        title={title}
                    />
                }
                type='modal'
                sx={{
                    color: 'text.primary',
                    fontWeight: 'bold',
                    backgroundColor: sortsCount > 0 && theme.palette.action.selected,
                }}
                />  

                <AdminMainButton
                    title="Show | Hidden | Sort Columns"
                    icon={<ViewWeekIcon color='primary' />}
                    appearance={isSmallScreen ? 'iconButton' : 'secondary'}
                    willShow={<SetHiddenColumns 
                        hiddenColumnsState={[hiddenColumns, setHiddenColumns]}  
                        sortedColumnsState={[sortedColumns, setSortedColumns]}
                        columns={columns}
                        />}
                    type='modal'
                    sx={{
                        color: 'text.primary',
                        fontWeight: 'bold',
                    }}
                />
                <AdminMainButton
                    title={`${currentView.toString()} Settings`}
                    icon={<SettingsIcon color='primary' />}
                    appearance={isSmallScreen ? 'iconButton' : 'secondary'}
                    willShow={<SetViewSettings 
                        view={currentView}
                        />}
                    type='modal'
                    sx={{
                        color: 'text.primary',
                        fontWeight: 'bold',
                    }}
                />
                <AdminMainButton
                    title={currentView.toString().toLocaleUpperCase()}
                    icon={Object.values(allViews).filter(view => view.selected === true)[0].icon}
                    appearance={isSmallScreen ? 'iconButton' : 'secondary'}
                    type='menu'
                    menuItems={Object.values(allViews)}
                    sx={{
                        color: 'text.primary',
                        fontWeight: 'bold',
                    }}
                />
            </StyledSecondaryButtonsBox>
            
        </StyledSortFilterSection>
        {/* <StyledSearchBox>
                    <SearchOutlinedIcon sx={styleSearchIcon} />
                    <StyledSearchField
                            fullWidth
                            label="Search..."
                            name="Search..."
                            // onChange={handleChangeData}
                            // value={userData.full_name}
                            color="primary"
                            size="small"
                        />
        </StyledSearchBox> */}
        </>
    );
};

SortFilterSection.propTypes = {
    dataState: propTypes.array,
    allViews: propTypes.object,
    title: propTypes.string,
    hiddenColumnsState: propTypes.array,
    sortedColumnsState: propTypes.array,
    rowsArrayState: propTypes.array,
    filteredDataState: propTypes.array,
    sortedDataState: propTypes.array,
    currentView: propTypes.string,
}

export default SortFilterSection;