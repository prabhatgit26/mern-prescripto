import React from 'react'
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg px-6 md:px-10 lg:px-20'>

        {/* ------- Left Side ------ */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
            <marquee behavior="slide" direction="up">
                <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight lg:leading-tight md:leading-tight hover:scale-100 translate-all duration-700'>Book Appointment <br /> With Trusted Doctors</p>
            </marquee>
            <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                <img className='w-28' src={assets.group_profiles} alt="" />
                <p>Simply browse through our extensive list of trusted doctors,<br className='hidden sm:block' /> schedule your appointment hassle-free.</p>
            </div>
            <a className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-700 font-semibold hover:bg-gradient-to-r from-blue-100 to-blue-300 hover:text-blue-700' href="#speciality">
                Book appointment <img className='w-3' src={assets.arrow_icon} alt="" />
            </a>
        </div>

        {/* ------- Right Side ------ */}
        <div className='md:w-1/2 relative'>
            <img className='w-full md:absolute bottom-0 h-auto rounded-lg hover:scale-105 hover:-translate-y-2 duration-1000' src={assets.header_img} alt="" />
        </div>       
    </div>
  )
}                   

export default Header;
