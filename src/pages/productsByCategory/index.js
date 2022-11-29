import { useParams } from "react-router-dom";
import Navbar from "../includes/Navbar";
import Footer from "../includes/Footer";
import { Link } from "react-router-dom";
import { getCategoryBySlug } from "../../store/category/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getWarehouseProductsByCategory } from "../../store/productsByCategory/productsByCategorySlice";
import { addWishlistProduct, getWishlist, deleteWishlistProduct } from "../../store/wishlist/wishlistSlice";



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

    return(
        <div className="col-lg-3 col-md-6">
            <div className="product-item mb-30">
                <a href="#" className="product-img">
                    <img src="images/product/img-1.jpg" alt=""/>
                    <div className="product-absolute-options">
                        
                        { params.product.discount_rate!==0 && <span className="offer-badge-1">{params.product.discount_rate}% off</span>}
                        {!params.inWishlist && <span className="like-icon " title="wishlist" onClick={(e)=>addToWishlistHandler(e)} ></span>}
                        
                        {params.inWishlist && <span className="like-icon liked" title="wishlist" onClick={(e)=>deleteFromWishlistHandler(e)}></span>}
                        
                    </div>
                </a>
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


function ProductsByCategory(){

    const params = useParams();
    const categorySlug = params.categorySlug
    const dispatch = useDispatch()
    const {warehouse} = useSelector((store)=>store.selectedWarehouse)
    const {category, isLoading} = useSelector((store)=>store.category)
    const {products,isProductsLoading} = useSelector((store)=>store.productsByCategory)
    const {wishlistProducts,isWishlistLoading} = useSelector((store)=>store.wishlist)

    useEffect(()=>{
        dispatch(getCategoryBySlug(categorySlug))
        
    },[])


    useEffect(()=>{
        dispatch(getWarehouseProductsByCategory(categorySlug))
    },[warehouse])

    useEffect(()=>{
        dispatch(getWishlist())
    },[warehouse])

    


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
                                            { !isLoading && <li className="breadcrumb-item active" aria-current="page">{category.name}</li>}
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
                                            <h2>{category.name}</h2>
                                        </div>
                                        <a href="#" className="filter-btn pull-bs-canvas-right">Filters</a>
                                        <div className="product-sort">
                                            <div className="ui selection dropdown vchrt-dropdown">
                                                <input name="gender" type="hidden" value="default"/>
                                                <i className="dropdown icon d-icon"></i>
                                                <div className="text">Alphabetical</div>
                                                <div className="menu">
                                                    <div className="item" ><a href="?order=price">Price - Low to High</a></div>
                                                    <div className="item" ><a href="?order=-price">Price - High to Low</a></div>
                                                    <div className="item" ><a href="?order=name">Alphabetical</a></div>
                                                    <div className="item" ><a href="?order=-discount">% Off - High to Low</a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-list-view">
                                { !isLoading && !isProductsLoading && !isWishlistLoading  && <div className="row">
                                    {products.map((product)=>{ 
                                        
                                        const productId = product.id
                                        const wishlistProduct = wishlistProducts.filter((wishlistProduct)=>{
                                            return wishlistProduct.warehouse_product.id === productId 
                                        })[0]
                                        const inWishlist = wishlistProduct && true
                                        
                                        return <ProductItem key={product.id} product={product}  wishlistProduct={wishlistProduct} inWishlist={inWishlist}/>})}
                                </div>}
                            </div>
                        </div>
                    </div>



                </div>
            <Footer/>
        </>
    )
}


export default ProductsByCategory