import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'

//pages
import { Admin, DesignControlPage, ErrorPage, MainPage, NotFoundPage } from '../Pages';



//Users Services
import adminPageRoutes from './Routes/AdminPage/adminPageRoutes';
// eslint-disable-next-line no-unused-vars
import DesignRoutes from './Routes/DesignRoutes/DesignRoutes';
import EditPage from '../Pages/DesignControlPage/sections/TempalteSection/EditPage/EditPage';
import LandPage from '../Pages/LandPage/LandPage';
import EcommerceMain from '../Pages/Ecommerce/EcommerceMain';
import LoginPage from '../Pages/Ecommerce/Components/Pages/LoginPage';
import SignUp from '../Pages/Ecommerce/Components/Pages/SignUp';
import ProductView from '../Pages/Ecommerce/Components/Pages/ProductView';
import Cart from '../Pages/Ecommerce/Components/Pages/Cart';
import CheckOut from '../Pages/Ecommerce/Components/Pages/CheckOut';
import CreateElementTemplate from '../Pages/Admin/Components/CreateElementTemplate/CreateElementTemplate';
<<<<<<< HEAD
import MyWebSite from '../Pages/NewWebSite/Pages/MyWebSite/sections/ManageWebsites/MyWebSite';
import CreateWebsite from '../Pages/NewWebSite/Pages/MyWebSite/sections/createWebsite/createWebsite';
import Profile from '../Pages/NewWebSite/Pages/Profile/Profile';
=======
import Products from '../Pages/Ecommerce/Components/Pages/Products';
>>>>>>> 981e66fee7422664a73956b42f0e371e000f25e2



// ------------- NOTICES -------------
/**
 * With loader prop we send the data to all the components under that route, and this provide the data to us with one fetch,
 * No need to fetch the data at every component. FANTASTIC
 */


//Router
const router = createBrowserRouter(
    createRoutesFromElements(
        //All App Routes
        <Route path='/' element={<MainPage />} errorElement={<ErrorPage />}>
            {/* Admin Routes */}
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

               {/* Design Control Page Routes */}
            <Route 
            exact 
            path="design-control"  
            element={<DesignControlPage />} 
            > 

            </Route>
            <Route path="create-template" element={<CreateElementTemplate />} />

            <Route path="/design-control/EditPage/:section_id" element={<EditPage />} />
            <Route path="/Ecommerce" element={<EcommerceMain />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/CheckOut" element={<CheckOut />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/productView/:idx" element={<ProductView />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="LandPage" element={<LandPage />} />


            {/* after  loging */}
                <Route 
                path="profile"
                element={<Profile/>}
                >
                    <Route path="MyWebSite" element={<MyWebSite />} />
                    <Route path="CreateWebsite" element={<CreateWebsite />} />
                </Route>

        </Route>
    )
)


const CustomRouterProvider = () => {
    return (
        <RouterProvider router={router} />
    );
};

export default CustomRouterProvider;