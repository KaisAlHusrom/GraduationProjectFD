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
import DesignOne from '../Pages/DesignControlPage/sections/ReadyDesigns/NavBars/Design1';
import Designtwo from '../Pages/DesignControlPage/sections/ReadyDesigns/NavBars/Design2';
import DesignThree from '../Pages/DesignControlPage/sections/ReadyDesigns/NavBars/Design3';
import EditPage from '../Pages/DesignControlPage/sections/TempalteSection/EditPage/EditPage';


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

            <Route path="/design-control/EditPage/:section_id" element={<EditPage />} />

            <Route path="*" element={<NotFoundPage />} />
            <Route path="DesignThree" element={<DesignThree />} />
            <Route path="DesignTwo" element={<Designtwo />} />
            <Route path="DesignOne" element={<DesignOne />} />
        </Route>
    )
)


const CustomRouterProvider = () => {
    return (
        <RouterProvider router={router} />
    );
};

export default CustomRouterProvider;