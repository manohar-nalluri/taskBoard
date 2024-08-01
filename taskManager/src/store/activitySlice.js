import { createAsyncThunk, createSlice, current,  } from "@reduxjs/toolkit";
import axios from "../api/axios";

const arr=["To do","In Progress","Under Review","Completed"]
const user=JSON.parse(localStorage.getItem('user'))
const token=user.accessToken||""
const headers= {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
const initialState = {
  isLoading:false,
    'To do':[],
    'In Progress':[],
    'Under Review':[],
    'Completed':[],
};

export const addActivity=createAsyncThunk(
  'activity/add',
  async({title,status,priority,deadline,description})=>{
    try{
    const response=await axios.post('activity/new',{title,status,priority,deadline,description},{headers,withCredentials:true})
    }catch(err){
      throw err.response.data
    }
  }
)

export const deleteActivity=createAsyncThunk(
  'activity/delete',
  async({id})=>{
    try{
      const response=await axios.delete(`activity/${id}`,{headers,withCredentials:true})
      return response.data
    }catch(err){
      console.log('error',err)
      throw err.response.data
    }
  }
)

export const fetchActivity=createAsyncThunk(
  'activity/fetch',
  async()=>{
    try{
      console.log('fetching data')
      const response=await axios.get('activity/',{headers,withCredentials:true})
      return response.data
      
    }catch(err){
      console.log('error',err)
      throw err.response.data
    }
  }
)

export const updateStatusActivity=createAsyncThunk(
  'activity/updateStatus',
  async({id})=>{
    try{
      let item
      arr.map((category)=>{
        let temp=state[category].find((item)=>item._id==id)
        if(temp){
          item=temp
        }
      })
      const response=await axios.patch(`activity/changestatus/${id}`,{status:item.status},{headers,withCredentials:true})
      console.log(response.data)
      return response.data
    }catch(err){
      throw err.response.data
    }
  }
)

export const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers:{
    moveActivity:(state,action)=>{
      const {id,type}=action.payload
      let item=null
      arr.map((category)=>{
         let temp=state[category].find((item)=>item._id==id)
         if(temp){
           item=temp
         }
      
       })
       if(item.status==type){
        return
       }
       state[item.status]=state[item.status].filter((item)=>item._id!=id)
       state[type].push({...item,status:type})
      
       }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(addActivity.pending,(state)=>{
        state.isLoading=true
        state.error=null
      })
    .addCase(addActivity.fulfilled,(state)=>{
        state.isLoading=false 
      })
    .addCase(addActivity.rejected,(state,action)=>{
        state.isLoading=false
        state.error=action.error
      })
    .addCase(fetchActivity.pending,(state)=>{
        state.isLoading=false
        state.error=false
      })
    .addCase(fetchActivity.fulfilled,(state,action)=>{
        state.isLoading=false
        state["To do"]=action.payload.data.todo["To do"]
        state["In Progress"]=action.payload.data.todo["In Progress"]
        state["Under Review"]=action.payload.data.todo["Under Review"]
        state["Completed"]=action.payload.data.todo["Completed"]
      })
    .addCase(fetchActivity.rejected,(state,action)=>{
        state.isLoading=false
        state.error=action.error
      })
    .addCase(deleteActivity.pending,(state)=>{
        state.isLoading=true
    })
    .addCase(deleteActivity.fulfilled,(state,action)=>{
        state.isLoading=false
        const {status,_id}=action.payload.data
        // console.log(state.status.length)
        // console.log(state["To do"]=[])
        state.status=[{...action.payload.data}]
        // console.log(current(state))
      })
    .addCase(deleteActivity.rejected,(state,action)=>{
        state.isLoading=false
        state.error=action.error
      })
  }
});

export const {removeActivity,updateActivity,changeState,moveActivity}=activitySlice.actions

export default activitySlice.reducer
