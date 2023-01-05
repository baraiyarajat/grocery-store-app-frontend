import { useParams, useSearchParams } from "react-router-dom";
import Navbar from "../includes/Navbar";
import Footer from "../includes/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSingleProduct } from "../../store/singleProduct/singleProductSlice";
import { Link } from "react-router-dom";
import { addWishlistProduct, deleteWishlistProduct, getWishlist } from "../../store/wishlist/wishlistSlice";
import { addCartItem, deleteCartItem, getCartItems } from "../../store/cart/cartSlice";
import { getSelectedWarehouse } from "../../store/warehouse/selectedWarehouseSlice";

function SingleProduct (){

    const params = useParams();
    // const productSlug = params.productSlug
    const [searchParams, setSearchParams] = useSearchParams();
    const productSlug = searchParams.get('name')

    
    const [cartObject, setCartObject] = useState({"inCart":false,
                                                   "cartItemId":null})
    
    const {warehouse, isLoading} = useSelector((store)=>store.selectedWarehouse)
    const {singleProduct, isSingleProductLoading} = useSelector((store)=>store.singleProduct)
    const {wishlistProducts,isWishlistLoading} = useSelector((store)=>store.wishlist)
    const {cartItems, isCartLoading} = useSelector((store)=>store.cart)

    

    const dispatch = useDispatch()

    

    const wishlistProduct = wishlistProducts.filter((wishlistProduct)=>{
                                return wishlistProduct.warehouse_product.id === singleProduct.id 
                            })[0]

    const inWishlist = wishlistProduct && true

    const addToWishlistHandler = (e) =>{
        e.preventDefault()
        dispatch(addWishlistProduct(singleProduct.id))
    }


    const deleteFromWishlistHandler =  (e) =>{
        e.preventDefault()
        dispatch(deleteWishlistProduct(wishlistProduct.id))
    }

    const deleteFromCartHandler =async (e) =>{
        e.preventDefault()
        await Promise.all([
            dispatch(deleteCartItem(cartObject.cartItemId))
        ]);
        return dispatch(getCartItems());
    }


    const addToCartHandler = async(e) =>{
        e.preventDefault()
        
        await Promise.all([
            dispatch(addCartItem(singleProduct.id))
        ]);
        return dispatch(getCartItems());

    }


    useEffect(()=>{        
        
        dispatch(getSingleProduct(productSlug))
    },[warehouse, productSlug, dispatch])

    useEffect(()=>{
        dispatch(getCartItems())
    },[warehouse,dispatch, productSlug])

    useEffect(()=>{
       const cartItem =  cartItems.filter((item)=>{return item.warehouse_product.id === singleProduct.id})[0]
       if(cartItem){
        setCartObject({"inCart":true,
                        "cartItemId":cartItem.id})
       } else{
        setCartObject({"inCart":false,
                        "cartItemId":null})
       }

    },[warehouse,singleProduct, cartItems,dispatch])


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
                                            {!isLoading && !isSingleProductLoading &&  <li className="breadcrumb-item"><Link to={`/products-by-category?name=${singleProduct.product.category.slug}`}>{singleProduct.product.category.name}</Link></li>}
                                            {!isLoading && !isSingleProductLoading && <li className="breadcrumb-item active" aria-current="page">{singleProduct.product.name}</li>}
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
                                    <div className="product-dt-view">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-4">
                                               {!isLoading && !isSingleProductLoading && <img src={singleProduct.product.image} width="380" height="380" alt=""/>}
                                            </div>
                                            <div className="col-lg-8 col-md-8">
                                                <div className="product-dt-right">
                                                    {!isLoading && !isSingleProductLoading &&  <h2>{singleProduct.product.name}</h2>}
                                                    <div className="no-stock">
                                                        {!isLoading && singleProduct.stock>0 &&  <p className="stock-qty">Available<span>(In stock)</span></p>}
                                                        {!isLoading && !singleProduct.stock>0 &&  <p className="stock-qty">Unavailable<span>(Out of stock)</span></p>}
                                                    </div>
                                                    
                                                    {!isLoading && !isSingleProductLoading && <p className="pp-descp">{singleProduct.product.description}</p>}
                                                    <div className="product-group-dt">
                                                        <ul>
                                                            {!isLoading && singleProduct.discount_rate>0 &&  <li><div className="main-price color-discount">Discount Price<span>${singleProduct.get_discounted_price}</span></div></li>}
                                                            {!isLoading && singleProduct.discount_rate>0 &&  <li><div className="main-price mrp-price">MRP Price<span>${singleProduct.price}</span></div></li>}
                                                            {!isLoading && !singleProduct.discount_rate>0 && <li><div className="main-price "> Price<span>${singleProduct.price}</span></div></li>}
                                                        </ul>
                                                        <ul className="gty-wish-share">
                                                            <li>                                                    
                                                                {!isLoading && !isWishlistLoading &&  !inWishlist && <span className="like-icon save-icon " title="wishlist" onClick={(e)=>addToWishlistHandler(e)} ></span>}
                                                                {!isLoading && !isWishlistLoading &&   inWishlist && <span className="like-icon save-icon liked" title="wishlist" onClick={(e)=>deleteFromWishlistHandler(e)}></span>}  
                                                            </li>
                                                        </ul>
                                                        <ul className="ordr-crt-share">
                                                             {!isLoading && cartObject.inCart && <li><button className="add-cart-btn hover-btn"  onClick={(e)=>deleteFromCartHandler(e)} ><i className="uil uil-shopping-cart-alt"></i>Remove from Cart</button></li>}
                                                             {!isLoading && !cartObject.inCart  && singleProduct.stock>0 && <li><button className="add-cart-btn hover-btn" onClick={(e)=>addToCartHandler(e)}><i className="uil uil-shopping-cart-alt"></i>Add to Cart</button></li>}                                                      
                                                        </ul>
                                                    </div>
                                                    <div className="pdp-details">
                                                        <ul>
                                                            <li>
                                                                <div className="pdp-group-dt">
                                                                    <div className="pdp-icon"><i className="uil uil-usd-circle"></i></div>
                                                                    <div className="pdp-text-dt">
                                                                        <span>Lowest Price Guaranteed</span>
                                                                        <p>Get difference refunded if you find it cheaper anywhere else.</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="pdp-group-dt">
                                                                    <div className="pdp-icon"><i className="uil uil-cloud-redo"></i></div>
                                                                    <div className="pdp-text-dt">
                                                                        <span>Easy Returns & Refunds</span>
                                                                        <p>Return products at doorstep and get refund in seconds.</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
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


export default SingleProduct;