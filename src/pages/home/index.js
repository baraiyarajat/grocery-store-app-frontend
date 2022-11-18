import React from 'react';
import ReactDOM from 'react-dom';

//Includes
import Navbar from '../includes/Navbar';
import Footer from '../includes/Footer';


//Images
import offer1Banner from '../../assets/images/banners/offer-1.jpg'
import offer2Banner from '../../assets/images/banners/offer-2.jpg'
import offer3Banner from '../../assets/images/banners/offer-3.jpg'
import offer4Banner from '../../assets/images/banners/offer-4.jpg'
import offer5Banner from '../../assets/images/banners/offer-5.jpg'

import icon1 from '../../assets/images/category/icon-1.svg'
import icon2 from '../../assets/images/category/icon-2.svg'
import icon3 from '../../assets/images/category/icon-3.svg'
import icon4 from '../../assets/images/category/icon-4.svg'
import icon5 from '../../assets/images/category/icon-5.svg'
import icon6 from '../../assets/images/category/icon-6.svg'
import icon7 from '../../assets/images/category/icon-7.svg'
import icon8 from '../../assets/images/category/icon-8.svg'
import icon9 from '../../assets/images/category/icon-9.svg'
import icon10 from '../../assets/images/category/icon-10.svg'
import icon11 from '../../assets/images/category/icon-11.svg'

import img1 from '../../assets/images/product/img-1.jpg'



import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";





function Home(){

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
                                    <div className="item">
                                        <a href="#" className="category-item">
                                            <div className="cate-img">
                                                <img src={icon1} alt=""/>
                                            </div>
                                            <h4>Vegetables & Fruits</h4>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a href="#" className="category-item">
                                            <div className="cate-img">
                                                <img src={icon2} alt=""/>
                                            </div>
                                            <h4> Grocery & Staples </h4>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a href="#" className="category-item">
                                            <div className="cate-img">
                                                <img src={icon3} alt=""/>
                                            </div>
                                            <h4> Dairy & Eggs </h4>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a href="#" className="category-item">
                                            <div className="cate-img">
                                                <img src={icon4} alt=""/>
                                            </div>
                                            <h4> Beverages </h4>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a href="#" className="category-item">
                                            <div className="cate-img">
                                                <img src={icon5} alt=""/>
                                            </div>
                                            <h4> Snacks </h4>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a href="#" className="category-item">
                                            <div className="cate-img">
                                                <img src={icon6} alt=""/>
                                            </div>
                                            <h4> Home Care </h4>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a href="#" className="category-item">
                                            <div className="cate-img">
                                                <img src={icon7} alt=""/>
                                            </div>
                                            <h4> Noodles & Sauces </h4>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a href="#" className="category-item">
                                            <div className="cate-img">
                                                <img src={icon8} alt=""/>
                                            </div>
                                            <h4> Personal Care </h4>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a href="#" className="category-item">
                                            <div className="cate-img">
                                                <img src={icon9} alt=""/>
                                            </div>
                                            <h4> Pet Care </h4>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a href="#" className="category-item">
                                            <div className="cate-img">
                                                <img src={icon10} alt=""/>
                                            </div>
                                            <h4> Meat & Seafood </h4>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a href="#" className="category-item">
                                            <div className="cate-img">
                                                <img src={icon11} alt=""/>
                                            </div>
                                            <h4> Electronics </h4>
                                        </a>
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
                                    <a href="#" className="see-more-btn">See All</a>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <OwlCarousel className="featured-slider owl-theme" loop margin={10} nav>
                                    <div className="item">
                                        <div className="product-item">
                                            <a href="#" className="product-img">
                                                <img src="images/product/img-10.jpg" alt=""/>
                                                <div className="product-absolute-options">
                                                    <span className="offer-badge-1">New</span>
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
                                                <img src="images/product/img-10.jpg" alt=""/>
                                                <div className="product-absolute-options">
                                                    <span className="offer-badge-1">New</span>
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
                                                <img src="images/product/img-9.jpg" alt=""/>
                                                <div className="product-absolute-options">
                                                    <span className="offer-badge-1">New</span>
                                                    <span className="like-icon" title="wishlist"></span>
                                                </div>
                                            </a>
                                            <div className="product-text-dt">
                                                <p>Available<span>(In Stock)</span></p>
                                                <h4>Product Title Here</h4>
                                                <div className="product-price">$10</div>
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
		
	    </div>
            
        {/* Footer */}
        <Footer/>
        </>
    )

}


export default Home;
