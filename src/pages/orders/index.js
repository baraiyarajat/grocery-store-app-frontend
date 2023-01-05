import React from 'react';
import {Link} from 'react-router-dom';

//Includes
import Navbar from '../includes/Navbar';
import Footer from '../includes/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOrders } from '../../store/order/orderSlice';
import UserBanner from '../includes/UserBanner';


function OrderItem({order}){

    console.log(order)

    const progressStatuses = (orderStatus) =>{
        const statuses = ['PLACED', 'PACKED', 'ON_THE_WAY', 'DELIVERED']
        const filteredStatusIndex = statuses.indexOf(orderStatus)

        const statusProgress = statuses.map((item,index)=>{
            if(index<filteredStatusIndex){
                return 'complete'
            }else if (index> filteredStatusIndex){
                return 'disabled'
            }else{
                return 'active'
            }
            
        })
        return statusProgress
    }

    const hoursToFormatMapping = {
        "8":"8:00 AM to 10:00 AM",
        "10":"10:00 AM to 12:00 PM",
        "12":"12:00 PM to 2:00 PM",
        "14":"2:00 PM to 4:00 PM",
        "16":"4:00 PM to 6:00 PM",
    }

    const delivery_time = hoursToFormatMapping[order.delivery_time]
    const progressBarValues = progressStatuses(order.status)

    return(
        <>
            <div className="pdpt-bg">
                <div className="pdpt-title">
                    <h6>Delivery Date and Time - {order.delivery_date}, {delivery_time}</h6>
                </div> 
                <div className="order-body10">
                    <ul className="order-dtsll">
                        <li>
                            <div className="order-dt-img">
                                <img src="images/groceries.svg" alt=""/>
                            </div>
                        </li>
                        <li>
                            <div className="order-dt47">
                                <h4>Gambo - {order.city}</h4>
                                <p> Order Status - {order.formatted_order_status}</p>
                                <div className="order-title">{order.total_items} Items </div>
                            </div>
                        </li>
                    </ul>
                    <div className="total-dt">
                        <div className="total-checkout-group">
                            <div className="cart-total-dil">
                                <h4>Sub Total</h4>
                                <span>${order.cart_amount}</span>
                            </div>
                            <div className="cart-total-dil pt-3">
                                <h4>Delivery Charges</h4>
                                <span>{order.delivery_fee}</span>
                            </div>
                        </div>
                        <div className="main-total-cart">
                            <h2>Total</h2>
                            <span>${order.final_amount}</span>
                        </div>
                    </div>
                    <div className="track-order">
                        <h4>Track Order</h4>
                        <div className="bs-wizard" style={{borderBottom:0}}>   
                            <div className={`bs-wizard-step ${progressBarValues[0]}`}>
                                <div className="text-center bs-wizard-stepnum">Placed</div>
                                <div className="progress"><div className="progress-bar"></div></div>
                                <a href="#" className="bs-wizard-dot" style={{ pointerEvents : 'none'}}></a>
                            </div>
                            <div className={`bs-wizard-step ${progressBarValues[1]}`}>
                                <div className="text-center bs-wizard-stepnum">Packed</div>
                                <div className="progress"><div className="progress-bar"></div></div>
                                <a href="#" className="bs-wizard-dot" style={{ pointerEvents : 'none'}}></a>
                            </div>
                            <div className={`bs-wizard-step ${progressBarValues[2]}`}>
                                <div className="text-center bs-wizard-stepnum">On the way</div>
                                <div className="progress"><div className="progress-bar"></div></div>
                                <a href="#" className="bs-wizard-dot" style={{ pointerEvents : 'none'}}></a>
                            </div>
                            <div className={`bs-wizard-step ${progressBarValues[3]}`}>
                                <div className="text-center bs-wizard-stepnum">Delivered</div>
                                <div className="progress"><div className="progress-bar"></div></div>
                                <a href="#" className="bs-wizard-dot" style={{ pointerEvents : 'none'}}></a>
                            </div>
                        </div>
                    </div>
                    {/* <div className="alert-offer">
                        <img src="images/ribbon.svg" alt=""/>
                        Cashback of $2 will be credit to Gambo Super Market wallet 6-12 hours of delivery.
                    </div> */}
                    <div className="call-bill">
                        <div className="delivery-man">
                            {/* Delivery Boy - <a href="#"><i className="uil uil-phone"></i> Call Us</a> */}
                            Delivery Boy - <Link to="/phone-no" className="offer-link" style={{ pointerEvents : 'none'}}><i className="uil uil-phone-alt"></i>Call Us</Link>
                        </div>
                        <div className="order-bill-slip">
                            <a href="#" className="bill-btn5 hover-btn" style={{ pointerEvents : 'none'}}>View Bill</a>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    )

}


function Orders(){

    const {orders, isOrdersLoading} = useSelector((state)=>state.order)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getOrders())
    },[])

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
                                            <li className="breadcrumb-item active" aria-current="page">My Orders</li>
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
                                            <Link to="/orders" className="user-item active"><i className="uil uil-box"></i>My Orders</Link>
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
                                                    <h4><i className="uil uil-box"></i>My Orders</h4>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                {!isOrdersLoading && orders.map((order)=>{
                                                    return <OrderItem key={order.id} order={order} />
                                                })}
                                                
                                                
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


export default Orders;