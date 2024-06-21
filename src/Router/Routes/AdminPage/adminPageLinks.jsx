//icons
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import FontDownloadOutlinedIcon from '@mui/icons-material/FontDownloadOutlined';


import GridViewIcon from '@mui/icons-material/GridView';
import CodeOffOutlinedIcon from '@mui/icons-material/CodeOffOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import GestureIcon from '@mui/icons-material/Gesture';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import PaymentsIcon from '@mui/icons-material/Payments';
import StarRateIcon from '@mui/icons-material/StarRate';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import WebOutlinedIcon from '@mui/icons-material/WebOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';

const adminPageLinks = [
    {
        title: "Users",
        icon: <PeopleOutlineOutlinedIcon color='primary.contrastText' />,
        path: "users",
        nestedMenu: null
    },
    {
        title: "Users Bank Cards",
        icon: <CreditCardOutlinedIcon color='primary.contrastText' />,
        path: "bank-cards",
        nestedMenu: null
    },
    {
        title: "Payments",
        icon: <PaymentOutlinedIcon color='primary.contrastText' />,
        path: "payments",
        nestedMenu: null
    },
    {
        title: "Payment Plans",
        icon: <PaymentsIcon color='primary.contrastText' />,
        path: "",
        nestedMenu: [
            {
                title: "Payment Plans",
                icon: <ImportContactsIcon color='primary.contrastText' />,
                path: "payment-plans"
            },
            {
                title: "Users Payment Plans",
                icon: <SubscriptionsOutlinedIcon color='primary.contrastText' />,
                path: "users-payments-plans"
            },
            {
                title: "Payment Plans Features",
                icon: <StarRateIcon color='primary.contrastText' />,
                path: "payment-plans-features"
            },
        ]
    },
    {
        title: "Cliser Market",
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
                title: "Products Categories",
                icon: <CategoryOutlinedIcon color='primary.contrastText' />,
                path: "products-categories"
            },
            {
                title: "Orders",
                icon: <BorderColorOutlinedIcon color='primary.contrastText' />,
                path: "orders"
            },
            {
                title: "Orders Items",
                icon: <Inventory2OutlinedIcon color='primary.contrastText' />,
                path: "order-items"
            },
        ],
        
    },
    {
        title: "Design Control",
        icon: <DesignServicesOutlinedIcon color='primary.contrastText' />,
        path: "",
        nestedMenu: [
            {
                title: "Web Projects",
                icon: <DesignServicesIcon />,
                path: "web-projects",
                nestedMenu: null
            },
            {
                title: "Pages",
                icon: <WebOutlinedIcon color='primary.contrastText' />,
                path: "pages"
            },
            {
                title: "Design Categories",
                icon: <GridViewIcon color='primary.contrastText' />,
                path: "design-categories"
            },
            {
                title: "Designs",
                icon: <PreviewOutlinedIcon color='primary.contrastText' />,
                path: "designs"
            },
            {
                title: "Designs Prop Values",
                icon: <StarBorderOutlinedIcon color='primary.contrastText' />,
                path: "designs-props-values"
            },
            {
                title: "Element Settings",
                icon: <CodeOffOutlinedIcon color='primary.contrastText' />,
                path: "element-settings"
            },
            {
                title: "Styles Settings",
                icon: <FormatPaintIcon color='primary.contrastText' />,
                path: "styles-settings"
            },
            // {
            //     title: "Colors Settings",
            //     icon: <PaletteOutlinedIcon color='primary.contrastText' />,
            //     path: "colors-settings"
            // },
            {
                title: "Fonts Settings",
                icon: <FontDownloadOutlinedIcon color='primary.contrastText' />,
                path: "fonts-settings"
            },
            {
                title: "Go To Design Page",
                icon: <DesignServicesOutlinedIcon color='primary.contrastText' />,
                path: "/design-control"
            },
            
        ],
    },
    {
        title: "Create New Template",
        icon: <DesignServicesIcon sx={{color: "primary.light"}}/>,
        path: "/create-template",
        nestedMenu: null
    },
]

export default adminPageLinks