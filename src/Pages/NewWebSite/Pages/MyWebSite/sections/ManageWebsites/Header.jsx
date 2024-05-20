//React
import {
    
} from 'react'

import {
    
} from 'react-redux'
import { useNavigate } from 'react-router-dom';

//Components
import { AdminMainButton } from '../../../../../../Components';


//MUI
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';



//Styled Components




const Header = () => {
    const Navigate = useNavigate();


    const handleCreateWebSiteClick= () => {
    Navigate('/CreateWebsite');
    };


    return (
        <Box
        id="hero"
        sx={(theme) => ({
            width: '100%',
            backgroundImage:
            theme.palette.mode === 'light'
                ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
            backgroundSize: '100% 20%',
            backgroundRepeat: 'no-repeat',
        })}
        >
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: { xs: 14, sm: 20 },
                pb: { xs: 8, sm: 12 },
            }}
        >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } , 
                display: 'flex',
                flexDirection :'row',
                justifyContent: 'space-between',
                alignItems: 'center',
    
                }}>
                <Box>
                    <Typography
                            variant="h1"
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                alignSelf: 'center',
                                textAlign: 'center',
                                fontSize: 'clamp(3.5rem, 10vw, 4rem)',
                            }}
                            >
                            Manage Websites
                    </Typography>
                    <Typography
                            variant="h1"
                            sx={{
                                fontSize: '20px',
                                
                            }}
                            >
                        Here's where you can manage, upgrade, or adjust settings for any of your domains


                    </Typography>
            </Box>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignSelf="center"
                    spacing={1}
                    useFlexGap
                    sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
                >
            
                    <AdminMainButton
                                title = "New Website"
                                appearance='primary'
                                type="custom"
                                onClick = {handleCreateWebSiteClick}
                                filled
                                sx = {{
                                    color: "primary.contrastText",
                                    width : '200px', 
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                    },
                                }}
                            />
                            
                </Stack>
                </Stack>
        
        </Container>
    </Box>
    );
};

export default Header;