import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import {Link} from 'react-router-dom';
import axios from "axios";

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


import { fetchUser } from "../../store/user/userSlice";
import { getWarehouses } from "../../store/warehouse/warehouseSlice";
import { getSelectedWarehouse, setSelectedWarehouse } from "../../store/warehouse/selectedWarehouseSlice";

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


import {useDispatch, useSelector} from 'react-redux'
import Button from "react-bootstrap/esm/Button";
import { getWishlist } from "../../store/wishlist/wishlistSlice";


function GuestUserItems(){
    return(
        <>
            <li>
                <Link to="/login" className="offer-link"><i className="uil uil-user"></i>Log-in</Link>
                <Link to="/register" className="offer-link"><i className="uil uil-user-plus"></i>Register</Link>
            </li>
        </>
    )

}


function Logout(){
    return (<>
        <Dropdown.Item ><i className="uil uil-lock-alt icon__1" ></i>Logout</Dropdown.Item>
    </>)
}


function UserAuthenticatedItems({user}){

    const { wishlistProducts, isWishlistLoading } = useSelector((store)=>store.wishlist) 
    const {warehouse} = useSelector((store)=>store.selectedWarehouse)

    const dispatch = useDispatch()

    useEffect(()=>{
       dispatch(getWishlist())
    },[warehouse])

    // console.log(wishlistProducts)

    return(
        <>
            <li>
                {!isWishlistLoading && <Link to="/wishlist" className="option_links" title="Wishlist"><i className='uil uil-heart icon_wishlist'></i><span className="noti_count1">{wishlistProducts.length}</span></Link>}
            </li>	
            

            <li className="ui dropdown"> 
                <Dropdown className="opts_account" >
                    <Dropdown.Toggle  >
                        <img src={img5} alt=""/>
                        <span className="user__name">{user.first_name} {user.last_name}</span>
                    </Dropdown.Toggle>
                    
                    <Dropdown.Menu  >
                        <Dropdown.Item href="/dashboard" className="item channel_item"><i className="uil uil-apps icon__1"></i>Dashbaord</Dropdown.Item>								
                        <Dropdown.Item href="/orders" className="item channel_item"><i className="uil uil-box icon__1"></i>My Orders</Dropdown.Item>								
                        <Dropdown.Item href="/wishlist" className="item channel_item"><i className="uil uil-heart icon__1"></i>My Wishlist</Dropdown.Item>								
                        <Dropdown.Item href="/wallet" className="item channel_item"><i className="uil uil-usd-circle icon__1"></i>My Wallet</Dropdown.Item>								
                        <Dropdown.Item href="/address" className="item channel_item"><i className="uil uil-location-point icon__1"></i>My Address</Dropdown.Item>								
                        <Dropdown.Item href="/offers" className="item channel_item"><i className="uil uil-gift icon__1"></i>Offers</Dropdown.Item>								
                        <Dropdown.Item href="/faq" className="item channel_item"><i className="uil uil-info-circle icon__1"></i>Faq</Dropdown.Item>								
                        <Logout/>
                    </Dropdown.Menu>
                </Dropdown>
            </li>
        </>
    )

}



function LocationDropDownItem({warehouse}){

    const dispatch = useDispatch()

    return(
        <Dropdown.Item className="item channel_item" onClick={()=>dispatch(setSelectedWarehouse(warehouse.id))}>
            <i className="uil uil-location-point"></i>
            {warehouse.name}
        </Dropdown.Item>
    )
    

}



function Navbar(){
    
    const dispatch = useDispatch();
    const {user, isAuthenticated} = useSelector((store)=>store.user)
    const selectedWarehouse= useSelector((store)=>store.selectedWarehouse)
    const {warehouses, isLoading} = useSelector((state)=>state.warehouse)



    //get authenticated user if any
    useEffect(()=>{
        dispatch(fetchUser())
    },[])

    
     useEffect(()=>{
        dispatch(getWarehouses())
    },[])


    useEffect(()=>{
        dispatch(getSelectedWarehouse())
    },[])


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
                                        {!selectedWarehouse.isLoading && selectedWarehouse.warehouse.warehouse.name}
                                </div>
                            </Dropdown.Toggle>

                            {!isLoading &&  <Dropdown.Menu className="menu dropdown_loc" >
                                    {warehouses.map((warehouse)=>{
                                            return <LocationDropDownItem key={warehouse.id} warehouse={warehouse} />
                                        })}

                            </Dropdown.Menu>}
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

                                {isAuthenticated && <UserAuthenticatedItems user={user} />}
                                {!isAuthenticated && <GuestUserItems/>}
                                
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
                                        <li className="nav-item"><Link to="/" className="nav-link active" title="Home">Home</Link></li>
                                        <li className="nav-item"><Link to="shop_grid.html" className="nav-link new_item" title="New Products">New Products</Link></li>
                                        <li className="nav-item"><Link to="shop_grid.html" className="nav-link" title="Featured Products">Featured Products</Link></li>
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