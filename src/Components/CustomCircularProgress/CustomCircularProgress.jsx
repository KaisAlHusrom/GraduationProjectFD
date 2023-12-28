import {
    Box,
    CircularProgress
} from "@mui/material"

const BosStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 999, // Ensure it's above other content
    
}

const progressStyle = {
    width: "50px !important",
    height: "50px !important",
}

const CustomCircularProgress = () => { 
  return (
    <Box sx={BosStyle}>
        <CircularProgress 

        sx={progressStyle}
        />
    </Box>
  )
}

export default CustomCircularProgress