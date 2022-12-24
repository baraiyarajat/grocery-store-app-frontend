import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";


const initialFeaturedProductsState = {
    featuredProducts:[],
    isFeaturedProductsLoading:true,
}

const featuredProductListUrl = '/api/v0/warehouse_products/featured-products'

export const getFeaturedProducts = createAsyncThunk(
    'featuredProducts/getFeaturedProducts',
    async (name, thunkAPI) =>{
        try{
            const selected_warehouse_id = thunkAPI.getState().selectedWarehouse.warehouse.warehouse.id
            
            const resp = await axios.get(featuredProductListUrl,{ params: { warehouse_id: selected_warehouse_id } })
            
            return resp.data
        }catch{
             return thunkAPI.rejectWithValue('Not able to fetch featured products');
        }
    }
)


const featuredProductsSlice = createSlice({
    name:'featuredProducts',
    initialState:initialFeaturedProductsState,
    reducers:{
    },
    extraReducers:(builder) =>  {
        builder.addCase(getFeaturedProducts.pending, (state) => {
            state.isFeaturedProductsLoading = true;
        }).addCase(getFeaturedProducts.fulfilled, (state, action) => {
            state.featuredProducts = action.payload;
            state.isFeaturedProductsLoading = false;
            
            
        }).addCase(getFeaturedProducts.rejected, (state)=>{
            state.isFeaturedProductsLoading = false
        })
},
})



export default featuredProductsSlice.reducer;