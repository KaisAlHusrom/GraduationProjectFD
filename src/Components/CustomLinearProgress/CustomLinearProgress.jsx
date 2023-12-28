import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const BoxStyle = {
  width: "100%",
}

const LinearProgressStyle = {
  height: '8px',
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