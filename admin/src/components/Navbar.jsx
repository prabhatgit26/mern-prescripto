import React, { useContext } from 'react'
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const {aToken, setAToken} = useContext(AdminContext);

    const navigate = useNavigate();
    

    //function and logic for logout button
    const logout = () => {
        navigate('/')
        aToken && setAToken('');    // here token will set empty in state
        aToken && localStorage.removeItem('aToken');    // here token will set empty in localstorage
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 border-b py-3 bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 hover:bg-blue-50 cursor-pointer'>{aToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button onClick={(logout)} className='bg-primary text-white text-sm px-10 py-2 rounded-full hover:bg-blue-500 font-semibold'>Logout</button>
    </div>
  )
}

export default Navbar;
