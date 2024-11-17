import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const MyAppointments = () => {

  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });
      if (data.success) {
        setAppointments(data.appointments.reverse()); // Reverse method to get latest appointments first
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const appointmentStripe = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } });
      if (data.success) {
        window.location.href = data.url; // Redirects to Stripe Checkout
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Payment process failed.");
    }
  };

  const verifyStripePayment = async (appointmentId, sessionId) => {
    try {
      const userId = localStorage.getItem("token");
      const { data } = await axios.post(backendUrl + '/api/user/verifyStripe', {
        appointmentId,
        sessionId,
        success: true,
        userId
      }, { headers: { token } });

      if (data.success) {
        toast.success("Payment verified successfully!");
        setAppointments(prevAppointments => prevAppointments.map(appointment => {
          if (appointment._id === appointmentId) {
            return { ...appointment, payment: true };
          }
          return appointment;
        }));
        getUserAppointments();
        navigate('/my-appointments');
      } else {
        toast.error("Payment verification failed: " + data.message);
      }
    } catch (error) {
      toast.error("Error during payment verification: " + error.message);
    }
  };


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search); // Parse URL parameters
    const sessionId = urlParams.get('session_id'); // Extract Stripe session ID
    const appointmentId = urlParams.get('appointmentId'); // Extract appointment ID
  
    console.log("Parsed URL parameters:");
    console.log("Session ID:", sessionId);  // Log sessionId for debugging
    console.log("Appointment ID:", appointmentId);  // Log appointmentId for debugging
  
    // Check if both sessionId and appointmentId are available
    if (sessionId && appointmentId) {
      console.log("Both sessionId and appointmentId found, proceeding to verify payment.");
      verifyStripePayment(appointmentId, sessionId);
    } else {
      console.log("Either sessionId or appointmentId is missing, fetching appointments instead.");
      getUserAppointments(); // If not, fetch the appointments
    }
  }, [token]); // The effect runs when the 'token' changes



  //------------------------------------------------------------------------------------

  const initPay = (order) => {
    const options = {
      key: import.meta.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } });
      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      toast.error("Razorpay payment initiation failed.");
    }
  };
//---------------------------------------------------------------------------------


  useEffect(() => {
    getUserAppointments();
  }, [token]);

  return (
    <div>
      {/* <p className='pb-3 mt-12 font-medium text-xl border-b'>MY APPOINTMENTS</p> */}
      {/* <p className="mt-12 text-xl font-semibold p-3 text-start text-blue-800 bg-gradient-to-r from-blue-50 via-white to-white py-2 rounded-sm shadow-lg uppercase tracking-wider"> MY APPOINTMENTS</p> */}
      <p className="text-lg text-center text-blue-800 font-normal tracking-wider bg-gradient-to-r from-gray-50 via-white to-white inline-block px-4 py-1.5 shadow-md">MY <span className='ml-1 text-violet-800'>APPOINTMENTS</span></p>
      {/* <p className=" text-xl text-center text-blue-800 font-normal tracking-wide bg-gradient-to-r from-blue-50 via-white to-white inline-block px-4 py-1 shadow-sm">MY <span className='ml-1 font-extrabold'>APPOINTMENTS</span></p> */}
      <hr className='text-blue-500 font-bold mt-5 opacity-30' />
      <div>
        {appointments.map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] mt-3 gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-gradient-to-r from-indigo-100 to-indigo-300' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time :</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              {item.isCompleted && <span className="sm:min-w-48 flex items-center justify-center gap-3 text-center py-2 px-2 border rounded  text-green-600 hover:bg-gradient-to-r from-blue-600 via-green-400 to-indigo-300 hover:border-lime-300 hover:text-white font-semibold hover:font-semibold cursor-pointer transition-all duration-700 hover:shadow-lg ease-in-out relative group" title='Appoitment Completed' > COMPLETED <span className='flex-shrink-0  hover:scale-150 transition-all duration-1000'><img className='w-6 h-6' src={assets.thumb} alt="" /></span> </span>}

              {!item.isCompleted && !item.cancelled && item.payment && <button className='sm:min-w-48 flex items-center justify-center gap-3 text-center py-2 px-2 border rounded text-green-600 font-normal hover:bg-gradient-to-r from-green-600 to-green-900 hover:text-white font-semibold hover:font-semibold transition-all duration-700 hover:shadow-lg ease-in-out relative group' title='Payment Completed' >PAYMENT DONE <span className='flex-shrink-0 hover:scale-125 duration-500'><img className='w-6 h-6' src={assets.security} alt="" /></span> </button>}

              {!item.isCompleted && !item.cancelled && !item.payment && <button onClick={() => appointmentStripe(item._id)} className=" text-gray-500 flex items-center justify-center gap-4 sm:min-w-48 py-2 px-4 border rounded hover:bg-gradient-to-r from-blue-600 to-blue-50 hover:text-white transition-all duration-500 hover:shadow-lg ease-in-out relative group" title='Pay Now' >PAY ONLINE <span className="flex-shrink-0"><img className='w-6 h-6 hover:translate-x-4 duration-1000' src={assets.banking} alt="" /></span> </button>}

              {!item.isCompleted && !item.cancelled && <button onClick={() => cancelAppointment(item._id)} className='text-gray-500 text-center flex items-center justify-center gap-4 sm:min-w-48 py-2 border rounded hover:bg-gradient-to-tr from-yellow-600 to-red-400 hover:text-yellow-200 transition-all duration-500 hover:shadow-lg ease-in-out relative group' title='Cancel Now'>CANCEL NOW <span className="flex-shrink-0"><img className='w-6 h-6 hover:translate-y-3 duration-1000' src={assets.cancel} alt="" /></span> </button>}

              {item.cancelled && <button className='sm:min-w-48 flex items-center justify-center gap-3 py-2 border rounded text-red-600 font-semibold hover:bg-gradient-to-r from-red-600 to-red-800 hover:text-white hover:shadow-lg transition duration-500 ease-in-out relative group' title='Cancelled'> CANCELLED <span className="flex-shrink-0"><img className='w-6 h-6 hover:scale-125 duration-1000' src={assets.cancelledd} alt="" /></span>  </button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
