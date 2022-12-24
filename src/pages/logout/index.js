import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { userLogout } from "../../store/auth/authSlice";

function Logout(){
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(userLogout())
        
        navigate("/login")
    },[])

    return(
        <>
        </>
    )
}


export default Logout