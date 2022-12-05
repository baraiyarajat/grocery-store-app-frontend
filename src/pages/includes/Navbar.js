import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

//Components
import CartSidebar from "./components/CartSidebar";
import SearchModel from "./components/SearchModel";
import CategoryModel from "./components/CategoryModel";

//Images
import darkLogo1 from '../../assets/images/dark-logo-1.svg'
import logo from '../../assets/images/logo.svg'
import darkLogo from '../../assets/images/dark-logo.svg'
import img5 from '../../assets/images/avatar/img-5.jpg'

import Dropdown from 'react-bootstrap/Dropdown';


import { fetchUser } from "../../store/user/userSlice";
import { getWarehouses } from "../../store/warehouse/warehouseSlice";
import { getSelectedWarehouse, setSelectedWarehouse } from "../../store/warehouse/selectedWarehouseSlice";
import {useDispatch, useSelector} from 'react-redux'
import { getWishlist } from "../../store/wishlist/wishlistSlice";


import { Modal, Button } from "react-bootstrap";
import { getCartItems } from "../../store/cart/cartSlice";


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
    },[dispatch, warehouse])

    // console.log(wishlistProducts)

    return(
        <>
            <li>
                {!isWishlistLoading && <Link to="/wishlist" className="option_links" title="Wishlist"><i className='uil uil-heart icon_wishlist'></i><span className="noti_count1">{wishlistProducts.length}</span></Link>}
            </li>	
            

            <li className="ui dropdown"> 
                <Dropdown className="opts_account btn" >
                    <Dropdown.Toggle  variant="">
                        <img src={img5} alt=""/>
                        <span className="user__name">{user.first_name} {user.last_name}</span>
                    </Dropdown.Toggle>
                    
                    <Dropdown.Menu  variant="">
                        <Dropdown.Item href="/dashboard" className="btn btn-light item channel_item" variant=""><i className="uil uil-apps icon__1"></i>Dashbaord</Dropdown.Item>								
                        <Dropdown.Item href="/orders" className="btn btn-light item channel_item"><i className="uil uil-box icon__1"></i>My Orders</Dropdown.Item>								
                        <Dropdown.Item href="/wishlist" className="btn btn-light item channel_item"><i className="uil uil-heart icon__1"></i>My Wishlist</Dropdown.Item>								
                        <Dropdown.Item href="/wallet" className="btn btn-light item channel_item"><i className="uil uil-usd-circle icon__1"></i>My Wallet</Dropdown.Item>								
                        <Dropdown.Item href="/address" className="btn btn-light item channel_item"><i className="uil uil-location-point icon__1"></i>My Address</Dropdown.Item>								
                        <Dropdown.Item href="/offers" className="btn btn-light item channel_item"><i className="uil uil-gift icon__1"></i>Offers</Dropdown.Item>								
                        <Dropdown.Item href="/faq" className="btn btn-light item channel_item"><i className="uil uil-info-circle icon__1"></i>Faq</Dropdown.Item>								
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

    //Category Modal 
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const handleCategoryModalClose = () => setShowCategoryModal(false)
    const handleCategoryModalShow = () => setShowCategoryModal(true);

    //Cart Modal
    const [showCartModal, setShowCartModal] = useState(false)
    const handleCartModalClose = () => setShowCartModal(false)
    const handleCartModalShow = () => setShowCartModal(true);

    const dispatch = useDispatch();
    const {user, isAuthenticated} = useSelector((store)=>store.user)
    const selectedWarehouse= useSelector((store)=>store.selectedWarehouse)
    const {warehouses, isLoading} = useSelector((state)=>state.warehouse)
    const {cartItems, isCartLoading} = useSelector((state)=>state.cart)


    //get authenticated user if any
    useEffect(()=>{
        dispatch(fetchUser())
    },[dispatch])

    
     useEffect(()=>{
        dispatch(getWarehouses())
    },[dispatch])


    useEffect(()=>{
        dispatch(getSelectedWarehouse())
    },[dispatch])

    useEffect(()=>{
        dispatch(getCartItems())
    },[selectedWarehouse,dispatch])




    return (
        <>
            {/* Category Model */}
            <Modal show={showCategoryModal} onHide={handleCategoryModalClose}>
                <CategoryModel showCategoryModal={showCategoryModal} setShowCategoryModal={setShowCategoryModal}/>
            </Modal>
            {/* Search Model*/}
            <SearchModel/>
	

           {/* Cart Sidebar Offset */}
           <Modal  dialogClassName="modal-90w" id="cart-modal" scrollable={true} show={showCartModal} onHide={handleCartModalClose}>
                {/* <CartSidebarUpdated showCartModal={showCartModal} setShowCartModal={setShowCartModal} /> */}
                <CartSidebar showCartModal={showCartModal} setShowCartModal={setShowCartModal} />
            </Modal>

            


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

                        <Dropdown  id="dropdown-basic" className="select_location" >
                            <Dropdown.Toggle className="ui inline dropdown loc-title" variant="">
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
                                
                                <Link to="/product-search" className="btn btn-light" ><i className='uil uil-search-alt icon icon1'></i>  </Link>
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
                            {/* <Link to="#" className="category_drop hover-btn" data-toggle="modal" data-target="#category_model" title="Categories"><i className="uil uil-apps"></i><span className="cate__icon">Select Category</span></Link> */}
                            <Button onClick={handleCategoryModalShow} className="category_drop hover-btn btn-light" ><i className="uil uil-apps"></i><span className="cate__icon">Select Category</span></Button>
                        </div>
                        <nav className="navbar navbar-expand-lg navbar-light py-3">
                            <div className="container-fluid">
                                <button className="navbar-toggler menu_toggle_btn" type="button" data-target="#navbarSupportedContent"><i className="uil uil-bars"></i></button>
                                <div className="collapse navbar-collapse d-flex flex-column flex-lg-row flex-xl-row justify-content-lg-end bg-dark1 p-3 p-lg-0 mt1-5 mt-lg-0 mobileMenu" id="navbarSupportedContent">
                                    <ul className="navbar-nav main_nav align-self-stretch">
                                        {window.location.pathname==="/"  &&<li className="nav-item"><Link to="/" className="nav-link active" title="Home">Home</Link></li>}
                                        {window.location.pathname!=="/"  &&<li className="nav-item"><Link to="/" className="nav-link" title="Home">Home</Link></li>}
                                        {window.location.pathname==="/new-products" &&  <li className="nav-item"><Link to="/new-products" className="nav-link active" title="New Products">New Products</Link></li>}
                                        {window.location.pathname!=="/new-products" &&  <li className="nav-item"><Link to="/new-products" className="nav-link new_item" title="New Products">New Products</Link></li>}
                                        <li className="nav-item"><Link to="shop_grid.html" className="nav-link" title="Featured Products">Featured Products</Link></li>
                                        {/* <li className="nav-item"> */}

                                            {/* <Dropdown>
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
                                            </Dropdown> */}

                                        {/* </li> */}
                                        {/* <li className="nav-item">
                                            <div className="ui icon top left dropdown nav__menu">
                                                <Link className="nav-link" title="Blog">Blog <i className="uil uil-angle-down"></i></Link>
                                                <div className="menu dropdown_page">
                                                    <Link to="/blog" className="item channel_item page__links">Our Blog</Link>
                                                    <Link to="/blog-detail-view" className="item channel_item page__links">Blog Detail View</Link>
                                                </div>
                                            </div>
                                        </li>	 */}
                                        <li className="nav-item"><a href="contact_us.html" className="nav-link" title="Contact">Contact Us</a></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        <div className="catey__icon">
                            <Link to="#" className="cate__btn" data-toggle="modal" data-target="#category_model" title="Categories"><i className="uil uil-apps"></i></Link>
                        </div>
                        <div className="header_cart order-1">
                            {/* {<Link to="#" className="cart__btn hover-btn pull-bs-canvas-left" title="Cart"><i className="uil uil-shopping-cart-alt"></i><span>Cart</span><ins>{cartItems.reduce((partialSum,item)=>partialSum + item.quantity,0)}</ins><i className="uil uil-angle-down"></i></Link>} */}
                            {/* <Button onClick={handleCartModalShow} className="cart__btn hover-btn pull-bs-canvas-left" ><i className="uil uil-shopping-cart-alt"></i><span>Cart</span><ins>{cartItems.reduce((partialSum,item)=>partialSum + item.quantity,0)}</ins><i className="uil uil-angle-down"></i></Button> */}
                            {!isCartLoading &&  <Button onClick={handleCartModalShow} className="cart__btn hover-btn btn btn-secondary" ><i className="uil uil-shopping-cart-alt"></i><span>Cart</span><ins>{cartItems.reduce((partialSum,item)=>partialSum + item.quantity,0)}</ins><i className="uil uil-angle-down"></i></Button>}
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