import { useParams, useSearchParams } from "react-router-dom";
import Navbar from "../includes/Navbar";
import Footer from "../includes/Footer";
import { Link } from "react-router-dom";
import { getCategoryBySlug } from "../../store/category/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getWarehouseProductsByCategory, sortProducts } from "../../store/productsByCategory/productsByCategorySlice";
import { addWishlistProduct, getWishlist, deleteWishlistProduct } from "../../store/wishlist/wishlistSlice";

import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { setProductsByCategorySortOption } from "../../store/productsByCategory/productsByCategorySortSlice";
import { addCartItem, deleteCartItem, getCartItems } from "../../store/cart/cartSlice";
import EmptyProductMessage from "../includes/EmptyProductMessage";

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
                {/* <Link to={`/products/${params.product.product.slug}`} className="product-img"> */}
                <Link to={`/products?name=${params.product.product.slug}`} className="product-img">
                    <img src={params.product.product.image} width="200" height="200" alt=""/>
                    <div className="product-absolute-options">
                        
                        { params.product.discount_rate!==0 && <span className="offer-badge-1">{params.product.discount_rate}% off</span>}
                        {params.isAuthenticated && !params.inWishlist && <span className="like-icon " title="wishlist" onClick={(e)=>addToWishlistHandler(e)} ></span>}
                        
                        {params.isAuthenticated && params.inWishlist && <span className="like-icon liked" title="wishlist" onClick={(e)=>deleteFromWishlistHandler(e)}></span>}
                        
                    </div>
                </Link>
                <div className="product-text-dt">
                    { params.product.stock !==0 &&  <p>Available<span>(In Stock)</span></p>}
                    { params.product.stock ===0 &&  <p>Unavailable<span>(Out of Stock)</span></p>}
                    
                    <Link to={`/products/${params.product.product.slug}`}><h4>{params.product.product.name}</h4></Link>
                    { params.product.discount_rate!==0 &&  <div className="product-price">${params.product.get_discounted_price} <span>${params.product.price}</span></div>}
                    { params.product.discount_rate===0 &&  <div className="product-price">${params.product.price} </div>}
                    {!params.inCart &&  params.product.stock>0 &&  <button className="btn btn-light hover-btn" type="button" onClick={(e)=>addToCartHandler(e)}>Add to Cart</button>}
                    {params.inCart &&  params.product.stock>0 &&  <button className="btn btn-light hover-btn" type="button" onClick={(e)=>deleteFromCartHandler(e)} >Remove from Cart</button>}
                    {params.product.stock===0 &&  <button className="btn btn-light disabled"  disabled={true} type="button">Add to Cart</button>}
                </div>
            </div>
        </div>
    )
}



function ProductsByCategory(){

    const [searchParams, setSearchParams] = useSearchParams();
    // console.log(searchParams.get('productCategory'))
    const params = useParams();
    // const categorySlug = params.categorySlug
    // console.log(params)
    const categorySlug = searchParams.get('name')
    const dispatch = useDispatch()
    const {warehouse} = useSelector((store)=>store.selectedWarehouse)
    const {category, isLoading} = useSelector((store)=>store.category)
    const {products,isProductsLoading} = useSelector((store)=>store.productsByCategory)
    const {wishlistProducts,isWishlistLoading} = useSelector((store)=>store.wishlist)
    const {sortOption, isSortOptionLoading}  = useSelector((store)=>store.productsByCategorySort)
    const {cartItems, isCartLoading} = useSelector((store)=>store.cart)
    const {isAuthenticated} = useSelector((store)=>store.auth)

    useEffect(()=>{
        dispatch(getCategoryBySlug(categorySlug))
        
    },[categorySlug, dispatch])


    useEffect(()=>{
        dispatch(getWarehouseProductsByCategory(categorySlug))
    },[warehouse, category, dispatch, categorySlug])

    // useEffect(()=>{
    //     dispatch(getWishlist())
    // },[warehouse, category, dispatch])


    // useEffect(()=>{
    //     dispatch(getCartItems())
    // },[warehouse, category, dispatch])

    
    const sortOptionsDict = {}
    sortOptionsDict["alphabetical"] = "Alphabetical"
    sortOptionsDict["price-low-to-high"] = "Price - Low to High"
    sortOptionsDict["price-high-to-low"] = "Price - High to Low"
    sortOptionsDict["percentage-off"] = "% Off - High to Low"


    const handleSortOptions = (e) =>{
        dispatch(setProductsByCategorySortOption(e))
        
        
        dispatch(sortProducts(e))
    }


    useEffect(()=>{
        dispatch(sortProducts(sortOption))
    },[products, dispatch])


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


                    {products.length>0 &&  <div className="all-product-grid">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="product-top-dt">
                                        <div className="product-left-title">
                                            <h2>{category.name}</h2>
                                        </div>

                                        {!isSortOptionLoading && <DropdownButton className="product-sort"  variant="secondary" title={sortOptionsDict[sortOption]} onSelect={handleSortOptions}>
                                                    <Dropdown.Item eventKey="alphabetical">Alphabetical</Dropdown.Item>
                                                    <Dropdown.Item eventKey="price-low-to-high">Price - Low to High</Dropdown.Item>
                                                    <Dropdown.Item eventKey="price-high-to-low">Price - High to Low</Dropdown.Item>
                                                    <Dropdown.Item eventKey="percentage-off">% Off - High to Low</Dropdown.Item>
                                        </DropdownButton>}

                                    </div>
                                </div>
                            </div>
                            <div className="product-list-view">
                                { !isLoading && !isProductsLoading   && <div className="row">
                                    {products.map((product)=>{ 
                                        
                                        const productId = product.id
                                        const wishlistProduct = wishlistProducts.filter((wishlistProduct)=>{
                                            return wishlistProduct.warehouse_product.id === productId 
                                        })[0]
                                        const inWishlist = wishlistProduct && true

                                        const cartProduct = cartItems.filter((item)=>{
                                            return item.warehouse_product.id === productId
                                        })[0]

                                        const inCart = cartProduct && true

                                        
                                        return <ProductItem key={product.id} product={product}  wishlistProduct={wishlistProduct} inWishlist={inWishlist} cartProduct={cartProduct} inCart ={inCart} isAuthenticated={isAuthenticated} />})}
                                </div>}
                            </div>
                        </div>
                    </div>}
                    {!isLoading && products.length ===0 && <EmptyProductMessage/> }


                </div>
            <Footer/>
        </>
    )
}


export default ProductsByCategory