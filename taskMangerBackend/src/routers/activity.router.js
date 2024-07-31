import express from "express"
import verifyAuth from "../middlewares/auth.middleware.js"
import { createActivity, deleteActivity,getActivities,editActivity,changeStatus  } from "../controllers/activity.controller.js"

const router=express.Router()

router.post('/new',verifyAuth,createActivity)
router.get('/',verifyAuth,getActivities)
router.delete('/:id',verifyAuth,deleteActivity)
router.patch('/edit/:id',verifyAuth,editActivity)
router.patch('/changestatus/:id',verifyAuth,changeStatus)


export const activityRouter=router
