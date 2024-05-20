//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Grid,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Rating,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import NavBar from '../NavBar'
import { productList } from '../../data/CradsData'
import ProductCard from '../ProductCard'
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer'

//Styled Components
const StyledProducts = styled(Box)(
    () => ({
    
    })
)



const Products = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);
    const [query, setQuery] = useState("");
  
    const handleLearnMoreClick = (index) => {
      navigate(`/productView/${index}`);
    };
  
    const handleInputChange = (event) => {
      setQuery(event.target.value);
    };
  
    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value);
    };
  
    const handlePriceChange = (event) => {
      setSelectedPrice(event.target.value);
    };
  
    const handleRatingChange = (event) => {
      setSelectedRating(event.target.value);
    };
  
    function filteredData(products, category, price, rating, query) {
      let filteredProducts = products;
  
      // Filtering based on query (search term)
    // Filtering based on query (search term)
    if (query) {
        filteredProducts = filteredProducts.filter(
          product =>
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );
      }
  
      // Applying selected category filter
      if (category) {
        filteredProducts = filteredProducts.filter(
          product => product.Category === category
        );
      }
  
      // Applying selected price filter
      if (price) {
        filteredProducts = filteredProducts.filter(
          product => product.price <= price
        );
      }
  
      // Applying selected rating filter
      if (rating) {
        filteredProducts = filteredProducts.filter(
          product => product.rating >= rating
        );
      }
  
      return (
        <Grid container spacing={2}>
          {filteredProducts.map((product, index) => (
            <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
              <ProductCard
                title={product.title}
                description={product.description}
                image={product.image}
                price={product.price}
                rating={product.rating}
                creator={product.creator}
                Category={product.Category}
                action={() => handleLearnMoreClick(index)}
              />
            </Grid>
          ))}
        </Grid>
      );
    }
  
    const result = filteredData(productList, selectedCategory, selectedPrice, selectedRating, query);
  
    const SidebarContent = () => (
      <Grid container spacing={2} direction="column">
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
        <Grid item>
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
        <Grid item>
          <FormControl component="fieldset">
            <FormLabel component="legend">Prices</FormLabel>
            <RadioGroup aria-label="prices" name="prices" onChange={handlePriceChange}>
            <FormControlLabel value="" control={<Radio />} label="All" />
              <FormControlLabel value={30} control={<Radio />} label="0-30" />
              <FormControlLabel value={50} control={<Radio />} label="30-50" />
              <FormControlLabel value={70} control={<Radio />} label="50-70" />
              <FormControlLabel value={90} control={<Radio />} label="70-90" />
            </RadioGroup>
          </FormControl>
        </Grid>
  
        {/* Ratings */}
        <Grid item>
          <FormControl component="fieldset">
            <FormLabel component="legend">Ratings</FormLabel>
            <RadioGroup aria-label="ratings" name="ratings" onChange={handleRatingChange}>
            <FormControlLabel value="" control={<Radio />} label="All" />
              <FormControlLabel value={5} control={<Radio />} label="5 Stars" />
              <FormControlLabel value={4} control={<Radio />} label="4 Stars" />
              <FormControlLabel value={3} control={<Radio />} label="3 Stars" />
              <FormControlLabel value={2} control={<Radio />} label="2 Stars" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    );
  
    return (
      <div>
        <NavBar />
        <Grid container style={{ minHeight: '20px', marginTop: '10px' }}>
          {/* Sidebar */}
          <Grid item xs={12} md={2} marginTop={15} border={1}>
            <SidebarContent />
          </Grid>
          {/* Main Content */}
          <Grid item xs={12} md={10} marginTop={15}>
            {result}
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
  };
Products.propTypes = {
    children: propTypes.array
}

export default Products;