import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddNewTask from '../components/AddNewTask'
import TaskBoard from '../components/TaskBoard'
import { isUserLoggedIn } from '../store/authSlice'
import { fetchActivity } from '../store/activitySlice'
import { useNavigate } from 'react-router-dom'

const DashBoard = () => {
  const userName=useSelector((state)=>state.auth.user&&state.auth.user.name)
  const isLoading=useSelector((state)=>state.auth.isLoading)
  const navigate=useNavigate()
  console.log(userName)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(isUserLoggedIn())
  },[])

  useEffect(()=>{
    if(!isLoading ){
      if(userName==null){
        navigate('/login')
      }else{
      dispatch(fetchActivity())
      }
    }
  },[isLoading])
  return (
    isLoading?null:<div>
      <div className='flex justify-between'>
      <h1 className='text-4xl font-semibold'>Good Morning, {userName}!</h1>
      <p className='mx-2'>Help</p>
      </div>
      <div className='flex'>
        <h1>search</h1>
        <h1>calender view</h1>
        <AddNewTask text='Create new'/>
      </div>
      <TaskBoard/>
    </div>
  )
}

export default DashBoard
