import {createAsyncThunk, createSlice }  from "@reduxjs/toolkit"
import commonUrl from './../../../src/commonUrl/commonUrl'
import axios from "axios"

const initialState ={
    isLoading : false,
    productList : []
}

export const addNewProduct = createAsyncThunk('/products/addnewproduct',
    async (FormData)=>{
        const result = await axios.post(`${commonUrl}/api/admin/product/add`, FormData,{
            headers : {
                "Content-Type" : "application/json"
            }
        })
        return result?.data
    }
)

export const fetchallProducts = createAsyncThunk('/products/fetchallProducts',
    async ()=>{
        const result = await axios.get(`${commonUrl}/api/admin/product/get`, )
        return result?.data
    }
)

export const editproduct = createAsyncThunk('/products/editproduct',
    async ({id, FormData})=>{
        const result = await axios.put(`${commonUrl}/api/admin/product/edit/${id}`, FormData,{
            headers : {
                "Content-Type" : "application/json"
            }
        })
        return result?.data
    }
)

export const deleteProduct = createAsyncThunk('/products/deleteProduct',
    async ({id,FormData})=>{
        console.log(id);
        
        const result = await axios.delete(`${commonUrl}/api/admin/product/delete/${id}`, FormData,{
            headers : {
                "Content-Type" : "application/json"
            }
        })
        return result?.data
    }
)

const AdminProductSlice = createSlice({
    name : 'adminProduct',
    initialState,
    reducers :{},
    extraReducers : (builder)=>{
        builder.addCase(fetchallProducts.pending, (state)=>{
            state.isLoading = true
        }).addCase(fetchallProducts.fulfilled, (state, action)=>{
            state.isLoading = false
            state.productList = action.payload.data
        }).addCase(fetchallProducts.rejected, (state)=>{
            state.isLoading = true
            state.productList =[]
        })
    }

})

export default AdminProductSlice.reducer