import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'

//pages
import { Admin, ErrorPage, MainPage, NotFoundPage } from '../Pages';



//Admin Routes Services
import adminPageRoutes from './Routes/AdminPage/adminPageRoutes';



// import DesignRoutes from './Routes/DesignRoutes/DesignRoutes';


import LandPage from '../Pages/LandPage/LandPage';


//Cliser Shop
import EcommerceMain from '../Pages/Ecommerce/EcommerceMain';
import ProductView from '../Pages/Ecommerce/Components/Pages/ProductView';
import Cart from '../Pages/Ecommerce/Components/Pages/Cart';
import CheckOut from '../Pages/Ecommerce/Components/Pages/CheckOut';
import CreateElementTemplate from '../Pages/Admin/Components/CreateElementTemplate/CreateElementTemplate';
import MyWebSite from '../Pages/NewWebSite/Pages/MyWebSite/sections/ManageWebsites/MyWebSite';
import CreateWebsite from '../Pages/NewWebSite/Pages/MyWebSite/sections/createWebsite/createWebsite';
import Products from '../Pages/Ecommerce/Components/Pages/Products';
import CliserDigitalMarketHomePage from '../Pages/Ecommerce/Components/Pages/CliserDigitalMarketHomePage';

//Auth Pages
import AuthMain from '../Pages/AuthPages/pages/AuthMain/AuthMain';
import LoginPage from '../Pages/AuthPages/pages/LogInPage/LoginPage';
import SignUp from '../Pages/AuthPages/pages/SignUpPage/SignUp';

//Requires
import RequireAuth from './Requires/RequireAuth';
import RequireAdmin from './Requires/RequireAdmin';
import RequireSignOut from './Requires/RequireSignOut';

//Profile Pages
import Profile from '../Pages/NewWebSite/Profile';
import ProfileHomePage from "../Pages/NewWebSite/Pages/ProfileHomePage/ProfileHomePage"
import EditPage from '../Pages/DesignControlPage/sections/EmptyDesign/EditPage/EditPage';
import Main from '../Pages/DesignControlPage/sections/EmptyDesign/Main';
import { ProvideUser } from '../Services/AuthServices/authService';
import PortfolioMain from '../Pages/NewWebSite/Pages/PortfolioMain/PortfolioMain';
import { fetchSpecificProductLoader } from '../Services/UserServices/Services/productsUsersService';
import MyPaymentPlans from '../Pages/NewWebSite/Pages/MyPaymentPlans/MyPaymentPlans';
import MyOrdersAndBilling from '../Pages/NewWebSite/Pages/MyOrdersAndBilling/MyOrdersAndBilling';
import HandleProductPage from '../Pages/NewWebSite/Pages/HandleProductPage/HandleProductPage';
import MainPreview from '../Pages/DesignControlPage/sections/EmptyDesign/Preview/MainPreview';
import MySellsPage from '../Pages/NewWebSite/Pages/MySellsPage/MySellsPage';
import MainEdit from '../Pages/DesignControlPage/sections/EmptyDesign/EditPage/MainEdit';
import MyBilling from '../Pages/NewWebSite/Pages/MyBilling/MyBilling';


// ------------- NOTICES -------------
/**
 * With loader prop we send the data to all the components under that route, and this provide the data to us with one fetch,
 * No need to fetch the data at every component. FANTASTIC
 */


//Router
const router = createBrowserRouter(
    createRoutesFromElements(
        //All App Routes
        <Route path='/' element={<MainPage />} errorElement={<ErrorPage />} loader={ProvideUser} >
            {/* //?Check if user logged */}
            <Route element={<RequireAuth />}>
                {/* //* Admin Routes */}
                {/* //?Check if user admin */}
                <Route element={<RequireAdmin />}>
                    <Route path="create-template" element={<CreateElementTemplate />} />
                    <Route 
                        exact 
                        path="admin-dashboard"  
                        element={<Admin />} 
                    >
                            {
                                adminPageRoutes.map((route, index) => {
                                    return (
                                        <Route 
                                        key={index}
                                        path={route.path} 
                                        element={route.element} 
                                        loader={route.loader} 
                                        action={route.action} //You can add the function that form will listen to it, when post data. (IMPORTANT: the result of this function will be save in useActionData() hook, You can use it in each component in the users page)
                                        />
                                    )
                                })
                            }
                    </Route>
                </Route>
                {/* //? after logging */}
                {/* //* Profile Routes */}
                <Route 
                path="profile"
                element={<Profile/>}
                >
                    <Route path="" element={<ProfileHomePage />} />
                    <Route path="web-projects" element={<MyWebSite />} />
                    <Route path="handle-product/:id" element={<HandleProductPage />} />
                    <Route path="handle-product" element={<HandleProductPage />} />
                    <Route path="payment-plan" element={<MyPaymentPlans />} />
                    <Route path="orders" element={<MyOrdersAndBilling />} />
                    <Route path="billing" element={<MyBilling />} />
                    <Route path="create-new-project" element={<CreateWebsite />} />
                    <Route path="my-sales" element={<MySellsPage />} />
                </Route>
                {/* //* Design Control Page Routes */}
                <Route path="/empty-design/EditPage/:section_id" element={<MainEdit />} />
                <Route path="/empty-design/:id/*" element={<Main />} exact= {true} />
                <Route path="/preview/:id/*" element={<MainPreview />} />
            </Route>
            
            {/* //* E commerce routes */}
            <Route path="/cliser-digital-market" element={<EcommerceMain />}>
                {/* //?Check if user logged */}
                <Route element={<RequireAuth />}>
                    <Route path="CheckOut" element={<CheckOut />} />
                </Route>
                {/* //? can visit without logging */}
                <Route path="" element={<CliserDigitalMarketHomePage />} />
                <Route path="Products" element={<Products />} />
                <Route path="productView/:idx" element={<ProductView />} loader={fetchSpecificProductLoader} />
                <Route path="Cart" element={<Cart />} />
            </Route>
            
            {/* //? can visit without logging and can't visit after logging */}
            {/* //* Land page */}
            <Route element={<RequireSignOut />}>
                <Route path="/" element={<LandPage />} />
                <Route path="/auth" element={<AuthMain />}>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="sign-up" element={<SignUp />} />
                </Route>
            </Route>
            {/* can visit always */}
            <Route path="portfolio/:user_id" element={<PortfolioMain />} />
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    )
)


const CustomRouterProvider = () => {
    return (
        <RouterProvider router={router} />
    );
};

export default CustomRouterProvider;