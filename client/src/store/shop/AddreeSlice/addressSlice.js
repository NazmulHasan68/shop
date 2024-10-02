import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import commonUrl from './../../../../src/commonUrl/commonUrl'

const initialState = {
    isloading : false,
    addressList : []
}

//add adress
export const addNewAddress = createAsyncThunk('/addressess/addNewAddress',
    async(formdata)=>{
        const response = await axios.post(`${commonUrl}/api/shop/address/add`, formdata)
        return response.data
    }
)

//fetch adress
export const fetchAllAddress = createAsyncThunk('/addressess/fetchAllAddress',
    async(userId)=>{
        const response = await axios.get(`${commonUrl}/api/shop/address/get/${userId}`)
        return response.data
    }
)

//edited adress
export const editAddress = createAsyncThunk('/addressess/editAddress',
    async({userId, addressId, formdata})=>{
        const response = await axios.put(`${commonUrl}/api/shop/address/update/${userId}/${addressId}`, formdata)
        return response.data
    }
)

//deleted adress
export const deletedAddress = createAsyncThunk('/addressess/deletedAddress',
    async({userId, addressId})=>{
        const response = await axios.delete(`${commonUrl}/api/shop/address/delete/${userId}/${addressId}`)
        return response.data
    }
)

const AddressSlice = createSlice({
    name : 'address',
    initialState ,
    reducers : {},
    extraReducers : (builder) =>{
        builder.addCase(addNewAddress.pending , (state)=>{ // add address
            state.isloading = true
        }).addCase(addNewAddress.fulfilled, (state)=>{
            state.isloading = false
        }).addCase(addNewAddress.rejected, (state)=>{
            state.isloading = false
        }).addCase(fetchAllAddress.pending , (state)=>{ // fetch address
            state.isloading = true
        }).addCase(fetchAllAddress.fulfilled, (state, action)=>{
            state.isloading = false,
            state.addressList = action.payload.data
        }).addCase(fetchAllAddress.rejected, (state)=>{
            state.isloading = false,
            state.addressList = []
        }).addCase(editAddress.pending , (state)=>{ // edit address
            state.isloading = true
        }).addCase(editAddress.fulfilled, (state, action)=>{
            state.isloading = false,
            state.addressList = action.payload
        }).addCase(editAddress.rejected, (state)=>{
            state.isloading = false,
            state.addressList = []
        }).addCase(deletedAddress.pending , (state)=>{ // delete address
            state.isloading = true
        }).addCase(deletedAddress.fulfilled, (state, action)=>{
            state.isloading = false,
            state.addressList = action.payload
        }).addCase(deletedAddress.rejected, (state)=>{
            state.isloading = false,
            state.addressList = []
        })
    }
})

export default AddressSlice.reducer