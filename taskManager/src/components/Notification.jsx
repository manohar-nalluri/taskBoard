import React from 'react';
import { IoIosClose } from "react-icons/io";
import { CiCircleCheck,CiCircleInfo,CiWarning } from "react-icons/ci";
import { MdErrorOutline } from "react-icons/md";


// these are the hardcoded values for success info warning and error
const types={
  success:{
    icon:<CiCircleCheck/> ,
    color:'bg-green-500 shadow-green-500/50'
  },
  info:{
    icon:<CiCircleInfo/>,
    color:'bg-cyan-500 shadow-cyan-500/50'},
  warning:{
    icon:<CiWarning/>,
    color:'bg-yellow-500 shadow-yellow-500/50'
  },
  error:{
    icon:<MdErrorOutline/>,
    color:'bg-red-500 shadow-red-500/50'
  },
}

const Notification = ({type,message,onClick}) => {
  const config=types[type]
  return (
    <div className={`flex items-center notification shadow-lg ${config.color} rounded-md`}>
      {/* icons based on the notification type */}
      <span className='ml-2 mr-1'>{config.icon}</span>
      {/* message */}
      {message}
      {/* closebtn */}
      <button className='mx-2 text-2xl ' onClick={()=>onClick()}><IoIosClose /></button>
    </div>
  )
}

export default Notification
