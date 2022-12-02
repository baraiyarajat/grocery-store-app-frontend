import { useParams } from "react-router-dom";
import Navbar from "../includes/Navbar";
import Footer from "../includes/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSingleProduct } from "../../store/singleProduct/singleProductSlice";
import { Link } from "react-router-dom";
import { addWishlistProduct, deleteWishlistProduct, getWishlist } from "../../store/wishlist/wishlistSlice";

function SingleProduct (){

    const params = useParams();
    const productSlug = params.productSlug
    const {warehouse, isLoading} = useSelector((store)=>store.selectedWarehouse)
    const {singleProduct, isSingleProductLoading} = useSelector((store)=>store.singleProduct)
    const {wishlistProducts,isWishlistLoading} = useSelector((store)=>store.wishlist)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getSingleProduct(productSlug))
    },[warehouse])


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
                                            {!isSingleProductLoading &&  <li className="breadcrumb-item"><Link to={`/products-by-category/${singleProduct.product.category.slug}`}>{singleProduct.product.category.name}</Link></li>}
                                            {!isSingleProductLoading && <li className="breadcrumb-item active" aria-current="page">{singleProduct.product.name}</li>}
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
                                                <div id="sync1" className="owl-carousel owl-theme">
                                                    <div className="item">
                                                        <img src="images/product/big-1.jpg" alt=""/>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/product/big-2.jpg" alt=""/>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/product/big-3.jpg" alt=""/>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/product/big-4.jpg" alt=""/>
                                                    </div>
                                                </div>
                                                <div id="sync2" className="owl-carousel owl-theme">
                                                    <div className="item">
                                                        <img src="images/product/big-1.jpg" alt=""/>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/product/big-2.jpg" alt=""/>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/product/big-3.jpg" alt=""/>
                                                    </div>
                                                    <div className="item">
                                                        <img src="images/product/big-4.jpg" alt=""/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-8 col-md-8">
                                                <div className="product-dt-right">
                                                    {!isSingleProductLoading &&  <h2>{singleProduct.product.name}</h2>}
                                                    <div className="no-stock">
                                                        {singleProduct.stock>0 &&  <p className="stock-qty">Available<span>(Instock)</span></p>}
                                                        {!singleProduct.stock>0 &&  <p className="stock-qty">Available<span>(Instock)</span></p>}
                                                    </div>
                                                    
                                                    {!isSingleProductLoading && <p className="pp-descp">{singleProduct.product.description}</p>}
                                                    <div className="product-group-dt">
                                                        <ul>
                                                            {singleProduct.discount_rate>0 &&  <li><div className="main-price color-discount">Discount Price<span>${singleProduct.get_discounted_price}</span></div></li>}
                                                            {singleProduct.discount_rate>0 &&  <li><div className="main-price mrp-price">MRP Price<span>${singleProduct.price}</span></div></li>}
                                                            {!singleProduct.discount_rate>0 && <li><div className="main-price color-discount">MRP Price<span>${singleProduct.price}</span></div></li>}
                                                        </ul>
                                                        <ul className="gty-wish-share">
                                                            <li>
                                                                <div className="qty-product">
                                                                    <div className="quantity buttons_added">
                                                                        {/* <input type="button" value="-" className="minus minus-btn"/>
                                                                        <input type="number" step="1" name="quantity" value="1" className="input-text qty text"/>
                                                                        <input type="button" value="+" className="plus plus-btn"/> */}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                {!isWishlistLoading &&  !inWishlist && <span className="like-icon save-icon " title="wishlist" onClick={(e)=>addToWishlistHandler(e)} ></span>}
                                                                {!isWishlistLoading &&   inWishlist && <span className="like-icon save-icon liked" title="wishlist" onClick={(e)=>deleteFromWishlistHandler(e)}></span>}
                                                                
                                                            </li>
                                                        </ul>
                                                        <ul className="ordr-crt-share">
                                                            <li><button className="add-cart-btn hover-btn"><i className="uil uil-shopping-cart-alt"></i>Add to Cart</button></li>
                                                            <li><button className="order-btn hover-btn">Order Now</button></li>
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