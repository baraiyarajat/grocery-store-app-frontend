import React from "react";
import ReactDOM from "react-dom";
import { Link, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Images
import logo from '../../assets/images/logo.svg'
import darkLogo from '../../assets/images/dark-logo.svg'


function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[redirect, setRedirect] = useState(false)


    
    const handleLoginSubmit = async (e) =>{
        e.preventDefault();
    }

    const navigate = useNavigate();

    if(redirect){
        navigate('/')
    }

    return (
        <>
            <div className="sign-inup">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <div className="sign-form">
                                <div className="sign-inner">
                                    <div className="sign-logo" id="logo">
                                        <Link to="/" ><img src={logo} alt=""/></Link>
                                        <Link to="/" ><img className="logo-inverse" src={darkLogo} alt=""/></Link>
                                    </div>
                                    <div className="form-dt">
                                        <div className="form-inpts checout-address-step">
                                            <form onSubmit={handleLoginSubmit}>
                                                <div className="form-title"><h6>Sign In</h6></div>
                                                <div className="form-group pos_rel">
                                                    <input id="email" name="email" type="text" placeholder="Enter Email" className="form-control lgn_input" required={true} onChange={e => setEmail(e.target.value)} />
                                                    <i className="uil uil-envelope lgn_icon"></i>
                                                </div>
                                                <div className="form-group pos_rel">
                                                    <input id="password" name="password" type="password" placeholder="Enter Password" className="form-control lgn_input" required={true} onChange={e=>setPassword(e.target.value)} />
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