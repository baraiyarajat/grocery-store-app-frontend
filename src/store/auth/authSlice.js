import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from '../../api/axios'
import tokenDecode from 'jwt-decode'



const initialAuthState = {
    isAuthenticationLoading : true,
    isAuthenticated : false

}


const accessToken = localStorage.getItem('access_token') || null
// const decodedToken = tokenDecode(accessToken)


if(accessToken){
    initialAuthState.isAuthenticated = true
    initialAuthState.isAuthenticationLoading = false
}


export const userLogout = createAsyncThunk(
    'auth/userLogout',
    async (name, thunkAPI) =>{
        try{
            const loggedInUser = thunkAPI.getState().user.user_id
            updateUserDataOnLogout(loggedInUser)
            const logoutDetails = {'refresh_token': localStorage.getItem('refresh_token')}
            const resp = await axios.post('/accounts/logout',logoutDetails)    
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('access_token');
            
            return resp.data
        }catch{
            thunkAPI.rejectWithValue("Not able to Logout")
        }
    }
)

export const authenticateUser = createAsyncThunk(
    'auth/authenticateUser',
    async (loginDetails,thunkAPI)=>{
          try{
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            const resp = await axios.post('/accounts/login',loginDetails);                    
            return resp.data
          }catch{
            return thunkAPI.rejectWithValue("Not able to authenticate user")
          }

    }
)



const  updateUserDataOnAuthentication = async() =>{

    //Update selected warehouse
    const anonymousUserData = JSON.parse(localStorage.getItem('anonymousUserData'))
    const selectedWarehouse = anonymousUserData.selectedWarehouse
    const selectedWarehouseUrl='/api/v0/warehouses/selected-warehouse'
    await axios.post(selectedWarehouseUrl, { user_id:"",  "selected_warehouse_id":selectedWarehouse.warehouse.id})



    //Delete Set Cookie
    localStorage.removeItem('anonymousUserData')
}

const updateUserDataOnLogout = async (loggedInUser)=>{    
    try{
        const selectedWarehouseUrl='/api/v0/warehouses/selected-warehouse'
        const resp = await axios.post(selectedWarehouseUrl, { "user_id":loggedInUser, "selected_warehouse_id":null})        
        const anonymousUserData = localStorage.getItem('anonymousUserData') || null 
        if(!anonymousUserData){                
            localStorage.setItem('anonymousUserData', JSON.stringify({'selectedWarehouse':resp.data}) )        
        }
    }catch{
        
    }
    


    
    
}

const authSlice = createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(authenticateUser.pending,(state)=>{       
            state.isAuthenticationLoading = true
            // state.accessToken = ""
            state.isAuthenticated = false
        }).addCase(authenticateUser.fulfilled,(state,action)=>{            
            state.isAuthenticationLoading = false
            state.isAuthenticated = true
            localStorage.setItem('refresh_token', action.payload.refresh_token);
            localStorage.setItem('access_token', action.payload.access_token);

            //Move local storage items for the authenticated user
            updateUserDataOnAuthentication()


            // state.accessToken = action.payload.access_token
        }).addCase(authenticateUser.rejected,(state)=>{              
            state.isAuthenticationLoading = false
            state.isAuthenticated = false
            // state.accessToken = ""
        }).addCase(userLogout.pending,(state)=>{            
            state.isAuthenticationLoading = true
            // state.accessToken = ""
            state.isAuthenticated = false
        }).addCase(userLogout.fulfilled,(state,action)=>{            
            state.isAuthenticationLoading = false
            state.isAuthenticated = false                       

            // state.accessToken = ""
        }).addCase(userLogout.rejected,(state)=>{            
            // state.isAuthenticationLoading = false
            // state.isAuthenticated = false
            // state.accessToken = ""
        })
    }


})


export default authSlice.reducer;