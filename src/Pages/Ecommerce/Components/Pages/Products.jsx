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
import { NewList } from '../../data/CradsData'
import SideBar from '../UI/SideBar'
import FilteredData from '../../utils/FilteredData'

//Styled Components



const Products = () => {

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);
    const [query, setQuery] = useState("");

  

  
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
  
  
    const result = <FilteredData products={NewList}  
    category={selectedCategory}  
    price={selectedPrice}  
    ratins={selectedRating} 
    query={query} />

    return (
      <div>
        <Grid container style={{ minHeight: '20px', marginTop: '10px' }}>
          {/* Sidebar */}
          <Grid item xs={12} md={2} marginTop={15} border={1}>
            <SideBar 
            query={query} 
            handleInputChange={handleInputChange} 
            handleCategoryChange={handleCategoryChange} 
            handlePriceChange={handlePriceChange}
            handleRatingChange={handleRatingChange}/>
          </Grid>
          {/* Main Content */}
          <Grid item xs={12} md={10} marginTop={15}>
            {result}
          </Grid>
        </Grid>
      </div>
    );
  };
Products.propTypes = {
    children: propTypes.array
}

export default Products;