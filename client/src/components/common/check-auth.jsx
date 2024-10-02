import { Navigate, useLocation } from "react-router-dom"

// eslint-disable-next-line react/prop-types
export default function CheckAuth({isAuthentication, user, children}) {
    const location = useLocation()
    
  
    //check user 
    if(!isAuthentication 
        && !(location.pathname.includes('/login') 
        || location.pathname.includes('/register'))){
            return <Navigate to='/auth/login'/>
    } 

    //check user by role
    if(isAuthentication 
        && (location.pathname.includes('/login') 
        || location.pathname.includes('/register'))){
        // eslint-disable-next-line react/prop-types
            if(user.role==="admin"){
                return <Navigate to='/admin/dashboard'/>
            }else {
                return <Navigate to='/shop/home'/>
            }
        }
    
        
    //user is Authenticated but went to access admin page
    // eslint-disable-next-line react/prop-types
    if(isAuthentication && user?.role !=="admin" && location.pathname.includes('/admin')){
        return <Navigate to='/unauth-page'/>
    }

    //admin is Authenticated but went to access shoping page
    // eslint-disable-next-line react/prop-types
    if(isAuthentication && user?.role ==="admin" && location.pathname.includes('/shop')){
        return <Navigate to='/admin/dashboard'/>
    }

    return <>{children}</>

}
