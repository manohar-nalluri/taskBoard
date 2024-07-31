import APIError from "../utils/APIError.js";
import  jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

const verifyAuth=asyncHandler(async(req,res,next)=>{
  const cokkie=req.cookies?.accessToken
  if(!cokkie) throw new APIError(401,"unAuthorized access")
  jwt.verify(cokkie,process.env.JWT_SECRET,(err,user)=>{
    if(err){
      throw new APIError(403,err.message)
    }else{
      req.user=user
      console.log(user)
      req.id=user.id
      next()
    }
  })
})

export default verifyAuth

