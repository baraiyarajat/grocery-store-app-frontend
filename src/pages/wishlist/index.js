import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';

//Includes
import Navbar from '../includes/Navbar';
import Footer from '../includes/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWishlistProduct, getWishlist } from '../../store/wishlist/wishlistSlice';



function WishlistItem({wishlistProduct}){

    

    const dispatch = useDispatch()

    const handleDeleteWishlistProduct = () =>{
        
        dispatch(deleteWishlistProduct(wishlistProduct.id))
    }

    const imageUrl = `http://127.0.0.1:8000${wishlistProduct.warehouse_product.product.image}`

    
    return(
        <div className="cart-item">
            <Link to={`/products/${wishlistProduct.warehouse_product.product.slug}`} >
                <div className="cart-product-img">
                    <img src={imageUrl} height="130" widht="130" alt=""/>
                    { wishlistProduct.warehouse_product.discount_rate!==0 && <div className="offer-badge">{wishlistProduct.warehouse_product.discount_rate}% OFF</div>}
                </div>
            </Link>
            <div className="cart-text">
                <Link to={`/products/${wishlistProduct.warehouse_product.product.slug}`} ><h4>{wishlistProduct.warehouse_product.product.name}</h4></Link>
                { wishlistProduct.warehouse_product.discount_rate!==0 && <div className="cart-item-price">${wishlistProduct.warehouse_product.get_discounted_price} <span>${wishlistProduct.warehouse_product.price}</span></div>}
                { wishlistProduct.warehouse_product.discount_rate===0 && <div className="cart-item-price">${wishlistProduct.warehouse_product.price} </div>}
                <button type="button" onClick={ ()=> handleDeleteWishlistProduct(wishlistProduct.id)} className="cart-close-btn"><i className="uil uil-trash-alt"></i></button>
            </div>		
        </div>
    )
}


function Wishlist(){

    const {wishlistProducts, isWishlistLoading } = useSelector((store)=>store.wishlist)
    const {warehouse} = useSelector((store)=>store.selectedWarehouse)
    const dispatch = useDispatch()

    useEffect(()=>{
       dispatch(getWishlist())
    },[dispatch, warehouse])


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
                    <div className="dashboard-group">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="user-dt">
                                        <div className="user-img">
                                            <img src="images/avatar/img-5.jpg" alt=""/>
                                            <div className="img-add">													
                                                <input type="file" id="file"/>
                                                <label htmlFor="file"><i className="uil uil-camera-plus"></i></label>
                                            </div>
                                        </div>
                                        <h4>Johe Doe</h4>
                                        <p>+91999999999<Link to="#"><i className="uil uil-edit"></i></Link></p>
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
                                                    <h4><i className="uil uil-heart"></i>Shopping Wishlist</h4>
                                                </div>
                                            </div>								
                                            <div className="col-lg-12 col-md-12">
                                                <div className="pdpt-bg">
                                                    <div className="wishlist-body-dtt">
                                                        
                                                        
                                                        { !isWishlistLoading && wishlistProducts.map((wishlistProduct)=>{
                                                            return <WishlistItem key={wishlistProduct.id} wishlistProduct={wishlistProduct} />
                                                        })}
                                                    
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