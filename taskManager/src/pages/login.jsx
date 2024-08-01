import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'

const login = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigator=useNavigate()
  const allAreEmpty=email===''||password===''
  const isLoading=useSelector((state)=>state.auth.isLoading)
  const user=useSelector((state)=>state.auth.user)
  const dispatch=useDispatch()
  const handleLogin=(e)=>{
    e.preventDefault()
    if(allAreEmpty||isLoading){
      return
    }
    dispatch(loginUser({email,password}))
  }
  useEffect(()=>{
    if(user){
      navigator('/')
    }
  },[user])

  return (
    <div className="flex justify-center items-center h-screen">
    <div className='border-2  border-black p-4 w-1/3 max-w-sm flex flex-col '>
      <h1 className='text-3xl font-semibold'>Welcome to Workflo</h1>
      <form className='flex flex-col' onSubmit={handleLogin}>
        <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="luffy@kaizoku.com" className='my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'/>
        <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="meat" className='my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'/>
        <button type='submit' className={`w-full text-white bg-violet-900 ${allAreEmpty?'opacity-50':''}  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>submit</button>
      </form>
      <p className="flex text-sm font-light text-gray-500 ">Don't have an account? <div onClick={()=>navigator('/signup')} className="font-medium text-primary-600 hover:underline hover:cursor-pointer ">Signup here</div></p>
    </div>
    </div>
  )
}

export default login
