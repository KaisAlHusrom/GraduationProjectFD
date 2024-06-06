import {  FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';

import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { NewList } from '../../data/CradsData';
import { ReviewCalculateSMA } from '../../utils/functions';

const SideBar = (props) => {
    const { query, handleInputChange, handleCategoryChange, handlePriceChange, handleRatingChange} = props;
    const [categories, setCategories] = useState([]);
    const [priceRanges, setPriceRanges] = useState([]);
    const [ratingOptions, setRatingOptions] = useState([]);

    useEffect(() => {
        // Extract category descriptions from NewList
        const categoryName = NewList.map(product => {
            // Assuming there's only one category per product
            return product.categories.length > 0 ? product.categories[0].category_name :'';
        });

        // Remove duplicate category descriptions
        const uniqueCategoryName = Array.from(new Set(categoryName));

        // Set the categories state with unique category descriptions
        setCategories(uniqueCategoryName);

        // Extract price ranges from NewList
        const prices = NewList.map(product => product.product_price);
        // Remove duplicate prices
        const uniquePrices = Array.from(new Set(prices));

        // Sort prices in ascending order
        uniquePrices.sort((a, b) => a - b);

        // Generate price ranges (e.g., 0-30, 30-50, etc.)
        const priceRanges = uniquePrices.map((price, index) => {
            const nextPrice = uniquePrices[index + 1];
            return nextPrice ? `${price}-${nextPrice}` : `${price}+`;
        });

        // Set the priceRanges state
        setPriceRanges(priceRanges);

        // Extract rating options from NewList
        const Ratings = NewList.map(product => ReviewCalculateSMA(product.product_reviews));
        // Remove duplicate ratings
        const uniqueRatings = Array.from(new Set(Ratings));

        // Sort ratings in descending order
        uniqueRatings.sort((a, b) => b - a);

        // Set the ratingOptions state
        setRatingOptions(uniqueRatings);
    }, []);

    return (

            <Grid container spacing={3}>
                {/* Search Bar */}
                <Grid item sx={{ margin: 2, alignItems: "center" }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Search"
                        onChange={handleInputChange}
                        value={query}
                    />
                </Grid>

                {/* Categories */}
                <Grid item sx={{ margin: 1, alignItems: "center" }}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Categories</FormLabel>
                        <RadioGroup aria-label="categories" name="categories" onChange={handleCategoryChange}>
                            <FormControlLabel value="" control={<Radio />} label="All" />
                            {categories.map((category, index) => (
                                <FormControlLabel key={index} value={category} control={<Radio />} label={category} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Grid>

                {/* Prices */}
                <Grid item sx={{ margin: 1, alignItems: "center" }}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Prices</FormLabel>
                        <RadioGroup aria-label="prices" name="prices" onChange={handlePriceChange}>
                            <FormControlLabel value="" control={<Radio />} label="All" />
                            {priceRanges.map((priceRange, index) => (
                                <FormControlLabel key={index} value={priceRange} control={<Radio />} label={priceRange} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Grid>

                {/* Ratings */}
                <Grid item sx={{ margin: 1, alignItems: "center" }}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Ratings</FormLabel>
                        <RadioGroup aria-label="ratings" name="ratings" onChange={handleRatingChange}>
                            <FormControlLabel value="" control={<Radio />} label="All" />
                            {ratingOptions.map((rating, index) => (
                                <FormControlLabel key={index} value={rating} control={<Radio />} label={`${rating} Stars`} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>

    );
};

SideBar.propTypes = {
    query: propTypes.string.isRequired,
    handleInputChange: propTypes.func.isRequired,
    handleCategoryChange: propTypes.func.isRequired,
    handlePriceChange: propTypes.func.isRequired,
    handleRatingChange: propTypes.func.isRequired
};

export default SideBar;
