import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import axios from "axios"
import axios from "../../api/axios"


const initialwalletState = {
    'wallet':{"credit":0,
              "cashback_balance":0,
              "formatted_modified_date":null},
    'isWalletLoading':true,
}

// const walletUrl = "http://127.0.0.1:8000/api/v0/wallet/"
const walletUrl = "/api/v0/wallet/"

export const getWalletDetails = createAsyncThunk(
    'wallet/getWalletDetails',
    async (name, thunkAPI) =>{
        try{
            const user_id = thunkAPI.getState().user.user.id
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
            const user_id = thunkAPI.getState().user.user.id
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
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getWalletDetails.pending,(state)=>{
            state.isWalletLoading = true
        }).addCase(getWalletDetails.fulfilled,(state,action)=>{
            state.isWalletLoading = false
            state.wallet = action.payload
        }).addCase(getWalletDetails.rejected,(state)=>{
            state.isWalletLoading = false
        }).addCase(addCreditToWallet.pending,(state)=>{
            
        }).addCase(addCreditToWallet.fulfilled,(state)=>{
            state.isWalletLoading = false
        }).addCase(addCreditToWallet.rejected,(state)=>{
            state.isWalletLoading = false
        })
    }
})


export default walletSlice.reducer;