//React
import {
    
} from 'react'

import {
    
} from 'react-redux'
import { useNavigate } from 'react-router-dom';

//Components
import { AdminMainButton } from '../../../../../../Components';


//MUI

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';



//Styled Components




const Header = () => {
    const Navigate = useNavigate();


    const handleCreateWebSiteClick= () => {
    Navigate('/profile/create-new-project');
    };


    return (
        <Box
        id="hero"
        sx={() => ({
            width: '100%',
            
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
        <Stack spacing={2} useFlexGap sx={{ 
                display: 'flex',
                flexDirection :'row',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap : 'wrap',
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

                  <Box>
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
                  </Box>
                            
                </Stack>
        
        
        </Container>
    </Box>
    );
};

export default Header;