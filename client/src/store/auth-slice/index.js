import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import commonUrl from './../../../src/commonUrl/commonUrl'
import axios from 'axios'


const initialState = {
    isAuthentication : false,
    isLoading : true,
    user : null,
}


//register
export const registerUser = createAsyncThunk('/auth/register',
    async(FormData)=>{
        const response = await axios.post(`${commonUrl}/api/auth/register`,
            FormData,{
                withCredentials : true
            })
        return response.data
    }
    
)
//login
export const loginUser = createAsyncThunk('/auth/login',
    async(FormData)=>{
        const response = await axios.post(`${commonUrl}/api/auth/login`,
            FormData,{
                withCredentials : true
            }
        )
        return response.data
    }
)

//check Authentication
export const checkAuth = createAsyncThunk("/auth/checkauth",
    async () => {
        const response = await axios.get(`${commonUrl}api/auth/check-auth`,
            {
                withCredentials:true,
                headers: {
                    'Cache-Control' : 'no-store, no-cache , must-revalidate, proxy-revalidate',
                    Expires : '0'
                }
            }
        )
       return response.data
    }
)

//logiut
export const logOutUser = createAsyncThunk('/auth/logOutUser',
    async()=>{
        const response = await axios.post(`${commonUrl}/api/auth/logout`,{},
            {
                withCredentials : true
            }
        )
        return response.data
    }
)


const authSlice = createSlice({
    name : 'auth',
    initialState ,
    reducers : {
        setUser : (state , action) => {

        }
    },
    extraReducers : (builder) =>{
        builder.addCase(registerUser.pending, (state)=>{  //register user data =======================
            state.isLoading = true
        }).addCase(registerUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.user = null
            state.isAuthentication = false
        }).addCase(registerUser.rejected, (state, action)=>{
            state.isLoading = true;
            state.user = null //action.payload/user
            state.isAuthentication = false
        }).addCase(loginUser.pending, (state)=>{ //login user data ====================================
            state.isLoading = true
        }).addCase(loginUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null
            state.isAuthentication = action.payload.success   
        }).addCase(loginUser.rejected, (state, action)=>{
            state.isLoading = true,
            state.user = null,
            state.isAuthentication = false
        }).addCase(checkAuth.pending, (state)=>{ //Check auth  =========================================
            state.isLoading = true
        }).addCase(checkAuth.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null
            state.isAuthentication = action.payload.success   
        }).addCase(checkAuth.rejected, (state, action)=>{
            state.isLoading = false,
            state.user = null,
            state.isAuthentication = false
        }).addCase(logOutUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.user = null
            state.isAuthentication = false
        })
    }
})

export const {setUser} = authSlice.actions
export default authSlice.reducer