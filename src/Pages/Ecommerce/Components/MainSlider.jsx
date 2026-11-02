
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { navigateCliserStoreProductsPage } from '../../../Helpers/navigations';

import {linearColoredText} from "../../../StaticData/styles"
import useInView from '../../../Helpers/customHooks/useInView';

import storeLandImage from "../../../Assets/Images/storeLandImage2.jpg"


const StyledHero = styled(Box)(
    ({ theme }) => ({
      display: 'flex',
      // justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      [theme.breakpoints.down("md")]: {
        flexDirection: 'column'
      }
    })
);

const StyledHeroImage = styled(Box)(
    ({ theme }) => ({
      width: '35vw',
      height: '80vh',
      overflow: 'hidden',
      borderRadius: theme.spacing(),
      [theme.breakpoints.down("md")]: {
        width: '100%',
        height: '90vh',

      }
    })
);

const Image = styled('img')(
    ({ theme }) => ({
      borderRadius: theme.spacing(),
      width:"100%",
      height:"100%",
      
    })
);

export default function MainSlider() {
  const { ref, inView: isInView } = useInView();

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage: `url(${storeLandImage})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        position: 'relative', // Ensure position relative for absolute positioning of blur effect
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -8,
          left: 0,
          width: '100%',
          height: '2vh', // Adjust the height of the blurred area as needed
          backdropFilter: 'blur(5px)', // Apply the blur effect
          zIndex: 1, // Ensure the blur layer is behind content
        }
      })}
      ref={ref}
      className={isInView ? 'opacity-animation' : ''}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <StyledHero>
          <Stack spacing={1} >
            <Typography
              variant="h3"
              sx={theme => ({
                ...linearColoredText(theme),
              })}
            >
              Best Ready Digital Products
            </Typography>
            <Typography
              sx={{
                width: { sm: '100%', md: '80%' } ,
                color: theme => theme.palette.text.secondary,
                textTransform: 'capitalize',
              }}
            >
              Get various customizable designs, templates, documents, and applications.
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              useFlexGap
              sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
            >
              
              <Button
                variant="contained" 
                color="primary"
                onClick={navigateCliserStoreProductsPage}
                sx={{
                  borderRadius: theme => theme.spacing(2),
                  fontSize: theme => theme.spacing(2),
                  fontWeight: 'bold'
                }}
                endIcon={<ArrowForwardIcon />}
              >
                Explore Products
              </Button>
            </Stack>
          </Stack>
          {/* <StyledHeroImage>
                <Image 
                src="https://cdn.prod.website-files.com/614319338322d2f96eb4dd96/65bbb3cba459313b60ea354a_Wuilt%20Hero%2024-p-800.png" 
                alt="" 

                />
          </StyledHeroImage> */}
        </StyledHero>
      
      </Container>
    </Box>
  );
}