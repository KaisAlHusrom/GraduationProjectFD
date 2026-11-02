//React
import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

//Components


//MUI
import {
    Box,
    Drawer
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import NavList from '../ProfileAppBar/SubComponents/NavList'

//Styled Components
const StyledProfileNavBar = styled(Box)(
    ({ theme }) => ({
    
    })
)


const ProfileNavBar = () => {
    //dispatch
    //redux states
    const dir = useSelector(state => state.langSlice.dir)

    //open
    const [open, setOpen] = useState(false)
    //handles
    const handleClose = () => {
        setOpen(false);
    };

    //Styled Components
    const CustomDrawer = styled(Drawer)(({ theme }) => ({
        "& .MuiDrawer-paper": {
            width: "300px",
            marginTop: "65px",
            height: "calc(100vh - 65px)",
            borderRight: "1px solid",
            borderColor: theme.palette.divider,
            overflow: "hidden",
            [theme.breakpoints.down('lg')]: {
                width:  "0 ",
                border: "none",
            },
            zIndex: 999,
        }
    })
    );


    return (
            <>
            <CustomDrawer
            anchor={dir === "rtl" ? "right" : "left"}
            open
            onClose={handleClose}
            variant= {'permanent'}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            PaperProps={{
                sx: {
                    // zIndex: 3000,
                }
            }}
            >
                <NavList />
                {/* <AdminNavbarList /> */}

            </CustomDrawer>
            </>



    )
};

ProfileNavBar.propTypes = {
    children: propTypes.array
}

export default ProfileNavBar;