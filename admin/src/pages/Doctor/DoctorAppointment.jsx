import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointment = () => {
  const { token, appointments, getAppointments, completeAppointment,cancelAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token]);

  return (
    <div className="w-full max-w-6xl mx-auto my-5">
      <p className="mb-3 text-lg font-semibold text-gray-700">All Appointments</p>

      <div className="bg-white border rounded-lg shadow-md text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        {/* Header Row */}
        <div className="sticky top-0 z-10 max-sm:hidden bg-gradient-to-r from-gray-50 to to-blue-100  grid grid-cols-[0.5fr_2fr_1fr_3fr_1fr_1fr_1fr] gap-1 py-3 px-6 border-b font-semibold text-gray-600 text-center">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & time</p>
          <p>Fees</p>
          <p>Payment</p>
          <p>Action</p>
        </div>

        {/* Data Rows */}
        {appointments.reverse().map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_3fr_1fr_1fr_1fr] gap-1 items-center text-gray-500 py-5 px-6 border-b hover:bg-gray-50 transition-colors text-center" key={index}>
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2 justify-center mr-10">
              <img className="w-10 h-10 rounded-full object-cover border border-gray-300 hover:scale-110 transition-all duration-500" src={item.userData.image} alt="Patient"/>
              <p className='w-10 text-nowrap font-semibold hover:text-primary hover:scale-105 transition-all duration-500 cursor-pointer'>{item.userData.name}</p>
            </div>

            <p className=' hover:text-primary hover:scale-105 transition-all duration-500 cursor-pointer'>{calculateAge(item.userData.dob)}</p>

            <p className=' hover:text-primary hover:scale-105 transition-all duration-500 cursor-pointer'>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            <p>{currency}{item.amount}</p>

            <div>
              <p
                className={`font-medium ${item.payment ? 'text-green-500 inline border border-green-500 text-xs px-2 rounded-full' : 'text-blue-500 inline border border-primary text-xs px-2 rounded-full'}`}>{item.payment ? 'Online' : 'CASH'}
              </p>
            </div>

            {
              item.cancelled 

              ? <img className=' ml-[40px] w-9 h-9 hover:scale-125 transition-all duration-1000 cursor-pointer hover:rotate-45' src={assets.cancelled} alt="" title='Appointment Cancelled'/>

              : item.isCompleted 

              ? <img className=' ml-[40px] w-10 h-10 hover:scale-125 transition-all duration-1000 cursor-pointer' src={assets.checklist} alt="" title='Appointment Completed'/>

              : <div className="flex gap-3 justify-center">
                  <img className="w-8 h-8 cursor-pointer transition-transform transform hover:scale-105" src={assets.cross} alt="Cancel" onClick={() =>cancelAppointment(item._id)} title='Cancel Now'/>
                  <img className="w-8 h-8 cursor-pointer transition-transform transform hover:scale-105" src={assets.checkmark} alt="Approve" onClick={()=>completeAppointment(item._id)}  title='Complete Now'/>
                </div>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;






