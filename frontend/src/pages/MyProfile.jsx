import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  
  const {userData, setUserData, token, backendUrl, loadUserProfileData} = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
      try {

        const formData = new FormData()

        formData.append('name',userData.name)
        formData.append('phone',userData.phone)
        formData.append('address',JSON.stringify(userData.address))
        formData.append('gender',userData.gender)
        formData.append('dob',userData.dob)

        image && formData.append('image',image)

        const {data} = await axios.post(backendUrl + '/api/user/update-profile',formData,{headers:{token}});
        if (data.success) {
          toast.success(data.message);
          await loadUserProfileData();
          setIsEdit(false);
          setImage(false);
        }else{
          toast.error(data.message);
        }

      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
  }



  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-[17px]'>

      {
        isEdit
        ? <label htmlFor="image">
          <div className='inline-block relative cursor-pointer'>
            <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden/>
        </label>
        : <img className='w-36 rounded hover:scale-105 transition-all duration-700 border-2 hover:border-blue-100 shadow-lg' src={userData.image} alt="" />
      }

      {
        isEdit ? 
        <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={e => setUserData(prev => ({...prev,name:e.target.value}))} /> :
        <p className='font-medium text-3xl text-blue-800 mt-4'>{userData.name}</p>
      }

      <hr className='bg-zinc-400 h-[1px] border-none'  />
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit 
            ? 
            <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={e => setUserData(prev => ({...prev,phone:e.target.value}))} /> 
            :
            <p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            isEdit 
            ? <p>
              <input className='bg-gray-50' onChange={(e) => setUserData(prev => ({...prev, address: {...prev.address, line1: e.target.value}}))} value={userData.address.line1} type="text" />
              <br />
              <input className='bg-gray-50' onChange={(e) => setUserData(prev => ({...prev, address: {...prev.address, line2: e.target.value}}))} value={userData.address.line2} type="text" />
            </p>
            : <p className='text-gray-500'>
              {userData.address.line1}
              <br />
              {userData.address.line2}

            </p>
          }
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit ? 
            <select className='max-w-20 bg-gray-100' onChange={(e) => setUserData(prev => ({...prev, gender: e.target.value}))} value={userData.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select> :
            <p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium'>Birthday:</p>
          {
            isEdit 
            ? <input className='max-w-28 bg-gray-100' type="date" onChange={(e) => setUserData(prev => ({...prev, dob: e.target.value}))} value={userData.dob} />
            : <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>

      <div className='mt-10'>
        {
          isEdit
          ? <button className="mt-8 px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-700 transform transition hover:scale-105 duration-300" onClick={updateUserProfileData}>Save Information</button>
          : <button className="mt-8 px-6 py-1 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-700 transform transition hover:scale-105 duration-300" onClick={()=>setIsEdit(true)}>Edit</button>
        }
      </div>

    </div>
  )
}

export default MyProfile;














//----------------------------------------------------------

//profile design no. 2

// import React, { useContext, useState } from "react";
// import { assets } from "../assets/assets";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const MyProfile = () => {
//   const { userData, setUserData, token, backendUrl, loadUserProfileData } =
//     useContext(AppContext);
//   const [isEdit, setIsEdit] = useState(false);
//   const [image, setImage] = useState(false);

//   const updateUserProfileData = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("name", userData.name);
//       formData.append("phone", userData.phone);
//       formData.append("address", JSON.stringify(userData.address));
//       formData.append("gender", userData.gender);
//       formData.append("dob", userData.dob);
//       image && formData.append("image", image);

//       const { data } = await axios.post(
//         backendUrl + "/api/user/update-profile",
//         formData,
//         { headers: { token } }
//       );
//       if (data.success) {
//         toast.success(data.message);
//         await loadUserProfileData();
//         setIsEdit(false);
//         setImage(false);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   return (
//     userData && (
//       <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
//         {/* Profile Image Section */}
//         <div className="flex flex-col items-center">
//           {isEdit ? (
//             <label htmlFor="image" className="relative cursor-pointer">
//               <img
//                 className="w-36 h-36 rounded-full border-2 border-blue-500 object-cover"
//                 src={
//                   image
//                     ? URL.createObjectURL(image)
//                     : userData.image
//                 }
//                 alt="Profile"
//               />
//               <img
//                 className="w-8 h-8 absolute bottom-2 right-2"
//                 src={assets.upload_icon}
//                 alt="Upload"
//               />
//               <input
//                 onChange={(e) => setImage(e.target.files[0])}
//                 type="file"
//                 id="image"
//                 hidden
//               />
//             </label>
//           ) : (
//             <img
//               className="w-36 h-36 rounded-full border-4 border-blue-500 object-cover"
//               src={userData.image}
//               alt="Profile"
//             />
//           )}
//           {isEdit ? (
//             <input
//               className="mt-4 text-2xl font-bold text-center border-b-2 focus:outline-none"
//               type="text"
//               value={userData.name}
//               onChange={(e) =>
//                 setUserData((prev) => ({ ...prev, name: e.target.value }))
//               }
//             />
//           ) : (
//             <h2 className="mt-4 text-3xl font-bold text-gray-800">
//               {userData.name}
//             </h2>
//           )}
//         </div>

//         {/* Contact Information */}
//         <div>
//           <h3 className="text-lg font-semibold text-blue-500 border-b-2 border-gray-200 pb-2">
//             Contact Information
//           </h3>
//           <div className="grid grid-cols-[1fr_2fr] gap-4 mt-4">
//             <p className="font-medium text-gray-600">Email:</p>
//             <p className="text-gray-800">{userData.email}</p>
//             <p className="font-medium text-gray-600">Phone:</p>
//             {isEdit ? (
//               <input
//                 className="border p-2 rounded-lg focus:outline-blue-500"
//                 type="text"
//                 value={userData.phone}
//                 onChange={(e) =>
//                   setUserData((prev) => ({ ...prev, phone: e.target.value }))
//                 }
//               />
//             ) : (
//               <p className="text-gray-800">{userData.phone}</p>
//             )}
//           </div>
//         </div>

//         {/* Address Information */}
//         <div>
//           <h3 className="text-lg font-semibold text-blue-500 border-b-2 border-gray-200 pb-2">
//             Address
//           </h3>
//           {isEdit ? (
//             <div className="mt-2">
//               <input
//                 className="border p-2 rounded-lg w-full mb-2 focus:outline-blue-500"
//                 type="text"
//                 value={userData.address.line1}
//                 onChange={(e) =>
//                   setUserData((prev) => ({
//                     ...prev,
//                     address: { ...prev.address, line1: e.target.value },
//                   }))
//                 }
//                 placeholder="Line 1"
//               />
//               <input
//                 className="border p-2 rounded-lg w-full focus:outline-blue-500"
//                 type="text"
//                 value={userData.address.line2}
//                 onChange={(e) =>
//                   setUserData((prev) => ({
//                     ...prev,
//                     address: { ...prev.address, line2: e.target.value },
//                   }))
//                 }
//                 placeholder="Line 2"
//               />
//             </div>
//           ) : (
//             <p className="mt-2 text-gray-800">
//               {userData.address.line1}
//               <br />
//               {userData.address.line2}
//             </p>
//           )}
//         </div>

//         {/* Basic Information */}
//         <div>
//           <h3 className="text-lg font-semibold text-blue-500 border-b-2 border-gray-200 pb-2">
//             Basic Information
//           </h3>
//           <div className="grid grid-cols-[1fr_2fr] gap-4 mt-4">
//             <p className="font-medium text-gray-600">Gender:</p>
//             {isEdit ? (
//               <select
//                 className="border p-2 rounded-lg focus:outline-blue-500"
//                 value={userData.gender}
//                 onChange={(e) =>
//                   setUserData((prev) => ({ ...prev, gender: e.target.value }))
//                 }
//               >
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//             ) : (
//               <p className="text-gray-800">{userData.gender}</p>
//             )}
//             <p className="font-medium text-gray-600">Birthday:</p>
//             {isEdit ? (
//               <input
//                 className="border p-2 rounded-lg focus:outline-blue-500"
//                 type="date"
//                 value={userData.dob}
//                 onChange={(e) =>
//                   setUserData((prev) => ({ ...prev, dob: e.target.value }))
//                 }
//               />
//             ) : (
//               <p className="text-gray-800">{userData.dob}</p>
//             )}
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end space-x-4">
//           {isEdit ? (
//             <button
//               onClick={updateUserProfileData}
//               className="px-8 py-1.5 bg-blue-200 text-blue-500 rounded-sm hover:bg-gradient-to-r from-blue-300 to-blue-600 hover:text-white shadow-md transition"
//             >
//               Save
//             </button>
//           ) : (
//             <button
//               onClick={() => setIsEdit(true)}
//               className="px-8 py-1.5 bg-blue-50 text-blue-500 rounded-sm hover:bg-gradient-to-r from-blue-300 to-blue-600 hover:text-white shadow-md transition"
//             >
//               Edit
//             </button>
//           )}
//         </div>
//       </div>
//     )
//   );
// };

// export default MyProfile;


//----------------------------------------------------------

//profile design no. 3

// import React, { useContext, useState } from 'react';
// import { assets } from '../assets/assets';
// import { AppContext } from '../context/AppContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const MyProfile = () => {
//   const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
//   const [isEdit, setIsEdit] = useState(false);
//   const [image, setImage] = useState(false);

//   const updateUserProfileData = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('name', userData.name);
//       formData.append('phone', userData.phone);
//       formData.append('address', JSON.stringify(userData.address));
//       formData.append('gender', userData.gender);
//       formData.append('dob', userData.dob);

//       image && formData.append('image', image);

//       const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });
//       if (data.success) {
//         toast.success(data.message);
//         await loadUserProfileData();
//         setIsEdit(false);
//         setImage(false);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   return (
//     userData && (
//       <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
//         <div className="flex flex-col items-center gap-4">
//           {isEdit ? (
//             <label htmlFor="image" className="relative cursor-pointer">
//               <img
//                 className="w-36 h-36 border-2 border-gray-300 object-cover shadow-lg group-hover:scale-105 transition-all duration-700"
//                 src={image ? URL.createObjectURL(image) : userData.image}
//                 alt="User"
//               />
//               <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
//                 <img className="w-6" src={assets.upload_icon} alt="Upload" />
//               </div>
//               <input
//                 type="file"
//                 id="image"
//                 hidden
//                 onChange={(e) => setImage(e.target.files[0])}
//               />
//             </label>
//           ) : (
//             <img
//               className="w-36 h-36 rounded-full border-4 border-gray-300 object-cover shadow-lg"
//               src={userData.image}
//               alt="User"
//             />
//           )}
//           {isEdit ? (
//             <input
//               className="text-3xl font-semibold text-center bg-gray-100 border-b-2 border-blue-500 focus:outline-none focus:border-blue-600 transition-all"
//               type="text"
//               value={userData.name}
//               onChange={(e) =>
//                 setUserData((prev) => ({ ...prev, name: e.target.value }))
//               }
//             />
//           ) : (
//             <h2 className="text-3xl font-semibold text-gray-800">{userData.name}</h2>
//           )}
//         </div>

//         <div className="mt-6">
//           <p className="text-blue-500 font-bold text-lg mb-3">Contact Information</p>
//           <div className="grid grid-cols-2 gap-4 text-gray-700">
//             <p className="font-medium">Email:</p>
//             <p className="text-gray-600">{userData.email}</p>
//             <p className="font-medium">Phone:</p>
//             {isEdit ? (
//               <input
//                 className="bg-gray-100 border border-gray-300 rounded-lg px-2 py-1"
//                 type="text"
//                 value={userData.phone}
//                 onChange={(e) =>
//                   setUserData((prev) => ({ ...prev, phone: e.target.value }))
//                 }
//               />
//             ) : (
//               <p>{userData.phone}</p>
//             )}
//             <p className="font-medium">Address:</p>
//             {isEdit ? (
//               <div>
//                 <input
//                   className="bg-gray-100 border border-gray-300 rounded-lg px-2 py-1 mb-1"
//                   type="text"
//                   value={userData.address.line1}
//                   onChange={(e) =>
//                     setUserData((prev) => ({
//                       ...prev,
//                       address: { ...prev.address, line1: e.target.value },
//                     }))
//                   }
//                   placeholder="Address Line 1"
//                 />
//                 <input
//                   className="bg-gray-100 border border-gray-300 rounded-lg px-2 py-1"
//                   type="text"
//                   value={userData.address.line2}
//                   onChange={(e) =>
//                     setUserData((prev) => ({
//                       ...prev,
//                       address: { ...prev.address, line2: e.target.value },
//                     }))
//                   }
//                   placeholder="Address Line 2"
//                 />
//               </div>
//             ) : (
//               <p>
//                 {userData.address.line1}
//                 <br />
//                 {userData.address.line2}
//               </p>
//             )}
//           </div>
//         </div>

//         <div className="mt-6">
//           <p className="text-blue-500 font-bold text-lg mb-3">Basic Information</p>
//           <div className="grid grid-cols-2 gap-4 text-gray-700">
//             <p className="font-medium">Gender:</p>
//             {isEdit ? (
//               <select
//                 className="bg-gray-100 border border-gray-300 rounded-lg px-2 py-1"
//                 value={userData.gender}
//                 onChange={(e) =>
//                   setUserData((prev) => ({ ...prev, gender: e.target.value }))
//                 }
//               >
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//             ) : (
//               <p>{userData.gender}</p>
//             )}
//             <p className="font-medium">Birthday:</p>
//             {isEdit ? (
//               <input
//                 className="bg-gray-100 border border-gray-300 rounded-lg px-2 py-1"
//                 type="date"
//                 value={userData.dob}
//                 onChange={(e) =>
//                   setUserData((prev) => ({ ...prev, dob: e.target.value }))
//                 }
//               />
//             ) : (
//               <p>{userData.dob}</p>
//             )}
//           </div>
//         </div>

//         <div className="mt-10 flex justify-center">
//           {isEdit ? (
//             <button
//               className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition"
//               onClick={updateUserProfileData}
//             >
//               Save Information
//             </button>
//           ) : (
//             <button
//               className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition"
//               onClick={() => setIsEdit(true)}
//             >
//               Edit Profile
//             </button>
//           )}
//         </div>
//       </div>
//     )
//   );
// };

// export default MyProfile;


//----------------------------------------------------------


