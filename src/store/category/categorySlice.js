import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import axios from "../../api/axios";


const initialCategoryState = {
    category:{},
    isLoading: true
}


const getCategoryUrl = "/api/v0/categories/"

export const getCategoryBySlug = createAsyncThunk(
    'category/getCategoryBySlug',
    async (categorySlug, thunkAPI) =>{
        try{            
            const getCategoryBySlugUrl = getCategoryUrl.concat(categorySlug)
            const resp = await axios.get(getCategoryBySlugUrl)
            
            return resp.data
        }catch{
            return thunkAPI.rejectWithValue('Not able to fetch category');
        }
    }

)


const categorySlice = createSlice({
    name : 'category',
    initialState:initialCategoryState,
    reducers : {},
    extraReducers:(builder) =>  {
        builder
            .addCase(getCategoryBySlug.pending, (state) => {
            state.isLoading = true;
      }).addCase(getCategoryBySlug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload;
      }).addCase(getCategoryBySlug.rejected, (state)=>{
        state.isLoading = false
      } )
}

})

export default categorySlice.reducer;