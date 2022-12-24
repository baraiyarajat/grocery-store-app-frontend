import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () =>{
    const auth = useSelector((store)=>store.auth)
    const location = useLocation()
    
    return (    
        auth.isAuthenticated
            ? <Outlet  />
            : <Navigate to="/login" state={{from:location}} replace />
    )
}


export default RequireAuth;