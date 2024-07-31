import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import activityReducer from "./activitySlice";
import dragNDropReducer from "./dragNDropSlice"

export const store=configureStore({
  reducer:combineReducers({
    auth:authReducer,
    todo:activityReducer,
    dragNDrop:dragNDropReducer
  })}
);
