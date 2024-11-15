import React, { useContext, useState, useEffect } from 'react';
import { AdminContext } from '../context/AdminContext.jsx';
import { DoctorContext } from '../context/DoctorContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';


const Login = () => {
  const [state, setState] = useState('Admin');
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { token, setToken } = useContext(DoctorContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });
        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token); // Update React state with token
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    console.log("Current doctor token:", token); // Check token value
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'>
          <span className='text-primary'>{state}</span>Login
        </p>
        <div className='w-full'>
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type='email'
            required
            placeholder='Enter your email ( admin or doctor )'
          />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type='password'
            required
            placeholder='*************'
          />
        </div>
        <button className='w-full text-white bg-primary py-2 rounded-md text-base hover:bg-blue-600'>
          Login
        </button>
        {state === 'Admin' ? (
          <p>
            Doctor Login?{' '}
            <span
              className='text-primary underline cursor-pointer font-semibold hover:text-blue-600'
              onClick={() => setState('Doctor')}
            >
              Click here.
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{' '}
            <span
              className='text-primary underline cursor-pointer font-semibold hover:text-blue-600'
              onClick={() => setState('Admin')}
            >
              Click here.
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;


