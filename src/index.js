import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


//Store
import {store} from './store/store'
import { Provider } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ToastContainer/>
      <App />
    </React.StrictMode>
  </Provider>
);

