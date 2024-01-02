//React
import {
    
} from 'react'


//Components


//MUI
import {
    Button,
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import SearchIcon from '@mui/icons-material/Search';


//Styled Components
const StyledSearchButton = styled(Button)(
    ({ theme }) => ({
        textTransform: 'none',
        color: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderRadius: "10px",
        backgroundColor: theme.palette.secondary.main,
        transition: theme.transitions.create(['background-color', 'border-color'], {
            duration: theme.transitions.duration.standard,
        }),
        "&:hover": {
            borderColor: "rgb(47, 58, 70)",
            background: theme.palette.secondary.light,
        },
    })
)

const StyledSearchIcon = styled(SearchIcon)(
    ({ theme }) => ({
        color: theme.palette.primary.main,
        
    })
)

const SearchButton = () => {

    return (
        
        <StyledSearchButton
            startIcon={<StyledSearchIcon />}
            variant='outlined'
            dir="ltr"
            
        >
            Search...
        </StyledSearchButton>
    );
};


export default SearchButton;