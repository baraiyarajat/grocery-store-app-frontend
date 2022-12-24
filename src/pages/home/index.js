import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

//Includes
import Navbar from '../includes/Navbar';
import Footer from '../includes/Footer';


//Images
// import offer1Banner from '../../assets/images/banners/offer-1.jpg'
// import offer2Banner from '../../assets/images/banners/offer-2.jpg'
// import offer3Banner from '../../assets/images/banners/offer-3.jpg'
// import offer4Banner from '../../assets/images/banners/offer-4.jpg'
// import offer5Banner from '../../assets/images/banners/offer-5.jpg'


// import img1 from '../../assets/images/product/img-1.jpg'



import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCategories } from '../../store/category/categoriesSlice';
import { getNewVegetablesAndFruits, getNewWarehouseProducts } from '../../store/newProducts/newProductsSlice';
import { getWishlist } from '../../store/wishlist/wishlistSlice';
import {addWishlistProduct, deleteWishlistProduct} from '../../store/wishlist/wishlistSlice'
import { getFeaturedProducts } from '../../store/featuredProducts/featuredProductsSlice';
import { useState } from 'react';

function CategoryItem(params){
    const category = params.category
    // const imageUrl = `http://127.0.0.1:8000${category.image}`
    
    return(
        <div className="item">
            <Link to={`/products-by-category/${category.slug}`} className="category-item">
                <div className="cate-img">
                    <img src={category.image} alt="category_image"/>
                </div>
                <h4>{category.name}</h4>
            </Link>
        </div>
    )
}


function ProductItem({product}){


    const {wishlistProducts, isWishlistLoading} = useSelector((store)=>store.wishlist)

    const wishlistProduct = wishlistProducts.filter((wishlistProduct)=>{
                                            return wishlistProduct.warehouse_product.id === product.id 
                                        })[0]
                                        
    const inWishlist = wishlistProduct && true


    // const dispatch = useDispatch()
    // const imageUrl = `http://127.0.0.1:8000${product.product.image}`

    const dispatch = useDispatch()
    const addProductToWishlistHandler = (e) =>{
        e.preventDefault()
        dispatch(addWishlistProduct(product.id))
    }

    const deleteProductFromWishlist = (e) =>{
        e.preventDefault()
        dispatch(deleteWishlistProduct(wishlistProduct.id))
    }


    return(
        <>
            <div className="item">
                <div className="product-item">
                    <Link to={`/products/${product.product.slug}`} className="product-img">
                        <img src={product.product.image} width="300" height="300" alt="product_image"/>
                        <div className="product-absolute-options">
                            <span className="offer-badge-1">New</span>
                            {!inWishlist && <span className="like-icon " title="wishlist"  onClick={(e)=>addProductToWishlistHandler(e)}></span>}
                        
                            {inWishlist && <span className="like-icon liked" title="wishlist" onClick={(e)=>deleteProductFromWishlist(e)}></span>}
                        </div>
                    </Link>
                    <div className="product-text-dt">
                        {product.stock>0 && <p>Available<span>(In Stock)</span></p>}
                        {product.stock===0 && <p>Unavailable<span>(Out of Stock)</span></p>}
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
    const {newProducts, freshVegetablesAndFruits ,isNewProductsLoading, isFreshVegetablesAndFruitsLoading} = useSelector((store)=>store.newProducts)
    const {wishlistProducts,isWishlistLoading} = useSelector((store)=>store.wishlist)   
    const {featuredProducts, isFeaturedProductsLoading} = useSelector((store)=>store.featuredProducts)

    
    const initialCarouselPositions = {
        'newProductsPosition':'0'
    }

    const [carouselPositions, setCarouselPositions ] = useState(initialCarouselPositions)
    const dispatch = useDispatch()

    const handleCarouselPositionsUpdate = (object) =>{
        console.log(object)
        // if(object.item.index !=carouselPositions.newProductsPosition){
        //     setCarouselPositions({
        //         ...carouselPositions,
        //         newProductsPosition:object.item.index
        //     })
        // }
    }


    useEffect(()=>{
        dispatch(getNewWarehouseProducts())
    },[warehouse, dispatch])
    

    useEffect(()=>{
        dispatch(getNewVegetablesAndFruits())
    },[warehouse, dispatch])
    
    useEffect(()=>{
        dispatch(getFeaturedProducts())
                
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

                {/* <div className="main-banner-slider">
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
                </div> */}

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
                                <OwlCarousel className="featured-slider owl-theme " loop margin={10} items={6}   nav>

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
                                    <Link to="/featured-products" className="see-more-btn">See All</Link>
                                </div>
                            </div>
                            
                            
                            <div className="col-md-12">
                                {featuredProducts &&  <OwlCarousel className="featured-slider owl-theme" loop margin={10} nav>
                                    {featuredProducts.slice(0,9).map((product)=>{                                                                                                                                               
                                        return <ProductItem key={product.id} product={product}   />
                                    })}
                                </OwlCarousel>}
                            </div>
                            
                        </div>
                    </div>
                </div>

                {/* <div className="section145">
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
                </div> */}

                <div className="section145">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="main-title-tt">
                                    <div className="main-title-left">
                                        <span>For You</span>
                                        <h2>Fresh Vegetables & Fruits</h2>
                                    </div>
                                    <Link to="/products-by-category/vegetables-and-fruits" className="see-more-btn">See All</Link>
                                </div>
                            </div>

                            <div className="col-md-12">
                                {  <OwlCarousel className="featured-slider owl-theme" loop margin={10} nav>
                                    {freshVegetablesAndFruits.slice(0,9).map((product)=>{                                                                                                                                               
                                        return <ProductItem key={product.id} product={product}   />
                                    })}
                                </OwlCarousel>}
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
                                {newProducts &&  <OwlCarousel className="featured-slider owl-theme" loop margin={10} nav startPosition={carouselPositions.newProductsPosition} 
                                >
                                    {newProducts.slice(0,9).map((product)=>{
                                        
                                        return <ProductItem key={product.id} product={product}   />
                                    })}
                                </OwlCarousel>}
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
