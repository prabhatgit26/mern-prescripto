import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
// import { assets } from '../assets/assets';
import file8 from "../../assets/file8.svg"; // Correct relative path


const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailability, deleteDoctor } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);  // State to handle loading

  useEffect(() => {
    if (aToken) {
      setLoading(true);  // Start loading when the data fetching begins
      getAllDoctors()
        .then(() => setLoading(false))  // Stop loading once the data is fetched
        .catch(() => setLoading(false)); // Stop loading if there's an error
    }
  }, [aToken]);

  const handleDelete = (doctorId) => {
    // Ask for confirmation before deleting
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      deleteDoctor(doctorId);
    }
  };

  if (loading) {
    return <div className="text-center">Loading doctors...</div>;  // Show loading state
  }

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='flex flex-wrap w-full gap-4 pt-5 gap-y-6'>
        {
          doctors.length === 0 ? (
            <p>No doctors available</p>  // Show a message when no doctors are present
          ) : (
            doctors.map((item, index) => (
              <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
                <img className='bg-indigo-50 group-hover:bg-gradient-to-r from-blue-200 to-blue-500 transition-all duration-500' src={item.image} alt="" />
                <div className='p-4 hover:bg-gray-100'>
                  <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                  <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                  <div className='mt-2 flex items-center gap-1 text-sm'>
                    <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
                    <p className='font-semibold text-neutral-700'>Available</p>
                    <img src={file8} onClick={() => handleDelete(item._id)} className='w-4 ml-24 hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer ' title='Remove Doctor' />
                  </div>
                </div>
              </div>
            ))
          )
        }
      </div>
    </div>
  );
}

export default DoctorsList;
