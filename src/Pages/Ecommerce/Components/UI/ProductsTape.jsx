//React
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Box, Typography, Container,
    Grid, IconButton, Divider, Button
} from '@mui/material'
import { styled } from '@mui/system'
import ProductCard from '../ProductCard'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { ReviewCalculateSMA, shuffleArray} from '../../utils/functions'
import useFetchData from '../../../../Helpers/customHooks/useFetchData'
import { fetchUserProducts } from '../../../../Services/UserServices/Services/productsUsersService'
import { writeFilterObject } from '../../../../Helpers/filterData'

//Styled Components
const StyledProductsTape = styled(Box)(
    () => ({
        marginTop: 10,
        backgroundColor: "#111111",
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
        borderRadius: "15px",
        overflow: 'hidden', // Prevent overflow
    })
)

const ScrollContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    overflowX: 'auto', // Allow horizontal scrolling
    gap: '16px',
    padding: '16px 0',
    position: 'relative',
    scrollbarWidth: 'none', // Hide scrollbar
    '&::-webkit-scrollbar': {
        display: 'none', // Hide scrollbar in Webkit-based browsers
    },
    [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(2), // Add padding for small screens
        paddingRight: theme.spacing(2),
    },
    '& > *': {
        flex: '1 0 300px', // Ensure children are sized properly
        maxWidth: '100%', // Prevent overflowing
    }
}))

const ScrollButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    '&:hover': {
        backgroundColor: theme.palette.background.default,
    },
}))

const ProductsTape = ({ title, Cat }) => {
    const navigate = useNavigate()
    const handleLearnMoreClick = (productId) => {
        navigate(`/cliser-digital-market/productView/${productId}`)
    }
    const handleAllproductsClick = ()=>{
        navigate(`/cliser-digital-market/Products`)
    }
    const scrollContainerRef = useRef(null)

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current
            const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2
            scrollContainerRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: 'smooth' })
        }
    }

    // TODO: will do this later
    // const filters = useMemo(() => {
    //     return [
    //         writeFilterObject('categories', 'many-to-many', '=', "", "", "", "", [categoryId])
    //     ]
    // }, [categoryId])
    // const {
    //     loading: productsDownload,
    //     data: products,
    // } = useFetchData(fetchUserProducts, 'all', filters, null)
    // console.log(products)

    console.log(Cat)

    return (
        <StyledProductsTape>
            <Container sx={{ paddingTop: '20px' }} maxWidth="lg">
                <Grid>
                    <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                        <Grid item xxs={12} xs={6} md={6}>
                            <Typography variant="h4" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                            {title}
                            </Typography>
                        </Grid>
                        <Grid item xxs={12} xs={6} md={6} display="flex" justifyContent="flex-end">
                            <Button variant='contained' size='large' onClick={handleAllproductsClick} >
                                All Products
                            </Button>
                        </Grid>
                    </Grid>
                
                <Divider />
                <Box sx={{ position: 'relative' }}>
                    <ScrollButton style={{ left: 0 }} onClick={() => scroll('left')}>
                        <ArrowBackIosIcon />
                    </ScrollButton>
                    <ScrollContainer ref={scrollContainerRef}>
                        {
                            Cat?.products && Cat?.products?.length > 0 
                            ?
                                Cat?.products.map((product, key) => {
                                        return (
                                            <Grid key={key} item xs={12} sm={8} md={6} lg={4}>
                                                <ProductCard
                                                    AddToCartId={product.id}
                                                    title={product.product_name}
                                                    description={product.product_short_description}
                                                    image={product.product_media}
                                                    price={product.product_price}
                                                    rating={ReviewCalculateSMA(product.product_reviews)}
                                                    creator={`${product.user.first_name} ${product.user.last_name}`}
                                                    category={product.categories}
                                                    action={() => handleLearnMoreClick(product.id)}
                                                />
                                            </Grid>
                                        )
                                    })
                            : <></>
                        }
                    </ScrollContainer>
                    <ScrollButton style={{ right: 0 }} onClick={() => scroll('right')}>
                        <ArrowForwardIosIcon />
                    </ScrollButton>
                </Box>
                </Grid>
            </Container>
        </StyledProductsTape>
    )
}

export default ProductsTape
