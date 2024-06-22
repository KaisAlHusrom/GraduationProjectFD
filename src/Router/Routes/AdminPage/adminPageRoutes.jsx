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







import ElementTypesCategoriesPage from "../../../Pages/Admin/AdminPages/ElementTypesCategoriesPage/ElementTypesCategoriesPage";
import DesignsPage from "../../../Pages/Admin/AdminPages/DesignsPage/DesignsPage";
import WebProjectsPage from "../../../Pages/Admin/AdminPages/WebProjects/WebProjects";
import PaymentsPage from "../../../Pages/Admin/AdminPages/PaymentsPage/PaymentsPage";
import UsersPaymentsPlansPage from "../../../Pages/Admin/AdminPages/UsersPaymentsPlansPage/UsersPaymentsPlansPage";
import PagesPage from "../../../Pages/Admin/AdminPages/PagesPage/PagesPage";
import OrderItemsPage from "../../../Pages/Admin/AdminPages/OrderItemsPage/OrderItemsPage";
import BankCardsPage from "../../../Pages/Admin/AdminPages/BankCardsPage/BankCardsPage";
import DesignedElementsPropValuesPage from "../../../Pages/Admin/AdminPages/DesignedElementsPropValuesPage/DesignedElementsPropValuesPage";


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
        element: <BankCardsPage />,
        path: "bank-cards",
        exact: false,
    },
    {
        element: <PaymentsPage />,
        path: "payments",
        exact: false,
    },
    {
        element: <UserDetailsPage />,
        path: "users/:user_id",
        exact: false,
        // loader: ufetchUser,
    },
    {
        element: <PaymentPlansPage />,
        path: "payment-plans",
        exact: false,

    },
    {
        element: <UsersPaymentsPlansPage />,
        path: "users-payments-plans",
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
        path: "products-categories",
        exact: false,

    },
    {
        element: <OrdersPage />,
        path: "orders",
        exact: false,

    },
    {
        element: <OrderItemsPage />,
        path: "order-items",
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
    {
        element: <DesignsPage />,
        path: "designs",
        exact: false,
    },
    {
        element: <DesignedElementsPropValuesPage />,
        path: "designs-props-values",
        exact: false,
    },
    {
        element: <WebProjectsPage />,
        path: "web-projects",
        exact: false,
    },
    {
        element: <PagesPage />,
        path: "pages",
        exact: false,
    },
    
]



export default adminPageRoutes;