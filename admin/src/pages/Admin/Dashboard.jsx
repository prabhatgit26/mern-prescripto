// import React from 'react'
// import { useContext } from 'react';
// import { AdminContext } from '../../context/AdminContext';
// import { useEffect } from 'react';
// import { assets } from '../../assets/assets';
// import { AppContext } from '../../context/AppContext';

// const Dashboard = () => {

//   const {aToken, dashData, getDashBoardData, adminCancelAppointment} = useContext(AdminContext);

//   const {slotDateFormat} = useContext(AppContext);

//   useEffect(()=>{
//     if (aToken) {
//       getDashBoardData();
//     }
//   },[aToken])


//   return dashData && (
//     <div className='m-5'>
     
//       <div className='flex flex-wrap gap-3'>

//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-green-100 cursor-pointer hover:scale-105 transition-all duration-700'>
//           <img className='w-14' src={assets.doctor_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
//             <p className='text-gray-400'>Doctors</p>
//           </div>
//         </div>

//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-green-100 cursor-pointer hover:scale-105 transition-all duration-700'>
//           <img className='w-14' src={assets.appointments_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
//             <p className='text-gray-400'>Appointments</p>
//           </div>
//         </div>

//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-green-100 cursor-pointer hover:scale-105 transition-all duration-700'>
//           <img className='w-14' src={assets.patients_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
//             <p className='text-gray-400'>Patients</p>
//           </div>
//         </div>

//       </div>

//       <div className='bg-white'>

//         <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
//           <img src={assets.list_icon} alt="" />
//           <p className='font-semibold'>Latest Bookings</p>
//         </div>

//         <div className='pt-4 border border-t-0'>
//           {dashData.latestAppointments.map((item,index)=>(
//             <div className='flex items-center px-6 py-4 gap-3 hover:bg-gray-100' key={index}>
//               <img className='rounded-full w-10' src={item.docData.image} alt="" />
//               <div className='flex-1 text-sm'>
//                 <p className='text-gray-800 font-medium'>{item.docData.name}</p>
//                 <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
//               </div>
//               {item.isCompleted && (
//                 <img className="w-8 cursor-pointer hover:scale-125 transition-all duration-500" src={assets.checklist} alt="" title="Appointment Completed" /> )}
//               {
//                 item.cancelled
//                 ? <img className='w-8 hover:scale-150 transition-all duration-1000 cursor-pointer hover:rotate-45' src={assets.cancelled} alt="" title='Appointment Cancelled'/>
//                 : <img onClick={()=>adminCancelAppointment(item._id)} className='w-8 cursor-pointer hover:scale-125 transition-all duration-500' src={assets.cross} alt="" title='Cancel Appointment'/>
//                 }
//             </div>
//           ))}
//         </div>

//       </div>

//     </div>
//   )
// }

// export default Dashboard;


//-----------------------------------------------------------


import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const Dashboard = () => {
  const { aToken, dashData, getDashBoardData, adminCancelAppointment } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashBoardData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          {/* Doctor Count Card */}
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-green-100 cursor-pointer hover:scale-105 transition-all duration-700">
            <img className="w-14" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">{dashData.doctors}</p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>
          {/* Appointment Count Card */}
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-green-100 cursor-pointer hover:scale-105 transition-all duration-700">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          {/* Patient Count Card */}
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-green-100 cursor-pointer hover:scale-105 transition-all duration-700">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          {/* Latest Bookings Header */}
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>
          {/* Appointment List */}
          <div className="pt-4 border border-t-0">
            {dashData.latestAppointments.map((item, index) => (
              <div className="flex items-center px-6 py-4 gap-3 hover:bg-gray-100" key={index}>
                {/* Doctor's Profile Image */}
                <img className="rounded-full w-10" src={item.docData.image} alt="" />
                {/* Doctor's Details */}
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.docData.name}</p>
                  <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
                </div>
                {/* Appointment Status Icons */}
                {item.isCompleted ? (
                  <img
                    className="w-9 cursor-pointer hover:scale-125 transition-all duration-500"
                    src={assets.checklist}
                    alt=""
                    title="Appointment Completed"
                  />
                ) : item.cancelled ? (
                  <img
                    className="w-8 hover:scale-125 transition-all duration-1000 cursor-pointer hover:rotate-45"
                    src={assets.cancelled}
                    alt=""
                    title="Appointment Cancelled"
                  />
                ) : (
                  <img
                    onClick={() => adminCancelAppointment(item._id)}
                    className="w-8 cursor-pointer hover:scale-125 transition-all duration-500"
                    src={assets.cross}
                    alt=""
                    title="Cancel Appointment"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
