import tokenDecode from "jwt-decode";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialAnonymousCartState = {
    cartItems : [],
    isCartLoading : true,
    cartTotal:0,
    deliveryCharge:3,
    savings:0,
    finalCartTotal:0,
    promoCodeApplied:false,
    promoCode:{}
}


export const addItemToAnonymousCart = createAsyncThunk(
    'anonymousCart/addItemToAnonymousCart',
    async (data, thunkAPI) =>{
        try{
            const isAuthenticated = thunkAPI.getState().auth.isAuthenticated
            if(!isAuthenticated){

                //Add data to cart
                // console.log(data)

                // const cartCookie = localStorage.getItem('cartCookie') || null
                // if(!cartCookie){
                //     console.log("No Cart cookie")
                // }

                return data
            }
        }catch{
            return thunkAPI.rejectWithValue("Not able to add item to anonymous user cart")
        }
    }
)

const anonymousCartSlice = createSlice({
    name:'anonymousCart',
    initialState: initialAnonymousCartState,
    reducers:{},
    extraReducers:(builder)=>{

        builder.addCase(addItemToAnonymousCart.pending,(state)=>{
            state.isCartLoading = true
        }).addCase(addItemToAnonymousCart.fulfilled,(state,action)=>{            
            state.cartItems = [...state.cartItems, action.payload]
            state.isCartLoading = false
        }).addCase(addItemToAnonymousCart.rejected,(state)=>{
            state.isCartLoading = false
        })


    }

})


export default anonymousCartSlice.reducer;