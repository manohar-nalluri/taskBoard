import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../store/authSlice'

const Signup = () => {
  const [userName,setUserName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const allAreEmpty=userName===''||email===''||password===''
  const isLoading=useSelector((state)=>state.auth.isLoading)
  const name=useSelector((state)=>state.auth.name)
  const error=useSelector((state)=>state.auth.error)
  const dispatch=useDispatch()

  const handleSignUp=(e)=>{
    e.preventDefault()
    if(allAreEmpty||isLoading){
      return
    }
    dispatch(registerUser({name:userName,email,password}))
  }

  return (
    <div className='border-2  border-black p-4 w-1/3 max-w-sm flex flex-col '>
      <h1 className='text-3xl font-semibold'>Welcome to Workflo</h1>
      <form className='flex flex-col' onSubmit={(e)=>handleSignUp(e)}>
        <input type='text' value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder="monkey D luffy" className='my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'/>
        <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="luffy@kaizoku.com" className='my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'/>
        <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="meat" className='my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'/>
        <button type='submit' className={`w-full text-white ${allAreEmpty?'opacity-50':''} bg-violet-900  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>submit</button>
      </form>
      <p className="flex my-2 text-sm font-light text-gray-500 ">Already have an account? <p onClick={()=>navigate('/signup')} className="font-medium text-primary-600 hover:underline hover:cursor-pointer">Login here</p></p>
      <h1>{isLoading?'true':'false'}</h1>
      <h1>{name&&name.message}</h1>
      <h1>{error&&error.message}</h1>
    </div>
  )
}

export default Signup
