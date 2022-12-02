import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";


const initialAddressState = {
    addresses : [],
    isLoading : true
}


const getAddressesUrl = 'http://127.0.0.1:8000/api/v0/addresses/'


export const getAddresses = createAsyncThunk(
    'address/getAddresses',
    async (name, thunkAPI) =>{

        const user_id = thunkAPI.getState().user.user.id
        try{
            const resp = await axios.get(getAddressesUrl,{ params: { user_id: user_id } })
            return resp.data
        }catch(error){
            return thunkAPI.rejectWithValue('Not able to fetch addresses');
        }
        
    }

)


const addressApiUrl = 'http://127.0.0.1:8000/api/v0/addresses/'

export const deleteAddress = createAsyncThunk(
    'address/deleteAddress',
    async (addressId, thunkAPI) =>{
        try{            
            const deleteAddressUrl = addressApiUrl.concat(addressId)
            console.log(deleteAddressUrl)
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
      }).addCase(deleteAddress.fulfilled, (state) => {
            state.isLoading = false;
      }).addCase(deleteAddress.rejected, (state) => {
            state.isLoading = false;
      })
}})


export default addressSlice.reducer;