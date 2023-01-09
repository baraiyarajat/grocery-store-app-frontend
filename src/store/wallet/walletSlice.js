import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import axios from "axios"
import axios from "../../api/axios"


const initialwalletState = {
    'wallet':{"credit":0,
              "cashback_balance":0,
              "formatted_modified_date":null},
    'isWalletLoading':true,
    'successMessage':'',
    'errorMessage':''
}


const walletUrl = "/api/v0/wallet/"

export const getWalletDetails = createAsyncThunk(
    'wallet/getWalletDetails',
    async (name, thunkAPI) =>{
        try{
            // const user_id = thunkAPI.getState().user.user.id
            const user_id = thunkAPI.getState().user.user_id
            const getWalletDetailsUrl = `${walletUrl}${user_id}`
            const resp = await axios.get(getWalletDetailsUrl)
            return resp.data
        }catch{
            thunkAPI.rejectWithValue("Not able to fetch wallet details")
        }
    }
)

export const addCreditToWallet = createAsyncThunk(
    'wallet/addCreditToWallet',
    async (cardDetails, thunkAPI) =>{
        try{
            const user_id = thunkAPI.getState().user.user_id
            const addCreditUrl = `${walletUrl}add-credit`
            const resp = await axios.patch(addCreditUrl,{"user_id":user_id,
                                                         "card_details":cardDetails})
            return resp.data
        }catch{
            return thunkAPI("Not able to add credit")
        }

    }
)

const walletSlice = createSlice({
    name:'wallet',
    initialState: initialwalletState,
    reducers:{
        clearMessages : (state, action) =>{
            state.successMessage = ''
            state.errorMessage = ''
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getWalletDetails.pending,(state)=>{
            state.isWalletLoading = true
            state.errorMessage=''
            state.successMessage=''
        }).addCase(getWalletDetails.fulfilled,(state,action)=>{
            state.isWalletLoading = false
            state.wallet = action.payload
            state.errorMessage=''
            state.successMessage=''
        }).addCase(getWalletDetails.rejected,(state)=>{
            state.isWalletLoading = false
            state.errorMessage=''
            state.successMessage=''
        }).addCase(addCreditToWallet.pending,(state)=>{
            state.errorMessage=''
            state.successMessage=''
            
        }).addCase(addCreditToWallet.fulfilled,(state, action)=>{
            state.isWalletLoading = false
            state.errorMessage=''
            state.successMessage=action.payload.success_message
        }).addCase(addCreditToWallet.rejected,(state, action)=>{
            state.isWalletLoading = false
            state.successMessage = ''
            state.errorMessage = action.payload.error_message
        })
    }
})

export const {clearMessages} = walletSlice.actions;
export default walletSlice.reducer;