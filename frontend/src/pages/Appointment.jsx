import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {

  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);

  const navigate = useNavigate();

  // these state variables to store slot data
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
  }


  // calculate slots data
  const getAvailableSlots = async () => {
    setDocSlots([]);

    // getting current 
    let today = new Date()

    for(let i = 0 ; i < 7; i++){
      // getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i);

      // setting end time of the date with index
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21,0,0,0)

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      }
      else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while(currentDate < endTime){
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})

        // to hide time in which slot is already booked 
        let day = currentDate.getDate()
        let month = currentDate.getMonth()+1
        let year = currentDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if (isSlotAvailable) {
          // add slot to array
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime
          })
        }

        

        // increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => ([...prev, timeSlots]))

    }

  }

  // Book Appointment ----------------------------------------------------------------------------------
  const bookAppointment = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warn('Kindly Login to Book Appointment.');
      return navigate('/login');
    }
    try {

      const date = docSlots[slotIndex][0].dateTime

      let day = date.getDate()
      let month = date.getMonth()+1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year

      const {data} = await axios.post(backendUrl + '/api/user/book-appointment', {docId,slotDate,slotTime}, {headers:{token}})
      if (data.success) {
        console.log(data);
        
        toast.success(data.message);
        getDoctorsData();   // Fix doctor again so that slot get updated
        navigate('/my-appointments');
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

  }

  useEffect(()=>{
    fetchDocInfo();
  },[doctors, docId]);

  useEffect(()=>{
    getAvailableSlots();
  },[docInfo]);

  useEffect(()=>{
    console.log("Doctor Slots : ",docSlots);
  },[docSlots]);


  return docInfo && (
    <div>
      {/* ------- Doctor details  ------- */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 sm:mt-0'>
          {/* ------- Doctor info : name, degree, experience  ------- */}
          <p className='flex items-center gap-2 text-4xl font-extrabold text-blue-800 tracking-wide '>
            {docInfo.name} 
            <img className='w-8 m-1 hover:scale-110 transition-all duration-700' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center mt-2 gap-2 text-gray-600'>
            <p className="text-lg font-medium text-gray-700" >{docInfo.degree} - {docInfo.speciality}</p>
            <button className="px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow-md">{docInfo.experience}</button>
          </div>

        {/* ------- Doctor details  ------- */}
        <div className='mt-5'>
        <h3 className="flex gap-2 text-lg font-semibold text-blue-700 mb-2">About
            <img src={assets.info_icon} alt="" />
        </h3>
          <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
        </div>
        <p className='text-blue-700 font-semibold text-lg mt-4 cursor-pointer'>
          Appointment Fee : <span className='text-gray-600'>{currencySymbol} {docInfo.fees}</span>
        </p>
        </div>
      </div>

      {/* ---------- Booking Slots --------- */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700 '>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots.map((item, index)=>(
              <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer hover:border-gray-500 ${slotIndex === index ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' : 'border border-gray-200'}`} key={index}>
                <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                <p>{item[0] && item[0].dateTime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots[slotIndex].map((item, index)=>(
              <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 cursor-pointer rounded-full hover:border-gray-500 ${item.time === slotTime ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' : 'text-gray-400 border border-gray-300' }`} key={index}>{item.time.toLowerCase()}</p>
            ))
          }
        </div>
        <button onClick={bookAppointment} className="w-[200px] mt-8 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-700 transform transition hover:scale-105 duration-700 px-2 py-2">Book an Appointment</button>
      </div>

      {/*--------- Listing Related Doctors ---------- */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />


    </div>
  )
}

export default Appointment;
