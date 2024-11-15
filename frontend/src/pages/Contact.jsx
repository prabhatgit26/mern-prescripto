import React from 'react'
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div>

      {/* <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div> */}

        <div className="text-center text-lg p-2 pt-10 text-gray-600">
          <p className="relative inline-block bg-gradient-to-r from-gray-50 to-white px-10 py-2 rounded-sm shadow-lg opacity-60">
          <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-gray-300 opacity-20 blur-lg rounded-lg"></span>
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-800">CONTACT</span>
          <span className="ml-2 font-bold text-gray-800">US</span></p>
        </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-24 mb-28 text-sm'>

        <img className='w-full md:max-w-[360px] hover:scale-105 transition-all duration-1000' src={assets.contact_image} alt="" />

        <div className='flex flex-col justify-center items-start gap-6 hover:scale-105 transition-all duration-700'>
          <p className='font-semibold text-lg text-gray-700'>OUR OFFICE</p>
          <p className='text-gray-500'>54079 Kent Road <br /> Suite 217, Indore, India</p>
          <p className='text-gray-500'>Tel: (+91) 251-8505-88 <br /> Email: prescripto@support.com</p>
          <p className='font-semibold text-lg text-gray-700'>Careers at PRESCRIPTO</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>

      </div>
      
    </div>
  )
}

export default Contact;
