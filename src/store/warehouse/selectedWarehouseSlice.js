import { createSlice } from "@reduxjs/toolkit"
import axios from "../../api/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

const initialSelectedWarehouseState = {
    warehouse : null,
    isLoading : true
}

// Set Empty Anonymous User Data Cookie in local storage if user is not authenticated
const accessToken = localStorage.getItem('access_token') || null

if(!accessToken){
    const anonymousUserData = localStorage.getItem('anonymousUserData') || null 
    if(!anonymousUserData){        
        localStorage.setItem('anonymousUserData', JSON.stringify({}) )        
    }
    
}



const selectedWarehouseUrl = '/api/v0/warehouses/selected-warehouse'

export const getSelectedWarehouse = createAsyncThunk(
    'selectedWarehouse/getSelectedWarehouse',
    async (name, thunkAPI) =>{               
        try{
            
            //Check if user is logged in
            if(!accessToken){
                
                const anonymousUserData = JSON.parse(localStorage.getItem('anonymousUserData'))
                
                const selectedWarehouse = anonymousUserData.selectedWarehouse || null
                // console.log(`Selected Warehouse: ${selectedWarehouse}`)
                if(selectedWarehouse){
                    return selectedWarehouse
                }else{
                    let userId = thunkAPI.getState().user.user_id
                    let selectedWarehouseId = null 

                    if(thunkAPI.getState().selectedWarehouse.warehouse !== null){
                        selectedWarehouseId = thunkAPI.getState().selectedWarehouse.warehouse.warehouse.id 
                    }
                    const resp = await axios.post(selectedWarehouseUrl, {"user_id":userId, "selected_warehouse_id":selectedWarehouseId})
                    return resp.data
                }
                
            }else{
                let userId = thunkAPI.getState().user.user_id
                let selectedWarehouseId = null 

                if(thunkAPI.getState().selectedWarehouse.warehouse !== null){
                    selectedWarehouseId = thunkAPI.getState().selectedWarehouse.warehouse.warehouse.id 
                }
                const resp = await axios.post(selectedWarehouseUrl, {"user_id":userId, "selected_warehouse_id":selectedWarehouseId})
                return resp.data
            }


            // let userId = thunkAPI.getState().user.user !==""?  thunkAPI.getState().user.user.user.id : null
            // let userId = thunkAPI.getState().user.user_id
            // let selectedWarehouseId = null 

            // if(thunkAPI.getState().selectedWarehouse.warehouse !== null){
            //     selectedWarehouseId = thunkAPI.getState().selectedWarehouse.warehouse.warehouse.id 
            // }
            // const resp = await axios.post(selectedWarehouseUrl, {"user_id":userId, "selected_warehouse_id":selectedWarehouseId})
            // return resp.data
        }catch(error){
            return thunkAPI.rejectWithValue('Not able to fetch selected warehouse');
        }
        
    })


const setSelectedWarehouseUrl='/api/v0/warehouses/selected-warehouse'

export const setSelectedWarehouse = createAsyncThunk(
    'selectedWarehouse/setSelectedWarehouse',
    async (warehouseId, thunkAPI) =>{
        
        const accessToken = localStorage.getItem('access_token') || null

        if(!accessToken){

            let userId = thunkAPI.getState().user.user_id         
            const resp = await axios.post(selectedWarehouseUrl, { "selected_warehouse_id":warehouseId})
            
            return resp.data
            
        }else{

            try{                    
                const userId = thunkAPI.getState().user.user.id
                const resp = await axios.post(setSelectedWarehouseUrl, {"user_id":userId, "selected_warehouse_id":warehouseId})
                return resp.data
            
            
            }catch(error){
                return thunkAPI.rejectWithValue('Not able to fetch selected warehouse');
            }

        }



        
        
    })



const selectedWarehouseSlice = createSlice({
    name : 'selectedWarehouse',
    initialState:initialSelectedWarehouseState,
    reducers:{

    },
    extraReducers:(builder) =>  {
        
        builder.addCase(getSelectedWarehouse.pending, (state) => {
            state.isLoading = true;
      }).addCase(getSelectedWarehouse.fulfilled, (state, action) => {            
            state.warehouse = action.payload;
            
            if(!accessToken){
                //If Selected Warehouse not set
                const anonymousUserData = JSON.parse(localStorage.getItem('anonymousUserData'))
                const selectedWarehouseData = action.payload
                const selectedWarehoseId = selectedWarehouseData.warehouse.id.toString()
                const currentCart = anonymousUserData.cart || null 
                if(currentCart){
                    localStorage.setItem('anonymousUserData',JSON.stringify({...anonymousUserData, 'selectedWarehouse':action.payload })  )
                }else{
                    localStorage.setItem('anonymousUserData',JSON.stringify({...anonymousUserData, 'selectedWarehouse':action.payload, 'cart':{}})  )
                }

                const currentWishlist = anonymousUserData.wishlist || null 
                if(currentWishlist){
                    localStorage.setItem('anonymousUserData',JSON.stringify({...anonymousUserData, 'selectedWarehouse':action.payload })  )
                }else{
                    localStorage.setItem('anonymousUserData',JSON.stringify({...anonymousUserData, 'selectedWarehouse':action.payload, 'wishlist':{}})  )
                }
                
            }
                    
            state.isLoading = false;


            
      }).addCase(getSelectedWarehouse.rejected, (state)=>{
            state.isLoading = false
      } ).addCase(setSelectedWarehouse.pending, (state) => {
            // state.isLoading = true;
      }).addCase(setSelectedWarehouse.fulfilled, (state,action) => {           
            state.warehouse = action.payload;
            const accessToken = localStorage.getItem('access_token') || null
            if(!accessToken){
                const anonymousUserData =  JSON.parse(localStorage.getItem('anonymousUserData'))
                localStorage.setItem('anonymousUserData',JSON.stringify({...anonymousUserData, 'selectedWarehouse':action.payload}))
            }

           state.isLoading = false;
      }).addCase(setSelectedWarehouse.rejected, (state)=>{
            state.isLoading = false
      } )



    }
})


export default selectedWarehouseSlice.reducer;