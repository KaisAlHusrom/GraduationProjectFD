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
import SideBar from '../UI/SideBar'
import FilteredData from '../../utils/FilteredData'
import useFetchData from '../../../../Helpers/customHooks/useFetchData'
import { fetchUserProducts } from '../../../../Services/UserServices/Services/productsUsersService'


//Styled Components



const Products = () => {

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [query, setQuery] = useState({
      columnName: "product_name",
      searchTerm: ""
    });

    const [filters, setFilters] = useState([])
    const [sorts, setSorts] = useState([])

    const {
      data: products, 
/*       download: productsDownload, */
      lastDataRecord,
    } = useFetchData(fetchUserProducts, 'all', filters, sorts, true, query )
    
    const handleInputChange = (event) => {
      setQuery(prev => {
        const updated = {...prev, searchTerm: event.target.value}
        return updated
      });
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
  


    return (
      <div>
        <Grid container style={{ minHeight: '20px', marginTop: '10px' }}>
          {/* Sidebar */}
          <Grid item xs={12} md={2} marginTop={15} border={1}>
            <SideBar 
            products={products}
            query={query} 
            handleInputChange={handleInputChange} 
            handleCategoryChange={handleCategoryChange} 
            handlePriceChange={handlePriceChange}
            handleRatingChange={handleRatingChange}/>
          </Grid>
          {/* Main Content */}
          <Grid item xs={12} md={10} marginTop={15}>
            <FilteredData
              products={products}  
              lastData={lastDataRecord}
              category={selectedCategory}  
              price={selectedPrice}  
              ratins={selectedRating} 
              query={query}
            />
          </Grid>
        </Grid>
      </div>
    );
  };
Products.propTypes = {
    children: propTypes.array
}

export default Products;