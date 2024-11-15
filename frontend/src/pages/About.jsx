import React from 'react'
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div>

      {/* <div className='text-center text-2xl pt-10 text-gray-500 '>
        <p className='bg-gradient-to-r from-blue-50 to-gray-50'>ABOUT <span className='text-gray-700 font-semibold bg-gradient-to-r from-blue-50 to-gray-50'>US</span></p>
      </div> */}

        <div className="text-center text-lg p-2 pt-10 text-gray-600">
          <p className="relative inline-block bg-gradient-to-r from-gray-50 to-white px-10 py-2 rounded-sm shadow-lg opacity-60">
          <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-gray-300 opacity-20 blur-lg rounded-lg"></span>
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-800">ABOUT</span>
          <span className="ml-2 font-bold text-gray-800">US</span></p>
        </div>


      <div className='my-10 flex flex-col md:flex-row gap-12 items-center justify-center'>
        <img className='w-full md:max-w-[360px] hover:scale-105 transition-all duration-1000' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600 hover:scale-105 transition-all duration-1000'>
          <p>Welcome To Prescripto, Your Trusted Partner In Managing Your Healthcare Needs Conveniently And Efficiently. At Prescripto, We Understand The Challenges Individuals Face When It Comes To Scheduling Doctor Appointments And Managing Their Health Records.</p>
          <p>Prescripto Is Committed To Excellence In Healthcare Technology. We Continuously Strive To Enhance Our Platform, Integrating The Latest Advancements To Improve User Experience And Deliver Superior Service. Whether You're Booking Your First Appointment Or Managing Ongoing Care, Prescripto Is Here To Support You Every Step Of The Way.
          </p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our Vision At Prescripto Is To Create A Seamless Healthcare Experience For Every User. We Aim To Bridge The Gap Between Paffents And Healthcare Providers, Making It Easier For You To Access The Care You Need, When You Need It.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>

        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-gradient-to-r from-blue-50 to-blue-200 hover:text-gray-600 transition-all duration-100 text-gray-600 cursor-pointer'>
          <div className='hover:scale-110 transition-all duration-700'>
            <b>EFFICIENCY :</b>
            <p className='mt-3'>Streamlined Appointment Scheduling That Fits Into Your Busy Lifestyle.</p>
          </div>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-gradient-to-r from-blue-50 to-blue-200 hover:text-gray-600 transition-all duration-300 text-gray-600 cursor-pointer'>
          <div className='hover:scale-110 transition-all duration-700'>
            <b>CONVENIENCE :</b>
            <p className='mt-3'>Access To A Network Of Trusted Healthcare Professionals In Your Area.</p>
          </div>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-gradient-to-r from-blue-50 to-blue-200 hover:text-gray-600 transition-all duration-300 text-gray-600 cursor-pointer'>
          <div className='hover:scale-110 transition-all duration-700'>
            <b>PERSONALIZATION :</b>
            <p className='mt-3'>Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health.</p>
          </div>
        </div>

      </div>
      
    </div>
  )
}

export default About;
