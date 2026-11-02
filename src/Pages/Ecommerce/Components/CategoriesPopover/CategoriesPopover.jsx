//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'

//context
import {useCliserMarketContext} from "../../EcommerceMain"
import { useNavigate } from 'react-router-dom'

//Styled Components
const StyledCategoriesPopover = styled(Box)(
    () => ({
        width: "100vw",
        
    })
)

const CategoriesBox = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        gap: theme.spacing(2),
        width: "100%",
        padding: `${theme.spacing(2)} ${theme.spacing()}`,
    })
);

const CategoryBox = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
        width: "100%",
    })
);

const CategoriesPopover = () => {
    const {categories} = useCliserMarketContext()

    const navigate = useNavigate()
    const handleClickCategory = (cat) => {
        navigate("products")
    }
    return (
        <StyledCategoriesPopover>
                <Container maxWidth="md">
                    <CategoriesBox>
                        {
                            categories && categories.length > 0 &&
                            categories.map((category, key) => {
                                return (
                                    <CategoryBox
                                        key={key}
                                    >
                                        <Typography 
                                        letterSpacing={1.5} 
                                        variant='subtitle1' 
                                        sx={{
                                            letterSpacing: 1.5,
                                            cursor: 'pointer',
                                            transition: "0.2s",
                                            "&:hover": {
                                                color: theme => theme.palette.primary.main,
                                            }
                                        }}
                                        onClick={() => handleClickCategory(category.category_name)}
                                        >
                                            {category.category_name}
                                        </Typography>
                                        <Divider />
                                        <List disablePadding>
                                            {
                                                category?.children.length > 0 && 
                                                    category.children.slice(0, 5).map((child, key) => {
                                                        return (
                                                            <ListItem 
                                                            key={key} 
                                                            disablePadding
                                                            sx={{
                                                                letterSpacing: 1.5,
                                                                cursor: 'pointer',
                                                                transition: "0.2s",
                                                                "&:hover": {
                                                                    color: theme => theme.palette.primary.main,
                                                                }
                                                            }}
                                                            onClick={() => handleClickCategory(child.category_name)}
                                                            >
                                                                <ListItemText
                                                                    primary={child.category_name}
                                                                />
                                                            </ListItem>
                                                        )
                                                    })
                                            }
                                            <ListItem 
                                                disablePadding
                                                sx={{
                                                    letterSpacing: 1.5,
                                                    cursor: 'pointer',
                                                    transition: "0.2s",
                                                    "&:hover": {
                                                        color: theme => theme.palette.primary.main,
                                                    }
                                                }}
                                                onClick={() => handleClickCategory("other")}
                                                >
                                                    <ListItemText
                                                        primary={"Other"}
                                                    />
                                            </ListItem>
                                        </List>
                                    </CategoryBox>
                                )
                            })
                        }
                        
                    </CategoriesBox>
                </Container>
        </StyledCategoriesPopover>
    );
};

CategoriesPopover.propTypes = {
    children: propTypes.array
}

export default CategoriesPopover;