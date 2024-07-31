import React from 'react'

const Priority = ({priority}) => {
  const priorityColor={
    Urgent:'bg-red-500 shadow-red-500/50',
    Medium:'bg-yellow-500 shadow-yellow-500/50',
    Low:'bg-green-500 shadow-green-500/50',
  }
  
  return (
    <span className={`${priorityColor[priority]} px-2 py-1 rounded-lg text-white my-2`}>{priority}
    </span>
  )
}

export default Priority
