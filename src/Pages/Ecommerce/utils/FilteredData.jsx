//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Grid,
} from '@mui/material'

import { ReviewCalculateSMA } from './functions'
import ProductCard from '../Components/ProductCard'
import { useNavigate } from 'react-router-dom'

//Styled Components



const FilteredData = (props) => {
    const navigate = useNavigate();
    const handleLearnMoreClick = (index) => {
        navigate(`/cliser-digital-market/productView/${index}`);
      };
    const {products, category, price, rating, query, lastData} = props;
    // Filtering based on query (search term)
    let filteredProducts = products;
    if (query) {
        const searchTerm = query?.searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(
            product =>
                product.product_name.toLowerCase().includes(searchTerm) ||
                product.product_short_description.toLowerCase().includes(searchTerm)
        );
    }

    // Applying selected category filter
    if (category) {
        filteredProducts = filteredProducts.filter(
            product => product.categories.some(cat => cat.category_name === category)
        );
    }

    // Applying selected price filter
    if (price) {
        filteredProducts = filteredProducts.filter(product => {
            const [min, max] = price.split('-').map(parseFloat);
            return product.product_price >= min && product.product_price <= max;
        });
    }

    // Applying selected rating filter
    if (rating) {
    const minRating = parseInt(rating) - 0.5;
    const maxRating = parseInt(rating) + 0.5;
    filteredProducts = filteredProducts.filter(product => {
        const averageRating = ReviewCalculateSMA(product.product_reviews);
        return averageRating >= minRating && averageRating < maxRating;
    });
    }
    return (
        <Grid container spacing={2} >
            {filteredProducts.map((product, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3} 
                    ref={products.length === index + 1 ? lastData : null}>
                    <ProductCard
                        AddToCartId={product.id}
                        title={product.product_name}
                        description={product.product_short_description}
                        mainImage={product.product_main_image_name}
                        image={product.product_media}
                        price={product.product_price}
                        rating={ReviewCalculateSMA(product.product_reviews)}
                        creator={`${product.user.first_name} ${product.user.last_name}`}
                        creatorImage={product.user.profile_image}
                        category={product.categories}
                        action={() => handleLearnMoreClick(product.id)}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default FilteredData;