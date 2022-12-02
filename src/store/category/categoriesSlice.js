import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialCategoriesState = {
    categories:[],
    isCategoriesLoading : true
}


const categoriesUrl = "http://127.0.0.1:8000/api/v0/categories/"


export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async (name, thunkAPI) =>{
        try{
            const resp = await axios.get(categoriesUrl)
            return resp.data
            
        }catch{
            return thunkAPI.rejectWithValue('Not able to fetch categories');
        }
    }
)


const categoriesSlice = createSlice({
    name:'categories',
    initialState : initialCategoriesState,
    reducers:{},
    extraReducers:(builder) =>  {
        builder.addCase(getCategories.pending, (state) => {
            state.isCategoriesLoading = true;
        }).addCase(getCategories.fulfilled, (state, action) => {
            state.isCategoriesLoading = false;
            state.categories = action.payload;
        }).addCase(getCategories.rejected, (state)=>{
            state.isCategoriesLoading = false
        })
    }

})



export default categoriesSlice.reducer;