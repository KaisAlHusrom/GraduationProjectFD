//React
import {  } from 'react'

import {
    
} from 'react-redux'

//iconss
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TableChartIcon from '@mui/icons-material/TableChart';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from "@mui/icons-material/Add"
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


//Components
import {
    CustomFormModal, SetFilter
} from '../../../../../Components';

//MUI
import {
    Box, TextField,
} from '@mui/material'
import { styled } from '@mui/system'
import { useTheme } from '@emotion/react';

//propTypes 
import propTypes from 'prop-types'
import { AdminMainButton } from '../../../../../Components';


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

const StyledFilterButtonsSecondBox = styled(Box)(
    ({ theme }) => ({
        [theme.breakpoints.down("md")]: {
            display: "none",
        }
    })
)

const StyledSecondaryButtonsBox = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        gap: theme.spacing()
    })
)

const StyledSearchBox = styled(Box)(
    () => ({
        display: "flex",
        alignItems: "center",
        position: "relative",

    })
)


const StyledSearchField = styled(TextField)(
    () => ({
        ".MuiInputBase-root.MuiOutlinedInput-root": {
            
        }
    })
)

const sortMenuItems = [
    {
        value: "By Birthday",
        // icon: <RadioButtonCheckedOutlinedIcon color='primary' />,
        onClick: () => {}
    },
    {
        value: "By Age",
        // icon: <RadioButtonCheckedOutlinedIcon color='primary' />,
        onClick: () => {}
    },
]

const SortFilterSection = (props) => {
    const {
        viewState,
        dataState
    } = props

    //data state
    const [loaderData, setLoaderData] = dataState;
    const [columns, ] = loaderData;

    //View State
    const [view, setView] = viewState
    const views = [
        {
            icon: <TableChartIcon color={view === "table" ? "primary" : ""} />,
            value: "Table",
            selected: view === "table",
            onClick: () => {setView("table")},
        },
        {
            icon: <FormatListBulletedIcon color={view === "list" ? "primary" : ""} />,
            value: "List",
            selected: view === "list",
            onClick: () => {
                setView("list")
            },
        }
    ]

    //BUTTONS
    const primaryButtons = [
        <AdminMainButton
            key={0}
            title="Add User"
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
    
    const secondaryButtons = [
        <AdminMainButton
            key={0}
            title="Filter"
            icon={<FilterAltOutlinedIcon />}
            appearance="secondary"
            willShow={<SetFilter database={[loaderData, setLoaderData]} />}
            type='modal'
        />,
        <AdminMainButton
            key={2}
            title="Sort"
            icon={<SortOutlinedIcon />}
            appearance="secondary"
            type='menu'
            menuItems={sortMenuItems}
        />,
        <AdminMainButton
            key={1}
            title="Hidden Columns"
            icon={<VisibilityOffIcon />}
            appearance="iconButton"
            willShow={<SetFilter database={[loaderData, setLoaderData]} />}
            type='modal'
        />,
    ]

    //Styles
    const theme = useTheme()
    const styleViewSettingsBarsIcon = {
        display: "none",
        [theme.breakpoints.down("md")]: {
            display: "flex",
        }
    }

    const styleSearchIcon = {
        position: 'absolute',
        right: theme.spacing(),
    }


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
                    title='View Settings'
                    icon={<MenuOpenOutlinedIcon />}
                    appearance='iconButton'
                    type='buttonsMenu'
                    menuItems={secondaryButtons}
                    sx={styleViewSettingsBarsIcon}
                />                
                
                <StyledFilterButtonsSecondBox>
                    {
                        secondaryButtons.map(button => button)
                    }
                </StyledFilterButtonsSecondBox>
                <AdminMainButton
                    key={2}
                    title={view.toString().toLocaleUpperCase()}
                    icon={<VisibilityIcon />}
                    appearance="secondary"
                    type='menu'
                    menuItems={views}
                    sx={{
                        color: 'text.primary',
                        fontWeight: 'bold',
                    }}
                />
            </StyledSecondaryButtonsBox>
            
        </StyledSortFilterSection>
        <StyledSearchBox>
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
        </StyledSearchBox>
        </>
    );
};

SortFilterSection.propTypes = {
    dataState: propTypes.array,
    viewState: propTypes.array,
}

export default SortFilterSection;