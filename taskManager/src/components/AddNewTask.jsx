import React from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const AddNewTask = ({text,color,type}) => {
  const navigator=useNavigate()
  const handleNewTask=()=>{
    navigator('/edit',{state:{task:{status:type}}})
  }
  return (
    <button onClick={handleNewTask}className='flex justify-between px-2 items-center text-lg bg-black shadow-lg shadow-gray-500/50 text-white rounded-lg py-1'>
      <h3>{text}</h3>
      <IoIosAddCircle className='mx-2'/>
    </button>
  )
}

export default AddNewTask
