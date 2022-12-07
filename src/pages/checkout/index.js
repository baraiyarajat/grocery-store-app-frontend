import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from "../includes/Navbar"
import Footer from "../includes/Footer"
import { Link } from "react-router-dom";
import {  deleteCartItem, getCartItems, setCartTotal, setFinalCartTotal, setSavings } from '../../store/cart/cartSlice';
import { getAddresses } from '../../store/address/addressSlice';



const capitalizeFirst = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

function AddressItem(address,city){

    const getAddressIcon = (address_type) =>{
        if(address_type==='home' || address_type==='Home'){
            return <i className="uil uil-home-alt"/>
        }else if (address_type==='office' || address_type==='Office'){
            return <i className="uil uil-building"/>
        }else{
            return <i className="uil uil-map"/>
        }
    }

    return(
        <>
            <div className="col-m w-50">
                <div className="address-item">
                    <div className="address-icon1">
                        {getAddressIcon(address.addres.address_type)}
                    </div>
                    <div className="address-dt-all">
                        <div>
                            <span><h4>{capitalizeFirst(address.addres.address_type)} <input type="radio" id="address_select" name="fav_language" value={address.addres.id}/> <label htmlFor="address_select"></label></h4></span>
                            
                            
                        </div>
                        <p>{address.addres.address_line_1}, {address.addres.address_line_2}, {address.city.name}, {address.addres.pincode} </p>
                    </div>
                </div>
            </div>
        </>
    )
}


function CheckoutItem({checkoutProduct}){

    const imageUrl = `http://127.0.0.1:8000${checkoutProduct.warehouse_product.product.image}`
    const dispatch = useDispatch()

    const handleDeleteCartItem = async(e) =>{
        e.preventDefault()
        await Promise.all([
            dispatch(deleteCartItem(checkoutProduct.id))
        ]);
        return dispatch(getCartItems());
    }
    return(
        <div className="cart-item border_radius">
            <div className="cart-product-img">
                <Link to={`/products/${checkoutProduct.warehouse_product.product.slug}`}><img src={imageUrl} alt=""/></Link>
                {checkoutProduct.warehouse_product.discount_rate>0 &&  <div className="offer-badge">{checkoutProduct.warehouse_product.discount_rate}% OFF</div>}
            </div>
            <div className="cart-text">
                <Link to={`/products/${checkoutProduct.warehouse_product.product.slug}`}><h4>{checkoutProduct.warehouse_product.product.name}</h4></Link>
                <h6>Quantity: {checkoutProduct.quantity}</h6>
                {checkoutProduct.warehouse_product.discount_rate>0 &&  <div className="cart-item-price">${Math.round((checkoutProduct.warehouse_product.get_discounted_price * checkoutProduct.quantity)*100)/100}<span>${checkoutProduct.warehouse_product.price * checkoutProduct.quantity}</span></div>}
                {checkoutProduct.warehouse_product.discount_rate===0 &&  <div className="cart-item-price">${Math.round((checkoutProduct.warehouse_product.price * checkoutProduct.quantity)*100)/100}</div>}
                <button type="button" onClick={(e)=>handleDeleteCartItem(e)} className="cart-close-btn"><i className="uil uil-multiply"></i></button>
            </div>		
        </div>
    )
}


function DateItem({dateIndex, formattedDate ,seletedDeliveryDateIndex, handleDeliveryDateSelectionChange}){

    return(
        <>
            <div className="item col-md-4">
                <div className="date-now">                    
                    <input type="radio" id={`delivery_date${dateIndex}`} name="address1" value={dateIndex} checked={dateIndex === seletedDeliveryDateIndex}  onChange={handleDeliveryDateSelectionChange} />
                    <label htmlFor={`delivery_date${dateIndex}`}>{formattedDate}</label>                    
                </div>
            </div>
        </>
    )
}


function TimeItem({timeValue, timeIndex, selectedDeliveryTimeIndex, setSelectedDeliveryTimeIndex}){
    
    const handleDeliveryTimeSelectionChange = (e) =>{
        setSelectedDeliveryTimeIndex(parseInt(e.target.value))
    }
    
    return(
    <>
        <div className="field">
            <div className="ui radio checkbox chck-rdio">
                <input type="radio" name="delivery_time" id={`delivery_time${timeIndex}`}  className="hidden" checked={selectedDeliveryTimeIndex === timeIndex } value={timeIndex} onChange={handleDeliveryTimeSelectionChange}/>
                <label htmlFor={`delivery_time${timeIndex}`}>{timeValue}</label>
            </div>
        </div>
    </>
    )
}

function TimeItems({timevalues, selectedDeliveryTimeIndex, setSelectedDeliveryTimeIndex}){

     const hoursToFormatMapping = {
            "8":"8:00 AM to 10:00 AM",
            "10":"10:00 AM to 12:00 PM",
            "12":"12:00 PM to 2:00 PM",
            "14":"2:00 PM to 4:00 PM",
            "16":"4:00 PM to 6:00 PM",
        }
    

    return (
    <>
       {timevalues && timevalues.map((item,index)=><TimeItem key={index} timeIndex={index} selectedDeliveryTimeIndex={selectedDeliveryTimeIndex} setSelectedDeliveryTimeIndex={setSelectedDeliveryTimeIndex} timeValue={hoursToFormatMapping[item]} />)}
    </>
    )
}

function Checkout(){


    const {cartItems, isCartLoading, cartTotal, savings, finalCartTotal, deliveryCharge} = useSelector((store)=>store.cart)
    const {addresses, isLoading} = useSelector((store)=>store.address)
    const selected_warehouse = useSelector((store)=>store.selectedWarehouse)
    const [paymentMethod, setPaymentMethod] = useState('COD')
    const dispatch = useDispatch()


    // Delivery Date and Time functions and variables

    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' }

    const setupDeliveryDatesAndTimes = () =>{
            
            const deliveryDateTimeDict = {}
            const todaysDate = new Date();
            deliveryDateTimeDict[todaysDate] = setupDeliveryTimes(todaysDate)
            // setSelectedDeliveryDate(todaysDate)

            for(let day_count = 1 ; day_count<6; day_count ++){
                let nextDate = new Date(todaysDate.setDate(todaysDate.getDate() + 1) )
                deliveryDateTimeDict[nextDate] = setupDeliveryTimes(nextDate)
                
            }
            return deliveryDateTimeDict   
        }

    const setupDeliveryTimes = (date) =>{
        
        const currentDate = new Date();
        const possibleTimeHours = [8,10,12,14,16]        
        let times = []
        
        if(date.getDate() > currentDate.getDate()){
            return possibleTimeHours
        }else{
            const currentHour = currentDate.getHours()
            //Order to be placed atleast 2 hours possible times
            times = possibleTimeHours.filter((hour)=>{
                return currentHour + 2 <= hour
            })

            if (!times){
                return []
            }
        }
        return times
    }
    
    const deliveryDateAndTimes = setupDeliveryDatesAndTimes()
    const deliveryDates = Object.keys(deliveryDateAndTimes).sort(function(a,b){return new Date(b.date) - new Date(a.date);})
    const [seletedDeliveryDateIndex, setSelectedDeliveryDateIndex] = useState(0)
    const [selectedDeliveryTimeIndex, setSelectedDeliveryTimeIndex] = useState(0)

    
    const getFormattedDate = (date) =>{
        return new Date(date).toLocaleDateString('en-us', dateOptions)
    }

    //Form change and submit handlers
    const handleDeliveryDateSelectionChange = (e) =>{
        setSelectedDeliveryDateIndex(parseInt(e.target.value))
        setSelectedDeliveryTimeIndex(0)
    }

    const handlePaymentMethodChange = (e) =>{
        setPaymentMethod(e.target.value)
    }

    const handleOrderSubmit = (e) =>{
        e.preventDefault()
        console.log("Place order clicked")
    }

    //useEffects
    useEffect(()=>{
        dispatch(setSavings())
        dispatch(setCartTotal())
    },[cartItems, dispatch])

    useEffect(()=>{
        dispatch(getAddresses())
    },[selected_warehouse.warehouse, dispatch])

    useEffect(()=>{
        dispatch(setFinalCartTotal())
    },[cartTotal, dispatch, deliveryCharge])
   
   
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
                                        <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="all-product-grid">
                    <div className="container">
                        <div className="row">
                            
                                <div className="col-lg-8 col-md-7">
                                    <div id="checkout_wizard" className="checkout accordion left-chck145">
                                        <div className="checkout-step">
                                            <div className="checkout-card" id="headingTwo">
                                                <span className="checkout-step-number">1</span>
                                                <h4 className="checkout-step-title">
                                                    <button className="wizard-btn collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"> Delivery Address</button>
                                                </h4>
                                            </div>
                                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#checkout_wizard">
                                                <div className="checkout-step-body">
                                                    <div className="checout-address-step">
                                                        <div className="row">
                                                            <div className="col-lg-12">	
                                                                <p>Please select the delivery address:</p>
                                                                <div className='row'>
                                                                    {!isLoading && !selected_warehouse.isLoading && addresses.map((address)=>{
                                                                        if(selected_warehouse.warehouse.warehouse.id === address.city){
                                                                            return <AddressItem key={address.id} addres={address} city={selected_warehouse.warehouse.warehouse} />
                                                                        }
                                                                        return <></>
                                                                    })}
                                                                </div>	
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="checkout-step">
                                            <div className="checkout-card" id="headingThree"> 
                                                <span className="checkout-step-number">2</span>
                                                <h4 className="checkout-step-title">
                                                    <button className="wizard-btn collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"> Delivery Time & Date </button>
                                                </h4>
                                            </div>
                                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#checkout_wizard">
                                                <div className="checkout-step-body">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <div>
                                                                <label className="control-label">Select Date and Time*</label>
                                                                <div className="date-slider-group container">
                                                                    <div className="row">
                                                                        {deliveryDates.map((deliveryDate,index)=>{
                                                                                return <DateItem key={index} dateIndex={index} formattedDate={getFormattedDate(deliveryDate)} seletedDeliveryDateIndex={seletedDeliveryDateIndex} handleDeliveryDateSelectionChange={handleDeliveryDateSelectionChange} />
                                                                            })}
                                                                    </div> 
                                                                </div>
                                                                </div>
                                                                <div className="time-radio">
                                                                    <div className="ui form">
                                                                        <div className="grouped fields">
                                                                            <TimeItems timevalues = {deliveryDateAndTimes[deliveryDates[seletedDeliveryDateIndex]]} selectedDeliveryTimeIndex={selectedDeliveryTimeIndex} setSelectedDeliveryTimeIndex={setSelectedDeliveryTimeIndex}   />                                                                            
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <a className="collapsed next-btn16 hover-btn" role="button" data-toggle="collapse"  href="#collapseFour"> Proccess to payment </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="checkout-step">
                                            <div className="checkout-card" id="headingFour">
                                                <span className="checkout-step-number">3</span>
                                                <h4 className="checkout-step-title"> 
                                                    <button className="wizard-btn collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">Payment</button>
                                                </h4>
                                            </div>
                                            <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#checkout_wizard">
                                                <div className="checkout-step-body">
                                                    <div className="payment_method-checkout">	
                                                        <div className="row">	
                                                            <div className="col-md-12">
                                                                <div className="rpt100">													
                                                                    <ul className="radio--group-inline-container_1">
                                                                        <li>
                                                                            <div className="radio-item_1">
                                                                                <input id="cashondelivery1" value="COD" name="paymentmethod" type="radio" data-minimum="50.0" checked={paymentMethod==='COD'} onChange={handlePaymentMethodChange} />
                                                                                <label htmlFor="cashondelivery1" className="radio-label_1">Cash on Delivery</label>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div className="radio-item_1">
                                                                                <input id="card1" value="CARD" name="paymentmethod" type="radio" data-minimum="50.0" checked={paymentMethod==='CARD'} onChange={handlePaymentMethodChange} />
                                                                                <label  htmlFor="card1" className="radio-label_1">Credit / Debit Card</label>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="form-group return-departure-dts" data-method="cashondelivery">															
                                                                    <div className="row">
                                                                        <div className="col-lg-12">
                                                                            <div className="pymnt_title">
                                                                                <h4>Cash on Delivery</h4>
                                                                                <p>Cash on Delivery will not be available if your order value exceeds $10.</p>
                                                                            </div>
                                                                        </div>														
                                                                    </div>
                                                                </div>
                                                                <div className="form-group return-departure-dts" data-method="card">															
                                                                    <div className="row">
                                                                        <div className="col-lg-12">
                                                                            <div className="pymnt_title mb-4">
                                                                                <h4>Credit / Debit Card</h4>
                                                                            </div>
                                                                        </div>														
                                                                        <div className="col-lg-6">
                                                                            <div className="form-group mt-1">
                                                                                <label className="control-label">Holder Name*</label>
                                                                                <div className="ui search focus">
                                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                                        <input className="prompt srch_explore" type="text" name="holdername" value="" id="holder[name]" required="" maxLength="64" placeholder="Holder Name"/>															
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <div className="form-group mt-1">
                                                                                <label className="control-label">Card Number*</label>
                                                                                <div className="ui search focus">
                                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                                        <input className="prompt srch_explore" type="text" name="cardnumber" value="" id="card[number]" required="" maxLength="64" placeholder="Card Number"/>															
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4">
                                                                            <div className="form-group mt-1">																	
                                                                                <label className="control-label">Expiration Month*</label>
                                                                                <select className="ui fluid search dropdown form-dropdown" name="card[expire-month]">
                                                                                    <option value="">Month</option>
                                                                                    <option value="1">January</option>
                                                                                    <option value="2">February</option>
                                                                                    <option value="3">March</option>
                                                                                    <option value="4">April</option>
                                                                                    <option value="5">May</option>
                                                                                    <option value="6">June</option>
                                                                                    <option value="7">July</option>
                                                                                    <option value="8">August</option>
                                                                                    <option value="9">September</option>
                                                                                    <option value="10">October</option>
                                                                                    <option value="11">November</option>
                                                                                    <option value="12">December</option>
                                                                                </select>	
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4">
                                                                            <div className="form-group mt-1">
                                                                                <label className="control-label">Expiration Year*</label>
                                                                                <div className="ui search focus">
                                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                                        <input className="prompt srch_explore" type="text" name="card[expire-year]" maxLength="4" placeholder="Year"/>															
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4">
                                                                            <div className="form-group mt-1">
                                                                                <label className="control-label">CVV*</label>
                                                                                <div className="ui search focus">
                                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                                        <input className="prompt srch_explore" name="card[cvc]" maxLength="3" placeholder="CVV"/>															
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <button onClick={(e)=>handleOrderSubmit(e)} className="next-btn16 hover-btn ">Place Order</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            
                            <div className="col-lg-4 col-md-5">
                                <div className="pdpt-bg mt-0">
                                    <div className="pdpt-title">
                                        <h4>Order Summary</h4>
                                    </div>
                                    <div className="right-cart-dt-body">
                                        {cartItems.map((item)=>{
                                            
                                            return <CheckoutItem key={item.id} checkoutProduct={item} />
                                        })}
                                        
                                    </div>
                                    <div className="total-checkout-group">
                                        <div className="cart-total-dil">
                                            <h4>Gambo Super Market</h4>
                                            <span>${cartTotal}</span>
                                        </div>
                                        <div className="cart-total-dil pt-3">
                                            <h4>Delivery Charges</h4>
                                            <span>${deliveryCharge}</span>
                                        </div>
                                    </div>
                                    <div className="cart-total-dil saving-total ">
                                        <h4>Total Saving</h4>
                                        <span>${savings}</span>
                                    </div>
                                    <div className="main-total-cart">
                                        <h2>Total</h2>
                                        <span>${finalCartTotal}</span>
                                    </div>
                                    <div className="payment-secure">
                                        <i className="uil uil-padlock"></i>Secure checkout
                                    </div>
                                </div>
                                <a href="#" className="promo-link45">Have a promocode?</a>
                                <div className="checkout-safety-alerts">
                                    <p><i className="uil uil-sync"></i>100% Replacement Guarantee</p>
                                    <p><i className="uil uil-check-square"></i>100% Genuine Products</p>
                                    <p><i className="uil uil-shield-check"></i>Secure Payments</p>
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


export default Checkout;