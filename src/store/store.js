import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user/userSlice'
import warehouseReducer from './warehouse/warehouseSlice'
import selectedWarehouseReducer from './warehouse/selectedWarehouseSlice'
import addressReducer from './address/addressSlice'
import productsByCategoryReducer from './productsByCategory/productsByCategorySlice'
import categoryReducer from './category/categorySlice'
import wishlistReducer from './wishlist/wishlistSlice'
import singleProductReducer from './singleProduct/singleProductSlice'
import categoriesReducer from './category/categoriesSlice'
import productsByCategorySortReducer from "./productsByCategory/productsByCategorySortSlice";
import newProductsReducer from './newProducts/newProductsSlice'
import cartReducer from './cart/cartSlice'
import walletReducer from './wallet/walletSlice'

export const store = configureStore({
    reducer:{
        user: userReducer,
        warehouse: warehouseReducer,
        selectedWarehouse: selectedWarehouseReducer,
        address: addressReducer,
        productsByCategory: productsByCategoryReducer,
        productsByCategorySort: productsByCategorySortReducer,
        newProducts:newProductsReducer,
        category:categoryReducer,
        categories:categoriesReducer,
        wishlist:wishlistReducer,
        singleProduct:singleProductReducer,
        cart:cartReducer,
        wallet:walletReducer,
        
    }
})