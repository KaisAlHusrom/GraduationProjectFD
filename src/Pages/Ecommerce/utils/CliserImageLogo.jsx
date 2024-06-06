//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components
import CliserDark from "../data/Cliser-Dark-Theme.png"
import CliserLight from "../data/Cliser-Light-Theme.png"
import { useSelector } from 'react-redux';


//propTypes 
import propTypes from 'prop-types'

//Styled Components

const logoStyle = {
    width: '80px',
    height: '80px',
    cursor: 'pointer',
  };


const CliserImageLogo = ({HandleMainButton}) => {
    const themeMode = useSelector(state => state.modeSlice.mode)
    let src;
    if (themeMode === 'light') {
        src = CliserLight; // Set the source to CliserLight.jpg for light mode
    } else {
        src = CliserDark; // Set the source to CliserDark.jpg for dark mode
    }
    return <img src={src} style={logoStyle} alt="logo of Cliser" onClick={HandleMainButton} />

};

CliserImageLogo.propTypes = {
    children: propTypes.array,
    
}

export default CliserImageLogo;