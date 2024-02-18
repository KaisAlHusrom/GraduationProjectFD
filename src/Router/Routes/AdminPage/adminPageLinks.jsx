//icons
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import FontDownloadOutlinedIcon from '@mui/icons-material/FontDownloadOutlined';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import CodeOffOutlinedIcon from '@mui/icons-material/CodeOffOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import GestureIcon from '@mui/icons-material/Gesture';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import PaymentsIcon from '@mui/icons-material/Payments';
import StarRateIcon from '@mui/icons-material/StarRate';

const adminPageLinks = [
    {
        title: "Users",
        icon: <PeopleOutlineOutlinedIcon color='primary.contrastText' />,
        path: "users",
        nestedMenu: null
    },
    {
        title: "Payment Plans Pages",
        icon: <PaymentsIcon color='primary.contrastText' />,
        path: "",
        nestedMenu: [
            {
                title: "Payment Plans",
                icon: <ImportContactsIcon color='primary.contrastText' />,
                path: "payment-plans"
            },
            {
                title: "Payment Plans Features",
                icon: <StarRateIcon color='primary.contrastText' />,
                path: "payment-plans-features"
            },
        ]
    },
    {
        title: "E-Commerce",
        icon: <AddShoppingCartOutlinedIcon color='primary.contrastText' />,
        path: "",
        nestedMenu: [
            {
                title: "Products",
                icon: <Inventory2OutlinedIcon color='primary.contrastText' />,
                path: "products"
            },
            {
                title: "Products Features",
                icon: <StarBorderOutlinedIcon color='primary.contrastText' />,
                path: "products-features"
            },
            {
                title: "Products Used Skills",
                icon: <GestureIcon color='primary.contrastText' />,
                path: "products-used-skills"
            },
            {
                title: "Products Media",
                icon: <PermMediaIcon color='primary.contrastText' />,
                path: "products-media"
            },
            {
                title: "Products Reviews",
                icon: <ThumbsUpDownOutlinedIcon color='primary.contrastText' />,
                path: "products-reviews"
            },
            {
                title: "Categories",
                icon: <CategoryOutlinedIcon color='primary.contrastText' />,
                path: "categories"
            },
            {
                title: "Orders",
                icon: <BorderColorOutlinedIcon color='primary.contrastText' />,
                path: "orders"
            },
        ],
        
    },
    {
        title: "Design Control",
        icon: <DesignServicesOutlinedIcon color='primary.contrastText' />,
        path: "",
        nestedMenu: [
            {
                title: "Colors Settings",
                icon: <PaletteOutlinedIcon color='primary.contrastText' />,
                path: "colors-settings"
            },
            {
                title: "Fonts Settings",
                icon: <FontDownloadOutlinedIcon color='primary.contrastText' />,
                path: "fonts-settings"
            },
            {
                title: "Pages Settings",
                icon: <DocumentScannerOutlinedIcon color='primary.contrastText' />,
                path: "pages-settings"
            },
            {
                title: "Section Settings",
                icon: <TableRowsOutlinedIcon color='primary.contrastText' />,
                path: "section-settings"
            },
            {
                title: "Component Settings",
                icon: <AppsOutlinedIcon color='primary.contrastText' />,
                path: "component-settings"
            },
            {
                title: "Element Settings",
                icon: <CodeOffOutlinedIcon color='primary.contrastText' />,
                path: "element-settings"
            },
            {
                title: "Go To Design Page",
                icon: <DesignServicesOutlinedIcon color='primary.contrastText' />,
                path: "/design-control"
            },
            
        ],
    }
]

export default adminPageLinks