import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorProfile = () => {
  const { token, backendUrl, getProfileData, profileData, setProfileData } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {

      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      } 

      // const {data} = await axios.post(backendUrl + '/api/doctor/update-profile',updateData, {headers:{dToken}});
      const {data} = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, {headers:{token}})
      console.log("Data is coming : ",data);
      
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      }else{
        toast.error(data.message);
      }
      
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      
    }
  }



  useEffect(() => {
    if (token) {
      getProfileData();
    }
  }, [token]);

  return profileData && (
    <div className="flex justify-center p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <div className="flex flex-col sm:flex-row gap-8 bg-white shadow-2xl rounded-lg p-8 w-full max-w-4xl transform transition">
        
        {/* Doctor Image */}
        <div className="flex-shrink-0 overflow-hidden rounded-lg ">
          <img className="w-full sm:w-64 h-64 object-cover bg-primary hover:scale-105 transition-all duration-1000 hover:bg-gradient-to-r from-indigo-600 to-blue-400" src={profileData.image} alt={profileData.name} />
        </div>

        {/* Doctor Details */}
        <div className="flex-1 border-l border-gray-200 pl-8">
          
          {/* Doctor Info */}
          <h2 className="text-4xl font-extrabold text-blue-800 tracking-wide  hover:scale-105 transition-all duration-1000 ">{profileData.name}</h2>
          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <p className="text-lg font-medium text-gray-700">{profileData.degree} - {profileData.speciality}</p>
            <span className="px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow-md">{profileData.experience}</span>
          </div>

          {/* About Section */}
          <div className="mt-5">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">About:</h3>
            <p className="text-gray-600 leading-relaxed">{profileData.about}</p>
          </div>

          <div className="mt-5">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Email:</h3>
            <p className="text-gray-600 leading-relaxed">{profileData.email}</p>
          </div>

          {/* Appointment Fees */}
          <p className="mt-5 text-gray-700">
            <span className="font-semibold text-lg text-blue-700">Appointment Fees: </span>
            <span className="text-gray-800 font-bold">{currency} {isEdit ? <input type="number" onChange={(e)=>setProfileData(prev => ({...prev, fees:e.target.value}))} value={profileData.fees} /> : profileData.fees}</span>
          </p>

          {/* Address */}
          <div className="mt-5">
            <h4 className="text-lg font-semibold text-blue-700">Address:</h4>
            <p className="text-gray-600">{isEdit ? <input type="text" onChange={(e)=>setProfileData(prev => ({...prev, address:{...prev.address,line1:e.target.value}}))} value={profileData.address.line1} /> : profileData.address.line1}
            <br />
            {isEdit ? <input type="text" onChange={(e)=>setProfileData(prev => ({...prev, address:{...prev.address,line2:e.target.value}}))} value={profileData.address.line2} /> :profileData.address.line2}</p>
          </div>

          {/* Availability Checkbox */}
          <div className="flex items-center gap-3 mt-6">
            <input onChange={()=>isEdit && setProfileData(prev => ({...prev, available: !prev.available}))} checked={profileData.available} type="checkbox" className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500" />
            <label className="text-gray-700 font-medium">Available</label>
          </div>

          {/* Edit Button */}

          {
            isEdit 
            ? 
            <button onClick={updateProfile} className="mt-8 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-700 transform transition hover:scale-105 duration-300">Save Profile</button> 
            :
            <button onClick={()=> setIsEdit(true)} className="mt-8 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-700 transform transition hover:scale-105 duration-300">Edit Profile</button>

          }
 
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
