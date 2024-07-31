import React, { useCallback, useState } from 'react'
import Notification from '../components/Notification';

//useToast default position is top-right other values [top-left,top-right,center,bottom-left,bottom-right]
const useToast = (position="top-right") => {
  const [toastProps,setToastProps]=useState(null);
  const closeToast=()=>{
    setToastProps(null)
  }

  //this timmer needs to be cleared so that duration does not persists across other toast
  let timmer;
  //use callback function so that the function is created only once and use from chached memory so it does not create new instances of the funciton every time
   const triggerToast=useCallback((props)=>{
    clearTimeout(timmer)
    setToastProps(props)
    timmer =setTimeout(closeToast,3000)
  },[])

  const toastComp=toastProps?<div className={`${position}`}>
  <Notification {...toastProps} onClick={closeToast}/>
  </div>:null
  return [toastComp,triggerToast]
}

export default useToast
