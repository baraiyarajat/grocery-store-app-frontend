import React from "react";
import { Link, Navigate, useLocation, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { authenticateUser, userLogin } from "../../store/auth/authSlice";
import { useRef } from "react";
import { useEffect } from "react";


function Login(){

    const [searchParams, setSearchParams] = useSearchParams();
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const nextLocation  = searchParams.get('next') || "/"
    const from = location.state?.from?.pathname || "/";
    
    
    
    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [errMsg, setErrMsg] = useState('')
    
    const {isAuthenticated} = useSelector((store)=>store.auth)


    const dispatch = useDispatch()
    
    const handleLoginSubmit =  (e) =>{
        e.preventDefault();
        
            
        const userEmail = email
        const userPassword = password
        dispatch(authenticateUser( {"email":userEmail,
                            "password":userPassword} ))
        
        

        setEmail('')
        setPassword('')

    }

    useEffect(()=>{
        // console.log(isAuthenticated)
        if(isAuthenticated){
            if(from!=="/"){
                navigate(from, {replace:true})
            }else{
                navigate(nextLocation, {replace:true})
            }
            
        }
    },[isAuthenticated])

    useEffect(()=>{
        userRef.current.focus()
    },[])

    useEffect(()=>{
        setErrMsg('')
    },[email, password])

    return (
        <>
            <div className="sign-inup">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <div className="sign-form">

                                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} 
                                aria-live="assertive" >{errMsg}</p>


                                <div className="sign-inner">
                                    <div className="sign-logo" id="logo">
                                        {/* <Link to="/" ><img src={logo} alt=""/></Link>
                                        <Link to="/" ><img className="logo-inverse" src={darkLogo} alt=""/></Link> */}

                                        <Link to="/" ><img src="/images/logo.svg" alt=""/></Link>
                                        <Link to="/" ><img className="logo-inverse" src="/images/dark-logo.svg" alt=""/></Link>
                                    </div>
                                    <div className="form-dt">
                                        <div className="form-inpts checout-address-step">
                                            <form onSubmit={handleLoginSubmit}>
                                                <div className="form-title"><h6>Sign In</h6></div>
                                                <div className="form-group pos_rel">
                                                    <input id="email" name="email" type="text" placeholder="Enter Email" className="form-control lgn_input" required={true} value={email} onChange={e => setEmail(e.target.value)} ref={userRef} />
                                                    <i className="uil uil-envelope lgn_icon"></i>
                                                </div>
                                                <div className="form-group pos_rel">
                                                    <input id="password" name="password" type="password" placeholder="Enter Password" className="form-control lgn_input" required={true} value={password} onChange={e=>setPassword(e.target.value)} />
                                                    <i className="uil uil-padlock lgn_icon"></i>
                                                </div>
                                                <button className="login-btn hover-btn" type="submit">Sign In Now</button>
                                            </form>
                                        </div>
                                        <div className="password-forgor">
                                            <Link to="/forgot-password" >Forgot Password?</Link>
                                        </div>
                                        <div className="signup-link">
                                            <p>Don't have an account? - <Link to="/register" > Sign Up Now</Link></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="copyright-text text-center mt-3">
                                <i className="uil uil-copyright"></i>Copyright 2020 <b>Gambolthemes</b> . All rights reserved
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Login;