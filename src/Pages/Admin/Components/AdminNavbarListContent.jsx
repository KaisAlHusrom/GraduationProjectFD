//React
import {
    
} from 'react'

//redux
import {
    
} from 'react-redux'

//router
import { NavLink } from 'react-router-dom'

//Components


//MUI
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Link
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
//Styled Components
const StyledAdminNavbarListContent = styled(List)(
    ({ theme }) => ({
        width: "100%",
        padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    })
)

const StyledListItem = styled(ListItem)(
    ({ theme }) => ({
        padding: "0"
    })
)

const StyledLink = styled(NavLink)(
    ({ theme }) => ({
        width: "100%",
        color: theme.palette.text.primary,
        textDecoration: "none"
    })
)



// const StyledListItemButton = styled(ListItemButton)(
//     ({ theme }) => ({
//         width: "100%",
//     })
// )


const AdminNavbarListContent = () => {
    return (
        <StyledAdminNavbarListContent>
            <StyledListItem>
                <StyledLink
                to="#"
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <PeopleOutlineOutlinedIcon color='primary' />

                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItemButton>
                </StyledLink>
            </StyledListItem>
            <StyledListItem>
                <StyledLink
                to="design-control"
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <DesignServicesOutlinedIcon color='primary' />

                        </ListItemIcon>
                        <ListItemText primary="Design" />
                    </ListItemButton>
                </StyledLink>
            </StyledListItem>
        </StyledAdminNavbarListContent>
    );
};

export default AdminNavbarListContent;