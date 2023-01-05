import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialSearchResultsState = {
    searchString:'',
    searchResults:[],
    isSearchResultsLoading:true,
}

const searchResultsUrl = '/api/v0/warehouse_products/search-products'


export const getSearchResults = createAsyncThunk(
    'searchResults/getSearchResults',
    async (searchString, thunkAPI) =>{
        try{
            const selected_warehouse_id = thunkAPI.getState().selectedWarehouse.warehouse.warehouse.id
            
            const resp = await axios.get(searchResultsUrl,{ params: { warehouse_id: selected_warehouse_id, search_string: searchString } })
            
            return resp.data
        }catch{
             return thunkAPI.rejectWithValue('Not able to search products');
        }
    }
)



const searchResultsSlice = createSlice({
    name:'searchResults',
    initialState:initialSearchResultsState,
    reducers:{
        setSearchString : (state, action) =>{
            state.searchString = action.payload
        }
    },
    extraReducers:(builder) =>  {
        builder.addCase(getSearchResults.pending, (state) => {
            state.isSearchResultsLoading = true;
        }).addCase(getSearchResults.fulfilled, (state, action) => {
            state.searchResults = action.payload;
            state.isSearchResultsLoading = false;
            // console.log(state.searchString)
            
            
        }).addCase(getSearchResults.rejected, (state)=>{
            state.isSearchResultsLoading = false
        })
},
})

export const {setSearchString}  = searchResultsSlice.actions;
export default searchResultsSlice.reducer;