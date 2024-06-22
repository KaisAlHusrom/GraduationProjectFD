import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import { useDispatch, useSelector } from 'react-redux';
import { changeMode } from '../../Redux/Slices/modeSlice';

function ToggleColorMode() {

  const mode = useSelector(state => state.modeSlice.mode)
  const dispatch = useDispatch()

  const toggleColorMode = () => {
      if(mode === 'dark' ) {
          dispatch(changeMode({mode : 'light'}))
      } 
      if(mode === 'light' ) {
          dispatch(changeMode({mode : 'dark'}))
      } 
  };


  return (
    <Box sx={{ maxWidth: '32px' }}>
      <Button
        variant="text"
        onClick={toggleColorMode}
        size="small"
        aria-label="button to toggle theme"
        sx={{ minWidth: '32px', height: '32px', p: '4px' }}
      >
        {mode === 'dark' ? (
          <WbSunnyRoundedIcon fontSize="small" />
        ) : (
          <ModeNightRoundedIcon fontSize="small" />
        )}
      </Button>
    </Box>
  );
}

ToggleColorMode.propTypes = {

};

export default ToggleColorMode;