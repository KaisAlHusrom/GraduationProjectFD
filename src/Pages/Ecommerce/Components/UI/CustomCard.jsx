//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,Card,CardContent,Typography,Divider,Grid
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledCustomCard = styled(Box)(
    ({ theme }) => ({
    
    })
)



const CustomCard = (props) => {
    const {title,items,children} =props;
    return (
        <Box sx={{paddingTop:'20px' }} maxWidth="lg">
            <Card sx={{borderRadius:"15px"}}>
                <CardContent>
                <Typography variant="h4" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                    {title}
                </Typography>
                <Divider />
                {items.map((item, index) => (
                    <Grid key={index} item container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6" sx={{ paddingTop: 1, paddingBottom: 1 }}>{item.contentTitle}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6"  sx={{ paddingTop: 1, paddingBottom: 1 }}>
                        {item.content}
                        </Typography>
                    </Grid>
                    </Grid>
                ))}
                <div>
                    {children}
                </div>
                </CardContent>
            </Card>
        </Box>
    );
};

CustomCard.propTypes = {
    children: propTypes.array,
    items: propTypes.array
}

export default CustomCard;