import { createAsyncThunk, createSlice } from"@reduxjs/toolkit"
import axios from "axios"
import commonUrl from './../../../src/commonUrl/commonUrl'

const initialState ={
    isloading : false,
    productlist : [],
    productDetails : null
}

export const fetchAllFilterProduct = createAsyncThunk(
    "product/fetchAllFilterProduct",
    async ({filerParams, sortParams})=>{
        const query = new URLSearchParams({
            ...filerParams,
            sortBy : sortParams
        })
        const result = await axios.get(`${commonUrl}/api/shop/products/get?${query}`)
        return result?.data
    }
)

export const fetchProductDetails = createAsyncThunk(
    "product/fetchProductDetails",
    async (id)=>{
        const result = await axios.get(`${commonUrl}/api/shop/products/get/${id}`)
        return result?.data
    }
)



const ShopProductSlice = createSlice({
    name : 'ShopingProductSlice',
    initialState,
    reducers : {
        setProductDetails: (state)=>{
            state.productDetails = null
        }
    },
    extraReducers : (builder) =>{
        builder.addCase(fetchAllFilterProduct.pending, (state)=>{
            state.isloading = true
        }).addCase(fetchAllFilterProduct.fulfilled, (state,action)=>{
            state.isloading = false,
            state.productlist = action.payload
        }).addCase(fetchAllFilterProduct.rejected , (state) =>{
            state.isloading = false,
            state.productlist = []
        }).addCase(fetchProductDetails.pending, (state)=>{
            state.isloading = true
        }).addCase(fetchProductDetails.fulfilled, (state,action)=>{
            state.isloading = false,
            state.productDetails = action.payload.data
        }).addCase(fetchProductDetails.rejected , (state) =>{
            state.isloading = false,
            state.productDetails = []
        })
    }
})

export const {setProductDetails} = ShopProductSlice.actions
export default ShopProductSlice.reducer