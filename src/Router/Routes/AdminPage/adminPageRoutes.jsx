//Pages
import {
    DashboardMainPage,
    ProductsPage,
    UsersPage,
    CategoriesPage
} from "../../../Pages/Admin/AdminPages"
import categoriesService from "../../../Services/categoriesService";
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
        element: <CategoriesPage />,
        path: "categories",
        exact: false,
        loader: categoriesService.fetchCategories,
        action: categoriesService.addCategory,
    },
]



export default adminPageRoutes;