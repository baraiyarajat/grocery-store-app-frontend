import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

//Includes
import Navbar from '../includes/Navbar';
import Footer from '../includes/Footer';
import UserBanner from '../includes/UserBanner';


function Rewards(){

    return(
        
        <>
            <Navbar/>

                <div className="wrapper">
                    <div className="gambo-Breadcrumb">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">User Dashboard</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <UserBanner/>
                    
                    <div className="">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-md-4">
                                    <div className="left-side-tabs">
                                        <div className="dashboard-left-links">
                                            <Link to="/dashboard" className="user-item "><i className="uil uil-apps"></i>Overview</Link>
                                            <Link to="/orders" className="user-item "><i className="uil uil-box"></i>My Orders</Link>
                                            <Link to="/rewards" className="user-item active"><i className="uil uil-gift"></i>My Rewards</Link>
                                            <Link to="/wallet" className="user-item "><i className="uil uil-wallet"></i>My Wallet</Link>
                                            <Link to="/wishlist" className="user-item "><i className="uil uil-heart"></i>Shopping Wishlist</Link>
                                            <Link to="/address" className="user-item"><i className="uil uil-location-point"></i>My Address</Link>
                                            <Link to="/logout" className="user-item"><i className="uil uil-exit"></i>Logout</Link>                                      </div>
                                    </div>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                    <div className="dashboard-right">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="main-title-tab">
                                                    <h4><i className="uil uil-gift"></i>My Rewards</h4>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="pdpt-bg">
                                                    <ul className="reward-body-all">
                                                        <li>
                                                            <div className="total-rewards">
                                                                <div className="tt-icon"><i className="uil uil-money-withdraw"></i></div>
                                                                <span>Cashbacks</span>
                                                                <h4>$15</h4>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="total-rewards">
                                                                <div className="tt-icon"><i className="uil uil-percentage"></i></div>
                                                                <span>Offers</span>
                                                                <h4>$5</h4>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="total-rewards">
                                                                <div className="tt-icon"><i className="uil uil-tag-alt"></i></div>
                                                                <span>Coupons</span>
                                                                <h4>2</h4>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-12">
                                                <div className="pdpt-bg">
                                                    <div className="reward-body-dtt">
                                                        <div className="reward-img-icon">
                                                            <img src="images/gift.svg" alt=""/>
                                                        </div>
                                                        <span className="rewrd-title">Cashback Won</span>
                                                        <h4 className="cashbk-price">$2</h4>
                                                        <span className="date-reward">12 May 2020</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-12">
                                                <div className="pdpt-bg rewards-coupns">
                                                    <div className="reward-body-dtt">
                                                        <div className="reward-img-icon">
                                                            <img src="images/discount.svg" alt=""/>
                                                        </div>
                                                        <span className="rewrd-title">Offer</span>
                                                        <h4 className="cashbk-price">Get 25% Cashback</h4>
                                                        <span className="date-reward">Expires on : 31st May</span>
                                                    </div>
                                                    <div className="top-coup-code" title="Coupon Code">Gambocoup25</div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-12">
                                                <div className="pdpt-bg rewards-coupns">
                                                    <div className="reward-body-dtt">
                                                        <div className="reward-img-icon">
                                                            <img src="images/coupon.svg" alt=""/>
                                                        </div>
                                                        <span className="rewrd-title">Coupon Won</span>
                                                        <h4 className="cashbk-price">Get 10% Cashback</h4>
                                                        <span className="date-reward">Expires on : 25th May</span>
                                                    </div>
                                                    <div className="top-coup-code" title="Coupon Code">Gambocoup10</div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-12">
                                                <div className="pdpt-bg rewards-coupns">
                                                    <div className="reward-body-dtt">
                                                        <div className="reward-img-icon">
                                                            <img src="images/discount.svg" alt=""/>
                                                        </div>
                                                        <span className="rewrd-title">Offer</span>
                                                        <h4 className="cashbk-price">Get 15% Cashback</h4>
                                                        <span className="date-reward">Expired on : 5th May</span>						
                                                    </div>
                                                    <div className="top-coup-code" title="Coupon Code">Gambocoup15</div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-12">
                                                <div className="pdpt-bg rewards-coupns">
                                                    <div className="reward-body-dtt">
                                                        <div className="reward-img-icon">
                                                            <img src="images/coupon.svg" alt=""/>
                                                        </div>
                                                        <span className="rewrd-title">Coupon Won</span>
                                                        <h4 className="cashbk-price">Get 5% Cashback</h4>
                                                        <span className="date-reward">Expires on : 20th May</span>
                                                    </div>
                                                    <div className="top-coup-code" title="Coupon Code">Gambocoup5</div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-12">
                                                <div className="pdpt-bg">
                                                    <div className="reward-body-dtt">
                                                        <div className="reward-img-icon">
                                                            <img src="images/gift.svg" alt=""/>
                                                        </div>
                                                        <span className="rewrd-title">Cashback Won</span>
                                                        <h4 className="cashbk-price">$1</h4>
                                                        <span className="date-reward">3 May 2020</span>
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


export default Rewards;