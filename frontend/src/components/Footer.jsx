import React from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Footer = () => {

    const navigate = useNavigate();

  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        {/* ------ Left Section ------ */}
        <div>
            <img onClick={()=>navigate('/')} className='mb-5 w-40' src={assets.logo} alt="" />
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Prescripto is dedicated to providing easy access to healthcare. Book appointments with trusted doctors, view upcoming visits, and manage your health—all in one place. Your wellness is our priority.</p>
        </div>

        {/* ------ Center Section ------ */}
        <div>
            <p className='text-xl font-medium mb-5'>EXPLORE US</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Privacy policy</li>
            </ul>
        </div>

        {/* ------ Right Section ------ */}
        <div>
            <p className='text-xl font-medium mb-5'>GET HELP</p>
            <ul className='flex flex-col gap-2 text-gray-600 cursor-pointer'>
                <li>📞+91-251-850-88</li>
                <li>📠+91-251-8505-99</li>
                <li>✉️ prescripto@support.com</li>
            </ul>
        </div>
      </div>

      {/* ------ Copyright Text -------- */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center font-semibold text-gray-600'>Copyright 2024@ Prescripto - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer;
