import { Modal, Button } from "react-bootstrap";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { decreaseCartItemQuantity, deleteCartItem, getCartItems, increaseCartItemQuantity, setCartTotal, setFinalCartTotal, setSavings } from '../../../store/cart/cartSlice';
import {DashIcon, PlusIcon} from '@primer/octicons-react'





function CartItem({cartProduct, setShowCartModal}){

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

    const navigate = useNavigate()

    const handleProductNavigate = (e) =>{
        e.preventDefault()
        setShowCartModal(false)
        navigate(`/products?name=${cartProduct.warehouse_product.product.slug}`)
    }

    return(
        <div className="cart-item">
            <Link onClick={(e)=>handleProductNavigate(e)} >
                <div className="cart-product-img">
                    <img src={cartProduct.warehouse_product.product.image} alt="product_image"/>
                    {cartProduct.warehouse_product.discount_rate>0   && <div className="offer-badge">{cartProduct.warehouse_product.discount_rate}% OFF</div>}
                </div>
            </Link>
            <div className="cart-text">
                <Link><h4 onClick={(e)=>handleProductNavigate(e)}>{cartProduct.warehouse_product.product.name}</h4></Link>
                
                
                {cartProduct.warehouse_product.stock>0 &&  <div className="qty-group">
                    <div className="quantity buttons_added">
                        <button type="button" className='btn btn-secondary btn-sm'  onClick={(e)=>handleDecreaseItemQuantity(e)} ><DashIcon size={10} /></button>
                        &nbsp;{cartProduct.quantity}&nbsp;
                        {cartProduct.quantity<10 &&  <button type="button" className='btn btn-secondary btn-sm'  onClick={(e)=>handleIncreaseItemQuantity(e)}><PlusIcon size={10} /></button>}
                        {cartProduct.quantity>=10 &&  <button type="button" className='btn btn-secondary btn-sm'  onClick={(e)=>handleIncreaseItemQuantity(e)} disabled><PlusIcon size={10} /></button>}
                    </div>
                    {cartProduct.warehouse_product.discount_rate>0 &&  <div className="cart-item-price">${(cartProduct.warehouse_product.get_discounted_price * cartProduct.quantity).toFixed(2)}<span>${(cartProduct.warehouse_product.price * cartProduct.quantity).toFixed(2)}</span></div>}
                    {cartProduct.warehouse_product.discount_rate===0 &&  <div className="cart-item-price">${(cartProduct.warehouse_product.price * cartProduct.quantity).toFixed(2)}</div>}
                </div>}

                {cartProduct.warehouse_product.stock==0 && <div> Out of stock  </div>}	
                <button type="button" className="cart-close-btn" onClick={(e)=>handleDeleteCartItem(e)}><i className="uil uil-multiply"></i></button>
            </div>
        </div>
    )
}

function CartSidebar({showCartModal, setShowCartModal}){
 
    const {cartItems, isCartLoading, cartTotal, savings, finalCartTotal, deliveryCharge} = useSelector((store)=>store.cart)
    const {warehouse, isLoading} = useSelector((store)=>store.selectedWarehouse)
    
    const dispatch = useDispatch()

    useEffect(()=>{        
        dispatch(getCartItems())
    },[dispatch,warehouse])

    useEffect(()=>{
        dispatch(setSavings())
        dispatch(setCartTotal())
    },[cartItems, dispatch])


    useEffect(()=>{
        dispatch(setFinalCartTotal())
    },[cartTotal, dispatch, deliveryCharge])

    
    const navigate = useNavigate()
    const handleCheckout = (e) =>{
        e.preventDefault()
        setShowCartModal(false)
        navigate('/checkout')
    }


    return(
        <>
            <Modal.Header id="cart-modal-header" >
                    <Modal.Title id="cart-modal-title">
                        My Cart <span id='cart-modal-title-item-count'>({cartItems.reduce((partialSum,item)=>partialSum+ item.quantity,0)} Items)</span>
                    </Modal.Title>
                    <Button id='cart-close-button' onClick={()=>setShowCartModal(false)} ><i id="cart-close-button-icon" className="uil uil-multiply"></i></Button>
            </Modal.Header>

            <Modal.Title>
                <div className="cart-top-total" id="cart-modal-body-top">
                    <div className="cart-total-dil">
                        <h4>Gambo Super Market</h4>
                        <span>${cartTotal}</span>
                    </div>
                    <div className="cart-total-dil pt-2">
                        <h4>Delivery Charges</h4>
                        <span>$3</span>
                    </div>
                </div>
            </Modal.Title>

            <Modal.Body id="cart-modal-body">  
                <div className="side-cart-items">
                    { cartItems.map((item)=>{
                        return <CartItem key={item.id} cartProduct={item} setShowCartModal={setShowCartModal} />
                    })}
                </div>
            </Modal.Body>
        
            <Modal.Title id="cart-modal-footer">
                <div className="cart-total-dil saving-total ">
                    <h4>Total Saving</h4>
                    <span>${savings.toFixed(2)}</span>
                </div>

                <div className="main-total-cart">
                    <h2>Total</h2>
                    <span>${finalCartTotal.toFixed(2)}</span>
                </div>

                <div className="checkout-cart">
                    <Link to="/" className="promo-code" style={{ 'pointerEvents' : 'none'}}>Have a promocode?</Link>
                    <Button onClick={(e)=>handleCheckout(e)} className="cart-checkout-btn hover-btn btn-secondary" >Proceed to Checkout</Button>
                </div>
            </Modal.Title>
        </>   
    )
}


export default CartSidebar;