//Pages
import {
    DashboardMainPage,
    ProductsPage,
    UsersPage,
    CategoriesPage,
    ProductsFeaturesPage,
    ProductReviewsPage
} from "../../../Pages/Admin/AdminPages"
import OrdersPage from "../../../Pages/Admin/AdminPages/OrdersPage/OrdersPage";
import categoriesService from "../../../Services/categoriesService";
import orderService from "../../../Services/ordersService";
import productReviewsService from "../../../Services/productReviewsService";
import productFeaturesService from "../../../Services/productsFeaturesService";
import productService from "../../../Services/productsService";


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