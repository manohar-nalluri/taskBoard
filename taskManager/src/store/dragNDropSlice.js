import { createSlice } from "@reduxjs/toolkit";

const initialState={
  movingItem:null,
}

export const dragNDropSlice=createSlice({
  name:"dragNDrop",
  initialState,
  reducers:{
    setMovingItem:(state,action)=>{
      console.log(action.payload)
      state.movingItem=action.payload
    },
      }
})

export const {setMovingItem, }=dragNDropSlice.actions

export default dragNDropSlice.reducer
