import React from 'react'
import TaskCard from './TaskCard'
import AddNewTask from './AddNewTask'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineSort } from "react-icons/md";
import { moveActivity } from '../store/activitySlice';
const Task = ({type}) => {
  const taskItems=useSelector((state)=>state.todo[type])
  const movingItem=useSelector((state)=>state.dragNDrop.movingItem)
  const dispatch=useDispatch()
  const handleDragEnter=(e)=>{
    dispatch(moveActivity({id:movingItem._id,type:type}))
    
  }
  return (
    <div className='flex flex-col w-1/4 mx-2 ' onDragEnter={(e)=>handleDragEnter(e)}>
    <div className='flex justify-between text-lg'>
        <h1>{type}</h1>
        <button className=''><MdOutlineSort /></button>
    </div>
    {taskItems&&taskItems.length>0?taskItems.map((task)=><TaskCard key={task._id} task={task}/>):null}
    <AddNewTask text="Add new" type={type}/>
    </div>
  )
}

export default Task
