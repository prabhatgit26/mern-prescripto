import React, { useContext } from 'react'
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';

const Navbar = () => {

    const {aToken, setAToken} = useContext(AdminContext);
    const { token, setToken } = useContext(DoctorContext); 

    const navigate = useNavigate();
    

    //function and logic for logout button
    // Unified logout function for both admin and doctor panels
    const logout = () => {
      if (aToken) {
          setAToken('');
          localStorage.removeItem('aToken'); // Clear admin token from local storage
      }
      
      if (token) {
          setToken('');
          localStorage.removeItem('token'); // Clear doctor token from local storage
      }

      navigate('/'); // Redirect to login page
  }


  return (
    <div className='flex justify-between items-center px-4 sm:px-10 border-b py-3 bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer ' src={assets.admin_logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 bg-gradient-to-r from-blue-500 to-blue-600 text-white cursor-pointer'>{aToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button onClick={(logout)} className='bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm px-10 py-2 rounded-full hover:scale-105 transition-all duration-500 font-semibold'>Logout</button>
    </div>
  )
}

export default Navbar;
