import React, { useEffect } from "react";
import {Link} from 'react-router-dom';
import { setSelectedWarehouse } from "../../store/warehouse/selectedWarehouseSlice";
import { useSelector } from "react-redux";
import { getWarehouses } from "../../store/warehouse/warehouseSlice";

  
import { useDispatch } from "react-redux";
import { getCategories } from "../../store/category/categoriesSlice";


function Footer(){
    const dispatch = useDispatch()

    const {warehouses, isLoading} = useSelector((state)=>state.warehouse)
    const {categories, isCategoriesLoading} = useSelector((store)=>store.categories)
    
    useEffect(()=>{
        dispatch(getCategories())
    },[dispatch])

    useEffect(()=>{
        dispatch(getWarehouses())
    },[dispatch])


    return (
        <>            
            <footer className="footer">
                <div className="footer-first-row">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <ul className="call-email-alt">
                                    {/* <li><Link className="callemail"><i className="uil uil-dialpad-alt"></i>1800-000-000</Link></li>
                                    <li><Link className="callemail"><i className="uil uil-envelope-alt"></i>info@grocerystoreapp.com</Link></li> */}
                                    <li><i className="uil uil-dialpad-alt"></i>1800-000-000</li>
                                    <li><i className="uil uil-envelope-alt"></i>info@grocerystoreapp.com</li>
                                </ul>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="social-links-footer">
                                    <ul>
                                        <li><i className="fab fa-facebook-f"></i></li>
                                        <li><i className="fab fa-twitter"></i></li>
                                        <li><i className="fab fa-google-plus-g"></i></li>
                                        <li><i className="fab fa-linkedin-in"></i></li>
                                        <li><i className="fab fa-instagram"></i></li>
                                        <li><i className="fab fa-pinterest-p"></i></li>
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
                                        {!isCategoriesLoading &&                                         
                                            categories.map((category)=>{
                                                return <li key={category.id} ><Link to={`/products-by-category?name=${category.slug}`}>{category.name}</Link></li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="second-row-item">
                                    <h4>Useful Links</h4>
                                    <ul>
                                        <li>About Us</li>
                                        <li><Link to="/featured-products">Featured Products</Link></li>
                                        <li>Offers</li>
                                        <li>Blog</li>
                                        <li>Faq</li>
                                        <li>Careers</li>
                                        <li>Contact Us</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="second-row-item">
                                    <h4>Top Cities</h4>
                                    <ul>
                                        {!isLoading && warehouses.map((warehouse)=>{
                                            return <li key={warehouse.id} ><Link onClick={()=>dispatch(setSelectedWarehouse(warehouse.id))}>{warehouse.name}</Link></li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="second-row-item-app">
                                    <h4>Download App</h4>
                                    <ul>                                        
                                        <li><img className="download-btn" src="/images/download-1.svg" alt=""/></li>
                                        <li><img className="download-btn" src="/images/download-2.svg" alt=""/></li>
                                    </ul>
                                </div>
                                <div className="second-row-item-payment">
                                    <h4>Payment Method</h4>
                                    <div className="footer-payments">
                                        <ul id="paypal-gateway" className="financial-institutes">
                                            <li className="financial-institutes__logo">                                                
                                                <img alt="Visa" title="Visa" src="/images/footer-icons/pyicon-6.svg"/>
                                            </li>
                                            <li className="financial-institutes__logo">                                                
                                                <img alt="Visa" title="Visa" src="/images/footer-icons/pyicon-1.svg"/>
                                            </li>
                                            <li className="financial-institutes__logo">                                        
                                                <img alt="MasterCard" title="MasterCard" src="/images/footer-icons/pyicon-2.svg"/>
                                            </li>
                                            <li className="financial-institutes__logo">                                                
                                                <img alt="American Express" title="American Express" src="/images/footer-icons/pyicon-3.svg"/>
                                            </li>
                                            <li className="financial-institutes__logo">                                                
                                                <img alt="Discover" title="Discover" src="/images/footer-icons/pyicon-4.svg"/>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="second-row-item-payment">
                                    <h4>Newsletter</h4>
                                    <div className="newsletter-input">
                                        <input id="email" name="email" type="text" placeholder="Email Address" className="form-control input-md" required="" disabled/>
                                        <button className="newsletter-btn hover-btn" type="submit" disabled><i className="uil uil-telegram-alt"></i></button>
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
                                        <li>About</li>
                                        <li>Contact</li>
                                        <li>Privacy Policy</li>
                                        <li>Term & Conditions</li>
                                        <li>Refund & Return Policy</li>
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