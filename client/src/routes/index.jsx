
// import AdminLayout from "@/components/admin-view/Layout";
// import AuthLayout from "@/components/auth/layout";
// import AuthLogin from "@/pages/auth/login";
// import AuthRegister from "@/pages/auth/register";
// import {createBrowserRouter} from "react-router-dom";
// import AdminDashboard from "@/pages/admin-view/Dashboard";
// import AdminProduct from "@/pages/admin-view/Product";
// import AdminOrder from "@/pages/admin-view/Order";
// import AdminFeatures from "@/pages/admin-view/Features";
// import Notfound from "@/pages/Not-found";
// import ShopingLayout from "@/components/shopping-view/Layout";
// import ShopingHome from "@/pages/shoping-view/Home";
// import Shpoinglisting from "@/pages/shoping-view/listing";
// import ShopingAccount from "@/pages/shoping-view/Account";
// import ShopingCheckout from "@/pages/shoping-view/Checkout";
// import CheckAuth from "@/components/common/check-auth";
// import UnAuthPage from "@/pages/unauth-page";
// import Home from "@/pages/Home";
// import { useSelector } from "react-redux";


// export default function Router(){

//     const {isAuthenticated, user} = useSelector((state)=> state.auth)
    
//     return createBrowserRouter([
//         {
//         path: "/",
//         element :<Home/>,
//         children:[
//             // Authentication routes
//             {
//                 path : '/auth' ,
//                 element:<CheckAuth isAuthenticated={isAuthenticated} user={user}>
//                             <AuthLayout/>
//                         </CheckAuth> ,
//                 children :[
//                     {
//                         path : 'login',
//                         element :<AuthLogin/>
//                     },
//                     {
//                         path : 'register',
//                         element :<AuthRegister/>
//                     }
//                 ]  
//             },

//             // Admin routes
//             {
//                 path : '/admin',
//                 element :<CheckAuth isAuthenticated={isAuthenticated} user={user}>
//                              <AdminLayout/>
//                          </CheckAuth>,
//                 children:[
//                     {
//                         path : 'dashboard',
//                         element: <AdminDashboard/>
//                     },
//                     {
//                         path : 'product',
//                         element : <AdminProduct/>
//                     },
//                     {
//                         path : 'order',
//                         element : <AdminOrder/>
//                     },
//                     {
//                         path : 'feature',
//                         element : <AdminFeatures/>
//                     }
//                 ]
//             },

//             // shoping routes
//             {
//                 path : '/shop',
//                 element :<CheckAuth isAuthenticated={isAuthenticated} user={user}>
//                            <ShopingLayout/>
//                         </CheckAuth>,
//                 children :[
//                     {
//                         path : 'home',
//                         element : <ShopingHome/>
//                     },
//                     {
//                         path : 'listing',
//                         element : <Shpoinglisting/>
//                     },
//                     {
//                         path : 'account',
//                         element : <ShopingAccount/>
//                     },
//                     {
//                         path : 'checkout',
//                         element : <ShopingCheckout/>
//                     }
//                 ]
//             },

//             //Not found routes
//             {
//                 path : '*',
//                 element : <Notfound/>
//             },
//             // unAutorization page
//             {
//                 path : '/unauth-page',
//                 element : <UnAuthPage/>
//             }

//          ]
//     }
// ])}
