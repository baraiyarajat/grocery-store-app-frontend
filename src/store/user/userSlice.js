import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import axios from "../../api/axios";
import tokenDecode from 'jwt-decode'


const initialUserState = {
    user : "",
    user_id:"",
    isUserLoading : true
}

const accessToken = localStorage.getItem('access_token') || null

if(accessToken){
    const decodedToken = tokenDecode(accessToken)
    initialUserState.user_id = decodedToken.user_id
}

// const accountsUrl = "http://127.0.0.1:8000/accounts/"
const accountsUrl = "/accounts/user"

export const getUserData = createAsyncThunk(
    'user/getUserData',
    async (name,thunkAPI) =>{
        try{
            const resp = await axios.get(`${accountsUrl}`)
            return resp.data
        }catch{
            thunkAPI.rejectWithValue("Not able to fetch user details")
        }
    }
)

const userSlice = createSlice({
    name:'user',
    initialState : initialUserState,
    reducers : {
        // fetchUser : (state, action) =>{
        //     const userId = action.payload;
        //     state.user = {'id':3,
        //     'first_name':'Test',
        //     'last_name':'User',
        //     'email':'test_user@email.com',
        //     'phone_number':9999999999}
        //     state.isAuthenticated = true
        //     state.isLoading = false
        // }
    },
    extraReducers:(builder)=>{
        builder.addCase(getUserData.pending,(state)=>{
            state.isUserLoading = true
        }).addCase(getUserData.fulfilled,(state,action)=>{            
            state.user = action.payload            
            state.user_id = state.user.id
            state.isUserLoading = false
        }).addCase(getUserData.rejected,(state)=>{
            state.isUserLoading = false
        })}
})


// export const {fetchUser}  = userSlice.actions;

export default userSlice.reducer;
