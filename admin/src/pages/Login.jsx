import React, { useState } from 'react'
import { assets } from '../assets/assets.js';

const Login = () => {

    const [state, setState] = useState('Admin');


  return (
    <form className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
            <p className='text-2xl font-semibold m-auto'><span className='text-primary'> {state} </span>Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required placeholder='Enter your email ( admin or doctor )'/>
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required placeholder='*************'/>
            </div>
            <button className='w-full text-white bg-primary py-2 rounded-md text-base hover:bg-blue-600'>Login</button>
            {
                state === 'Admin'
                ? <p>Doctor Login? <span className='text-primary underline cursor-pointer font-semibold hover:text-blue-600' onClick={()=>setState('Doctor')}>Click here.</span></p>
                : <p>Admin Login? <span className='text-primary underline cursor-pointer font-semibold hover:text-blue-600' onClick={()=>setState('Admin')}>Click here.</span></p>
            }
        </div>
    </form>
  )
}

export default Login;
