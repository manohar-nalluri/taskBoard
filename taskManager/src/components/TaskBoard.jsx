import React from 'react'
import Task from './Tasks'

const TaskBoard = () => {
  const status=['To do','In Progress','Under Review','Completed'] 
  return (
    <div className='h-[100vh] w-[100vw] flex '>
      {status.map((task)=><Task key={task} type={task} />)}
    </div>
  )
}

export default TaskBoard
