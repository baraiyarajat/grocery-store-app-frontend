import React, { useEffect, useState } from "react";
import {Link, useNavigate} from 'react-router-dom';

//Components
import CartSidebar from "./components/CartSidebar";
import SearchModel from "./components/SearchModel";
import CategoryModel from "./components/CategoryModel";


import Dropdown from 'react-bootstrap/Dropdown';


import { getUserData } from "../../store/user/userSlice";
import { getWarehouses } from "../../store/warehouse/warehouseSlice";
import { getSelectedWarehouse, setSelectedWarehouse } from "../../store/warehouse/selectedWarehouseSlice";
import {useDispatch, useSelector} from 'react-redux'
import { getWishlist } from "../../store/wishlist/wishlistSlice";


import { Modal, Button } from "react-bootstrap";
import { getCartItems } from "../../store/cart/cartSlice";
import { getSearchResults, setSearchString } from "../../store/searchResults/searchResultsSlice";
import { toast } from "react-toastify";


function GuestUserItems(){
    
    const currentLocation = window.location.pathname
    const currentSearchParams = window.location.search
    
    
    return(
        <>
            <li>
                <Link to={`/login?next=${currentLocation}${currentSearchParams}`} className="offer-link" ><i className="uil uil-user"></i>Log-in</Link>
                <Link to="/register" className="offer-link"><i className="uil uil-user-plus"></i>Register</Link>
            </li>
        </>
    )

}


function UserAuthenticatedItems({user, isUserLoading, isAuthenticated}){

    const { wishlistProducts, isWishlistLoading } = useSelector((store)=>store.wishlist) 
    const {warehouse} = useSelector((store)=>store.selectedWarehouse)

    const dispatch = useDispatch()


    useEffect(()=>{               
       isAuthenticated && !isUserLoading && dispatch(getWishlist())       
    },[dispatch,isUserLoading,isAuthenticated, warehouse])


    return(
        <>
            <li>
                { <Link to="/wishlist" className="option_links" title="Wishlist"><i className='uil uil-heart icon_wishlist'></i><span className="noti_count1">{wishlistProducts.length}</span></Link>}
            </li>	
            

            <li className="ui dropdown"> 
                <Dropdown className="opts_account btn" >
                    <Dropdown.Toggle  variant="">                        
                        <img src={user.profile_picture} alt=""/>
                        <span className="user__name">{user.first_name} {user.last_name}</span>
                    </Dropdown.Toggle>
                    
                    <Dropdown.Menu  variant="">
                        <Dropdown.Item href="/dashboard" className="btn btn-light item channel_item" variant=""><i className="uil uil-apps icon__1"></i>Dashbaord</Dropdown.Item>								
                        <Dropdown.Item href="/orders" className="btn btn-light item channel_item"><i className="uil uil-box icon__1"></i>My Orders</Dropdown.Item>								
                        <Dropdown.Item href="/wishlist" className="btn btn-light item channel_item"><i className="uil uil-heart icon__1"></i>My Wishlist</Dropdown.Item>								
                        <Dropdown.Item href="/wallet" className="btn btn-light item channel_item"><i className="uil uil-usd-circle icon__1"></i>My Wallet</Dropdown.Item>								
                        <Dropdown.Item href="/address" className="btn btn-light item channel_item"><i className="uil uil-location-point icon__1"></i>My Address</Dropdown.Item>								
                        {/* <Dropdown.Item href="/offers" className="btn btn-light item channel_item"><i className="uil uil-gift icon__1"></i>Offers</Dropdown.Item>								
                        <Dropdown.Item href="/faq" className="btn btn-light item channel_item"><i className="uil uil-info-circle icon__1"></i>Faq</Dropdown.Item>								 */}
                        <Dropdown.Item href="/logout"><i className="uil uil-lock-alt icon__1"></i>Logout</Dropdown.Item>
                        
                    </Dropdown.Menu>
                </Dropdown>
            </li>
        </>
    )

}



function LocationDropDownItem({warehouse, searchString}){

    const dispatch = useDispatch()


    const handleWarehouseChange = async (e) =>{
        e.preventDefault()
        
        await Promise.all(
            [dispatch(setSelectedWarehouse(warehouse.id)),]
        ) 

        return dispatch(getSearchResults(searchString))



    }

    return(
        <Dropdown.Item className="item channel_item" onClick={(e)=>handleWarehouseChange(e)}>
            <i className="uil uil-location-point"></i>
            {warehouse.name}
        </Dropdown.Item>
    )
    

}



function Navbar(){

    //Category Modal 
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const handleCategoryModalClose = () => setShowCategoryModal(false)
    const handleCategoryModalShow = () => setShowCategoryModal(true);

    //Cart Modal
    const [showCartModal, setShowCartModal] = useState(false)
    const handleCartModalClose = () => setShowCartModal(false)
    const handleCartModalShow = () => setShowCartModal(true);

    
    const selectedWarehouse= useSelector((store)=>store.selectedWarehouse)
    const {warehouses, isLoading} = useSelector((state)=>state.warehouse)
    const {cartItems, isCartLoading} = useSelector((state)=>state.cart)
    const {isAuthenticated, successMessage} = useSelector((store)=>store.auth)
    const {user, isUserLoading} = useSelector((store)=>store.user)        
    const {searchString} = useSelector((state)=>state.searchResults)


    const navigate = useNavigate()
    const dispatch = useDispatch();

    const searchForProducts = (e) =>{
        e.preventDefault()
        if(searchString.trim()!==''){
            dispatch(getSearchResults(searchString))
            navigate('/search-results')
        }
    }


    const handleSearchSubmit = (e) =>{
        if(e.key === 'Enter'){
            searchForProducts(e)
        }
    }

    useEffect(()=>{
        
        isAuthenticated && dispatch(getUserData())
    },[isAuthenticated, dispatch])

    
     useEffect(()=>{
        dispatch(getWarehouses())
    },[dispatch])


    useEffect(()=>{
        
        dispatch(getSelectedWarehouse())
    },[dispatch])

    useEffect(()=>{
        const accessToken = localStorage.getItem('access_token') || null
        if(accessToken){
            isAuthenticated && !isUserLoading && dispatch(getCartItems())
        }else{
            
            dispatch(getCartItems())
        }
        
    },[selectedWarehouse,dispatch, isAuthenticated, isUserLoading])

    return (
        <>
            {/* Category Model */}
            <Modal show={showCategoryModal} onHide={handleCategoryModalClose}>
                <CategoryModel showCategoryModal={showCategoryModal} setShowCategoryModal={setShowCategoryModal}/>
            </Modal>
            {/* Search Model*/}
            <SearchModel/>
	

           {/* Cart Sidebar Offset */}
           <Modal  dialogClassName="modal-90w" id="cart-modal" scrollable={true} show={showCartModal} onHide={handleCartModalClose}>                
                <CartSidebar showCartModal={showCartModal} setShowCartModal={setShowCartModal} />
            </Modal>

            


             {/* Header */}
            <header className="header clearfix">
                <div className="top-header-group">
                    <div className="top-header">
                        <div className="res_main_logo">                            
                            <Link to="/" ><img src="/images/dark-logo-1.svg" alt=""/></Link>
                        </div>
                        <div className="main_logo" id="logo">                            
                            <Link to="/" ><img src="/images/logo.svg" alt=""/></Link>
                            <Link to="/" ><img className="logo-inverse" src="/images/dark-logo.svg" alt=""/></Link>
                        </div>
                        
                        <Dropdown  id="dropdown-basic" className="select_location" >
                            <Dropdown.Toggle className="ui inline dropdown loc-title" variant="">
                                <div className="text" >
                                    <i className="uil uil-location-point"></i>                                        
                                        {selectedWarehouse.warehouse && selectedWarehouse.warehouse.warehouse.name}
                                </div>
                            </Dropdown.Toggle>

                            {!isLoading &&  <Dropdown.Menu  variant="">
                                    {warehouses.map((warehouse)=>{
                                            return < LocationDropDownItem key={warehouse.id} warehouse={warehouse} searchString={searchString} />
                                        })}
                            </Dropdown.Menu>}

                        </Dropdown>
                    

                        <div className="search120">
                            <div className="ui search">
                            <div className="ui left icon input swdh10">
                                <input className="prompt srch10" type="text" placeholder="Search for products.." onChange={e => dispatch(setSearchString(e.target.value.trim()))} value={searchString} onKeyDown={(e)=>handleSearchSubmit(e)} />                                
                                <button onClick={searchForProducts} className="btn btn-light" ><i className='uil uil-search-alt icon icon1'></i>  </button>
                                
                            </div>
                                
                            </div>
                        </div>
                        <div className="header_right">
                            <ul>
                                <li>
                                    <Link to="/phone-no" className="offer-link" style={{ pointerEvents : 'none'}}><i className="uil uil-phone-alt"></i>1800-000-000</Link>
                                </li>
                                <li>
                                    <Link to="/offers" className="offer-link" style={{ pointerEvents : 'none'}}><i className="uil uil-gift"></i>Offers</Link>
                                </li>
                                <li>                                    
                                    <Link href="/help" className="offer-link" style={{ pointerEvents: 'none'}}><i className="uil uil-question-circle"></i>Help</Link>
                                </li>                                
                                {isAuthenticated   && <UserAuthenticatedItems user={user} isUserLoading={isUserLoading} isAuthenticated={isAuthenticated} />}
                                {!isAuthenticated && <GuestUserItems/>}
                                
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="sub-header-group">
                    <div className="sub-header">
                        <div className="ui dropdown">                            
                            {/* <Button onClick={handleCategoryModalShow} className="category_drop hover-btn btn" ><i className="uil uil-apps"></i><span className="cate__icon">Select Category</span></Button> */}
                            <a onClick={handleCategoryModalShow} className="category_drop hover-btn" ><i className="uil uil-apps"></i><span className="cate__icon">Select Category</span></a>
                        </div>
                        <nav className="navbar navbar-expand-lg navbar-light py-3">
                            <div className="container-fluid">
                                <button className="navbar-toggler menu_toggle_btn" type="button" data-target="#navbarSupportedContent"><i className="uil uil-bars"></i></button>
                                <div className="collapse navbar-collapse d-flex flex-column flex-lg-row flex-xl-row justify-content-lg-end bg-dark1 p-3 p-lg-0 mt1-5 mt-lg-0 mobileMenu" id="navbarSupportedContent">
                                    <ul className="navbar-nav main_nav align-self-stretch">
                                        {window.location.pathname==="/"  &&<li className="nav-item"><Link to="/" className="nav-link active" title="Home">Home</Link></li>}
                                        {window.location.pathname!=="/"  &&<li className="nav-item"><Link to="/" className="nav-link" title="Home">Home</Link></li>}
                                        {window.location.pathname==="/new-products" &&  <li className="nav-item"><Link to="/new-products" className="nav-link active" title="New Products">New Products</Link></li>}
                                        {window.location.pathname!=="/new-products" &&  <li className="nav-item"><Link to="/new-products" className="nav-link new_item" title="New Products">New Products</Link></li>}
                                        {window.location.pathname==="/featured-products" &&  <li className="nav-item"><Link to="/featured-products" className="nav-link active" title="Featured Products">Featured Products</Link></li>}
                                        {window.location.pathname!=="/featured-products" &&  <li className="nav-item"><Link to="/featured-products" className="nav-link new_item" title="Featured Products">Featured Products</Link></li>}                                        
                                        <li className="nav-item"><Link to='/contact-us' className="nav-link" title="Contact" style={{ pointerEvents : 'none'}}>Contact Us</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        <div className="catey__icon">
                            <Link to="#" className="cate__btn" data-toggle="modal" data-target="#category_model" title="Categories"><i className="uil uil-apps"></i></Link>
                        </div>
                        <div className="header_cart order-1">                            
                            {/* { <Button onClick={handleCartModalShow} className="cart__btn hover-btn btn btn-secondary" ><i className="uil uil-shopping-cart-alt"></i><span>Cart</span><ins>{cartItems.reduce((partialSum,item)=>partialSum + item.quantity,0)}</ins><i className="uil uil-angle-down"></i></Button>} */}
                            { <a onClick={handleCartModalShow} className="cart__btn hover-btn" ><i className="uil uil-shopping-cart-alt"></i><span>Cart</span><ins>{cartItems.reduce((partialSum,item)=>partialSum + item.quantity,0)}</ins><i className="uil uil-angle-down"></i></a>}
                        </div>
                        {/* <div className="search__icon order-1">
                            <Link to="#" className="search__btn hover-btn" data-toggle="modal" data-target="#search_model" title="Search"><i className="uil uil-search"></i></Link>
                        </div> */}
                    </div>
                </div>
            </header>
	
         </>

    

    )
}


export default Navbar;