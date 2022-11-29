import { createSlice } from "@reduxjs/toolkit";


const initialUserState = {
    user : {},
    isAuthenticated : false,
    isLoading : true
}



const userSlice = createSlice({
    name:'user',
    initialState : initialUserState,
    reducers : {
        fetchUser : (state, action) =>{
            const userId = action.payload;
            state.user = {'id': 7,
            'first_name':'Test',
            'last_name':'User',
            'email':'test_user@email.com',
            'phone_number':9999999999}
            state.isAuthenticated = true
            state.isLoading = false
        }
    }
})


export const {fetchUser}  = userSlice.actions;

export default userSlice.reducer;
