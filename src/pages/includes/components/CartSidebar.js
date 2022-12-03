import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { decreaseCartItemQuantity, deleteCartItem, getCartItems, increaseCartItemQuantity } from '../../../store/cart/cartSlice';
import {DashIcon, PlusIcon} from '@primer/octicons-react'

import { getSelectedWarehouse } from '../../../store/warehouse/selectedWarehouseSlice';

function CartItem({cartProduct}){

    const imageUrl = `http://127.0.0.1:8000${cartProduct.warehouse_product.product.image}`

    const dispatch = useDispatch()

    const handleDeleteCartItem = async(e) =>{
        e.preventDefault()
        await Promise.all([
            dispatch(deleteCartItem(cartProduct.id))
        ]);
        return dispatch(getCartItems());
    }

    const handleIncreaseItemQuantity = async (e) =>{
        e.preventDefault()
        await Promise.all([
            dispatch(increaseCartItemQuantity(cartProduct.id))
        ]);

        return dispatch(getCartItems())   
    }

    const handleDecreaseItemQuantity = async (e) =>{
        e.preventDefault()
        await Promise.all([
            dispatch(decreaseCartItemQuantity(cartProduct.id))
        ]);

        return dispatch(getCartItems())   
    }

    return(
        <div className="cart-item">
            <div className="cart-product-img">
                <img src={imageUrl} alt="product_image"/>
                {cartProduct.warehouse_product.discount_rate>0   && <div className="offer-badge">{cartProduct.warehouse_product.discount_rate}% OFF</div>}
            </div>
            <div className="cart-text">
                <h4>{cartProduct.warehouse_product.product.name}</h4>
                
                {cartProduct.warehouse_product.stock>0 &&  <div className="qty-group">
                    <div className="quantity buttons_added">
                        <button type="button" className='btn btn-secondary btn-sm'  onClick={(e)=>handleDecreaseItemQuantity(e)} ><DashIcon size={10} /></button>
                        &nbsp;{cartProduct.quantity}&nbsp;
                        <button type="button" className='btn btn-secondary btn-sm'  onClick={(e)=>handleIncreaseItemQuantity(e)}><PlusIcon size={10} /></button>
                    </div>
                    {cartProduct.warehouse_product.discount_rate>0 &&  <div className="cart-item-price">${cartProduct.warehouse_product.get_discounted_price * cartProduct.quantity}<span>${cartProduct.warehouse_product.price * cartProduct.quantity}</span></div>}
                    {cartProduct.warehouse_product.discount_rate===0 &&  <div className="cart-item-price">${cartProduct.warehouse_product.price * cartProduct.quantity}</div>}
                </div>}

                {cartProduct.warehouse_product.stock==0 && <div> Out of stock  </div>}	
                <button type="button" className="cart-close-btn" onClick={(e)=>handleDeleteCartItem(e)}><i className="uil uil-multiply"></i></button>
            </div>
        </div>
    )
}


function CartSidebar(){

    const [cartTotal,setCartTotal] = useState(0)
    const [deliveryCharge, setDeliveryCharge] = useState(3)
    const [discount, setDiscount] = useState(0)
    const [finalCartTotal, setFinalCartTotal] = useState(0)
    
    const {cartItems, isCartLoading} = useSelector((store)=>store.cart)
    const {warehouse, isLoading} = useSelector((store)=>store.selectedWarehouse)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getCartItems())
    },[dispatch,warehouse])

    useEffect(()=>{
        setCartTotal( Math.round(cartItems.reduce((partialSum,a)=>partialSum+a.warehouse_product.get_discounted_price * a.quantity,0)*100 )/100)
        setDiscount(Math.round(cartItems.reduce((partialSum,a)=>partialSum+a.warehouse_product.price* a.quantity-a.warehouse_product.get_discounted_price* a.quantity,0) * 100) /100 )
        
    },[cartItems, dispatch])


    useEffect(()=>{
        const finalCartTotal = cartTotal + deliveryCharge 
        setFinalCartTotal(finalCartTotal)
    },[cartTotal, dispatch])


    return(
        <>
            <div className="bs-canvas bs-canvas-left position-fixed bg-cart h-100">
                <div className="bs-canvas-header side-cart-header p-3 ">
                    <div className="d-inline-block  main-cart-title">My Cart <span>({cartItems.reduce((partialSum,item)=>partialSum+ item.quantity,0)} Items)</span></div>
                    <button type="button" className="bs-canvas-close close" aria-label="Close"><i className="uil uil-multiply"></i></button>
                </div> 

                <div className="bs-canvas-body">
                    <div className="cart-top-total">
                        <div className="cart-total-dil">
                            <h4>Gambo Super Market</h4>
                            <span>${cartTotal}</span>
                        </div>
                        <div className="cart-total-dil pt-2">
                            <h4>Delivery Charges</h4>
                            <span>$3</span>
                        </div>
                    </div>
                        <div className="side-cart-items">
                            {!isCartLoading && cartItems.map((item)=>{
                                return <CartItem key={item.id} cartProduct={item} />
                            })}
                        </div>
                </div>

                <div className="bs-canvas-footer">
                    <div className="cart-total-dil saving-total ">
                        <h4>Total Saving</h4>
                        <span>${discount}</span>
                    </div>
                    <div className="main-total-cart">
                        <h2>Total</h2>
                        <span>${finalCartTotal}</span>
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