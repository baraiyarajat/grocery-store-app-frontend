import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';


//Images
import img2 from '../../../assets/images/product/img-2.jpg';


function CartSidebar(){

    return(
        <>
            <div className="bs-canvas bs-canvas-left position-fixed bg-cart h-100">
                <div className="bs-canvas-header side-cart-header p-3 ">
                    <div className="d-inline-block  main-cart-title">My Cart <span>(2 Items)</span></div>
                    <button type="button" className="bs-canvas-close close" aria-label="Close"><i className="uil uil-multiply"></i></button>
                </div> 

                <div className="bs-canvas-body">
                    <div className="cart-top-total">
                        <div className="cart-total-dil">
                            <h4>Gambo Super Market</h4>
                            <span>$34</span>
                        </div>
                        <div className="cart-total-dil pt-2">
                            <h4>Delivery Charges</h4>
                            <span>$1</span>
                        </div>
                    </div>
                        <div className="side-cart-items">
                            <div className="cart-item">
                                <div className="cart-product-img">
                                    <img src={img2} alt=""/>
                                    <div className="offer-badge">6% OFF</div>
                                </div>
                                <div className="cart-text">
                                    <h4>Product Title Here</h4>
                                    <div className="cart-radio">
                                        <ul className="kggrm-now">
                                            <li>
                                                <input type="radio" id="a5" name="cart2"/>
                                                <label htmlFor="a5">0.50</label>
                                            </li>
                                            <li>
                                                <input type="radio" id="a6" name="cart2"/>
                                                <label htmlFor="a6">1kg</label>
                                            </li>
                                            <li>
                                                <input type="radio" id="a7" name="cart2"/>
                                                <label htmlFor="a7">2kg</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="qty-group">
                                        <div className="quantity buttons_added">
                                            {/* <input type="button" value="-" className="minus minus-btn"/>
                                            <input type="number" step="1" name="quantity" value="1" className="input-text qty text"/>
                                            <input type="button" value="+" className="plus plus-btn"/> */}
                                        </div>
                                        <div className="cart-item-price">$24 <span>$30</span></div>
                                    </div>	
                                    <button type="button" className="cart-close-btn"><i className="uil uil-multiply"></i></button>
                                </div>
                            </div>
                        </div>
                </div>

                <div className="bs-canvas-footer">
                    <div className="cart-total-dil saving-total ">
                        <h4>Total Saving</h4>
                        <span>$11</span>
                    </div>
                    <div className="main-total-cart">
                        <h2>Total</h2>
                        <span>$35</span>
                    </div>
                    <div className="checkout-cart">
                        <Link to="/apply-promo" className="promo-code">Have a promocode?</Link>
                        <Link to="/checkout" className="cart-checkout-btn hover-btn">Proceed to Checkout</Link>
                    </div>
                </div>
            </div>
        </>
    )

}


export default CartSidebar;