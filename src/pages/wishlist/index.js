import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

//Includes
import Navbar from '../includes/Navbar';
import Footer from '../includes/Footer';


function Wishlist(){

    return (
        <>
            <Navbar/>

                <div className="wrapper">
                    <div className="gambo-Breadcrumb">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">User Dashboard</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-group">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="user-dt">
                                        <div className="user-img">
                                            <img src="images/avatar/img-5.jpg" alt=""/>
                                            <div className="img-add">													
                                                <input type="file" id="file"/>
                                                <label for="file"><i className="uil uil-camera-plus"></i></label>
                                            </div>
                                        </div>
                                        <h4>Johe Doe</h4>
                                        <p>+91999999999<a href="#"><i className="uil uil-edit"></i></a></p>
                                        <div className="earn-points"><img src="images/Dollar.svg" alt=""/>Points : <span>20</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>	
                    <div className="">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-md-4">
                                    <div className="left-side-tabs">
                                        <div className="dashboard-left-links">
                                            <Link to="/dashboard" className="user-item "><i className="uil uil-apps"></i>Overview</Link>
                                            <Link to="/orders" className="user-item "><i className="uil uil-box"></i>My Orders</Link>
                                            <Link to="/rewards" className="user-item"><i className="uil uil-gift"></i>My Rewards</Link>
                                            <Link to="/wallet" className="user-item "><i className="uil uil-wallet"></i>My Wallet</Link>
                                            <Link to="/wishlist" className="user-item active"><i className="uil uil-heart"></i>Shopping Wishlist</Link>
                                            <Link to="/addresses" className="user-item"><i className="uil uil-location-point"></i>My Address</Link>
                                            <Link to="/logout" className="user-item"><i className="uil uil-exit"></i>Logout</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                    <div className="dashboard-right">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="main-title-tab">
                                                    <h4><i className="uil uil-heart"></i>Shopping Wishlist</h4>
                                                </div>
                                            </div>								
                                            <div className="col-lg-12 col-md-12">
                                                <div className="pdpt-bg">
                                                    <div className="wishlist-body-dtt">
                                                        <div className="cart-item">
                                                            <div className="cart-product-img">
                                                                <img src="images/product/img-11.jpg" alt=""/>
                                                                <div className="offer-badge">4% OFF</div>
                                                            </div>
                                                            <div className="cart-text">
                                                                <h4>Product Title Here</h4>
                                                                <div className="cart-item-price">$15 <span>$18</span></div>
                                                                <button type="button" className="cart-close-btn"><i className="uil uil-trash-alt"></i></button>
                                                            </div>		
                                                        </div>
                                                        <div className="cart-item">
                                                            <div className="cart-product-img">
                                                                <img src="images/product/img-2.jpg" alt=""/>
                                                                <div className="offer-badge">1% OFF</div>
                                                            </div>
                                                            <div className="cart-text">
                                                                <h4>Product Title Here</h4>
                                                                <div className="cart-item-price">$9.9 <span>$10</span></div>
                                                                <button type="button" className="cart-close-btn"><i className="uil uil-trash-alt"></i></button>
                                                            </div>		
                                                        </div>
                                                        <div className="cart-item">
                                                            <div className="cart-product-img">
                                                                <img src="images/product/img-14.jpg" alt=""/>
                                                            </div>
                                                            <div className="cart-text">
                                                                <h4>Product Title Here</h4>
                                                                <div className="cart-item-price">$12</div>
                                                                <button type="button" className="cart-close-btn"><i className="uil uil-trash-alt"></i></button>
                                                            </div>		
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>	
                        </div>	
                    </div>	
                </div>



            <Footer/>
        </>
    )
}


export default Wishlist;