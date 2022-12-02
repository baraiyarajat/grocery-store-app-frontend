import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getNewWarehouseProducts } from "../../store/newProducts/newProductsSlice";
import { Link } from "react-router-dom";
import { getWishlist } from "../../store/wishlist/wishlistSlice";


import { addWishlistProduct, deleteWishlistProduct } from "../../store/wishlist/wishlistSlice";

import Footer from "../includes/Footer";
import Navbar from "../includes/Navbar";


function NewProductItem(params){

    
    const dispatch = useDispatch()

    const addToWishlistHandler = (e) =>{
        e.preventDefault()
        dispatch(addWishlistProduct(params.product.id))
    }


    const deleteFromWishlistHandler =  (e) =>{
        e.preventDefault()
        dispatch(deleteWishlistProduct(params.wishlistProduct.id))
    }


    const imageUrl = `http://127.0.0.1:8000${params.product.product.image}`


    return(
        <div className="col-lg-3 col-md-6">
            <div className="product-item mb-30">
                <Link to={`/products/${params.product.product.slug}`} className="product-img">
                    <img src={imageUrl} alt=""/>
                    <div className="product-absolute-options">
                        
                        { params.product.discount_rate!==0 && <span className="offer-badge-1">{params.product.discount_rate}% off</span>}
                        {!params.inWishlist && <span className="like-icon " title="wishlist" onClick={(e)=>addToWishlistHandler(e)} ></span>}
                        
                        {params.inWishlist && <span className="like-icon liked" title="wishlist" onClick={(e)=>deleteFromWishlistHandler(e)}></span>}
                        
                    </div>
                </Link>
                <div className="product-text-dt">
                    { params.product.stock !==0 &&  <p>Available<span>(In Stock)</span></p>}
                    { params.product.stock ===0 &&  <p>Unavailable<span>(Out of Stock)</span></p>}
                    
                    <Link to={`/products/${params.product.product.slug}`}><h4>{params.product.product.name}</h4></Link>
                    { params.product.discount_rate!==0 &&  <div className="product-price">${params.product.get_discounted_price} <span>${params.product.price}</span></div>}
                    { params.product.discount_rate===0 &&  <div className="product-price">${params.product.price} </div>}
                    <div className="qty-cart">
                        <div className="quantity buttons_added">
                            {/* <input type="button" value="-" className="minus minus-btn"/>
                            <input type="number" step="1" name="quantity" value="1" className="input-text qty text"/>
                            <input type="button" value="+" className="plus plus-btn"/> */}
                        </div>
                        <span className="cart-icon"><i className="uil uil-shopping-cart-alt"></i></span>
                    </div>
                </div>
            </div>
        </div>
    )
}



function NewProducts(){

    const dispatch = useDispatch()
    const {warehouse} = useSelector((store)=>store.selectedWarehouse)
    const {newProducts, isNewProductsLoading} = useSelector((store)=>store.newProducts)
    const {wishlistProducts,isWishlistLoading} = useSelector((store)=>store.wishlist)   

    useEffect(()=>{
        dispatch(getNewWarehouseProducts())
    },[warehouse, dispatch])

    useEffect(()=>{
        dispatch(getWishlist())
    },[warehouse, dispatch])


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
                                            <li className="breadcrumb-item"><Link to="/" >Home</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">New Products</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="all-product-grid">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="product-top-dt">
                                        <div className="product-left-title">
                                            <h2>New Products</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-list-view">
                                {!isNewProductsLoading && !isWishlistLoading  && <div className="row">
                                    {newProducts.map((product)=>{ 
                                        
                                        const productId = product.id
                                        const wishlistProduct = wishlistProducts.filter((wishlistProduct)=>{
                                            return wishlistProduct.warehouse_product.id === productId 
                                        })[0]
                                        const inWishlist = wishlistProduct && true
                                        
                                        return <NewProductItem key={product.id} product={product}  wishlistProduct={wishlistProduct} inWishlist={inWishlist}/>})}
                                </div>}
                            </div>
                        </div>
                    </div>


                </div>
            <Footer/>
        </>
    )

}



export default NewProducts;