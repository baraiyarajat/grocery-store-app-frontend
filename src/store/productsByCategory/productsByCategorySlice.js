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
    reducers:{},
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



export default productsByCategorySlice.reducer;