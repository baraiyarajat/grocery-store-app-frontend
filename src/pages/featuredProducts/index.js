import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {getFeaturedProducts} from "../../store/featuredProducts/featuredProductsSlice"
import { Link } from "react-router-dom";
import { getWishlist } from "../../store/wishlist/wishlistSlice";
import { getCartItems, deleteCartItem, addCartItem } from "../../store/cart/cartSlice";

import { addWishlistProduct, deleteWishlistProduct } from "../../store/wishlist/wishlistSlice";

import Footer from "../includes/Footer";
import Navbar from "../includes/Navbar";
import EmptyProductMessage from "../includes/EmptyProductMessage";



function FeaturedProductItem(params){

    
    const dispatch = useDispatch()

    const addToWishlistHandler = (e) =>{
        e.preventDefault()
        dispatch(addWishlistProduct(params.product.id))
    }


    const deleteFromWishlistHandler =  (e) =>{
        e.preventDefault()
        dispatch(deleteWishlistProduct(params.wishlistProduct.id))
    }

    const deleteFromCartHandler =async (e) =>{
        e.preventDefault()
        await Promise.all([
            dispatch(deleteCartItem(params.cartProduct.id))
        ]);
        return dispatch(getCartItems());
    }

    const addToCartHandler = async(e) =>{
        e.preventDefault()
        
        await Promise.all([
            dispatch(addCartItem(params.product.id))
        ]);
        return dispatch(getCartItems());

    }


    return(
        <div className="col-lg-3 col-md-6">
            <div className="product-item mb-30">
                <Link to={`/products?name=${params.product.product.slug}`} className="product-img">
                    <img src={params.product.product.image} width="200" height="200" alt=""/>
                    <div className="product-absolute-options">
                        
                        { params.product.discount_rate!==0 && <span className="offer-badge-1">{params.product.discount_rate}% off</span>}
                        {params.isAuthenticated &&  !params.inWishlist && <span className="like-icon " title="wishlist" onClick={(e)=>addToWishlistHandler(e)} ></span>}
                        
                        {params.isAuthenticated &&  params.inWishlist && <span className="like-icon liked" title="wishlist" onClick={(e)=>deleteFromWishlistHandler(e)}></span>}
                        
                    </div>
                </Link>
                <div className="product-text-dt">
                    { params.product.stock !==0 &&  <p>Available<span>(In Stock)</span></p>}
                    { params.product.stock ===0 &&  <p>Unavailable<span>(Out of Stock)</span></p>}
                    
                    <Link to={`/products/${params.product.product.slug}`}><h4>{params.product.product.name}</h4></Link>
                    { params.product.discount_rate!==0 &&  <div className="product-price">${params.product.get_discounted_price} <span>${params.product.price}</span></div>}
                    { params.product.discount_rate===0 &&  <div className="product-price">${params.product.price} </div>}
                    {!params.inCart &&  params.product.stock>0 &&  <button className="btn btn-light" type="button" onClick={(e)=>addToCartHandler(e)}>Add to Cart</button>}
                    {params.inCart &&  params.product.stock>0 &&  <button className="btn btn-light" type="button" onClick={(e)=>deleteFromCartHandler(e)} >Remove from Cart</button>}
                    {params.product.stock===0 &&  <button className="btn btn-light disabled"  disabled={true} type="button">Add to Cart</button>}
                    
                </div>
            </div>
        </div>
    )
}



function FeaturedProducts(){

    const dispatch = useDispatch()
    const {warehouse} = useSelector((store)=>store.selectedWarehouse)
    const {featuredProducts, isFeaturedProductsLoading} = useSelector((store)=>store.featuredProducts)
    const {wishlistProducts,isWishlistLoading} = useSelector((store)=>store.wishlist)
    const {cartItems, isCartLoading} = useSelector((store)=>store.cart)   
    const {isAuthenticated} = useSelector((store)=>store.auth)

    useEffect(()=>{
        dispatch(getFeaturedProducts())
    },[warehouse, dispatch])

    useEffect(()=>{
        isAuthenticated && dispatch(getWishlist())
    },[warehouse,isAuthenticated, dispatch])

    useEffect(()=>{
        isAuthenticated && dispatch(getCartItems())
    },[warehouse, isAuthenticated, dispatch])



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
                                            <li className="breadcrumb-item active" aria-current="page">Featured Products</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>


                    { featuredProducts.length>0 && <div className="all-product-grid">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="product-top-dt">
                                        <div className="product-left-title">
                                            <h2>Featured Products</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-list-view">
                                {!isFeaturedProductsLoading  && <div className="row">
                                    {featuredProducts.map((product)=>{ 
                                        
                                        const productId = product.id
                                        const wishlistProduct = wishlistProducts.filter((wishlistProduct)=>{
                                            return wishlistProduct.warehouse_product.id === productId 
                                        })[0]
                                        const inWishlist = wishlistProduct && true
                                        
                                        const cartProduct = cartItems.filter((item)=>{
                                            return item.warehouse_product.id === productId
                                        })[0]

                                        const inCart = cartProduct && true

                                        return <FeaturedProductItem key={product.id} product={product}  wishlistProduct={wishlistProduct} inWishlist={inWishlist} cartProduct={cartProduct} inCart ={inCart} isAuthenticated={isAuthenticated} />})}
                                </div>}
                            </div>
                        </div>
                    </div>}

                    {!isFeaturedProductsLoading && featuredProducts.length ===0 && <EmptyProductMessage/>}


                </div>
            <Footer/>
        </>
    )

}



export default FeaturedProducts;