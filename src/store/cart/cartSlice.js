// import axios from "axios";
import axios from "../../api/axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");



const initialCartState = {
    cartItems : [],
    isCartLoading : true,
    cartTotal:0,
    deliveryCharge:3,
    savings:0,
    finalCartTotal:0,
    promoCodeApplied:false,
    promoCode:{}
}

const cartUrl = "/api/v0/cart/"
// const cartUrl = "http://127.0.0.1:8000/api/v0/cart/"
export const getCartItems = createAsyncThunk(
    'cart/getCartItems',
    async (name, thunkAPI) =>{
        try{
            
            
            const userId = thunkAPI.getState().user.user.id
            const selectedWarehouseId = thunkAPI.getState().selectedWarehouse.warehouse.warehouse.id
            
            const resp = await axios.get(cartUrl, {params :{'user_id':userId, 'selected_warehouse_id':selectedWarehouseId}})
            return resp.data

        }catch{
            return thunkAPI.rejectWithValue("Not able to fetch cart items")
        }
    }
)

export const addCartItem = createAsyncThunk(
    'cart/addCartItem',
    async (warehouseProductId, thunkAPI) =>{
        try{
            
            const userId = thunkAPI.getState().user.user.id
            const selectedWarehouseId = thunkAPI.getState().selectedWarehouse.warehouse.warehouse.id
            const addCartProductUrl = `${cartUrl}add`

            const resp = await axios.post(addCartProductUrl, {'user_id':userId, 'warehouse_id':selectedWarehouseId, 'warehouse_product_id':warehouseProductId} )
            return resp.data
        }catch{
            return thunkAPI.rejectWithValue("Not able to add product to cart")
        }
    }
)


export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async(cartItemId, thunkAPI) =>{
        try{
            const deleteCartItemUrl = `${cartUrl}delete/${cartItemId}`
            const resp = await axios.delete(deleteCartItemUrl)
            return resp.data
        }catch{
            return thunkAPI.rejectWithValue("Not able to delete Cart item")
        }
        
    } 
)

export const emptyCart = createAsyncThunk(
    'cart/emptyCart',
    async(name, thunkAPI)=>{
        try{

            const userId = thunkAPI.getState().user.user.id
            const selectedWarehouseId = thunkAPI.getState().selectedWarehouse.warehouse.warehouse.id
            const emptyCartUrl = `${cartUrl}/empty-cart`
            const resp = await axios.post(emptyCartUrl, {'user_id':userId, 'warehouse_id':selectedWarehouseId} )
            return resp.data

            
        }catch{
            return thunkAPI.rejectWithValue("Not able to empty the cart")
        }
    }
)


export const increaseCartItemQuantity = createAsyncThunk(
    'cart/increaseCartItemQuantity',
    async(cartItemId, thunkAPI) =>{
        try{
            const increaseCartItemQuantityUrl = `${cartUrl}increase-quantity`
            const resp = await axios.patch(increaseCartItemQuantityUrl, {"cart_product_id":cartItemId})
            return resp.data
        }catch{
            return thunkAPI.rejectWithValue("Not able to increase cart item quantity")
        }
    }
)

export const decreaseCartItemQuantity = createAsyncThunk(
    'cart/decreaseCartItemQuantity',
    async(cartItemId, thunkAPI) =>{
        try{
            const increaseCartItemQuantityUrl = `${cartUrl}decrease-quantity`
            const resp = await axios.patch(increaseCartItemQuantityUrl, {"cart_product_id":cartItemId})
            return resp.data
        }catch{
            return thunkAPI.rejectWithValue("Not able to decrease cart item quantity")
        }
    }
)

const cartSlice = createSlice({
    name:'cart',
    initialState:initialCartState,
    reducers:{
        setCartTotal:(state,action)=>{
            state.cartTotal = Math.round(state.cartItems.reduce((partialSum,a)=>partialSum+a.warehouse_product.get_discounted_price * a.quantity,0)*100 )/100
        },
        setSavings: (state,action)=>{
            state.savings = Math.round(state.cartItems.reduce((partialSum,a)=>partialSum+a.warehouse_product.price* a.quantity-a.warehouse_product.get_discounted_price* a.quantity,0) * 100) /100 
        },
        setFinalCartTotal: (state,action)=>{
            state.finalCartTotal = state.cartTotal + state.deliveryCharge 
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getCartItems.pending,(state)=>{
            state.isCartLoading = true
        }).addCase(getCartItems.fulfilled,(state,action)=>{
            state.isCartLoading = false
            state.cartItems = action.payload
        }).addCase(getCartItems.rejected,(state)=>{
            state.isCartLoading = false
        }).addCase(deleteCartItem.pending,(state)=>{
            state.isCartLoading = true 
        }).addCase(deleteCartItem.fulfilled,(state,action)=>{
            
            state.cartItems = state.cartItems.filter((item)=>{
                return item.id !== action.payload.cartItemId
            })
            state.isCartLoading = false
        }).addCase(deleteCartItem.rejected,(state)=>{
            state.isCartLoading = false
        }).addCase(increaseCartItemQuantity.pending,(state)=>{
            
        }).addCase(increaseCartItemQuantity.fulfilled,(state,action)=>{
            state.isCartLoading = false
            // state.cartItems = state.cartItems.map((item)=>{
            //     if(item.id===action.payload){
            //         item.quantity+=1
            //     }
            //     return item
            // })

        }).addCase(increaseCartItemQuantity.rejected,(state)=>{
            state.isCartLoading = false
        }).addCase(decreaseCartItemQuantity.pending,(state)=>{
            
        }).addCase(decreaseCartItemQuantity.fulfilled,(state,action)=>{
            state.isCartLoading = false
            // state.cartItems = state.cartItems.map((item)=>{
            //     if(item.id===action.payload){
            //         item.quantity-=1
            //     }
            //     return item
            // })
        }).addCase(decreaseCartItemQuantity.rejected,(state)=>{
            state.isCartLoading = false
        }).addCase(addCartItem.pending,(state)=>{
            state.isCartLoading = true
        }).addCase(addCartItem.fulfilled,(state,action)=>{
            state.isCartLoading = false
        }).addCase(addCartItem.rejected,(state)=>{
            state.isCartLoading = false
        }).addCase(emptyCart.pending,(state)=>{
            state.isCartLoading = true
        }).addCase(emptyCart.fulfilled,(state,action)=>{
            state.isCartLoading = false
            
            
        }).addCase(emptyCart.rejected,(state)=>{
            state.isCartLoading = false
        })
    }

})

export const {setCartTotal, setSavings, setFinalCartTotal} = cartSlice.actions;
export default cartSlice.reducer;