import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user/userSlice'
import warehouseReducer from './warehouse/warehouseSlice'
import selectedWarehouseReducer from './warehouse/selectedWarehouseSlice'
import addressReducer from './address/addressSlice'
import productsByCategoryReducer from './productsByCategory/productsByCategorySlice'
import categoryReducer from './category/categorySlice'
import wishlistReducer from './wishlist/wishlistSlice'
import singleProductReducer from './singleProduct/singleProductSlice'


export const store = configureStore({
    reducer:{
        user: userReducer,
        warehouse: warehouseReducer,
        selectedWarehouse: selectedWarehouseReducer,
        address: addressReducer,
        productsByCategory: productsByCategoryReducer,
        category:categoryReducer,
        wishlist:wishlistReducer,
        singleProduct:singleProductReducer,
        
    }
})