import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialNewProductsState = {
    newProducts:[],
    isNewProductsLoading:true,
}


const newWarehouseProductListUrl = 'http://127.0.0.1:8000/api/v0/warehouse_products/newly-added-products'

export const getNewWarehouseProducts = createAsyncThunk(
    'newProducts/getNewWarehouseProducts',
    async (name, thunkAPI) =>{
        try{
            const selected_warehouse_id = thunkAPI.getState().selectedWarehouse.warehouse.warehouse.id
            
            const resp = await axios.get(newWarehouseProductListUrl,{ params: { warehouse_id: selected_warehouse_id } })
            
            return resp.data
        }catch{
             return thunkAPI.rejectWithValue('Not able to fetch new products');
        }
    }
)


const newProductsSlice = createSlice({
    name:'newProducts',
    initialState:initialNewProductsState,
    reducers:{
    },
    extraReducers:(builder) =>  {
        builder
            .addCase(getNewWarehouseProducts.pending, (state) => {
            state.isNewProductsLoading = true;
      }).addCase(getNewWarehouseProducts.fulfilled, (state, action) => {
        state.isNewProductsLoading = false;
        state.newProducts = action.payload;
      }).addCase(getNewWarehouseProducts.rejected, (state)=>{
        state.isNewProductsLoading = false
      } )
},
})



export default newProductsSlice.reducer;