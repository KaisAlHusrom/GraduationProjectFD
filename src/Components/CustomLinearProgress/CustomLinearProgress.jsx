import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { position } from 'stylis';

const BoxStyle = {
  width: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 100000,
}

const LinearProgressStyle = {
  height: '4px',
}

const CustomLinearProgress = () => {
  return (
    <Box sx={BoxStyle}>
      <LinearProgress 
        sx={LinearProgressStyle} 
      />
    </Box>
  )
}

export default CustomLinearProgress