import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axios";

const initialState={
  isLoading:false,
  user:null,
  error:null
}

export const isUserLoggedIn=createAsyncThunk(
  'auth/checkUser',
  async()=>{
    if(localStorage.getItem('user')){
      console.log(localStorage.getItem('user'))
      return JSON.parse(localStorage.getItem('user'))
    }
    else{
      return null
  }}
)

export const registerUser=createAsyncThunk(
  'auth/signup',
  async({name,email,password})=>{
    try{
   const response=await axios.post('user/register',{name,email,password},{headers:{'Content-Type':'application/json'},withCredentials:true})
    return response.data
  }catch(err){
      throw err.response.data
    }
  }
)

export const loginUser=createAsyncThunk(
  'auth/login',
  async({email,password})=>{
    try{
      const response=await axios.post('user/login',{email,password},{headers:{'Content-Type':'application/json'},withCredentials:true})
      localStorage.setItem('user',JSON.stringify(response.data.data))
      return response.data
    }catch(err){
      throw err.response.data
    }
  }
)

export const logout=createAsyncThunk(
  'auth/logout',
  async()=>{
    try{
      const response=await axios.get('user/logout',{withCredentials:true})
      localStorage.removeItem('user')
      return response.data
    }catch(err){
      throw err.response.data
    }
  }
)

export const authSlice=createSlice({
  name:"user",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(registerUser.pending,(state)=>{
        state.error=null
        state.isLoading=true
      })
      .addCase(registerUser.fulfilled,(state,action)=>{
        console.log(action)
        state.isLoading=false
        state.user=action.payload.data
      })
      .addCase(registerUser.rejected,(state,action)=>{
        console.log('rejected',action)
        state.isLoading=false
        state.error=action.error
      })
      .addCase(loginUser.pending,(state)=>{
        state.isLoading=true,
        state.error=null
      })
      .addCase(loginUser.fulfilled,(state,action)=>{
        state.isLoading=false
        state.user=action.payload.data
      })
      .addCase(loginUser.rejected,(state,action)=>{
        state.isLoading=false
        state.error=action.error
        state.name=null
      })
      .addCase(logout.fulfilled,(state)=>{
        state.name=null
      })
      .addCase(isUserLoggedIn.pending,(state)=>{
        state.isLoading=true
      })
      .addCase(isUserLoggedIn.fulfilled,(state,action)=>{
        state.isLoading=false
        state.user=action.payload
      })
  }
})

// export const { }=authSlice.actions

export default authSlice.reducer
