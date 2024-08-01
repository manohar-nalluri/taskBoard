import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addActivity, editActivity } from '../store/activitySlice'
import { IoIosClose } from "react-icons/io";

const EditTask = () => {
  const location=useLocation()
  const {task}=location.state
  const [title,setTitle]=useState(task.title||"")
  const [description,setDescription]=useState(task.description||"")
  const [status,setStatus]=useState(task.status||"")
  const [priority,setPriority]=useState(task.priority||"None")
  const navigator=useNavigate()
  
 

  const dispatch=useDispatch()
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(title==""||status==""){
      return
    }
    if(task._id){
      dispatch(editActivity({id:task._id,title,status,priority,deadline:'',description}))
      
    }else{
      console.log(description)
    dispatch(addActivity({title,status,priority,deadline:'',description})) 
    }
    setTimeout(()=>{
      navigator('/')
    },1000)
    
  }
  const handleClose=()=>{
    navigator('/')
  }
 
     return (
    <>
    <form onSubmit={handleSubmit} className={` overflow-y-auto shadow-lg bg-gray-100 shadow-gray-500/50 rounded-md flex flex-col `}>
      <IoIosClose onClick={handleClose}className="w-6 h-6 m-2 hover:cursor-pointer" />

      <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Title' className="text-3xl bg-gray-100 !outline-none "/>
      <div className="flex  items-center my-2">
      <label>Status</label>
      <select value={status} onChange={(e)=>setStatus(e.target.value)} name="state" className=" mx-2 outline-none bg-gray-100 text-gray-900 text-sm rounded-lg  block w-full p-2.5"> 
           <option hidden disabled value="">  Not Selected  </option>
          <option value="To do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Under Review">Under Review</option>
          <option value="Completed">Completed</option>
      </select>
      </div>
      <div className='flex items-center my-2'>
      <label>Priority</label>
      <select value={priority} onChange={(e)=>setPriority(e.target.value)} className="bg-gray-100 mx-2 !outline-none  text-gray-900 text-sm rounded-lg block w-full p-2.5">
          <option hidden disabled value="None">  Not Selected  </option>
          <option value="Urgent">Urgent</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
      </select>
      </div>
      <div className="flex items-center my-2">
      <label>Deadline</label>
      <input type="date"  className="bg-gray-100 mx-2 outline-none text-sm text-gray-900 rounded-lg  p-2.5"/>
      </div>
      <div className="flex items-center my-2">
      <label>Description</label>
        <input value={description} onChange={(e)=>setDescription(e.target.value)} type="text" className=" mx-2 !outline-none border border-gray-300 bg-gray-100 text-gray-900 text-sm rounded-lg  block w-full p-2.5"/>
      </div>
      <button className="bg-gray-900 shadow-lg shadow-gray-500/50 text-white rounded-lg py-1">Submit</button>
    </form>
    </>
  ) 
}

export default EditTask
