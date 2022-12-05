import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

//Includes
import Navbar from '../includes/Navbar';
import Footer from '../includes/Footer';


//Images
import offer1Banner from '../../assets/images/banners/offer-1.jpg'
import offer2Banner from '../../assets/images/banners/offer-2.jpg'
import offer3Banner from '../../assets/images/banners/offer-3.jpg'
import offer4Banner from '../../assets/images/banners/offer-4.jpg'
import offer5Banner from '../../assets/images/banners/offer-5.jpg'


import img1 from '../../assets/images/product/img-1.jpg'



import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCategories } from '../../store/category/categoriesSlice';
import { getNewWarehouseProducts } from '../../store/newProducts/newProductsSlice';
import { getWishlist } from '../../store/wishlist/wishlistSlice';
import {addWishlistProduct, deleteWishlistProduct} from '../../store/wishlist/wishlistSlice'

function CategoryItem(params){
    const category = params.category
    const imageUrl = `http://127.0.0.1:8000${category.image}`
    return(
        <div className="item">
            <Link to={`/products-by-category/${category.slug}`} className="category-item">
                <div className="cate-img">
                    <img src={imageUrl} alt="category_image"/>
                </div>
                <h4>{category.name}</h4>
            </Link>
        </div>
    )
}


function ProductItem({product, wishlistProduct, inWishlist}){

    const dispatch = useDispatch()

    const addToWishlistHandler = (e) =>{
        e.preventDefault()
        dispatch(addWishlistProduct(product.id))
    }


    const deleteFromWishlistHandler = async (e) =>{
        e.preventDefault()
        await Promise.all([
            dispatch(deleteWishlistProduct(wishlistProduct.id))
        ]);
        return dispatch(getWishlist());
    }


    const imageUrl = `http://127.0.0.1:8000${product.product.image}`

    return(
        <>
            <div className="item">
                <div className="product-item">
                    <Link to={`/products/${product.product.slug}`} className="product-img">
                        <img src={imageUrl} width="300" height="300" alt="product_image"/>
                        <div className="product-absolute-options">
                            <span className="offer-badge-1">New</span>
                            {!inWishlist && <span className="like-icon " title="wishlist" onClick={(e)=>addToWishlistHandler(e)} ></span>}
                        
                            {inWishlist && <span className="like-icon liked" title="wishlist" onClick={(e)=>deleteFromWishlistHandler(e)}></span>}
                        </div>
                    </Link>
                    <div className="product-text-dt">
                        {product.stock>0 && <p>Available<span>(In Stock)</span></p>}
                        {product.stock==0 && <p>Unavailable<span>(Out of Stock)</span></p>}
                        {/* <p>Available<span>(In Stock)</span></p> */}
                        <h4>{product.product.name}</h4>
                        
                        {product.discount_rate>0 && <div className="product-price">${product.get_discounted_price}<span>${product.price}</span></div>}
                        {product.discount_rate===0 && <div className="product-price">${product.price}</div>}
                        
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
        </>
    )

}



function Home(){

    const {categories, isCategoriesLoading} = useSelector((store)=>store.categories)
    const {warehouse,isLoading} = useSelector((store)=>store.selectedWarehouse)
    const {newProducts, isNewProductsLoading} = useSelector((store)=>store.newProducts)
    const {wishlistProducts,isWishlistLoading} = useSelector((store)=>store.wishlist)   

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getNewWarehouseProducts())
    },[warehouse, dispatch])
    
    
    useEffect(()=>{
        dispatch(getCategories())
    },[dispatch])

    useEffect(()=>{
        dispatch(getWishlist())
    },[warehouse, dispatch])
    
    return(
        <>
            {/* Navbar */}
            <Navbar/>
            
            {/* Home Content */}
            <div className="wrapper">

                <div className="main-banner-slider">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <OwlCarousel className=" featured-slider owl-theme" loop margin={10} nav>
                                    <div className="item">
                                        <div className="offer-item">								
                                            <div className="offer-item-img">
                                                <div className="gambo-overlay"></div>
                                                <img src={offer1Banner} alt=""/>
                                            </div>
                                            <div className="offer-text-dt">
                                                <div className="offer-top-text-banner">
                                                    <p>6% Off</p>
                                                    <div className="top-text-1">Buy More & Save More</div>
                                                    <span>Fresh Vegetables</span>
                                                </div>
                                                <a href="#" className="Offer-shop-btn hover-btn">Shop Now</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="offer-item">								
                                            <div className="offer-item-img">
                                                <div className="gambo-overlay"></div>
                                                <img src={offer2Banner} alt=""/>
                                            </div>
                                            <div className="offer-text-dt">
                                                <div className="offer-top-text-banner">
                                                    <p>5% Off</p>
                                                    <div className="top-text-1">Buy More & Save More</div>
                                                    <span>Fresh Fruits</span>
                                                </div>
                                                <a href="#" className="Offer-shop-btn hover-btn">Shop Now</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="offer-item">								
                                            <div className="offer-item-img">
                                                <div className="gambo-overlay"></div>
                                                <img src={offer3Banner} alt=""/>
                                            </div>
                                            <div className="offer-text-dt">
                                                <div className="offer-top-text-banner">
                                                    <p>3% Off</p>
                                                    <div className="top-text-1">Hot Deals on New Items</div>
                                                    <span>Daily Essentials Eggs & Dairy</span>
                                                </div>
                                                <a href="#" className="Offer-shop-btn hover-btn">Shop Now</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="offer-item">								
                                            <div className="offer-item-img">	
                                                <div className="gambo-overlay"></div>
                                                <img src={offer4Banner} alt=""/>
                                            </div>
                                            <div className="offer-text-dt">
                                                <div className="offer-top-text-banner">
                                                    <p>2% Off</p>
                                                    <div className="top-text-1">Buy More & Save More</div>
                                                    <span>Beverages</span>
                                                </div>
                                                <a href="#" className="Offer-shop-btn hover-btn">Shop Now</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="offer-item">								
                                            <div className="offer-item-img">
                                                <div className="gambo-overlay"></div>
                                                <img src={offer5Banner} alt=""/>
                                            </div>
                                            <div className="offer-text-dt">
                                                <div className="offer-top-text-banner">
                                                    <p>3% Off</p>
                                                    <div className="top-text-1">Buy More & Save More</div>
                                                    <span>Nuts & Snacks</span>
                                                </div>
                                                <a href="#" className="Offer-shop-btn hover-btn">Shop Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section145">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="main-title-tt">
                                    <div className="main-title-left">
                                        <span>Shop By</span>
                                        <h2>Categories</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <OwlCarousel className="featured-slider owl-theme" loop margin={10} nav>

                                    {! isCategoriesLoading && 
                                        
                                        categories.map((category) =>{
                                            return <CategoryItem key={category.id} category={category}/>
                                        })
                                        
                                    }

                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section145">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="main-title-tt">
                                    <div className="main-title-left">
                                        <span>For You</span>
                                        <h2>Top Featured Products</h2>
                                    </div>
                                    <a href="#" className="see-more-btn">See All</a>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <OwlCarousel className="featured-slider owl-theme" loop margin={10} nav>
                                    <div className="item">
                                        <div className="product-item">
                                            <a href="#" className="product-img">
                                                <img src={img1} alt=""/>
                                                <div className="product-absolute-options">
                                                    <span className="offer-badge-1">6% off</span>
                                                    <span className="like-icon" title="wishlist"></span>
                                                </div>
                                            </a>
                                            <div className="product-text-dt">
                                                <p>Available<span>(In Stock)</span></p>
                                                <h4>Product Title Here</h4>
                                                <div className="product-price">$12 <span>$15</span></div>
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
                                    <div className="item">
                                        <div className="product-item">
                                            <a href="#" className="product-img">
                                                <img src="images/product/img-2.jpg" alt=""/>
                                                <div className="product-absolute-options">
                                                    <span className="offer-badge-1">2% off</span>
                                                    <span className="like-icon" title="wishlist"></span>
                                                </div>
                                            </a>
                                            <div className="product-text-dt">
                                                <p>Available<span>(In Stock)</span></p>
                                                <h4>Product Title Here</h4>
                                                <div className="product-price">$10 <span>$13</span></div>
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
                                    <div className="item">
                                        <div className="product-item">
                                            <a href="#" className="product-img">
                                                <img src="images/product/img-3.jpg" alt=""/>
                                                <div className="product-absolute-options">
                                                    <span className="offer-badge-1">5% off</span>
                                                    <span className="like-icon" title="wishlist"></span>
                                                </div>
                                            </a>
                                            <div className="product-text-dt">
                                                <p>Available<span>(In Stock)</span></p>
                                                <h4>Product Title Here</h4>
                                                <div className="product-price">$5 <span>$8</span></div>
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
                                    <div className="item">
                                        <div className="product-item">
                                            <a href="#" className="product-img">
                                                <img src="images/product/img-3.jpg" alt=""/>
                                                <div className="product-absolute-options">
                                                    <span className="offer-badge-1">5% off</span>
                                                    <span className="like-icon" title="wishlist"></span>
                                                </div>
                                            </a>
                                            <div className="product-text-dt">
                                                <p>Available<span>(In Stock)</span></p>
                                                <h4>Product Title Here</h4>
                                                <div className="product-price">$5 <span>$8</span></div>
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

                                    
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section145">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="main-title-tt">
                                    <div className="main-title-left">
                                        <span>Offers</span>
                                        <h2>Best Values</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <a href="#" className="best-offer-item">
                                    <img src="images/best-offers/offer-1.jpg" alt=""/>
                                </a>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <a href="#" className="best-offer-item">
                                    <img src="images/best-offers/offer-2.jpg" alt=""/>
                                </a>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <a href="#" className="best-offer-item offr-none">
                                    <img src="images/best-offers/offer-3.jpg" alt=""/>
                                    <div className="cmtk_dt">
                                        <div className="product_countdown-timer offer-counter-text" data-countdown="2021/01/06"></div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-12">
                                <a href="#" className="code-offer-item">
                                    <img src="images/best-offers/offer-4.jpg" alt=""/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section145">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="main-title-tt">
                                    <div className="main-title-left">
                                        <span>For You</span>
                                        <h2>Fresh Vegetables & Fruits</h2>
                                    </div>
                                    <a href="#" className="see-more-btn">See All</a>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <OwlCarousel className="featured-slider owl-theme" loop margin={10} nav>
                                    <div className="item">
                                        <div className="product-item">
                                            <a href="#" className="product-img">
                                                <img src={img1} alt=""/>
                                                <div className="product-absolute-options">
                                                    <span className="offer-badge-1">6% off</span>
                                                    <span className="like-icon" title="wishlist"></span>
                                                </div>
                                            </a>
                                            <div className="product-text-dt">
                                                <p>Available<span>(In Stock)</span></p>
                                                <h4>Product Title Here</h4>
                                                <div className="product-price">$12 <span>$15</span></div>
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
                                    <div className="item">
                                        <div className="product-item">
                                            <a href="#" className="product-img">
                                                <img src="images/product/img-2.jpg" alt=""/>
                                                <div className="product-absolute-options">
                                                    <span className="offer-badge-1">2% off</span>
                                                    <span className="like-icon" title="wishlist"></span>
                                                </div>
                                            </a>
                                            <div className="product-text-dt">
                                                <p>Available<span>(In Stock)</span></p>
                                                <h4>Product Title Here</h4>
                                                <div className="product-price">$10 <span>$13</span></div>
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
                                    <div className="item">
                                        <div className="product-item">
                                            <a href="#" className="product-img">
                                                <img src="images/product/img-3.jpg" alt=""/>
                                                <div className="product-absolute-options">
                                                    <span className="offer-badge-1">5% off</span>
                                                    <span className="like-icon" title="wishlist"></span>
                                                </div>
                                            </a>
                                            <div className="product-text-dt">
                                                <p>Available<span>(In Stock)</span></p>
                                                <h4>Product Title Here</h4>
                                                <div className="product-price">$5 <span>$8</span></div>
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
                                    <div className="item">
                                        <div className="product-item">
                                            <a href="#" className="product-img">
                                                <img src="images/product/img-3.jpg" alt=""/>
                                                <div className="product-absolute-options">
                                                    <span className="offer-badge-1">5% off</span>
                                                    <span className="like-icon" title="wishlist"></span>
                                                </div>
                                            </a>
                                            <div className="product-text-dt">
                                                <p>Available<span>(In Stock)</span></p>
                                                <h4>Product Title Here</h4>
                                                <div className="product-price">$5 <span>$8</span></div>
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

                                    
                                </OwlCarousel>



                            </div>
                        </div>
                    </div>
                </div>
		
		
                <div className="section145">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="main-title-tt">
                                    <div className="main-title-left">
                                        <span>For You</span>
                                        <h2>Added New Products</h2>
                                    </div>
                                    <Link to="/new-products" className="see-more-btn">See All</Link>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <OwlCarousel className="featured-slider owl-theme" loop margin={10} nav>
                                    {!isNewProductsLoading &&  !isWishlistLoading && !isLoading && newProducts.slice(0,9).map((product)=>{

                                        const productId = product.id
                                        const wishlistProduct = wishlistProducts.filter((wishlistProduct)=>{
                                            return wishlistProduct.warehouse_product.id === productId 
                                        })[0]
                                        
                                        const inWishlist = wishlistProduct && true
                                        
                                        return <ProductItem key={product.id} product={product} inWishlist={inWishlist} wishlistProduct={wishlistProduct}  />
                                    })}
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </div>
		
	    </div>
            
        {/* Footer */}
        <Footer/>
        </>
    )

}


export default Home;
