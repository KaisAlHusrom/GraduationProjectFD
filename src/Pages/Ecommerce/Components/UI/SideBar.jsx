import {  FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, 
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails
 } from '@mui/material';
 import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { ReviewCalculateSMA } from '../../utils/functions';
import { useCliserMarketContext } from '../../EcommerceMain';

const SideBar = (props) => {
    const { query, products, handleInputChange, handleCategoryChange, handlePriceChange, handleRatingChange} = props;
    const {categories} = useCliserMarketContext()
    const parentCategories = categories.filter(category => category.parent_id === null)
    const [priceRanges, setPriceRanges] = useState([]);
    const [ratingOptions, setRatingOptions] = useState([]);

    useEffect(() => {
        
        // Extract price ranges from NewList
        const prices = products ? products.map(product => product.product_price) : [100, 1000, 10000];
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
        const Ratings = products ? products.map(product => ReviewCalculateSMA(product.product_reviews)) : [1, 2, 3, 4, 5];
        // Remove duplicate ratings
        const uniqueRatings = Array.from(new Set(Ratings));

        // Sort ratings in descending order
        uniqueRatings.sort((a, b) => b - a);

        // Set the ratingOptions state
        setRatingOptions(uniqueRatings);
    }, [products]);

    return (

            <Grid container spacing={3}>
                {/* Search Bar */}
                <Grid item sx={{ margin: 2, alignItems: "center" }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Search"
                        onChange={handleInputChange}
                        value={query?.searchTerm}
                    />
                </Grid>

                {/* Categories */}
                <Grid item sx={{ margin: 1, alignItems: "center" }}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Categories</FormLabel>
                        <RadioGroup aria-label="categories" name="categories" onChange={handleCategoryChange}>
                        <FormControlLabel value="" control={<Radio />} label="All" />

                        {
                        parentCategories?.map((category, index) => {
                            return (
                                <Accordion key={index} elevation={0}>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    >
                                        {category.category_name}
                                    </AccordionSummary>
                                    <AccordionDetails>

                                            <FormControlLabel value={category.category_name} control={<Radio />} label={category.category_name} />

                                            {category?.children?.map((child, key) => (
                                                <FormControlLabel key={key} value={child.category_name} control={<Radio />} label={child.category_name} />
                                            ))}
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })
                        }
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
