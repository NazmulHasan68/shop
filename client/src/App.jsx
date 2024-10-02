
import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/layout"
import AuthLogin from "./pages/auth/login"
import AuthRegister from "./pages/auth/register"
import AdminDashboard from "./pages/admin-view/Dashboard"
import AdminProduct from "./pages/admin-view/Product"
import AdminOrder from "./pages/admin-view/AdminOrder"
import AdminFeatures from "./pages/admin-view/Features"
import ShopingLayout from "./components/shopping-view/Layout"
import ShopingHome from "./pages/shoping-view/Home"
import Shpoinglisting from "./pages/shoping-view/listing"
import ShopingAccount from "./pages/shoping-view/Account"
import ShopingCheckout from "./pages/shoping-view/Checkout"
import Notfound from "./pages/Not-found"
import UnAuthPage from "./pages/unauth-page"
import { useDispatch, useSelector } from "react-redux"
import CheckAuth from "./components/common/check-auth"
import AdminLayout from "./components/admin-view/Layout"
import { useEffect } from "react"
import { checkAuth } from "./store/auth-slice"
import { Skeleton } from "@/components/ui/skeleton"



function App() {
  const {isAuthentication, user, isLoading } = useSelector((state)=>state.auth)

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])

  if(isLoading) return <Skeleton className="w-[800px] h-[1000px] bg-black" />


  return (
    <div className='flex flex-col overflow-hidden bg-white w-full'>
      {/* common component */}

      <Routes>

        {/* this part is for authurization */}
        <Route path="/auth" element={<CheckAuth isAuthentication={isAuthentication} user={user}><AuthLayout/></CheckAuth>}>
            <Route path="login" element={<AuthLogin/>}/>
            <Route path="register" element={<AuthRegister/>}/>
            <Route path="admin" element={<AdminLayout/>}/>
        </Route>

        {/* this part is for Admin Routes */}
        <Route path="/admin" element={<CheckAuth isAuthentication={isAuthentication} user={user}><AdminLayout/></CheckAuth>}>
            <Route path="dashboard" element={<AdminDashboard/>}/>
            <Route path="product" element={<AdminProduct/>}/>
            <Route path="order" element={<AdminOrder/>}/>
            <Route path="feature" element={<AdminFeatures/>}/>
        </Route>

        {/* this part is for shoping routes */}
        <Route path="/shop" element={<CheckAuth isAuthentication={isAuthentication} user={user}><ShopingLayout/></CheckAuth>}>
            <Route path="home" element={<ShopingHome/>}/>
            <Route path="listing" element={<Shpoinglisting/>}/>
            <Route path="account" element={<ShopingAccount/>}/>
            <Route path="checkout" element={<ShopingCheckout/>}/>
        </Route>

        {/* this part is for Not found page */}
        <Route path="*" element={<Notfound/>}></Route>

        {/* this part is for UnAuthorization page */}
        <Route path="/unauth-page" element={<UnAuthPage/>}></Route>

      </Routes>
    </div>
  )
}

export default App
