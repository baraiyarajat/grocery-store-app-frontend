import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

const initialSelectedWarehouseState = {
    warehouse : null,
    isLoading : true
}


const selectedWarehouseUrl = 'http://127.0.0.1:8000/api/v0/warehouses/selected-warehouse'

export const getSelectedWarehouse = createAsyncThunk(
    'selectedWarehouse/getSelectedWarehouse',
    async (name, thunkAPI) =>{
        try{
            const userId = thunkAPI.getState().user.user.id
            
            let selectedWarehouseId = null 

            if(thunkAPI.getState().selectedWarehouse.warehouse !== null){
                selectedWarehouseId = thunkAPI.getState().selectedWarehouse.warehouse.warehouse.id 
            }
            const resp = await axios.post(selectedWarehouseUrl, {"user_id":userId, "selected_warehouse_id":selectedWarehouseId})
            return resp.data
        }catch(error){
            return thunkAPI.rejectWithValue('Not able to fetch selected warehouse');
        }
        
    })



const setSelectedWarehouseUrl='http://127.0.0.1:8000/api/v0/warehouses/selected-warehouse'

export const setSelectedWarehouse = createAsyncThunk(
    'selectedWarehouse/setSelectedWarehouse',
    async (warehouseId, thunkAPI) =>{
        try{
            const userId = thunkAPI.getState().user.user.id
            const resp = await axios.post(setSelectedWarehouseUrl, {"user_id":userId, "selected_warehouse_id":warehouseId})
            return resp.data
        }catch(error){
            return thunkAPI.rejectWithValue('Not able to fetch selected warehouse');
        }
        
    })



const selectedWarehouseSlice = createSlice({
    name : 'selectedWarehouse',
    initialState:initialSelectedWarehouseState,
    reducers:{

    },
    extraReducers:(builder) =>  {
        
        builder.addCase(getSelectedWarehouse.pending, (state) => {
            state.isLoading = true;
      }).addCase(getSelectedWarehouse.fulfilled, (state, action) => {
            state.isLoading = false;
            state.warehouse = action.payload;
      }).addCase(getSelectedWarehouse.rejected, (state)=>{
            state.isLoading = false
      } ).addCase(setSelectedWarehouse.pending, (state) => {
            state.isLoading = true;
      }).addCase(setSelectedWarehouse.fulfilled, (state,action) => {
           state.isLoading = false;
           state.warehouse = action.payload;
      }).addCase(setSelectedWarehouse.rejected, (state)=>{
            state.isLoading = false
      } )



    }
})


export default selectedWarehouseSlice.reducer;