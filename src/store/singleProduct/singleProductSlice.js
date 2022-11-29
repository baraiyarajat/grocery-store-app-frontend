import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const warehouseProductUrl = 'http://127.0.0.1:8000/api/v0/warehouse_products/'


const initialProductState = {
    singleProduct:{},
    isSingleProductLoading: true
}


export const getSingleProduct = createAsyncThunk(
    'singleProduct/getSingleProduct',
    async (productSlug,thunkAPI)=>{
        try{
            const selectedWarehouseId = thunkAPI.getState().selectedWarehouse.warehouse.warehouse.id
            const getSingleProductUrl = warehouseProductUrl.concat(productSlug)
            const resp = await axios.get(getSingleProductUrl, {params:{'warehouse_id':selectedWarehouseId}})
            return resp.data
        }catch{
            return thunkAPI.rejectWithValue('Not able to product');
        }
    }
)

const singleProductSlice = createSlice({
    name:'singleProduct',
    initialState:initialProductState,
    reducers:{},
    extraReducers:(builder) =>  {
        builder.addCase(getSingleProduct.pending,(state)=>{
            state.isSingleProductLoading = true
        }).addCase(getSingleProduct.fulfilled, (state,action)=>{
            state.isSingleProductLoading = false
            state.singleProduct = action.payload
        }).addCase(getSingleProduct.rejected, (state)=>{
            state.isSingleProductLoading = false
        })
    }  
})


export default singleProductSlice.reducer;