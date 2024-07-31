import mongoose from "mongoose";
import { status ,taskPriority} from "../constants.js";

const activitySchema=new mongoose.Schema({
  title:{
    type:"String",
    required:true
  },
  status:{
    type:"String",
    enum:[status.TODO,status.IN_PROGRESS,status.UNDER_REVIEW,status.COMPLETED],
    default:status.TODO
  },
  priority:{
    type:"String",
    enum:[taskPriority.URGENT,taskPriority.MEDIUM,taskPriority.LOW,taskPriority.NONE],
    default:taskPriority.NONE
  },
  deadline:{
    type:Date,
  },
  description:{
    type:"String",
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
},{timestamps:true})

activitySchema.methods.checkUser=async(user)=>{
  return this.userId==user
}

export const Activity=mongoose.model('Activity',activitySchema)
