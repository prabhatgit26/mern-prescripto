// import React, { useEffect, useContext } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { assets } from "../../assets/assets";
// import { AppContext } from "../../context/AppContext";

// const DoctorDashboard = () => {
//   const { dToken, docDashdata, getDashboardData, completeAppointment, cancelAppointment } = useContext(DoctorContext);
//   const { currency, slotDateFormat } = useContext(AppContext);

//   useEffect(() => {
//     if (dToken) {
//       getDashboardData();
//     }
//   }, [dToken]);




//   return (
//     docDashdata && (
//       <div className="m-6">
//         <div className="flex flex-wrap gap-6">
//           <div className="flex items-center gap-5 p-6 bg-white min-w-[13rem] rounded-lg border-2 border-gray-100 shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105">
//             <img className="w-16" src={assets.earning_icon} alt="Earnings Icon" />
//             <div>
//               <p className="text-2xl font-semibold text-gray-700">
//                 {currency} {docDashdata.earnings}
//               </p>
//               <p className="text-gray-500">Earnings</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-5 p-6 bg-white min-w-[13rem] rounded-lg border-2 border-gray-100 shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105">
//             <img className="w-16" src={assets.appointments_icon} alt="Appointments Icon" />
//             <div>
//               <p className="text-2xl font-semibold text-gray-700">
//                 {docDashdata.appointments}
//               </p>
//               <p className="text-gray-500">Appointments</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-5 p-6 bg-white min-w-[13rem] rounded-lg border-2 border-gray-100 shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105">
//             <img className="w-16" src={assets.patients_icon} alt="Patients Icon" />
//             <div>
//               <p className="text-2xl font-semibold text-gray-700">
//                 {docDashdata.patients}
//               </p>
//               <p className="text-gray-500">Patients</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white mt-12 rounded-lg shadow-lg overflow-hidden">
//           <div className="flex items-center gap-4 px-6 py-4 bg-gray-50 border-b">
//             <img src={assets.list_icon} alt="List Icon" className="w-6" />
//             <p className="font-semibold text-lg text-gray-700 ">Latest Bookings</p>
//           </div>

//           <div className="divide-y">
//             {docDashdata.latestAppointments.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-center px-6 py-5 gap-5 transition-all duration-200 ease-in-out hover:bg-gray-50"
//               >
//                 <img
//                   className="rounded-full w-12 h-12 object-cover border-2 border-gray-200"
//                   src={item.userData.image}
//                   alt="User"
//                 />
//                 <div className="flex-1 text-sm">
//                   <p className="text-gray-800 font-medium">{item.userData.name}</p>
//                   <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
//                 </div>
//                 {item.cancelled ? (
//                   <img
//                     className="w-9 h-9 cursor-pointer transform hover:scale-110 hover:rotate-45 transition duration-500"
//                     src={assets.cancelled}
//                     alt="Cancelled"
//                     title="Appointment Cancelled"
//                   />
//                 ) : item.isCompleted ? (
//                   <img
//                     className="w-10 h-10 cursor-pointer transform hover:scale-110 transition duration-300"
//                     src={assets.checklist}
//                     alt="Completed"
//                     title="Appointment Completed"
//                   />
//                 ) : (
//                   <div className="flex gap-3">
//                     <img
//                       className="w-8 h-8 cursor-pointer rounded-full transform hover:scale-110 transition-all duration-500"
//                       src={assets.cross}
//                       alt="Cancel"
//                       onClick={() => cancelAppointment(item._id)}
//                       title="Cancel Now"
//                     />
//                     <img
//                       className="w-8 h-8 cursor-pointer rounded-full transform hover:scale-110 transition-all duration-500"
//                       src={assets.checkmark}
//                       alt="Complete"
//                       onClick={() => completeAppointment(item._id)}
//                       title="Complete Now"
//                     />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default DoctorDashboard;



import React, { useEffect, useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { token, docDashdata, getDashboardData, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (token) {
      getDashboardData();
    }
  }, [token]);

  // Function to handle cancel action with re-fetching data
  const handleCancel = async (appointmentId) => {
    await cancelAppointment(appointmentId);
    getDashboardData(); // Re-fetch data after cancellation
  };

  // Function to handle complete action with re-fetching data
  const handleComplete = async (appointmentId) => {
    await completeAppointment(appointmentId);
    getDashboardData(); // Re-fetch data after completion
  };

  return (
    docDashdata && (
      <div className="m-6">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-5 p-6 bg-white min-w-[13rem] rounded-lg border-2 border-gray-100 shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105">
            <img className="w-16" src={assets.earning_icon} alt="Earnings Icon" />
            <div>
              <p className="text-2xl font-semibold text-gray-700">
                {currency} {docDashdata.earnings}
              </p>
              <p className="text-gray-500">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-6 bg-white min-w-[13rem] rounded-lg border-2 border-gray-100 shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105">
            <img className="w-16" src={assets.appointments_icon} alt="Appointments Icon" />
            <div>
              <p className="text-2xl font-semibold text-gray-700">
                {docDashdata.appointments}
              </p>
              <p className="text-gray-500">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-6 bg-white min-w-[13rem] rounded-lg border-2 border-gray-100 shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105">
            <img className="w-16" src={assets.patients_icon} alt="Patients Icon" />
            <div>
              <p className="text-2xl font-semibold text-gray-700">
                {docDashdata.patients}
              </p>
              <p className="text-gray-500">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white mt-12 rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center gap-4 px-6 py-4 bg-gray-50 border-b">
            <img src={assets.list_icon} alt="List Icon" className="w-6" />
            <p className="font-semibold text-lg text-gray-700 ">Latest Bookings</p>
          </div>

          <div className="divide-y">
            {docDashdata.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-6 py-5 gap-5 transition-all duration-200 ease-in-out hover:bg-gray-50"
              >
                <img
                  className="rounded-full w-12 h-12 object-cover border-2 border-gray-200"
                  src={item.userData.image}
                  alt="User"
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.userData.name}</p>
                  <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled ? (
                  <img
                    className="w-9 h-9 cursor-pointer transform hover:scale-110 hover:rotate-45 transition duration-500"
                    src={assets.cancelled}
                    alt="Cancelled"
                    title="Appointment Cancelled"
                  />
                ) : item.isCompleted ? (
                  <img
                    className="w-10 h-10 cursor-pointer transform hover:scale-110 transition duration-300"
                    src={assets.checklist}
                    alt="Completed"
                    title="Appointment Completed"
                  />
                ) : (
                  <div className="flex gap-3">
                    <img
                      className="w-8 h-8 cursor-pointer rounded-full transform hover:scale-110 transition-all duration-500"
                      src={assets.cross}
                      alt="Cancel"
                      onClick={() => handleCancel(item._id)}
                      title="Cancel Now"
                    />
                    <img
                      className="w-8 h-8 cursor-pointer rounded-full transform hover:scale-110 transition-all duration-500"
                      src={assets.checkmark}
                      alt="Complete"
                      onClick={() => handleComplete(item._id)}
                      title="Complete Now"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
