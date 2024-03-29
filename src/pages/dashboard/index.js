import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getWalletDetails } from '../../store/wallet/walletSlice';

//Includes
import Navbar from '../includes/Navbar';
import Footer from '../includes/Footer';
import UserBanner from '../includes/UserBanner';


function Dashboard(){

    console.log("In Dashboard")
    const {wallet, isWalletLoading} = useSelector((store)=>store.wallet)
    const {user} = useSelector((store)=>store.user)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getWalletDetails())
    },[dispatch])


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
                                            <Link to="/dashboard" className="user-item active"><i className="uil uil-apps"></i>Overview</Link>
                                            <Link to="/orders" className="user-item "><i className="uil uil-box"></i>My Orders</Link>
                                            <Link to="/rewards" className="user-item"><i className="uil uil-gift"></i>My Rewards</Link>
                                            <Link to="/wallet" className="user-item "><i className="uil uil-wallet"></i>My Wallet</Link>
                                            <Link to="/wishlist" className="user-item "><i className="uil uil-heart"></i>Shopping Wishlist</Link>
                                            <Link to="/address" className="user-item"><i className="uil uil-location-point"></i>My Address</Link>
                                            <Link to="/logout" className="user-item"><i className="uil uil-exit"></i>Logout</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                    <div className="dashboard-right">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="main-title-tab">
                                                    <h4><i className="uil uil-apps"></i>Overview</h4>
                                                </div>
                                                <div className="welcome-text">
                                                    <h2>Hi! {user.first_name} {user.last_name}</h2>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="pdpt-bg">
                                                    <div className="pdpt-title">
                                                        <h4>My Rewards</h4>
                                                    </div>
                                                    <div className="ddsh-body">
                                                        <h2>6 Rewards</h2>
                                                        <ul>
                                                            <li>
                                                                <a href="#" className="small-reward-dt hover-btn disable" >Won $2</a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className="small-reward-dt hover-btn">Won 40% Off</a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className="small-reward-dt hover-btn">Caskback $1</a>
                                                            </li>
                                                            <li>
                                                                <Link to="/rewards" className="rewards-link5">+More</Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <Link to='/rewards' className="more-link14">Rewards and Details <i className="uil uil-angle-double-right"></i></Link>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="pdpt-bg">
                                                    <div className="pdpt-title">
                                                        <h4>My Orders</h4>
                                                    </div>
                                                    <div className="ddsh-body">
                                                        <h2>2 Recently Purchases</h2>
                                                        <ul className="order-list-145">
                                                            <li>
                                                                <div className="smll-history">
                                                                    <div className="order-title">2 Items <span data-inverted="" data-tooltip="2kg broccoli, 1kg Apple" data-position="top center">?</span></div>
                                                                    <div className="order-status">On the way</div>
                                                                    <p>$22</p>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <a href="/orders" className="more-link14">All Orders <i className="uil uil-angle-double-right"></i></a>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="pdpt-bg">
                                                    <div className="pdpt-title">
                                                        <h4>My Wallet</h4>
                                                    </div>
                                                    <div className="wllt-body">
                                                        <h2>Credits ${wallet.credit}</h2>
                                                        <ul className="wallet-list">
                                                            <li>
                                                                <a href="#" className="wallet-links14"><i className="uil uil-card-atm"></i>Payment Methods</a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className="wallet-links14"><i className="uil uil-gift"></i>3 offers Active</a>
                                                            </li>	
                                                            <li>
                                                                <a href="#" className="wallet-links14"><i className="uil uil-coins"></i>Points Earning</a>
                                                            </li>	
                                                        </ul>
                                                    </div>
                                                    <Link to="/wallet" className="more-link14">Wallet Details<i className="uil uil-angle-double-right"></i></Link>
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


export default Dashboard;