import React from 'react'
import { LuClock3 } from "react-icons/lu";
import Priority from '../utils/Priority';
import { taskPriority } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setMovingItem,  } from '../store/dragNDropSlice';
import { BiEdit } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { deleteActivity,  } from '../store/activitySlice';

const TaskCard = ({task}) => {
  let movingItem=useSelector((state)=>state.dragNDrop.movingItem)
  const dispatch=useDispatch()
  const navigator=useNavigate()
  const handleEdit=()=>{
    navigator('/edit',{state:{task:task}})
  }

  const handleDelete=()=>{
    console.log(task._id)
    dispatch(deleteActivity({id:task._id}))
  }

  const handleDragStart=(e)=>{
    dispatch(setMovingItem(task))
  }

  const handleDragEnd = (e) => {
    dispatch(setMovingItem(null))
    console.log('drag ended',task)
  };

  const handleDragOver=(e)=>{
    e.preventDefault()
  }
 

  return (
    <div draggable  onDragStart={(e)=>handleDragStart(e)} onDragOver={handleDragOver} onDragEnd={handleDragEnd} className={`border-2 rounded-lg border-black p-2 my-2 bg-gray-100 `}>
      <h3 className='text-lg '>{task.title}</h3>
      <p className='break-words text-gray-500'>{task.description}</p>
      {task.priority!=taskPriority.NONE&&<Priority priority={task.priority} />}
      {task.deadline&&<div className='flex items-center mt-2'>
        <LuClock3 />
        <p className='ml-2'>{task.deadline}</p>
      </div>}
      <div className='flex items-center mt-2 mx-2 justify-between'>
        1hr ago
        <div className="flex">
        <BiEdit className="w-5 h-5 mx-2 hover:cursor-pointer" onClick={handleEdit}/>
        <MdDelete className="text-red-500 w-5 h-5 hover:cursor-pointer" onClick={handleDelete}/>
        </div>
      </div>
      {/* <timeCalcuator/> */}
    </div>
  )
}

export default TaskCard
