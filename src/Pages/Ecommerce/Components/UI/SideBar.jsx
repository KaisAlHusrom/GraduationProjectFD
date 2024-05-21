//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components

//MUI
import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledSideBar = styled(Box)(
    () => ({
    
    })
)

const SideBar = (props) => {
    const {query,handleInputChange,handleCategoryChange,handlePriceChange,handleRatingChange} = props
    return (
        <StyledSideBar>
            <Grid container spacing={2} direction="column">
                {/* Search Bar */}
                <Grid item sx={{ margin: 2, alignItems: "center"}}>
                <TextField
                fullWidth
                variant="outlined"
                label="Search"
                onChange={handleInputChange}
                value={query}
                />
                </Grid>
        
                {/* Categories */}
                <Grid item sx={{ margin: 1, alignItems: "center"}}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Categories</FormLabel>
                    <RadioGroup aria-label="categories" name="categories" onChange={handleCategoryChange}>
                        <FormControlLabel value="" control={<Radio />} label="All" />
                        <FormControlLabel value="websites" control={<Radio />} label="Websites" />
                        <FormControlLabel value="WordPress" control={<Radio />} label="WordPress" />
                        <FormControlLabel value="Blog" control={<Radio />} label="Blog" />
                        <FormControlLabel value="Recommended Templates" control={<Radio />} label="Recommended Templates" />
                    </RadioGroup>
                </FormControl>
                </Grid>
        
                {/* Prices */}
                <Grid item sx={{ margin: 1, alignItems: "center"}}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Prices</FormLabel>
                    <RadioGroup aria-label="prices" name="prices" onChange={handlePriceChange}>
                    <FormControlLabel value="" control={<Radio />} label="All" />
                    <FormControlLabel value={"0-30"} control={<Radio />} label="0-30" />
                    <FormControlLabel value={"30-50"} control={<Radio />} label="30-50" />
                    <FormControlLabel value={"50-70"} control={<Radio />} label="50-70" />
                    <FormControlLabel value={"70-90" } control={<Radio />} label="70-90" />
                    </RadioGroup>
                </FormControl>
                </Grid>
        
                {/* Ratings */}
                <Grid item sx={{ margin: 1, alignItems: "center"}}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Ratings</FormLabel>
                    <RadioGroup aria-label="ratings" name="ratings" onChange={handleRatingChange}>
                    <FormControlLabel value="" control={<Radio />} label="All" />
                    <FormControlLabel value="5" control={<Radio />} label="5 Stars" />
                    <FormControlLabel value="4" control={<Radio />} label="4 Stars" />
                    <FormControlLabel value="3" control={<Radio />} label="3 Stars" />
                    <FormControlLabel value="2" control={<Radio />} label="2 Stars" />
                    </RadioGroup>
                </FormControl>
                </Grid>
            </Grid>
        </StyledSideBar>
    );
};

SideBar.propTypes = {
    children: propTypes.array
}

export default SideBar;