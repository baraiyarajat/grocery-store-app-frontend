import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialProductsByCategoryState = {
    products:[],
    isProductsLoading:true,
}

const warehouseProductListUrl = 'http://127.0.0.1:8000/api/v0/warehouse_products/'

export const getWarehouseProductsByCategory = createAsyncThunk(
    'productsByCategory/getWarehouseProductsByCategory',
    async (categorySlug, thunkAPI) =>{
        try{
            const selected_warehouse_id = thunkAPI.getState().selectedWarehouse.warehouse.warehouse.id
            const resp = await axios.get(warehouseProductListUrl,{ params: { warehouse_id: selected_warehouse_id, category_slug:categorySlug  } })
            return resp.data
        }catch{
             return thunkAPI.rejectWithValue('Not able to fetch products');
        }

    }

)


const productsByCategorySlice = createSlice({
    name:'productsByCategory',
    initialState:initialProductsByCategoryState,
    reducers:{
        sortProducts : (state,action) =>{
            const sortType = action.payload

            if (sortType ==='alphabetical'){
                state.products = state.products.sort((a,b) => (a.product.name > b.product.name) ? 1 : ((b.product.name > a.product.name) ? -1 : 0))
            }else if (sortType === 'price-low-to-high'){
                state.products = state.products.sort((a,b) => (a.get_discounted_price > b.get_discounted_price) ? 1 : ((b.get_discounted_price > a.get_discounted_price) ? -1 : 0))
            }else if (sortType === 'price-high-to-low'){
                state.products = state.products.sort((a,b) => (a.get_discounted_price < b.get_discounted_price) ? 1 : ((b.get_discounted_price < a.get_discounted_price) ? -1 : 0))
            }else if (sortType === 'percentage-off'){
                state.products = state.products.sort((a,b) => (a.discount_rate < b.discount_rate) ? 1 : ((b.discount_rate < a.discount_rate) ? -1 : 0))
            }
        }
    },
    extraReducers:(builder) =>  {
        builder
            .addCase(getWarehouseProductsByCategory.pending, (state) => {
            state.isProductsLoading = true;
      }).addCase(getWarehouseProductsByCategory.fulfilled, (state, action) => {
        state.isProductsLoading = false;
        state.products = action.payload;
      }).addCase(getWarehouseProductsByCategory.rejected, (state)=>{
        state.isProductsLoading = false
      } )
},
})

export const {sortProducts} = productsByCategorySlice.actions;


export default productsByCategorySlice.reducer;