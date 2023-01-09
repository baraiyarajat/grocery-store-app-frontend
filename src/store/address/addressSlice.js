import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import axios from "../../api/axios";


const initialAddressState = {
    addresses : [],
    isLoading : true,
    successMessage : '',
    errorMessage : ''
}


const getAddressesUrl = '/api/v0/addresses/'
// const getAddressesUrl = 'http://127.0.0.1:8000/api/v0/addresses/'


export const getAddresses = createAsyncThunk(
    'address/getAddresses',
    async (name, thunkAPI) =>{
        
        
        // const user_id = thunkAPI.getState().user.user.id
        const user_id = thunkAPI.getState().user.user_id
        try{
            const resp = await axios.get(getAddressesUrl,{ params: { user_id: user_id } })
            return resp.data
        }catch(error){
            return thunkAPI.rejectWithValue('Not able to fetch addresses');
        }
        
    }

)


// const addressApiUrl = 'http://127.0.0.1:8000/api/v0/addresses/'
const addressApiUrl = '/api/v0/addresses/'

export const deleteAddress = createAsyncThunk(
    'address/deleteAddress',
    async (addressId, thunkAPI) =>{
        try{            
            const deleteAddressUrl = addressApiUrl.concat(addressId)
            const resp = await axios.delete(deleteAddressUrl)
            return resp.data
        }catch{
            return thunkAPI.rejectWithValue('Not able to delete addresses');
        }

    }
)



const addressSlice = createSlice({
    name:'address',
    initialState:initialAddressState,
    reducers:{
        clearMessages : (state,action) =>{

            state.successMessage = ''
            state.errorMessage = ''
        }
    },
    extraReducers:(builder) =>  {
        builder
            .addCase(getAddresses.pending, (state) => {
            state.isLoading = true;
      }).addCase(getAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = action.payload;
      }).addCase(getAddresses.rejected, (state)=>{
        state.isLoading = false
      } ).addCase(deleteAddress.pending, (state) => {
            state.isLoading = true;
            state.errorMessage = ''
            state.successMessage = ''
      }).addCase(deleteAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMessage = action.payload.success_message
            state.errorMessage = ''
      }).addCase(deleteAddress.rejected, (state,action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.error_message
            state.successMessage = ''
      })
}})

export const {clearMessages} = addressSlice.actions;

export default addressSlice.reducer;