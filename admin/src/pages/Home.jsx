import React, { useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { aToken } = useContext(AdminContext); // Admin Token from context
  const { token } = useContext(DoctorContext); // Doctor Token from context
  const navigate = useNavigate();

  // Define metrics for Admin and Doctor
  const adminMetrics = [
    { label: "Total Appointments", value: "1,230", icon: "📅" },
    { label: "Active Doctors", value: "85", icon: "👨‍⚕️" },
    { label: "Patients Served", value: "4,560", icon: "🩺" },
    { label: "Rewards", value: "4 Achievements", icon: "🏆" },
    { label: "Feedback Received", value: "342", icon: "💬" },
  ];

  const doctorMetrics = [
    { label: "Appointments Today", value: "15", icon: "📅" },
    { label: "Patients Attended", value: "120", icon: "🩺" },
    { label: "Pending Feedback", value: "8", icon: "💬" },
    { label: "Hours Worked", value: "36", icon: "⏰" },
    { label: "Positive Reviews", value: "96%", icon: "🌟" },
  ];

  const metrics = aToken ? adminMetrics : token ? doctorMetrics : [];

  useEffect(() => {
    console.log("Admin Token: ", aToken); // Debugging purposes
    console.log("Doctor Token: ", token); // Debugging purposes
  }, [aToken, token]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-50 p-6 md:p-12">
      <marquee behavior="slide" direction="up">
        <h1 className="flex items-center justify-center text-4xl md:text-6xl font-semibold text-gray-800">
          Welcome to{" "}
          <span className=" text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 pl-2">
            {aToken ? "Prescrito" : token ? "Prescrito" : "Prescripto"}
          </span>
        </h1>
      </marquee>
      {/* Dashboard Header */}
      <marquee behavior="slide" direction="down" scrollamount="10">
        <header className="max-w-7xl mx-auto text-center mb-10">
          <hr className="opacity-50 text-gray-50 mb-0" />

          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400 ">
              {aToken
                ? "Admin's Panel"
                : token
                ? "Doctor's Panel"
                : "Prescripto"}{" "}
            </span>{" "}
          </h1>

          <p className="text-lg md:text-xl text-gray-600">
            {" "}
            {aToken
              ? "Oversee and manage healthcare operations effortlessly."
              : token
              ? "Deliver exceptional patient care and manage your appointments with ease."
              : "Streamline your healthcare operations for administrators and doctors alike."}
          </p>

          <hr className="opacity-50 text-gray-50 mt-5" />
        </header>
      </marquee>

      {/* Key Metrics Section */}
      <section className="max-w-7xl mx-auto mt-10 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-2 transition duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  {metric.label}
                </h3>
                <span className="text-3xl">{metric.icon}</span>
              </div>
              <p className="text-3xl font-bold text-gray-800">{metric.value}</p>
              <p className="text-sm text-gray-500">Last updated: Today</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            className="p-8 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-lg text-center"
            onClick={() =>
              navigate(aToken ? "/admin-dashboard" : "/doctor-dashboard")
            }
          >
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              {aToken ? "Admin's Dashboard" : "Doctor's Dashboard"}
            </h2>
            <p className="text-gray-700 mb-6">
              {aToken
                ? "Access system-wide operations, user management, and data analytics."
                : "Manage patient records, view appointments, and deliver quality care."}
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
              Access Dashboard
            </button>
          </div>

          <div className="p-8 bg-gradient-to-r from-green-100 to-green-200 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Analytics & Reports
            </h2>
            <p className="text-gray-700 mb-6">
              Visualize trends in appointments, patient demographics, and doctor
              performance.
            </p>
            <button
              onClick={() =>
                navigate(
                  aToken
                    ? "/all-apointments"
                    : token
                    ? "/doctor-appointments"
                    : "/"
                )
              }
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
            >
              View Analytics
            </button>
          </div>
        </div>
      </section>

      {/* Recent Activities */}
      <section className="max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Recent Activities
        </h3>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ul className="divide-y divide-gray-200">
            {[
              {
                user: "Dr. John Smith",
                action: "approved an appointment for Jane Doe.",
                time: "2 hours ago",
              },
              {
                user: "Admin",
                action: "updated system-wide performance metrics.",
                time: "1 day ago",
              },
              {
                user: "New User",
                action: "Jane Doe registered on the platform.",
                time: "Yesterday",
              },
            ].map((activity, index) => (
              <li key={index} className="py-4">
                <p className="text-gray-700">
                  <span className="font-bold text-blue-600">
                    {activity.user}
                  </span>{" "}
                  {activity.action}
                </p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Prescripto - All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;

//------------------------------------------------------------------------------------------------------

// import React, { useContext, useEffect } from "react";
// import { AdminContext } from "../context/AdminContext";
// import { DoctorContext } from "../context/DoctorContext";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const { aToken } = useContext(AdminContext); // Admin Token from context
//   const { token } = useContext(DoctorContext); // Doctor Token from context

//   console.log(aToken);

//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("Admin Token: ", aToken);  // Log token to verify it's correctly set
//     console.log("Doctor Token: ", token); // Log token to verify it's correctly set
//   }, [aToken, token]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 p-5 md:p-10 flex flex-col items-center justify-center">
//       <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl p-5 md:p-10">
//         {/* Header Section */}
//         <div className="text-center mb-6 md:mb-12">
//           {/* <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-4 relative">
//             {aToken
//               ? "Admin Panel"
//               : token
//               ? "Doctor Panel"
//               : "Admin & Doctor Panel"}
//           </h1> */}
//           <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text mb-4 relative">
//             {aToken ? (
//               <span className=" text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">
//                 Admin Panel
//               </span>
//             ) : token ? (
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">
//                 Doctor Panel
//               </span>
//             ) : (
//               <>
//                 <span className="bg-gradient-to-r from-blue-600 to-blue-800">
//                   Admin
//                 </span>{" "}
//                 &{" "}
//                 <span className="bg-gradient-to-r from-green-600 to-green-800">
//                   Doctor
//                 </span>{" "}
//                 Panel
//               </>
//             )}
//           </h1>

//           <p className="text-base md:text-lg text-gray-700 leading-relaxed">
//             Welcome to{" "}
//             <span className="font-bold text-blue-600">Prescripto's</span>{" "}
//             {aToken
//               ? "Admin Panel"
//               : token
//               ? "Doctor Panel"
//               : "Admin and Doctor Panel"}
//             .
//             {aToken ? (
//               <span>
//                 {" "}
//                 A platform to{" "}
//                 <span className="font-medium text-blue-500">
//                   manage users, monitor appointments,
//                 </span>{" "}
//                 and oversee system performance.
//               </span>
//             ) : token ? (
//               <span>
//                 {" "}
//                 A platform to{" "}
//                 <span className="font-medium text-green-500">
//                   view schedules, manage patient records,
//                 </span>{" "}
//                 and deliver exceptional healthcare.
//               </span>
//             ) : (
//               <span>
//                 {" "}
//                 A unified platform to{" "}
//                 <span className="font-medium text-blue-500">
//                   manage operations, analyze data,
//                 </span>{" "}
//                 and elevate healthcare services.
//               </span>
//             )}
//           </p>
//         </div>

//         {/* Conditional Rendering of Features Section */}
//         <div className="grid grid-cols-1 gap-6 md:gap-10">
//           {/* Render Admin Panel Card */}
//           {aToken && (
//             <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-5 md:p-8 shadow-lg hover:shadow-xl transition">
//               <h2 className="text-xl md:text-3xl font-semibold text-blue-600 mb-3 md:mb-4 text-center">
//                 Admin's Workspace
//               </h2>
//               <p className="text-gray-600 text-center mb-4 md:mb-6">
//                 Oversee system operations, user management, and appointment
//                 scheduling seamlessly.
//               </p>
//               <ul className="text-gray-600 space-y-2 md:space-y-3 mb-4 md:mb-6">
//                 <li
//                   onClick={() => navigate("/")}
//                   className="flex items-center hover:scale-105 transition-all duration-1000 cursor-pointer"
//                 >
//                   <span className="text-blue-500 mr-2">✔</span> Manage Doctor's
//                   Accounts
//                 </li>
//                 <li
//                   onClick={() => navigate("/")}
//                   className="flex items-center hover:scale-105 transition-all duration-1000 cursor-pointer"
//                 >
//                   <span className="text-blue-500 mr-2">✔</span> Monitor
//                   Appointments
//                 </li>
//                 <li
//                   onClick={() => navigate("/")}
//                   className="flex items-center hover:scale-105 transition-all duration-1000 cursor-pointer"
//                 >
//                   <span className="text-blue-500 mr-2">✔</span> Analyze System
//                   Performance
//                 </li>
//               </ul>
//               <div className="text-center">
//                 <button onClick={() => navigate(token ? '/doctor-dashboard': aToken ? '/admin-dashboard'  : '/')} className="px-4 md:px-6 py-2 md:py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-gradient-to-r from-blue-500 to-blue-600 transition">
//                   Access Dashboard
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Render Doctor Panel Card */}
//           {token && (
//             <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-5 md:p-8 shadow-lg hover:shadow-xl transition">
//               <h2 className="text-xl md:text-3xl font-semibold text-blue-600 mb-3 md:mb-4 text-center">
//                 Doctor's Workspace
//               </h2>
//               <p className="text-gray-600 text-center mb-4 md:mb-6">
//                 View schedules, manage patient records, and deliver exceptional
//                 healthcare.
//               </p>
//               <ul className="text-gray-600 space-y-2 md:space-y-3 mb-4 md:mb-6">
//                 <li className="flex items-center hover:scale-105 transition-all duration-1000 cursor-pointer">
//                   <span className="text-green-500 mr-2">✔</span> View Patient
//                   Records
//                 </li>
//                 <li className="flex items-center hover:scale-105 transition-all duration-1000 cursor-pointer">
//                   <span className="text-green-500 mr-2">✔</span> Manage
//                   Appointments
//                 </li>
//                 <li className="flex items-center hover:scale-105 transition-all duration-1000 cursor-pointer">
//                   <span className="text-green-500 mr-2">✔</span> Access Health
//                   Analytics
//                 </li>
//               </ul>
//               <div className="text-center">
//                 <button onClick={() => navigate(token ? '/doctor-dashboard': aToken ? '/admin-dashboard'  : '/')} className="px-4 md:px-6 py-1.5 md:py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-gradient-to-r from-blue-500 to-blue-600 transition"> Access  Dashboard </button>
//               </div>
//             </div>
//           )}

//           {/* If No Token Present */}
//           {!aToken && !token && (
//             <div className="text-center text-gray-600">
//               <p>Please log in to access your dashboard.</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Footer Section */}
//       <footer className="mt-6 md:mt-12 text-gray-600 text-center">
//         <p className="text-sm">
//           © Prescripto {new Date().getFullYear()} - Admin & Doctor Panel.
//           Designed to streamline your healthcare experience.
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default Home;

//--------------------------------------------------------------------------------------------

//design 2

// import React, { useContext, useEffect } from "react";
// import { AdminContext } from "../context/AdminContext";
// import { DoctorContext } from "../context/DoctorContext";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const { aToken } = useContext(AdminContext); // Admin Token from context
//   const { token } = useContext(DoctorContext); // Doctor Token from context

//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("Admin Token: ", aToken); // Log token to verify it's correctly set
//     console.log("Doctor Token: ", token); // Log token to verify it's correctly set
//   }, [aToken, token]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 p-5 md:p-10 flex flex-col items-center">
//       {/* Hero Section */}
//       <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl p-8 mb-10">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-6">
//             Welcome to Prescripto
//           </h1>
//           <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
//             {aToken
//               ? "Admin's Workspace - Manage operations, analyze data, and streamline the system effortlessly."
//               : token
//               ? "Doctor's Workspace - Organize schedules, oversee patient records, and deliver premium healthcare."
//               : "Your one-stop solution for healthcare management. Join us to experience seamless operations."}
//           </p>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Admin Panel Features */}
//         {aToken && (
//           <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition">
//             <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4 text-center">
//               Admin's Workspace
//             </h2>
//             <p className="text-gray-600 text-center mb-6">
//               Manage all operations seamlessly, monitor appointments, and ensure top-notch system performance.
//             </p>
//             <ul className="text-gray-600 space-y-3 mb-6">
//               <li className="flex items-center">
//                 <span className="text-blue-500 mr-3">✔</span> Oversee Doctor’s Accounts
//               </li>
//               <li className="flex items-center">
//                 <span className="text-blue-500 mr-3">✔</span> Monitor Appointments
//               </li>
//               <li className="flex items-center">
//                 <span className="text-blue-500 mr-3">✔</span> Analyze System Analytics
//               </li>
//             </ul>
//             <div className="text-center">
//               <button
//                 onClick={() => navigate("/admin-dashboard")}
//                 className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-gradient-to-r from-blue-500 to-blue-600 transition"
//               >
//                 Access Workspace
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Doctor Panel Features */}
//         {token && (
//           <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition">
//             <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-4 text-center">
//               Doctor's Workspace
//             </h2>
//             <p className="text-gray-600 text-center mb-6">
//               Organize schedules, monitor patient health, and deliver the highest quality care.
//             </p>
//             <ul className="text-gray-600 space-y-3 mb-6">
//               <li className="flex items-center">
//                 <span className="text-green-500 mr-3">✔</span> View Patient Records
//               </li>
//               <li className="flex items-center">
//                 <span className="text-green-500 mr-3">✔</span> Manage Appointments
//               </li>
//               <li className="flex items-center">
//                 <span className="text-green-500 mr-3">✔</span> Access Health Analytics
//               </li>
//             </ul>
//             <div className="text-center">
//               <button
//                 onClick={() => navigate("/doctor-dashboard")}
//                 className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-gradient-to-r from-green-500 to-green-600 transition"
//               >
//                 Access Workspace
//               </button>
//             </div>
//           </div>
//         )}

//         {/* For Guests */}
//         {!aToken && !token && (
//           <div className="col-span-2 text-center">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
//               Ready to Simplify Healthcare?
//             </h2>
//             <p className="text-gray-600 mb-6">
//               Login to access the platform and explore advanced features designed for healthcare management.
//             </p>
//             <div>
//               <button
//                 onClick={() => navigate("/login")}
//                 className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-gradient-to-r from-blue-500 to-blue-600 transition mr-4"
//               >
//                 Admin Login
//               </button>
//               <button
//                 onClick={() => navigate("/login")}
//                 className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-gradient-to-r from-green-500 to-green-600 transition"
//               >
//                 Doctor Login
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Footer Section */}
//       <footer className="mt-12 text-gray-600 text-center">
//         <p className="text-sm">
//           © {new Date().getFullYear()} Prescripto. Redefining healthcare, one panel at a time.
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default Home;

//-------------------------------------------------------------------------

//----------------------------------------------------------------------------------
//design 3

// import React, { useContext, useEffect } from "react";
// import { AdminContext } from "../context/AdminContext";
// import { DoctorContext } from "../context/DoctorContext";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const { aToken } = useContext(AdminContext); // Admin Token from context
//   const { token } = useContext(DoctorContext); // Doctor Token from context

//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("Admin Token: ", aToken); // Log token to verify it's correctly set
//     console.log("Doctor Token: ", token); // Log token to verify it's correctly set
//   }, [aToken, token]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 p-5 md:p-10 flex flex-col items-center justify-center">
//       <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl p-5 md:p-10">
//         {/* Header Section */}
//         <div className="text-center mb-6 md:mb-12">
//           <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text mb-4 relative">
//             {aToken ? (
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">
//                 Admin Panel
//               </span>
//             ) : token ? (
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">
//                 Doctor Panel
//               </span>
//             ) : (
//               <>
//                 <span className="bg-gradient-to-r from-blue-600 to-blue-800">
//                   Admin
//                 </span>{" "}
//                 &{" "}
//                 <span className="bg-gradient-to-r from-green-600 to-green-800">
//                   Doctor
//                 </span>{" "}
//                 Panel
//               </>
//             )}
//           </h1>

//           <p className="text-base md:text-lg text-gray-700 leading-relaxed">
//             Welcome to{" "}
//             <span className="font-bold text-blue-600">Prescripto's</span>{" "}
//             {aToken
//               ? "Admin Panel"
//               : token
//               ? "Doctor Panel"
//               : "Admin and Doctor Panel"}
//             , a platform to{" "}
//             {aToken
//               ? "manage system operations, users, and appointments effectively."
//               : token
//               ? "manage appointments and provide patient care seamlessly."
//               : "streamline healthcare operations for both administrators and doctors."}
//           </p>
//         </div>

//         {/* Key Metrics Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 md:mb-10">
//           <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-5 shadow-lg">
//             <h3 className="text-lg font-semibold text-blue-600 mb-2">
//               Total Appointments
//             </h3>
//             <p className="text-2xl font-bold text-gray-800">1,230</p>
//             <p className="text-sm text-gray-600">Last updated: Today</p>
//           </div>
//           <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-5 shadow-lg">
//             <h3 className="text-lg font-semibold text-green-600 mb-2">
//               Active Doctors
//             </h3>
//             <p className="text-2xl font-bold text-gray-800">85</p>
//             <p className="text-sm text-gray-600">Engaged this week</p>
//           </div>
//           <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg p-5 shadow-lg">
//             <h3 className="text-lg font-semibold text-pink-600 mb-2">
//               Patients Served
//             </h3>
//             <p className="text-2xl font-bold text-gray-800">4,560</p>
//             <p className="text-sm text-gray-600">Since platform launch</p>
//           </div>
//         </div>

//         {/* Conditional Rendering of Features Section */}
//         <div className="grid grid-cols-1 gap-6 md:gap-10 mb-6">
//           {aToken && (
//             <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-5 md:p-8 shadow-lg">
//               <h2 className="text-xl md:text-3xl font-semibold text-blue-600 mb-3 md:mb-4 text-center">
//                 Admin's Workspace
//               </h2>
//               <p className="text-gray-600 text-center mb-4 md:mb-6">
//                 Oversee system operations, user management, and appointment
//                 scheduling seamlessly.
//               </p>
//               <div className="text-center">
//                 <button
//                   onClick={() => navigate("/admin-dashboard")}
//                   className="px-4 md:px-6 py-2 md:py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-gradient-to-r from-blue-500 to-blue-600 transition"
//                 >
//                   Access Dashboard
//                 </button>
//               </div>
//             </div>
//           )}

//           {token && (
//             <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-5 md:p-8 shadow-lg">
//               <h2 className="text-xl md:text-3xl font-semibold text-blue-600 mb-3 md:mb-4 text-center">
//                 Doctor's Workspace
//               </h2>
//               <p className="text-gray-600 text-center mb-4 md:mb-6">
//                 View schedules, manage patient records, and deliver exceptional
//                 healthcare.
//               </p>
//               <div className="text-center">
//                 <button
//                   onClick={() => navigate("/doctor-dashboard")}
//                   className="px-4 md:px-6 py-2 md:py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-gradient-to-r from-green-500 to-green-600 transition"
//                 >
//                   Access Dashboard
//                 </button>
//               </div>
//             </div>
//           )}

//           {!aToken && !token && (
//             <div className="text-center text-gray-600">
//               <p>Please log in to access your dashboard.</p>
//             </div>
//           )}
//         </div>

//         {/* Recent Activities Section */}
//         <div className="bg-gray-50 rounded-lg p-5 shadow-lg">
//           <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
//             Recent Activities
//           </h2>
//           <ul className="space-y-3">
//             <li className="text-gray-600">
//               <span className="font-medium text-blue-600">Dr. Smith</span>{" "}
//               approved an appointment for{" "}
//               <span className="font-medium">John Doe</span>.
//             </li>
//             <li className="text-gray-600">
//               New user <span className="font-medium">Jane Doe</span> registered
//               on the platform.
//             </li>
//             <li className="text-gray-600">
//               <span className="font-medium text-green-600">Admin</span>{" "}
//               updated system performance metrics.
//             </li>
//           </ul>
//         </div>
//       </div>

//       <footer className="mt-6 md:mt-12 text-gray-600 text-center">
//         <p className="text-sm">
//           © Prescripto {new Date().getFullYear()} - Admin & Doctor Panel.
//           Designed to streamline your healthcare experience.
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default Home;

//----------------------------------------------------------------------------------
