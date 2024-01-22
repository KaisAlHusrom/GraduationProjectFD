//React
import {
    
} from 'react'


//Components


//MUI
import {
    
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import SearchIcon from '@mui/icons-material/Search';
import { AdminMainButton } from '../../../Components';
import { useTheme } from '@emotion/react';


//Styled Components



const StyledSearchIcon = styled(SearchIcon)(
    ({ theme }) => ({
        color: theme.palette.primary.main,
        
    })
)

const SearchButton = () => {

    const theme = useTheme()

    const StyledSearchButton =  {
        textTransform: 'none',
        color: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderRadius: "10px",
        backgroundColor: theme.palette.action.hover,
        transition: theme.transitions.create(['background-color', 'border-color'], {
            duration: theme.transitions.duration.standard,
        }),
        "&:hover": {
            borderColor: "rgb(47, 58, 70)",
            background: theme.palette.action.selected,
        },
    }

    return (
        
        <AdminMainButton
            type='modal'
            appearance='secondary'
            sx={StyledSearchButton}
            icon={<StyledSearchIcon />}
            title="Search"
            dir="ltr"
            
        >
            Search...
        </AdminMainButton>
    );
};


export default SearchButton;