import React from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {

    const navigate = useNavigate();


  return (
    <div className='flex bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg px-6 sm:px-10 lg:px-12 my-20 md:mx-10'>

      {/* ------- Left Side ------- */}
      <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 '>
        <marquee behavior="slide" direction="up">
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white hover:scale-105 hover:-translate-y-2 duration-1000'>
            <p>Book Appointment</p>
            <p className='mt-4'>with 100+ Trusted Doctors</p>
        </div>
        </marquee>
        <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full hover:scale-105 mt-6 transition-all duration-500 hover:bg-gradient-to-r from-blue-100 to-blue-300 hover:text-blue-700'>Create account</button>
      </div>

      {/* ------- Right Side ------- */}
      <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
        <img className='w-full absolute bottom-0 right-0 max-w-md hover:scale-105 hover:-translate-y-2 duration-1000' src={assets.appointment_img} alt="" />
      </div>

    </div>
  )
}

export default Banner;
