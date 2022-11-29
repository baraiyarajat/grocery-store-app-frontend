import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import {Link} from 'react-router-dom';
import { setSelectedWarehouse } from "../../store/warehouse/selectedWarehouseSlice";
import { useSelector } from "react-redux";
import { getWarehouses } from "../../store/warehouse/warehouseSlice";

//images
import pyicon1 from '../../assets/images/footer-icons/pyicon-1.svg'
import pyicon2 from '../../assets/images/footer-icons/pyicon-2.svg'
import pyicon3 from '../../assets/images/footer-icons/pyicon-3.svg'
import pyicon4 from '../../assets/images/footer-icons/pyicon-4.svg'
import pyicon6 from '../../assets/images/footer-icons/pyicon-6.svg'
import download1 from '../../assets/images/download-1.svg'   
import download2 from '../../assets/images/download-2.svg'   
import { useDispatch } from "react-redux";


function Footer(){
    const dispatch = useDispatch()

    const {warehouses, isLoading} = useSelector((state)=>state.warehouse)
     useEffect(()=>{
        dispatch(getWarehouses())
    },[])


    return (
        <>            
            <footer className="footer">
                <div className="footer-first-row">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <ul className="call-email-alt">
                                    <li><Link to="#" className="callemail"><i className="uil uil-dialpad-alt"></i>1800-000-000</Link></li>
                                    <li><Link to="#" className="callemail"><i className="uil uil-envelope-alt"></i>info@gambosupermarket.com</Link></li>
                                </ul>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="social-links-footer">
                                    <ul>
                                        <li><Link><i className="fab fa-facebook-f"></i></Link></li>
                                        <li><Link><i className="fab fa-twitter"></i></Link></li>
                                        <li><Link><i className="fab fa-google-plus-g"></i></Link></li>
                                        <li><Link><i className="fab fa-linkedin-in"></i></Link></li>
                                        <li><Link><i className="fab fa-instagram"></i></Link></li>
                                        <li><Link><i className="fab fa-pinterest-p"></i></Link></li>
                                    </ul>
                                </div>
                            </div>				
                        </div>
                    </div>
                </div>
                <div className="footer-second-row">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="second-row-item">
                                    <h4>Categories</h4>
                                    <ul>
                                        <li><Link to="#">Fruits and Vegetables</Link></li>
                                        <li><Link to="#">Grocery & Staples</Link></li>
                                        <li><Link to="#">Dairy & Eggs</Link></li>
                                        <li><Link to="#">Beverages</Link></li>
                                        <li><Link to="#">Snacks</Link></li>
                                        <li><Link to="#">Home Care</Link></li>
                                        <li><Link to="#">Noodles & Sauces</Link></li>
                                        <li><Link to="#">Personal Care</Link></li>
                                        <li><Link to="#">Pet Care</Link></li>
                                        <li><Link to="#">Meat & Seafood</Link></li>
                                        <li><Link to="#">Electronics</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="second-row-item">
                                    <h4>Useful Links</h4>
                                    <ul>
                                        <li><Link to="/about-us">About US</Link></li>
                                        <li><Link to="/features-products">Featured Products</Link></li>
                                        <li><Link to="/offers">Offers</Link></li>
                                        <li><Link to="/blog">Blog</Link></li>
                                        <li><Link to="/faq">Faq</Link></li>
                                        <li><Link to="/careers">Careers</Link></li>
                                        <li><Link to="/contact-us">Contact Us</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="second-row-item">
                                    <h4>Top Cities</h4>
                                    <ul>
                                        {warehouses.map((warehouse)=>{
                                            return <li key={warehouse.id} ><Link onClick={()=>dispatch(setSelectedWarehouse(warehouse.id))}>{warehouse.name}</Link></li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="second-row-item-app">
                                    <h4>Download App</h4>
                                    <ul>
                                        <li><Link to="#"><img className="download-btn" src={download1} alt=""/></Link></li>
                                        <li><Link to="#"><img className="download-btn" src={download2} alt=""/></Link></li>
                                    </ul>
                                </div>
                                <div className="second-row-item-payment">
                                    <h4>Payment Method</h4>
                                    <div className="footer-payments">
                                        <ul id="paypal-gateway" className="financial-institutes">
                                            <li className="financial-institutes__logo">
                                                <img alt="Visa" title="Visa" src={pyicon6}/>
                                            </li>
                                            <li className="financial-institutes__logo">
                                                <img alt="Visa" title="Visa" src={pyicon1}/>
                                            </li>
                                            <li className="financial-institutes__logo">
                                                <img alt="MasterCard" title="MasterCard" src={pyicon2}/>
                                            </li>
                                            <li className="financial-institutes__logo">
                                                <img alt="American Express" title="American Express" src={pyicon3}/>
                                            </li>
                                            <li className="financial-institutes__logo">
                                                <img alt="Discover" title="Discover" src={pyicon4}/>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="second-row-item-payment">
                                    <h4>Newsletter</h4>
                                    <div className="newsletter-input">
                                        <input id="email" name="email" type="text" placeholder="Email Address" className="form-control input-md" required=""/>
                                        <button className="newsletter-btn hover-btn" type="submit"><i className="uil uil-telegram-alt"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-last-row">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="footer-bottom-links">
                                    <ul>
                                        <li><Link to="/about">About</Link></li>
                                        <li><Link to="/contact-us">Contact</Link></li>
                                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                                        <li><Link to="/terms-and-conditions">Term & Conditions</Link></li>
                                        <li><Link to="refund-and-return-policy">Refund & Return Policy</Link></li>
                                    </ul>
                                </div>
                                <div className="copyright-text">
                                    <i className="uil uil-copyright"></i>Copyright 2020 <b>Gambolthemes</b> . All rights reserved
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
	


        </>
    )

};


export default Footer;