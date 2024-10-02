import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import commonUrl from './../../../../src/commonUrl/commonUrl'

const initialState = {
    cartItems : [],
    isLoading : false
}

// add to card
export const addtocart = createAsyncThunk('cart/addtocart',
    async({userId, productId, quantity})=>{
        const response = await axios.post(`${commonUrl}/api/shop/cart/add`,{
            userId, productId, quantity
        })
        return response.data
    }
)

//fetch all data by user
export const fetchcartItem = createAsyncThunk('cart/fetchcartItem',
    async({userId})=>{
        const response = await axios.get(`${commonUrl}/api/shop/cart/get/${userId}`,{
            userId
        })
        return response.data
    }
)

//Deleted cart
export const deleteCardItem = createAsyncThunk('cart/DeleteCardItem',
    async({userId, productId})=>{
        const response = await axios.delete(`${commonUrl}/api/shop/cart/${userId}/${productId}`)
        return response.data
    }
)

export const updateCartQuantity = createAsyncThunk('cart/updateCart',
    async({userId, productId, quantity})=>{
        const response = await axios.put(`${commonUrl}/api/shop/cart/update-cart`,{
            userId, productId, quantity
        })
        return response.data
    }
)
const shopingCartSlice = createSlice({
    name : 'shoppingCart',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(addtocart.pending, (state)=>{
            state.isLoading = true
        }).addCase(addtocart.fulfilled , (state, action)=>{
            state.isLoading = false,
            state.cartItems = action.payload.data
        }).addCase(addtocart.rejected, (state)=>{
            state.isLoading = false,
            state.cartItems = []
        }).addCase(updateCartQuantity.pending, (state)=>{ // update
            state.isLoading = true
        }).addCase(updateCartQuantity.fulfilled , (state, action)=>{
            state.isLoading = false,
            state.cartItems = action.payload.data
        }).addCase(updateCartQuantity.rejected, (state)=>{
            state.isLoading = false,
            state.cartItems = []
        }).addCase(fetchcartItem.pending, (state)=>{ // fetch
            state.isLoading = true
        }).addCase(fetchcartItem.fulfilled , (state, action)=>{
            state.isLoading = false,
            state.cartItems = action.payload.data
        }).addCase(fetchcartItem.rejected, (state)=>{
            state.isLoading = false,
            state.cartItems = []
        }).addCase(deleteCardItem.pending, (state)=>{ // Delete
            state.isLoading = true
        }).addCase(deleteCardItem.fulfilled , (state, action)=>{
            state.isLoading = false,
            state.cartItems = action.payload.data
        }).addCase(deleteCardItem.rejected, (state)=>{
            state.isLoading = false,
            state.cartItems = []
        })
    }
})

export default shopingCartSlice.reducer