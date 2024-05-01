//React
import {  } from "react"

//redux
import { useDispatch, useSelector } from "react-redux";
import {  closeAdminNavbar } from "../../../../Redux/Slices/componentsOpenSlice";

//Materia UI
import {
    Drawer,
} from "@mui/material"
import { styled } from '@mui/system';


//components
import AdminNavbarList from "../../../../DeletedComponents/AdminNavbarList";



const AdminNavbar = () => {
    //dispatch
    const dispatch = useDispatch()
    //redux states
    const openDrawer = useSelector(state => state.componentsOpenSlice.adminNavbarOpen)
    const dir = useSelector(state => state.langSlice.dir)

    //handles
    const handleClose = () => {
        dispatch(closeAdminNavbar());
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
            >
                <AdminNavbarList />

            </CustomDrawer>
            </>



    )
}



export default AdminNavbar