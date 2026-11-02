
//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components



//MUI
import { styled } from '@mui/system'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

//Styled Components
const StyledCustomCard = styled(Card)(
    () => ({
        maxWidth: 245,
        position: 'relative',
        marginBottom: '10px',
        cursor:'pointer',
        '&:hover .card-content': {
            opacity: 0.6,
        },
    })
)




    const StyledCardContent = styled(CardContent)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out, background-color 0.3s ease-in-out', 
    '&.has-content': {
        backgroundColor: theme.palette.grey[500], 
        
    },
    }));

const CustomCard = ({ name, description, buttons , image}) => {
    return (
    <StyledCustomCard>
       {image && (
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="240"
                    image={image}
                />
            )}
        <StyledCardContent className={`card-content ${name || description ? 'has-content' : ''}`}>
        {name && (
            <Typography gutterBottom variant="h5" component="div">
                {name}
            </Typography>
        )}
        {description && (
            <Typography variant="body2" color="text.secondary">
                {description}
            </Typography>
        )}
        </StyledCardContent>
            <CardActions>
                {buttons
                        ? buttons.map((item, index) => (
                            <Button key={index} size="small"  onClick={item.onClick}
                            sx={{
                                color: 'white.main',
                                backgroundColor:'success.dark'
                            }}>
                            {item.name}
                </Button>
            ))
            : (
            <></>
        )}
        </CardActions>
    </StyledCustomCard>
    );
};

export default CustomCard;









