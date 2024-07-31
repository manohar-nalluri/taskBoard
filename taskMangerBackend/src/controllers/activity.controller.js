import { status, taskPriority } from "../constants.js";
import { Activity } from "../models/activity.model.js";
import APIError from "../utils/APIError.js";
import APIResponse from "../utils/APIResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createActivity = asyncHandler(async(req,res)=>{
  const id=req.id
  const {title,status,priority,deadline,description}=req.body 
  console.log('creating an activing why description',description)
  const created=await Activity.create({title,status,priority,deadline,description,userId:id})
  return res.status(200).json(new APIResponse(200,"Activity created Succesfully",created))
})

const getActivities= asyncHandler(async(req,res)=>{
  const id=req.id
  const activits=await Activity.find({userId:id})
  const todoActivities={
    [status.TODO]:activits.filter(activity=>activity.status==status.TODO),
    [status.IN_PROGRESS]:activits.filter(activity=>activity.status==status.IN_PROGRESS),
    [status.UNDER_REVIEW]:activits.filter(activity=>activity.status==status.UNDER_REVIEW),
    [status.COMPLETED]:activits.filter(activity=>activity.status==status.COMPLETED),
  }
  res.status(200).json(new APIResponse(200,"Activities fetched succesfully",{todo:todoActivities,user:req.user.name}))
})

const deleteActivity =asyncHandler(async(req,res)=>{
  const userId=req.id
  const {id}=req.params
  const deleted =await Activity.findOneAndDelete({_id:id,userId})
  if (!deleted) throw new APIError(409,"Document not found for that user")
  res.status(200).json(new APIResponse(200,"Activity deleted successfully",deleted))
})

const editActivity =asyncHandler(async(req,res)=>{
  const userId=req.id
  const {id}=req.params
  const {title,status,priority,deadline,description}=req.body
  const updated=await Activity.findOneAndUpdate({_id:id,userId},{title,status,priority,deadline,description},{new:true})
  if (!updated) throw new APIError(409,"Document not found for that user")
  res.status(200).json(new APIResponse(200,"Activity updated successfully",updated))
})

const changeStatus =asyncHandler(async(req,res)=>{
  const userId=req.id
  const {id}=req.params
  const {status}=req.body
  const updated=await Activity.findOneAndUpdate({_id:id,userId},{status},{new:true})
  if (!updated) throw new APIError(409,"Document not found for that user")
  res.status(200).json(new APIResponse(200,"Status updated successfully",updated))
})

export {createActivity,getActivities,deleteActivity,editActivity,changeStatus}
