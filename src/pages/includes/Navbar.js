import React from "react";
import ReactDOM from "react-dom";

import {Link} from 'react-router-dom';


//Components
import CartSidebar from "./components/CartSidebar";
import SearchModel from "./components/SearchModel";
import CategoryModel from "./components/CategoryModel";

// //Images
import darkLogo1 from '../../assets/images/dark-logo-1.svg'
import logo from '../../assets/images/logo.svg'
import darkLogo from '../../assets/images/dark-logo.svg'
import img5 from '../../assets/images/avatar/img-5.jpg'

import Dropdown from 'react-bootstrap/Dropdown';



//Category Icons
// import icon1 from '../../assets/images/category/icon-1.svg'
// import icon2 from '../../assets/images/category/icon-2.svg'
// import icon3 from '../../assets/images/category/icon-3.svg'
// import icon4 from '../../assets/images/category/icon-4.svg'
// import icon5 from '../../assets/images/category/icon-5.svg'
// import icon6 from '../../assets/images/category/icon-6.svg'
// import icon7 from '../../assets/images/category/icon-7.svg'
// import icon8 from '../../assets/images/category/icon-8.svg'
// import icon9 from '../../assets/images/category/icon-9.svg'




function Navbar(){

    return (
    <>
            {/* Category Model */}
            <CategoryModel/>
            
            {/* Search Model*/}
            <SearchModel/>
	

           {/* Cart Sidebar Offset */}
            <CartSidebar/>
	

             {/* Header */}
            <header className="header clearfix">
                <div className="top-header-group">
                    <div className="top-header">
                        <div className="res_main_logo">
                            <Link to="/" ><img src={darkLogo1} alt=""/></Link>
                        </div>
                        <div className="main_logo" id="logo">
                            <Link to="/" ><img src={logo} alt=""/></Link>
                            <Link to="/" ><img className="logo-inverse" src={darkLogo} alt=""/></Link>
                        </div>

                        <Dropdown  id="dropdown-basic" className="select_location">
                            <Dropdown.Toggle className="ui inline dropdown loc-title">
                                <div className="text" >
                                    <i className="uil uil-location-point"></i>
                                        Gurugram
                                </div>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="menu dropdown_loc" >
                                    <Dropdown.Item className="item channel_item" href="#/action-1">
                                        <i className="uil uil-location-point"></i>
                                        Gurugram
                                    </Dropdown.Item>
                                    <Dropdown.Item className="item channel_item" href="#/action-2">
                                        <i className="uil uil-location-point"></i>
                                        New Delhi
                                    </Dropdown.Item>
                                    <Dropdown.Item className="item channel_item" href="#/action-3">
                                        <i className="uil uil-location-point"></i>
                                        Bangaluru
                                    </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <div className="search120">
                            <div className="ui search">
                            <div className="ui left icon input swdh10">
                                <input className="prompt srch10" type="text" placeholder="Search for products.."/>
                                <i className='uil uil-search-alt icon icon1'></i>
                            </div>
                            </div>
                        </div>
                        <div className="header_right">
                            <ul>
                                <li>
                                    <Link to="/phone-no" className="offer-link"><i className="uil uil-phone-alt"></i>1800-000-000</Link>
                                </li>
                                <li>
                                    <Link to="/offers" className="offer-link"><i className="uil uil-gift"></i>Offers</Link>
                                </li>
                                <li>
                                    <Link to="/help" className="offer-link"><i className="uil uil-question-circle"></i>Help</Link>
                                </li>
                                <li>
                                    <Link to="/wishlist" className="option_links" title="Wishlist"><i className='uil uil-heart icon_wishlist'></i><span className="noti_count1">3</span></Link>
                                </li>	
                                

                                <li className="ui dropdown"> 
                                    <Dropdown className="opts_account" >
                                        <Dropdown.Toggle  >
                                            <img src={img5} alt=""/>
                                            <span className="user__name">John Doe</span>
                                        </Dropdown.Toggle>
                                        
                                        <Dropdown.Menu  >
                                            <Dropdown.Item href="/dashboard" className="item channel_item"><i className="uil uil-apps icon__1"></i>Dashbaord</Dropdown.Item>								
                                            <Dropdown.Item href="/orders" className="item channel_item"><i className="uil uil-box icon__1"></i>My Orders</Dropdown.Item>								
                                            <Dropdown.Item href="/wishlist" className="item channel_item"><i className="uil uil-heart icon__1"></i>My Wishlist</Dropdown.Item>								
                                            <Dropdown.Item href="/dashboard/wallet" className="item channel_item"><i className="uil uil-usd-circle icon__1"></i>My Wallet</Dropdown.Item>								
                                            <Dropdown.Item href="/dashboard/addresses" className="item channel_item"><i className="uil uil-location-point icon__1"></i>My Address</Dropdown.Item>								
                                            <Dropdown.Item href="/offers" className="item channel_item"><i className="uil uil-gift icon__1"></i>Offers</Dropdown.Item>								
                                            <Dropdown.Item href="/faq" className="item channel_item"><i className="uil uil-info-circle icon__1"></i>Faq</Dropdown.Item>								
                                            <Dropdown.Item href="/logout" className="item channel_item"><i className="uil uil-lock-alt icon__1"></i>Logout</Dropdown.Item>								
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>


                            </ul>
                        </div>
                    </div>
                </div>
                <div className="sub-header-group">
                    <div className="sub-header">
                        <div className="ui dropdown">
                            <Link to="#" className="category_drop hover-btn" data-toggle="modal" data-target="#category_model" title="Categories"><i className="uil uil-apps"></i><span className="cate__icon">Select Category</span></Link>
                        </div>
                        <nav className="navbar navbar-expand-lg navbar-light py-3">
                            <div className="container-fluid">
                                <button className="navbar-toggler menu_toggle_btn" type="button" data-target="#navbarSupportedContent"><i className="uil uil-bars"></i></button>
                                <div className="collapse navbar-collapse d-flex flex-column flex-lg-row flex-xl-row justify-content-lg-end bg-dark1 p-3 p-lg-0 mt1-5 mt-lg-0 mobileMenu" id="navbarSupportedContent">
                                    <ul className="navbar-nav main_nav align-self-stretch">
                                        <li className="nav-item"><a href="index.html" className="nav-link active" title="Home">Home</a></li>
                                        <li className="nav-item"><a href="shop_grid.html" className="nav-link new_item" title="New Products">New Products</a></li>
                                        <li className="nav-item"><a href="shop_grid.html" className="nav-link" title="Featured Products">Featured Products</a></li>
                                        <li className="nav-item">

                                            <Dropdown>
                                                <Dropdown.Toggle >
                                                    Pages
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu  >
                                                    <Dropdown.Item href="/dashboard" className="item channel_item page__links">Dashboard</Dropdown.Item>
                                                    <Dropdown.Item href="/about-us" className="item channel_item page__links">About Us</Dropdown.Item>
                                                    <Dropdown.Item href="/some-category" className="item channel_item page__links">Shop Grid</Dropdown.Item>
                                                    <Dropdown.Item href="/single-product-view" className="item channel_item page__links">Single Product View</Dropdown.Item>
                                                    <Dropdown.Item href="/checkout" className="item channel_item page__links">Checkout</Dropdown.Item>
                                                    <Dropdown.Item href="/product-request" className="item channel_item page__links">Product Request</Dropdown.Item>
                                                    <Dropdown.Item href="/order-placed" className="item channel_item page__links">Order Placed</Dropdown.Item>
                                                    <Dropdown.Item href="/bill-slip" className="item channel_item page__links">Bill Slip</Dropdown.Item>
                                                    <Dropdown.Item href="/login" className="item channel_item page__links">Sign In</Dropdown.Item>
                                                    <Dropdown.Item href="/register" className="item channel_item page__links">Sign Up</Dropdown.Item>
                                                    <Dropdown.Item href="/forgot-password" className="item channel_item page__links">Forgot Password</Dropdown.Item>
                                                    <Dropdown.Item href="/contact-us" className="item channel_item page__links">Contact Us</Dropdown.Item>
                                                    
                                                </Dropdown.Menu>
                                            </Dropdown>

                                        </li>
                                        <li className="nav-item">
                                            <div className="ui icon top left dropdown nav__menu">
                                                <a className="nav-link" title="Blog">Blog <i className="uil uil-angle-down"></i></a>
                                                <div className="menu dropdown_page">
                                                    <Link to="/blog" className="item channel_item page__links">Our Blog</Link>
                                                    <Link to="/blog-detail-view" className="item channel_item page__links">Blog Detail View</Link>
                                                </div>
                                            </div>
                                        </li>	
                                        <li className="nav-item"><a href="contact_us.html" className="nav-link" title="Contact">Contact Us</a></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        <div className="catey__icon">
                            <Link to="#" className="cate__btn" data-toggle="modal" data-target="#category_model" title="Categories"><i className="uil uil-apps"></i></Link>
                        </div>
                        <div className="header_cart order-1">
                            <Link to="#" className="cart__btn hover-btn pull-bs-canvas-left" title="Cart"><i className="uil uil-shopping-cart-alt"></i><span>Cart</span><ins>2</ins><i className="uil uil-angle-down"></i></Link>
                        </div>
                        <div className="search__icon order-1">
                            <Link to="#" className="search__btn hover-btn" data-toggle="modal" data-target="#search_model" title="Search"><i className="uil uil-search"></i></Link>
                        </div>
                    </div>
                </div>
            </header>
	
    </>

    

    )
}


export default Navbar;