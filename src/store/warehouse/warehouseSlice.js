import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialWarehouseState = {
    warehouses : [],
    isLoading : true
}


const getWarehousesUrl = 'http://127.0.0.1:8000/api/v0/warehouses/'

export const getWarehouses = createAsyncThunk(
    'warehouse/getWarehouses',
    async (name, thunkAPI) =>{
        try{
            const resp = await axios.get(getWarehousesUrl)
            return resp.data
        }catch(error){
            return thunkAPI.rejectWithValue('Not able to fetch warehouses');
        }
        
    }
)


const warehouseSlice = createSlice({
    name:'warehouse',
    initialState:initialWarehouseState,
    reducers:{
        
    },
    extraReducers:(builder) =>  {

        builder
            .addCase(getWarehouses.pending, (state) => {
            state.isLoading = true;
      }).addCase(getWarehouses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.warehouses = action.payload;
      }).addCase(getWarehouses.rejected, (state)=>{
        state.isLoading = false
      } )
    }
})


export default warehouseSlice.reducer;