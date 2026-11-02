import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { navigateSignUpPage } from '../../../../Helpers/navigations';

import {linearColoredText} from "../../../../StaticData/styles"
import useInView from '../../../../Helpers/customHooks/useInView';
import imag from '../../../../Assets/Images/landing-image.png'

const StyledHero = styled(Box)(
    ({ theme }) => ({
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      [theme.breakpoints.down("md")]: {
        flexDirection: 'column'
      }
    })
);

const StyledHeroImage = styled(Box)(
    ({ theme }) => ({
      width: '35vw',
      height: '50vh',
      overflow: 'hidden',
      borderRadius: theme.spacing(),
      [theme.breakpoints.down("md")]: {
        width: '100%',
        height: '100%',

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

export default function Hero() {
  const { ref, inView: isInView } = useInView();

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
        height: '100vh'
      })}
      ref={ref}
      className={isInView ? 'opacity-animation' : ''}
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
        <StyledHero>
          <Stack spacing={1} sx={{ width: { xs: '100%', md: '40%' } }}>
            <Typography
              variant="h3"
              sx={theme => ({
                ...linearColoredText(theme),
                alignSelf: 'center',
              })}
            >
              Discover the best solution for building your own website or online store in just 5 minutes!
            </Typography>
            <Typography
              sx={{
                width: { sm: '100%', md: '80%' } ,
                color: theme => theme.palette.text.secondary,
                textTransform: 'capitalize',
              }}
            >
              Without need to know coding
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
                onClick={navigateSignUpPage}
                sx={{
                  borderRadius: theme => theme.spacing(2),
                  fontSize: theme => theme.spacing(2),
                  fontWeight: 'bold'
                }}
                endIcon={<ArrowForwardIcon />}
              >
                GET STARTED FOR FREE
              </Button>
            </Stack>
            <Typography variant="subtitle2" letterSpacing={1.2} sx={{ opacity: 0.8 }}>
              Try
              Cliser
              &nbsp;
              <Typography component={'span'} letterSpacing={1.2} variant='subtitle1' color="secondary">
              free
              </Typography>
              &nbsp;
              for 7 days
            </Typography>
          </Stack>
          <StyledHeroImage>
                <Image 
                src={imag}
                alt="" 

                />
          </StyledHeroImage>
        </StyledHero>
      
      </Container>
    </Box>
  );
}