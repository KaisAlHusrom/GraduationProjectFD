//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Typography,Button
} from '@mui/material'


//propTypes 
import propTypes from 'prop-types'
import { productList} from '../../data/CradsData'
import { useParams } from 'react-router-dom';



const ProductView = (addToCart) => {
    // Get the product index from the URL params
    const { idx } = useParams();

    // Find the product with the provided ID
    const product = productList.find(product => product.id === parseInt(idx));

    if (!idx || !product) {
        return <Typography variant="h2">Product not found</Typography>;
    }


      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: '0 20px',
          boxSizing: 'border-box',
        }}>
          <Typography variant="h2" sx={{ marginBottom: '10px' }}>
            {product.title}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '20px' }}>
            {product.description}
          </Typography>
          <img src={product.image} alt={product.title} style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '20px' }} />
          <Typography variant="body1" sx={{ marginBottom: '10px' }}>
            Price: ${product.price}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '20px' }}>
            Rating: {product.rating}
          </Typography>
          <Button onClick={() => addToCart(product)} sx={{
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#0056B3',
            },
          }}>
            Add to Cart
          </Button>
        </div>
      );
    };

ProductView.propTypes = {
    children: propTypes.array
}

export default ProductView;