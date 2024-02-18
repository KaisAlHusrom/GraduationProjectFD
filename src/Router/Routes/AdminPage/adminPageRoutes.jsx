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
    PaymentPlanFeaturesPage
} from "../../../Pages/Admin/AdminPages"
import OrdersPage from "../../../Pages/Admin/AdminPages/OrdersPage/OrdersPage";
import categoriesService from "../../../Services/categoriesService";
import orderService from "../../../Services/ordersService";
import { addPaymentPlanFeatures, fetchPaymentPlanFeatures } from "../../../Services/paymentPlanFeautres";
import { addPaymentPlans, fetchPaymentPlans } from "../../../Services/paymentPlans";
import productReviewsService from "../../../Services/productReviewsService";
import productFeaturesService from "../../../Services/productsFeaturesService";
import { addProductsMedia, fetchProductsMedia } from "../../../Services/productsMedia";
import productService from "../../../Services/productsService";
import { addProductUsedSkill, fetchProductsUsedSkill } from "../../../Services/productsUsedSkills";


//Users Services
import usersService from '../../../Services/usersService';

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
]



export default adminPageRoutes;