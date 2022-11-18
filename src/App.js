import React from 'react';
// import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';

// Asset Imports
// Stylesheets
import './assets/vendor/unicons-2.0.1/css/unicons.css';
import './assets/css/style.css';
import './assets/css/responsive.css';
import './assets/css/night-mode.css';
import './assets/css/step-wizard.css';

// // Vendor Stylesheets
import './assets/vendor/fontawesome-free/css/all.min.css';
import './assets/vendor/OwlCarousel/assets/owl.carousel.css';
import './assets/vendor/OwlCarousel/assets/owl.theme.default.min.css';
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




function App() {
  return (<>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/register' element={<Register/>} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/dashboard' element={<Dashboard/>} ></Route>
        <Route path='/wishlist' element={<Wishlist/>} ></Route>
        <Route path='/orders' element={<Orders/>} ></Route>
        <Route path='/wallet' element={<Wallet/>} ></Route>
        <Route path='*' element={<Error/>} ></Route>
      </Routes>
    </Router>
  </>
  );
}

export default App;
