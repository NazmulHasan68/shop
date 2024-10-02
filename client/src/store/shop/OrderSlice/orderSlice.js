import axios from "axios"

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import commonUrl from './../../../../src/commonUrl/commonUrl'


const initialState = {
    approvalURL : null,
    isloading : false,
    orderId : null
}
 export const createNewOrder = createAsyncThunk('/order/createNewOrder',
    async(orderDate)=>{
        const response = await axios.post(`${commonUrl}/api/shop/order/create`,orderDate)
        return response.data
    }
 )

const shoppingOrderSlice = createSlice({
    name : 'shopingOrderSlice',
    initialState,
    reducers : {},
    extraReducers : (builder) =>{
        builder.addCase(createNewOrder.pending, (state)=>{
            state.isloading = true

        }).addCase(createNewOrder.fulfilled, (state, action)=>{
            state.isloading = false,
            state.approvalURL = action.payload.approvalURL
            state.orderId = action.payload.orderId
            
        }).addCase(createNewOrder.rejected, (state)=>{
            state.isloading = false,
            state.orderId = null,
            state.approvalURL = null
            
        })
    }
})
export default shoppingOrderSlice.reducer