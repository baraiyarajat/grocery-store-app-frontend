import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

//Includes
import Navbar from '../includes/Navbar';
import Footer from '../includes/Footer';


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


import { addCartItem, deleteCartItem, getCartItems } from '../../store/cart/cartSlice';





function CategoryItem(params){
    const category = params.category    
    
    return(
        <div className="item">            
            <Link to={`/products-by-category?name=${category.slug}`} className="category-item">
                <div className="cate-img">
                    <img src={category.image} alt="category_image"/>
                </div>
                <h4>{category.name}</h4>
            </Link>
        </div>
    )
}



function ProductItem(params){

    
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
                <Link to={`/products/${params.product.product.slug}`} className="product-img">
                    <img src={params.product.product.image} width="200" height="200" alt=""/>
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
                    {!params.inCart &&  params.product.stock>0 &&  <button className="btn btn-light" type="button" onClick={(e)=>addToCartHandler(e)}>Add to Cart</button>}
                    {params.inCart &&  params.product.stock>0 &&  <button className="btn btn-light" type="button" onClick={(e)=>deleteFromCartHandler(e)} >Remove from Cart</button>}
                    {params.product.stock===0 &&  <button className="btn btn-light disabled"  disabled={true} type="button">Add to Cart</button>}
                    
                </div>
            </div>
        </div>
    )
}


function _ProductItem({product}){


    const {wishlistProducts, isWishlistLoading} = useSelector((store)=>store.wishlist)

    const wishlistProduct = wishlistProducts.filter((wishlistProduct)=>{
                                            return wishlistProduct.warehouse_product.id === product.id 
                                        })[0]
                                        
    const inWishlist = wishlistProduct && true    

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
                <div className="product-item ">
                    <Link to={`/products/${product.product.slug}`} className="product-img">
                        <img src={product.product.image}  height="300" alt="product_image"/>
                        <div className="product-absolute-options">
                            <span className="offer-badge-1">New</span>
                            {!inWishlist && <span className="like-icon " title="wishlist"  onClick={(e)=>addProductToWishlistHandler(e)}></span>}
                        
                            {inWishlist && <span className="like-icon liked" title="wishlist" onClick={(e)=>deleteProductFromWishlist(e)}></span>}
                        </div>
                    </Link>
                    <div className="product-text-dt">
                        {product.stock>0 && <p>Available<span>(In Stock)</span></p>}
                        {product.stock===0 && <p>Unavailable<span>(Out of Stock)</span></p>}                        
                        <h4>{product.product.name}</h4>
                        
                        {product.discount_rate>0 && <div className="product-price">${product.get_discounted_price}<span>${product.price}</span></div>}
                        {product.discount_rate===0 && <div className="product-price">${product.price}</div>}
                        
                        <div className="qty-cart">
                            <div className="quantity buttons_added">
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
    
    const {isAuthenticated, successMessage} = useSelector((store)=>store.auth)
    const {categories, isCategoriesLoading} = useSelector((store)=>store.categories)
    const {warehouse,isLoading} = useSelector((store)=>store.selectedWarehouse)
    const {newProducts, freshVegetablesAndFruits ,isNewProductsLoading, isFreshVegetablesAndFruitsLoading} = useSelector((store)=>store.newProducts)
    const {featuredProducts, isFeaturedProductsLoading} = useSelector((store)=>store.featuredProducts)
    const {wishlistProducts,isWishlistLoading} = useSelector((store)=>store.wishlist)
    const {cartItems, isCartLoading} = useSelector((store)=>store.cart)   
    
    const dispatch = useDispatch()

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

    // useEffect(()=>{
    //     isAuthenticated && dispatch(getWishlist())
    // },[warehouse, dispatch, isAuthenticated])

    // useEffect(()=>{
    //     isAuthenticated && dispatch(getCartItems())
    // },[warehouse, dispatch, isAuthenticated])

    
    return(
        <>            
            {/* Navbar */}
            <Navbar/>
            
            {/* Home Content */}
            <div className="wrapper">

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
                            
                            
                            {/* <div className="col-md-12">
                                {featuredProducts &&  <OwlCarousel  className="featured-slider owl-theme" loop margin={10} item={5} nav >
                                    {featuredProducts.slice(0,9).map((product)=>{                                                                                                                                               
                                        return <ProductItem key={product.id} product={product}   />
                                    })}
                                </OwlCarousel>}
                            </div> */}
                            
                            <div className="product-list-view">
                                {!isFeaturedProductsLoading  && <div className="row">
                                    {featuredProducts.slice(0,8).map((product)=>{ 
                                        const productId = product.id
                                        const wishlistProduct = wishlistProducts.filter((wishlistProduct)=>{
                                            return wishlistProduct.warehouse_product.id === productId 
                                        })[0]
                                        const inWishlist = wishlistProduct && true
                                        
                                        const cartProduct = cartItems.filter((item)=>{
                                            return item.warehouse_product.id === productId
                                        })[0]

                                        const inCart = cartProduct && true

                                        return <ProductItem key={product.id} product={product} wishlistProduct={wishlistProduct} inWishlist={inWishlist} cartProduct={cartProduct} inCart ={inCart}  />})}                                                                            
                                </div>}
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
                                    {/* <Link to="/products-by-category/vegetables-and-fruits" className="see-more-btn">See All</Link> */}
                                    <Link to="/products-by-category?name=vegetables-and-fruits" className="see-more-btn">See All</Link>
                                </div>
                            </div>

                            {/* <div className="col-md-12">
                                {<OwlCarousel className="featured-slider owl-theme" loop margin={10} item={5} nav>
                                    {freshVegetablesAndFruits.slice(0,9).map((product)=>{                                                                                                                                               
                                        return <ProductItem key={product.id} product={product}   />
                                    })}
                                </OwlCarousel>}
                            </div> */}

                            <div className="product-list-view">
                                {!isFeaturedProductsLoading  && <div className="row">
                                    {freshVegetablesAndFruits.slice(0,8).map((product)=>{ 
                                        
                                        const productId = product.id
                                        const wishlistProduct = wishlistProducts.filter((wishlistProduct)=>{
                                            return wishlistProduct.warehouse_product.id === productId 
                                        })[0]
                                        const inWishlist = wishlistProduct && true
                                        
                                        const cartProduct = cartItems.filter((item)=>{
                                            return item.warehouse_product.id === productId
                                        })[0]

                                        const inCart = cartProduct && true

                                        return <ProductItem key={product.id} product={product} wishlistProduct={wishlistProduct} inWishlist={inWishlist} cartProduct={cartProduct} inCart ={inCart}  />})}                                                                            
                                </div>}
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
                            {/* <div className="col-md-12">
                                {newProducts &&  <OwlCarousel className="featured-slider owl-theme" loop margin={10} item={2} nav >
                                    {newProducts.slice(0,9).map((product)=>{
                                        
                                        return <ProductItem key={product.id} product={product}/>
                                    })}
                                </OwlCarousel>}
                            </div> */}

                            <div className="product-list-view">
                                {!isNewProductsLoading  && <div className="row">
                                    {newProducts.slice(0,8).map((product)=>{ 

                                        const productId = product.id
                                        const wishlistProduct = wishlistProducts.filter((wishlistProduct)=>{
                                            return wishlistProduct.warehouse_product.id === productId 
                                        })[0]
                                        const inWishlist = wishlistProduct && true
                                        
                                        const cartProduct = cartItems.filter((item)=>{
                                            return item.warehouse_product.id === productId
                                        })[0]

                                        const inCart = cartProduct && true


                                        return <ProductItem key={product.id} product={product} wishlistProduct={wishlistProduct} inWishlist={inWishlist} cartProduct={cartProduct} inCart ={inCart}  />})}
                                </div>}
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
