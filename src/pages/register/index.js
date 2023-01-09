import React from 'react';

import {Link, useNavigate} from 'react-router-dom';
import { useState} from 'react';
import axios from '../../api/axios';

// import logo from '../../assets/images/logo.svg';
// import darkLogo from '../../assets/images/dark-logo.svg';

import {toast} from 'react-toastify'

function Register(){
    

    const [user, setUser] = useState({firstName:'',
                                       lastName:'',
                                        email:'',
                                        phoneNumber:'',
                                        password:'',
                                        confirmPassword:''})

    const handleRegisterFormChange = (e) =>{

        const name = e.target.name;
        const value = e.target.value;
        setUser({...user, [name]:value})

    }

    const navigate = useNavigate();

    

    const handleRegisterFormSubmit = (e) =>{
        e.preventDefault();
        
        const registerData = {"first_name":user.firstName,
                              "last_name":user.lastName,
                              "email":user.email,
                              "phone_number":user.phoneNumber,
                              "password":user.password,
                              "confirmPassword":user.confirmPassword }

        
        if(user.password.length <8){
            toast.error("Password should have at least 8 characters!")
        }else if(user.password !== user.confirmPassword){
            toast.error("Passwords do not match!")
        }else{

            //Register Account API call
            axios.post('/accounts/register', registerData)
            .then((response) => {  
                //Upon successful registration
                toast.success("Registration Successful!")          
                //Redirect to login
                navigate('/login');
            })
            .catch(error => {
                // console.error('There was an error!', error);
                //Add error message
                // console.log(error.response.data['email'])
                if(error.response.data.email !== null && error.response.data.email[0]==='This field must be unique.' ){
                    // console.log(error.response.data.email)
                    toast.error('User with the entered email already exists!')
                }else{
                    toast.error('There was some error with registration. Please try again later.')
                }


                
            });

        }

        
   
    }

    return(
    <>
        <div className="sign-inup">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5">
                        <div className="sign-form">
                            <div className="sign-inner">
                                <div className="sign-logo" id="logo">
                                    {/* <Link to="/"><img src={logo} alt=""/></Link> */}
                                    <Link to="/"><img src="/images/logo.svg" alt=""/></Link>
                                    {/* <Link to="/"><img className="logo-inverse" src={darkLogo} alt=""/></Link> */}
                                    <Link to="/"><img className="logo-inverse" src="/images/dark-logo.svg" alt=""/></Link>
                                </div>
                                <div className="form-dt">
                                    <div className="form-inpts checout-address-step">
                                        <form onSubmit={handleRegisterFormSubmit}>
                                            <div className="form-title">
                                                <h6>Sign Up</h6>                                                
                                            </div>
                                            <div className="form-group pos_rel">
                                                <input id="firstName" name="firstName" type="text" placeholder="First name" value={user.firstName} onChange={handleRegisterFormChange} className="form-control lgn_input" required={true}/>
                                                <i className="uil uil-user-circle lgn_icon"></i>
                                            </div>
                                            <div className="form-group pos_rel">
                                                <input id="lastName" name="lastName" type="text" placeholder="Last name" value={user.lastName} onChange={handleRegisterFormChange} className="form-control lgn_input" required={true}/>
                                                <i className="uil uil-user-circle lgn_icon"></i>
                                            </div>
                                            <div className="form-group pos_rel">
                                                <input id="email" name="email" type="email" placeholder="Email Address"  value={user.email} onChange={handleRegisterFormChange} className="form-control lgn_input" required={true}/>
                                                <i className="uil uil-envelope lgn_icon"></i>
                                            </div>
                                            <div className="form-group pos_rel">
                                                <input id="phoneNumber" name="phoneNumber" type="text" placeholder="Phone Number" value={user.phoneNumber} onChange={handleRegisterFormChange} className="form-control lgn_input" required={true}/>
                                                <i className="uil uil-mobile-android-alt lgn_icon"></i>
                                            </div>
                                            
                                            <div className="form-group pos_rel">
                                                <input id="password" name="password" type="password" placeholder="New Password" value={user.password} onChange={handleRegisterFormChange} className="form-control lgn_input" required={true}/>
                                                <i className="uil uil-padlock lgn_icon"></i>
                                            </div>

                                            <div className="form-group pos_rel">
                                                <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" value={user.confirmPassword} onChange={handleRegisterFormChange} className="form-control lgn_input" required={true}/>
                                                <i className="uil uil-padlock lgn_icon"></i>
                                            </div>

                                            <button className="login-btn hover-btn" type="submit">Sign Up Now</button>
                                        </form>
                                    </div>
                                    <div className="signup-link">
                                        <p>I have an account? - <Link to="/login" >Sign in</Link></p>
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


export default Register;