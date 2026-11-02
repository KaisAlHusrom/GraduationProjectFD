//React
import { useState } from 'react'

//redux
import {
    
} from 'react-redux'


//Components
import { CustomNavListItem } from '../../../../../Components'
import adminPageLinks from '../../../../../Router/Routes/AdminPage/adminPageLinks'

//MUI
import {
    List,
} from '@mui/material'
import { styled } from '@mui/system'



//Styled Components
const StyledAdminNavbarListContent = styled(List)(
    ({ theme }) => ({
        width: "100%",
        padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    })
)




// const StyledListItemButton = styled(ListItemButton)(
//     ({ theme }) => ({
//         width: "100%",
//     })
// )



const AdminNavbarListContent = () => {
    const [openedItem, setOpenedItem] = useState(null)


    return (
        <StyledAdminNavbarListContent>
            {
                adminPageLinks.map((link, index) => {
                    return (
                        <CustomNavListItem
                            key={index}
                            title={link.title}
                            icon={link.icon}
                            path={link.path}
                            nestedMenu={link.nestedMenu}
                            index={index}
                            openedItemState={{openedItem, setOpenedItem}}
                        />
                    )
                })
            }

        </StyledAdminNavbarListContent>
    );
};

export default AdminNavbarListContent;