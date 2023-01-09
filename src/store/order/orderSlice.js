import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import axios from "../../api/axios";

const initialOrdersState = {
    orders: [],
    isOrdersLoading: true,
    successMessage : '',
    errorMessage: ''
}

const ordersUrl = "/api/v0/orders/"

export const getOrders = createAsyncThunk(
    'order/getOrders',
    async (name, thunkAPI) =>{
        try{
            const userID = thunkAPI.getState().user.user_id
            const resp = await axios.get(ordersUrl,{params:{"user_id":userID}})
            return resp.data

        }catch{
            return thunkAPI.rejectWithValue("Not able to fetch orders")
        }
    }

)

export const placeOrder = createAsyncThunk(
    'order/placeOrder',
    async(orderDetails, thunkAPI) =>{
        try{
            const user_id = thunkAPI.getState().user.user.id
            const warehouse_id = thunkAPI.getState().selectedWarehouse.warehouse.warehouse.id
            const userOrderDetails = {...orderDetails, "user_id":user_id, "warehouse_id":warehouse_id}
            const placeOrderUrl = `${ordersUrl}place-order`
            const resp = await axios.post(placeOrderUrl, userOrderDetails)
            return resp.data
        }catch{
            return thunkAPI.rejectWithValue("Not able to place order")
        }
    }
)


const orderSlice = createSlice({
    name:"order",
    initialState:initialOrdersState,
    reducers:{        
        clearOrderMessages : (state,action) =>{
            state.errorMessage = ''
            state.successMessage = ''
        }   
    },
    extraReducers:(builder)=>{
        builder.addCase(getOrders.pending,(state)=>{
            state.isOrdersLoading = true
            state.errorMessage = ''
            state.successMessage = ''
        }).addCase(getOrders.fulfilled,(state,action)=>{
            state.isOrdersLoading = false
            state.orders = action.payload
            state.errorMessage = ''
            state.successMessage = ''
        }).addCase(getOrders.rejected,(state)=>{
            state.isOrdersLoading = false
            state.errorMessage = ''
            state.successMessage = ''
        }).addCase(placeOrder.pending,(state)=>{
            state.isOrdersLoading = true
        }).addCase(placeOrder.fulfilled,(state,action)=>{
            state.isOrdersLoading = false
            if (action.payload.success_message!==''){
                state.successMessage = action.payload.success_message
                state.errorMessage = ''
            } else if (action.payload.error_message!=='') {
                state.errorMessage = action.payload.error_message
                state.successMessage = ''
            }
            
        }).addCase(placeOrder.rejected,(state, action)=>{
            state.isOrdersLoading = false
            state.errorMessage = action.payload.error_message
            state.successMessage = ''
            
        })
    }
})


export const {clearOrderMessages} = orderSlice.actions;
export default orderSlice.reducer;