import { createSlice } from "@reduxjs/toolkit";


const initialProductsByCategorySortState = {
    sortOption: "alphabetical",
    isSortOptionLoading : false,
}


const productsByCategorySortSlice = createSlice({
    name:"productsByCategorySortSlice",
    initialState:initialProductsByCategorySortState,
    reducers:{
        setProductsByCategorySortOption : (state,action) =>{
            state.isSortOptionLoading = true
            state.sortOption = action.payload
            state.isSortOptionLoading = false
        }
    }

})


export const {setProductsByCategorySortOption} = productsByCategorySortSlice.actions;
export default productsByCategorySortSlice.reducer;