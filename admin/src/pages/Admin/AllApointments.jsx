import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, adminCancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      {/* <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b  font-semibold text-gray-600 bg-gradient-to-r from-blue-50 to-blue-200'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor Name</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.map((item,index)=>(
          <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-8 px-6 border-b hover:bg-gray-50'>
            <p className='max-sm:hidden'>{index+1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-10 rounded-full' src={item.userData.image} alt="" /><p className='font-semibold'>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img className='w-10 rounded-full bg-gray-200' src={item.docData.image} alt="" /><p className='font-semibold'>{item.docData.name}</p>
            </div>
            <p>{currency}{item.amount}</p>
            {
            item.cancelled
            ? <img className='w-8 hover:scale-125 transition-all duration-1000 cursor-pointer hover:rotate-45' src={assets.cancelled} alt="" title='Appointment Cancelled'/>
            : <img onClick={()=>adminCancelAppointment(item._id)} className='w-8 cursor-pointer hover:scale-125 transition-all duration-500' src={assets.cross} alt="" title='Cancel Appointment'/>
            }

            
          
          </div>
        ))}
        
      </div> */}

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Header Row */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b font-semibold text-gray-600 bg-gradient-to-r from-blue-50 to-blue-200 text-center">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor Name</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Data Rows */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-5 px-6 border-b hover:bg-gray-50 text-center"
          >
            <p className="max-sm:hidden">{index + 1}</p>

            <div className="flex items-center gap-2 justify-center">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={item.userData.image}
                alt="Patient"
              />
              <p className="font-semibold truncate">{item.userData.name}</p>
            </div>

            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            <div className="flex items-center gap-2 justify-center">
              <img
                className="w-10 h-10 rounded-full object-cover bg-gray-200"
                src={item.docData.image}
                alt="Doctor"
              />
              <p className="font-semibold truncate">{item.docData.name}</p>
            </div>

            <p>
              {currency}
              {item.amount}
            </p>

            <div className="flex justify-center items-center">
              {item.cancelled ? (
                <img
                  className="w-8 cursor-pointer hover:scale-125 transition-all duration-500 hover:rotate-45"
                  src={assets.cancelled}
                  alt="Cancelled"
                  title="Appointment Cancelled"
                />
              ) : (
                <img
                  onClick={() => adminCancelAppointment(item._id)}
                  className="w-8 cursor-pointer hover:scale-125 transition-all duration-500"
                  src={assets.cross}
                  alt="Cancel"
                  title="Cancel Appointment"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
