import React from 'react';
// import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Register from './pages/register';
import Error from './pages/error';

// Asset Imports

// Stylesheets
import './assets/vendor/unicons-2.0.1/css/unicons.css';
import './assets/css/style.css';
import './assets/css/responsive.css';
import './assets/css/night-mode.css';
import './assets/css/step-wizard.css';

// Vendor Stylesheets
import './assets/vendor/fontawesome-free/css/all.min.css';
import './assets/vendor/OwlCarousel/assets/owl.carousel.css';
import './assets/vendor/OwlCarousel/assets/owl.theme.default.min.css';
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/semantic/semantic.min.css';

function App() {
  return (<>
    <Router>
      <Routes>
        <Route path='/register' element={<Register/>} ></Route>
        <Route path='*' element={<Error/>} ></Route>
      </Routes>
    </Router>
  </>
  );
}

export default App;
