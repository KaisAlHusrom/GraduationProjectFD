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


//propTypes 
import propTypes from 'prop-types'

//Styled Components




const CustomCard = (props) => {
    const {title,SecondTitle,items,children} =props;
    return (
        <Box sx={{paddingTop:'20px' }} maxWidth="lg">
            <Card sx={{borderRadius:"15px"}}>
                <CardContent>
                <Grid container spacing={2}>
                    <Grid item xxs={6} xs={6}>
                    <Typography variant="h5" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                    {title}
                    </Typography>
                    </Grid>
                    <Grid item xxs={6} xs={6}>
                    <Typography variant="h5" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                    {SecondTitle}
                    </Typography>
                    </Grid>
                </Grid>
                
                <Divider />
                {items.map((item, index) => (
                    <Grid key={index} item container spacing={2} alignItems={'center'} >
                    <Grid item xxs={6} xs={6}>
                        <Typography variant="subtitle1" sx={{ paddingTop: 1, paddingBottom: 1 }}>{item.contentTitle}</Typography>
                    </Grid>
                    <Grid item xxs={6} xs={6}>

                        <Typography variant="h7"  sx={{ paddingTop: 1, paddingBottom: 1 }}>

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
    children: propTypes.any,
    items: propTypes.array,
    title:propTypes.string,
    SecondTitle:propTypes.string
}

export default CustomCard;