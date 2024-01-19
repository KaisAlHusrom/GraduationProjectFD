//Pages
import {
    DashboardMainPage,
    ProductsPage,
    UsersPage
} from "../../../Pages/Admin/AdminPages"
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
]



export default adminPageRoutes;