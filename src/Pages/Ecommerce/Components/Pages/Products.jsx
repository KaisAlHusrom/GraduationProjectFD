//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Grid,
} from '@mui/material'
import { } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import NavBar from '../NavBar'
import { productList } from '../../data/CradsData'
import ProductCard from '../ProductCard'
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer'
import SideBar from '../UI/SideBar'

//Styled Components



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
    filteredProducts = filteredProducts.filter(product => {
        if (price === '0-30') return product.price <= 30;
        if (price === '30-50') return product.price > 30 && product.price <= 50;
        if (price === '50-70') return product.price > 50 && product.price <= 70;
        if (price === '70-90') return product.price > 70 && product.price <= 90;
        return true;
      });
    }


    // Applying selected rating filter
    if (rating) {
        filteredProducts = filteredProducts.filter(product => product.rating >= parseInt(rating, 10));
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

    return (
      <div>
        <NavBar />
        <Grid container style={{ minHeight: '20px', marginTop: '10px' }}>
          {/* Sidebar */}
          <Grid item xs={12} md={2} marginTop={15} border={1}>
            <SideBar 
            query={query} 
            handleInputChange={handleInputChange} 
            handleCategoryChange={handleCategoryChange} 
            handlePriceChange={handlePriceChange}
            handleRatingChange={handleRatingChange} />
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