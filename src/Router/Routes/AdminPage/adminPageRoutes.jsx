//Pages
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
    StylesSettings,
    StylesPropCategoriesPage,
    StylesPropsPage,
    StylePropValuesPage,
    StyleStatusesPage,
    StyleResponsiveBreakpointsPage,
    DesignCategories
} from "../../../Pages/Admin/AdminPages"
import ElementPropsPage from "../../../Pages/Admin/AdminPages/ElementPropsPage/ElementPropsPage";
import OrdersPage from "../../../Pages/Admin/AdminPages/OrdersPage/OrdersPage";



//icons






//Users Services
import usersService from '../../../Services/usersService';
import ElementTypesCategoriesPage from "../../../Pages/Admin/AdminPages/ElementTypesCategoriesPage/ElementTypesCategoriesPage";


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

    },
    {
        element: <PaymentPlanFeaturesPage />,
        path: "payment-plans-features",
        exact: false,

    },
    {
        element: <ProductsPage />,
        path: "products",
        exact: false,

    },
    {
        element: <ProductsFeaturesPage />,
        path: "products-features",
        exact: false,

    },
    {
        element: <ProductsUsedSkillsPage />,
        path: "products-used-skills",
        exact: false,

    },
    {
        element: <ProductsMediaPage />,
        path: "products-media",
        exact: false,

    },
    {
        element: <ProductReviewsPage />,
        path: "products-reviews",
        exact: false,

    },
    {
        element: <CategoriesPage />,
        path: "categories",
        exact: false,

    },
    {
        element: <OrdersPage />,
        path: "orders",
        exact: false,

    },
    {
        element: <ElementSettingsPage />,
        path: "element-settings",
        exact: false,

    },
    {
        element: <ElementTypesCategoriesPage />,
        path: "element-settings/element-types-categories",
        exact: false,

    },
    {
        element: <ElementTypesPage />,
        path: "element-settings/element-types",
        exact: false,

    },
    {
        element: <ElementPropsPage />,
        path: "element-settings/element-props",
        exact: false,
    },
    // {
    //     element: <CreateElementTemplate />
    //     ,
    //     path: "element-settings/create-element-template",
    //     exact: false,
    //     // loader: fetchCreateElementNeededData,
    //     // action: addStylesBreakpoint,
    // },
    {
        element: <StylesSettings />,
        path: "styles-settings",
        exact: false,
    },
    {
        element: <StylesPropCategoriesPage />,
        path: "styles-settings/styles-property-categories",
        exact: false,
    },
    {
        element: <StylesPropsPage />
        ,
        path: "styles-settings/styles-properties",
        exact: false,

    },
    {
        element: <StylePropValuesPage />
        ,
        path: "styles-settings/styles-properties-values",
        exact: false,

    },
    {
        element: <StyleStatusesPage />
        ,
        path: "styles-settings/styles-status",
        exact: false,

    },
    {
        element: <StyleResponsiveBreakpointsPage />
        ,
        path: "styles-settings/styles-breakpoints",
        exact: false,
    },
    {
        element: <DesignCategories />,
        path: "design-categories",
        exact: false,
    },
    
]



export default adminPageRoutes;