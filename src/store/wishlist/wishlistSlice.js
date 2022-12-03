import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialWishlistState = {
    wishlistProducts: [],
    isWishlistLoading: true
}

const wishlistUrl = 'http://127.0.0.1:8000/api/v0/wishlist/'

export const getWishlist = createAsyncThunk(
    'wishlist/getWishlist',
    async (name,thunkAPI) =>{
        try{
            
            const userId = thunkAPI.getState().user.user.id
            const selectedWarehouseId = thunkAPI.getState().selectedWarehouse.warehouse.warehouse.id
            const resp = await axios.get(wishlistUrl, {params :{'user_id':userId, 'warehouse_id':selectedWarehouseId}})
            return resp.data

        }catch{
            return thunkAPI.rejectWithValue("Not able to fetch wishlist")
        }
    }
)


export const deleteWishlistProduct = createAsyncThunk(
    'wishlist/deleteWishlistProduct',
    async(wishlist_product_id, thunkAPI) =>{
        try{
            
            const deleteWishlistProductUrl = wishlistUrl.concat(wishlist_product_id)
            const resp = await axios.delete(deleteWishlistProductUrl)
            return (await resp).data
        }catch{
            return thunkAPI.rejectWithValue("Not able to delete wishlist product")
        }
    }
)

const addProductToWishlistUrl = "http://127.0.0.1:8000/api/v0/wishlist/add-product-to-wishlist/"

export const addWishlistProduct = createAsyncThunk(
    'wishlist/addWishlistProduct',
    async(warehouse_product_id,thunkAPI) =>{
        try{
            const userId = thunkAPI.getState().user.user.id
            const resp = await axios.put(addProductToWishlistUrl, {'user_id':userId, 'warehouse_product_id':warehouse_product_id})
            return (await resp).data
        }catch{
            return thunkAPI.rejectWithValue("Not able to add wishlist product")
        }
    }
)


const wishlistSlice = createSlice({
    name:'wishlist',
    initialState:initialWishlistState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getWishlist.pending,(state)=>{
            state.isWishlistLoading = true
        }).addCase(getWishlist.fulfilled,(state,action)=>{
            state.isWishlistLoading = false
            state.wishlistProducts = action.payload
        }).addCase(getWishlist.rejected,(state)=>{
            state.isWishlistLoading = false
        }).addCase(deleteWishlistProduct.pending,(state)=>{
            // state.isWishlistLoading = true
        }).addCase(deleteWishlistProduct.fulfilled, (state,action)=>{
            state.isWishlistLoading = false
            state.wishlistProducts =  state.wishlistProducts.filter((wishlistProduct)=>{ return wishlistProduct.id !==action.payload.wishlist_product_id})
            

        }).addCase(deleteWishlistProduct.rejected, (state)=>{
            state.isWishlistLoading = false
        }).addCase(addWishlistProduct.pending,(state)=>{
            // state.isWishlistLoading = true
        }).addCase(addWishlistProduct.fulfilled,(state,action)=>{
            state.isWishlistLoading = false
            
            let wishlistProductExists = state.wishlistProducts.filter((wishlistProduct)=>{
                return wishlistProduct.id === action.payload.id
            }).length > 0

            if(!wishlistProductExists){
                state.wishlistProducts.push(action.payload)
            }
            
            

        }).addCase(addWishlistProduct.rejected,(state)=>{
            state.isWishlistLoading = false
        })
    }
})


export default wishlistSlice.reducer;