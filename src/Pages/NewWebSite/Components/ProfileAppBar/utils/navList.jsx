import AccountTreeIcon from '@mui/icons-material/AccountTree';

import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
export const navList = [
    {
        path: "/profile/web-projects",
        title: "Create a new project",
        icon: AccountTreeIcon
    },
    {
        path: "/profile/handle-product",
        title: "Add a new product",
        icon: AddOutlinedIcon
    },
    {
        path: "/profile/payment-plan",
        title: "My Plan",
        icon: ImportContactsIcon
    },
    {
        path: "/profile/orders",
        title: "Orders",
        icon: BorderColorOutlinedIcon
    },
    {
        path: "/profile/billing",
        title: "Billing",
        icon: DescriptionOutlinedIcon
    },
    {
        path: "/profile/my-sales",
        title: "My Sales",
        icon: SellOutlinedIcon
    },
    {
        path: "/cliser-digital-market",
        title: "Cliser Store",
        icon: StoreOutlinedIcon
    },
]