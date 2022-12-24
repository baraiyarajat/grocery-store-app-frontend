import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";


const initialNewProductsState = {
    newProducts:[],
    freshVegetablesAndFruits:[],
    isNewProductsLoading:true,
    isFreshVegetablesAndFruitsLoading:true
}

const newWarehouseProductListUrl = '/api/v0/warehouse_products/newly-added-products'

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

export const getNewVegetablesAndFruits = createAsyncThunk(
    'newProducts/getNewVegetablesAndFruits',
    async (name, thunkAPI) =>{
        try{
            const selected_warehouse_id = thunkAPI.getState().selectedWarehouse.warehouse.warehouse.id
            const categorySlug = 'vegetables-and-fruits'

            const resp = await axios.get(newWarehouseProductListUrl,{ params: { warehouse_id: selected_warehouse_id, category_slug:categorySlug  } })
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
        builder.addCase(getNewWarehouseProducts.pending, (state) => {
            state.isNewProductsLoading = true;
        }).addCase(getNewWarehouseProducts.fulfilled, (state, action) => {
            state.isNewProductsLoading = false;
            state.newProducts = action.payload;
        }).addCase(getNewWarehouseProducts.rejected, (state)=>{
            state.isNewProductsLoading = false
        }).addCase(getNewVegetablesAndFruits.pending, (state) => {
            state.isFreshVegetablesAndFruitsLoading = true;
        }).addCase(getNewVegetablesAndFruits.fulfilled, (state, action) => {
            state.isFreshVegetablesAndFruitsLoading = false;
            state.freshVegetablesAndFruits = action.payload;
        }).addCase(getNewVegetablesAndFruits.rejected, (state)=>{
            state.isFreshVegetablesAndFruitsLoading = false
        })
},
})



export default newProductsSlice.reducer;