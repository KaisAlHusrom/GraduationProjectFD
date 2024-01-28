// StyledAboutUs.jsx
import { styled } from '@mui/system';
import { Box } from '@mui/material';

const StyledAboutUs = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  backgroundColor: 'gray',
  borderRadius: '10px',
  paddingBottom: theme.spacing(8),
  position: 'relative',
}));

export default StyledAboutUs;
