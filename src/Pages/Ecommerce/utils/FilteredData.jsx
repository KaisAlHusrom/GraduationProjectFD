import { Grid } from '@mui/material';
import { ReviewCalculateSMA } from '../utils/functions';
import ProductCard from '../Components/ProductCard';

const FilteredData = (props) => {

  
    const { products = [], category, price, rating, query, lastData } = props; // Default products to an empty array
  
    let filteredProducts = products;
    if (query) {
      const searchTerm = query?.searchTerm.toLowerCase();
      filteredProducts = filteredProducts.filter(
        product =>
          product.product_name.toLowerCase().includes(searchTerm) ||
          product.product_short_description.toLowerCase().includes(searchTerm)
      );
    }
  
    if (category) {
      filteredProducts = filteredProducts.filter(
        product => product.categories.some(cat => cat.category_name === category)
      );
    }
  
    if (price) {
      filteredProducts = filteredProducts.filter(product => {
        const [min, max] = price.split('-').map(parseFloat);
        return product.product_price >= min && product.product_price <= max;
      });
    }
  
    if (rating) {
      const minRating = parseInt(rating) - 0.5;
      const maxRating = parseInt(rating) + 0.5;
      filteredProducts = filteredProducts.filter(product => {
        const averageRating = ReviewCalculateSMA(product.product_reviews);
        return averageRating >= minRating && averageRating < maxRating;
      });
    }
  
    return (
      <Grid container spacing={2}>
        {
          filteredProducts && filteredProducts.length > 0
          ?
            filteredProducts.map((product, index) => (
              <Grid key={index} item xxs={12} sm={4} md={3} lg={3} ref={products.length === index + 1 ? lastData : null}>
                <ProductCard
                  product={product}
                />
              </Grid>
            ))
          :null
        }
      </Grid>
    );
  };

export default FilteredData;
