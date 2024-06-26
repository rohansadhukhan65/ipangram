import React, { useContext } from 'react'
import { AppContext } from '../Context'
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
    const  {role} = useContext(AppContext)
  return (
    <div className='w-full flex gap-x-5 justify-end items-center shadow-md py-3 px-5'>
      {/* <div>Home</div> */}
      <div className='cursor-pointer' onClick={()=> navigate('/dashboard')}>All Employees</div>
     {role === 'manager' && <div onClick={()=> navigate('/departments')} className='cursor-pointer'>Departments</div> } 
     <div onClick={()=>{
      localStorage.clear()
      navigate('/')

     }} className='bg-red-500 px-5 rounded-md py-2 cursor-pointer text-white'>Log out</div>
    </div>
  )
}

export default Nav
