//Pages
import { DatabaseView } from "../../../Components";
import {
    DashboardMainPage,
    ProductsPage,
    UsersPage,
    CategoriesPage,
    ProductsFeaturesPage,
    ProductReviewsPage,
    ProductsUsedSkillsPage,
    ProductsMediaPage,
    PaymentPlansPage,
    PaymentPlanFeaturesPage,
    UserDetailsPage,
    ElementSettingsPage,
    ElementTypesPage,
    StylesSettings
} from "../../../Pages/Admin/AdminPages"
import ElementPropsPage from "../../../Pages/Admin/AdminPages/ElementPropsPage/ElementPropsPage";
import OrdersPage from "../../../Pages/Admin/AdminPages/OrdersPage/OrdersPage";
import categoriesService from "../../../Services/categoriesService";
import { addElementProp, fetchElementProps } from "../../../Services/elementPropsService";
import { addElementType, fetchElementsTypes } from "../../../Services/elementsTypesService";
import orderService from "../../../Services/ordersService";
import { addPaymentPlanFeatures, fetchPaymentPlanFeatures } from "../../../Services/paymentPlanFeautres";
import { addPaymentPlans, fetchPaymentPlans } from "../../../Services/paymentPlans";
import productReviewsService from "../../../Services/productReviewsService";
import productFeaturesService from "../../../Services/productsFeaturesService";
import { addProductsMedia, fetchProductsMedia } from "../../../Services/productsMedia";
import productService from "../../../Services/productsService";
import { addProductUsedSkill, fetchProductsUsedSkill } from "../../../Services/productsUsedSkills";


//icons
import TuneIcon from '@mui/icons-material/Tune';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import MouseIcon from '@mui/icons-material/Mouse';
import FitScreenIcon from '@mui/icons-material/FitScreen';


//Users Services
import usersService from '../../../Services/usersService';
import { addStyleProperty, addStylePropertyValue, addStylesBreakpoint, addStylesStatus, fetchStylesBreakpoints, fetchStylesProperties, fetchStylesPropertiesValues, fetchStylesStatus } from "../../../Services/stylesSettings";
import CreateElementTemplate from "../../../Pages/Admin/Components/CreateElementTemplate/CreateElementTemplate";

const adminPageRoutes = [
    {
        element: <DashboardMainPage />,
        path: "",
        exact: true,
        loader: null,
        action: null
    },
    {
        element: <UsersPage />,
        path: "users",
        exact: false,
        loader: usersService.fetchUsers,
        action: usersService.addUser,
    },
    {
        element: <UserDetailsPage />,
        path: "users/:user_id",
        exact: false,
        loader: usersService.fetchUser,
    },
    {
        element: <PaymentPlansPage />,
        path: "payment-plans",
        exact: false,
        loader: fetchPaymentPlans,
        action: addPaymentPlans,
    },
    {
        element: <PaymentPlanFeaturesPage />,
        path: "payment-plans-features",
        exact: false,
        loader: fetchPaymentPlanFeatures,
        action: addPaymentPlanFeatures,
    },
    {
        element: <ProductsPage />,
        path: "products",
        exact: false,
        loader: productService.fetchProducts,
        action: productService.addProduct,
    },
    {
        element: <ProductsFeaturesPage />,
        path: "products-features",
        exact: false,
        loader: productFeaturesService.fetchProductsFeatures,
        action: productFeaturesService.addProductFeature,
    },
    {
        element: <ProductsUsedSkillsPage />,
        path: "products-used-skills",
        exact: false,
        loader: fetchProductsUsedSkill,
        action: addProductUsedSkill,
    },
    {
        element: <ProductsMediaPage />,
        path: "products-media",
        exact: false,
        loader: fetchProductsMedia,
        action: addProductsMedia,
    },
    {
        element: <ProductReviewsPage />,
        path: "products-reviews",
        exact: false,
        loader: productReviewsService.fetchProductsReviews,
        action: productReviewsService.addReview,
    },
    {
        element: <CategoriesPage />,
        path: "categories",
        exact: false,
        loader: categoriesService.fetchCategories,
        action: categoriesService.addCategory,
    },
    {
        element: <OrdersPage />,
        path: "orders",
        exact: false,
        loader: orderService.fetchOrders,
        action: orderService.addOrder,
    },
    {
        element: <ElementSettingsPage />,
        path: "element-settings",
        exact: false,
        // loader: orderService.fetchOrders,
        // action: orderService.addOrder,
    },
    {
        element: <ElementTypesPage />,
        path: "element-settings/element-types",
        exact: false,
        loader: fetchElementsTypes,
        action: addElementType,
    },
    {
        element: <ElementPropsPage />,
        path: "element-settings/element-props",
        exact: false,
        loader: fetchElementProps,
        action: addElementProp,
    },
    {
        element: <CreateElementTemplate />
        ,
        path: "element-settings/create-element-template",
        exact: false,
        // loader: fetchStylesBreakpoints,
        // action: addStylesBreakpoint,
    },
    {
        element: <StylesSettings />,
        path: "styles-settings",
        exact: false,
    },
    {
        element: <DatabaseView
                    title="Styles Properties"
                    icon={<TuneIcon />}
                />
        ,
        path: "styles-settings/styles-properties",
        exact: false,
        loader: fetchStylesProperties,
        action: addStyleProperty,
    },
    {
        element: <DatabaseView
                    title="Styles Property Values"
                    icon={<FormatColorFillIcon />}
                />
        ,
        path: "styles-settings/styles-properties-values",
        exact: false,
        loader: fetchStylesPropertiesValues,
        action: addStylePropertyValue,
    },
    {
        element: <DatabaseView
                    title="Styles Status"
                    icon={<MouseIcon />}
                />
        ,
        path: "styles-settings/styles-status",
        exact: false,
        loader: fetchStylesStatus,
        action: addStylesStatus,
    },
    {
        element: <DatabaseView
                    title="Styles Breakpoints"
                    icon={<FitScreenIcon />}
                />
        ,
        path: "styles-settings/styles-breakpoints",
        exact: false,
        loader: fetchStylesBreakpoints,
        action: addStylesBreakpoint,
    },
    
]



export default adminPageRoutes;