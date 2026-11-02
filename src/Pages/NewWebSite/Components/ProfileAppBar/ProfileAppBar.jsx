

//React
import {  } from 'react'
import {  useNavigate} from 'react-router-dom';



//redux
import { useSelector } from 'react-redux'

//Components


//MUI
import {
  Box,
  useMediaQuery,
  
} from '@mui/material'
import { styled } from '@mui/system'

import { logOut } from '../../../../Services/AuthServices/authService';
import LargeScreenProfileAppBar from './SubComponents/LargeScreenProfileAppBar';
import SmallScreenProfileAppBar from './SubComponents/SmallScreenProfileAppBar';


//Styled Components
const StyledAppAppBar = styled(Box)(
  () => ({
   
  })
)



const ProfileAppBar = () => {



  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('lg'));


  const user = useSelector(state => state.authSlice.user)

  const navigate = useNavigate()


  const handleLogOut = async () => {
    const res = await logOut()
    console.log(res)
    if(res.success){
      navigate("/")
    } else {
      console.log("Log Out Failed")
    }
  }

  const menuItems = [
    user?.is_admin && { value: 'Admin Page', onClick: () => navigate("/admin-dashboard") },
    { value: 'Settings', onClick: () => alert('Settings clicked') },
    { value: 'Logout', onClick: () => handleLogOut() },
  ].filter(item => item);



    return (
        <StyledAppAppBar >
          {
            isSmallScreen
            ?
              <SmallScreenProfileAppBar 
                handleLogOut={handleLogOut}
              />
            : <LargeScreenProfileAppBar
                profileMenuItems={menuItems}
              />
          }
          
        </StyledAppAppBar>
    );
};

export default ProfileAppBar;

ProfileAppBar.propTypes = {
};
