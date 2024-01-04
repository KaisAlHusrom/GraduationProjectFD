//React
import {  } from 'react'

import {
    
} from 'react-redux'

//icons
import AddIcon from "@mui/icons-material/Add"
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

//Components
import AdminMainButton from '../../../../../Components/AdminMainButton/AdminMainButton'
import AddUserModalForm from './AddUserModalForm';


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

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

const StyledAddButtonBox = styled(Box)(
    () => ({
        
    })
)

const StyledFilterButtonsBox = styled(Box)(
    ({ theme }) => ({
        [theme.breakpoints.down("xs")]: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }
    })
)




const SortFilterSection = () => {
    //menu items
    const filterMenuItems = [
        {
            value: "show all users",
            icon: <RadioButtonCheckedOutlinedIcon color='primary' />,
            onClick: () => {}
        },
        {
            value: "show deleted users",
            icon: <RadioButtonCheckedOutlinedIcon color='primary' />,
            onClick: () => {}
        },
        {
            value: "show undeleted users",
            icon: <RadioButtonCheckedOutlinedIcon color='primary' />,
            onClick: () => {}
        },
    ]

    const sortMenuItems = [
        {
            value: "By Birthday",
            icon: <RadioButtonCheckedOutlinedIcon color='primary' />,
            onClick: () => {}
        },
        {
            value: "By Age",
            icon: <RadioButtonCheckedOutlinedIcon color='primary' />,
            onClick: () => {}
        },
    ]


    return (
        <StyledSortFilterSection>
            <StyledAddButtonBox>
                <AdminMainButton
                title="Add User"
                icon={<AddIcon />}
                appearance="primary"
                type='modal'
                willShow={
                    <AddUserModalForm />
                }
                modalIcon={<PersonAddAltOutlinedIcon />}
                />
            </StyledAddButtonBox>
            <StyledFilterButtonsBox>
                <AdminMainButton
                title="Filter"
                icon={<FilterAltOutlinedIcon />}
                appearance="secondary"
                menuItems={filterMenuItems}
                type='menu'
                />
                <AdminMainButton
                title="Sort"
                icon={<SortOutlinedIcon />}
                appearance="secondary"
                type='menu'
                menuItems={sortMenuItems}
                />
            </StyledFilterButtonsBox>
            
        </StyledSortFilterSection>
    );
};

export default SortFilterSection;