import React from 'react';
// import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';

// Asset Imports
// Stylesheets
import './assets/vendor/unicons-2.0.1/css/unicons.css';
import './assets/css/style.css';
import './assets/css/responsive.css';
import './assets/css/night-mode.css';
import './assets/css/step-wizard.css';
import './assets/css/cartmodal.css'


// // Vendor Stylesheets
import './assets/vendor/fontawesome-free/css/all.min.css';
// import './assets/vendor/OwlCarousel/assets/owl.carousel.css';
// import './assets/vendor/OwlCarousel/assets/owl.theme.default.min.css';
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/semantic/semantic.min.css';


//Pages
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Error from './pages/error';
import Dashboard from './pages/dashboard';
import Wishlist from './pages/wishlist';
import Orders from './pages/orders';
import Wallet from './pages/wallet';
import Address from './pages/address';
import Checkout from './pages/checkout';

import Rewards from './pages/rewards';
import ProductsByCategory from './pages/productsByCategory';
import SingleProduct from './pages/singleProduct';
import NewProducts from './pages/newProducts';
import FeaturedProducts from './pages/featuredProducts';
import SearchResults from './pages/searchResults';

import RequireAuth from './pages/RequireAuth';
import Logout from './pages/logout';



function App() {

  

  return (<>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path='/register' element={<Register/>} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/logout' element={<Logout/>} ></Route>
        
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/new-products' element={<NewProducts/>}></Route>
        <Route path='/featured-products' element={<FeaturedProducts/>}></Route>
        <Route path='/search-results' element={<SearchResults/>}></Route>        
        <Route path='/products-by-category' element={<ProductsByCategory />} ></Route>        
        <Route path='/products' element={<SingleProduct/>}  ></Route>
        {/* <Route path='/logout' element={<Logout/>} ></Route>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/new-products' element={<NewProducts/>}></Route>
        <Route path='/featured-products' element={<FeaturedProducts/>}></Route>
        <Route path='/search-results' element={<SearchResults/>}></Route>        
        <Route path='/products-by-category' element={<ProductsByCategory />} ></Route>        
        <Route path='/products' element={<SingleProduct/>}  ></Route> */}
        

        {/* Protected Routes */}
        <Route element={<RequireAuth/>}>

          
          {/* <Route path='/' element={<Home/>} ></Route>
          <Route path='/new-products' element={<NewProducts/>}></Route>
          <Route path='/featured-products' element={<FeaturedProducts/>}></Route>
          <Route path='/search-results' element={<SearchResults/>}></Route>        
          <Route path='/products-by-category' element={<ProductsByCategory />} ></Route>        
          <Route path='/products' element={<SingleProduct/>}  ></Route> */}


          <Route path='/dashboard' element={<Dashboard/>} ></Route>
          <Route path='/wishlist' element={<Wishlist/>} ></Route>
          <Route path='/orders' element={<Orders/>} ></Route>
          <Route path='/wallet' element={<Wallet/>} ></Route>
          <Route path='/address' element={<Address/>} ></Route>        
          <Route path='/rewards' element={<Rewards/>} ></Route>
          <Route path='/checkout' element={<Checkout/>}></Route>
        </Route>

        <Route path='*' element={<Error/>} ></Route>
        
      </Routes>
    </Router>
  </>
  );
}

export default App;
