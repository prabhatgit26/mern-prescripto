// import { createContext, useState } from "react";
// import axios from 'axios';
// import {toast} from 'react-toastify';

// export const AdminContext = createContext();

// const AdminContextProvider = (props) => {

//     const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'');
//     const [doctors, setDoctors] = useState([]);
//     const [appointments, setAppointments] = useState([]);
//     const [dashData, setDashData] = useState(false);

//     const backendUrl = import.meta.env.VITE_BACKEND_URL;

//     const getAllDoctors = async (req,res) => {

//         try {

//             const {data} = await axios.post(backendUrl + '/api/admin/all-doctors', {}, {headers:{aToken}});
//             if (data.success) {
//                 setDoctors(data.doctors);
//                 console.log("All doctors : ",data.doctors);
//             }else{
//                 toast.error(data.message);
//             }
            
//         } catch (error) {
//             toast.error(error.message);
//         }
//     }

//     const changeAvailability = async (docId) => {

//         try {

//             const {data} = await axios.post(backendUrl + '/api/admin/change-availability', {docId}, {headers:{aToken}});
//             if (data.success) {
//                 toast.success(data.message);
//                 getAllDoctors();
//             }else{
//                 toast.error(data.message);
//             }
            
//         } catch (error) {
//             toast.error(error.message);
//         }

//     }

//     // Delete Doctor Function
//     const deleteDoctor = async (docId) => {
//         try {
//             const { data } = await axios.delete(backendUrl + '/api/admin/delete-doctor', {
//             data: { docId }, // Send docId as part of the request body using `data`
//             headers: { aToken } // Add the authorization token in headers
//         });

//         if (data.success) {
//             toast.success("Doctor deleted successfully.");
//             getAllDoctors(); // Refresh the doctor list after deletion
//         } else {
//             toast.error(data.message || "Failed to delete doctor.");
//         }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     // Get Appointments for Admin
//     const getAllAppointments = async () => {
//         try {

//             const {data} = await axios.get(backendUrl + '/api/admin/appointments', {headers:{aToken}});
//             if (data.success) {
//                 setAppointments(data.appointments)
//                 console.log(data.appointments);
                
//                 // toast.success("Appointment List Updated.");
//             }else{
//                 toast.error(data.message);
//             }
            
//         } catch (error) {
//             toast.error(error.message);
//         }
//     }

//     // Cancel appointment from admin
//     const adminCancelAppointment = async (appointmentId) => {
//         try {

//             const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})
//             if (data.success) {
//                 toast.success(data.message);
//                 getAllAppointments();
//             }else{
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.message)
//         }
//     }

//     // Dashboard Data
//     const getDashBoardData = async () => {
//         try {

//             const {data} = await axios.get(backendUrl + '/api/admin/dashboard', {headers:{aToken}})
//             if (data.success) {
//                 setDashData(data.dashData);
//                 console.log(data.dashData);
                
//             }else{
//                 toast.error(data.message)
//             }
            
//         } catch (error) {
//             console.log(error);
//             toast.error(error.message)
//         }
//     }
    
    
    
    
    
//     const value = {
//         aToken,
//         setAToken,
//         backendUrl,
//         getAllDoctors,
//         doctors,
//         changeAvailability,
//         deleteDoctor,
//         appointments,
//         getAllAppointments,
//         adminCancelAppointment,
//         dashData,
//         getDashBoardData
//     }

//     return (
//         <AdminContext.Provider value={value}>
//             {props.children}
//         </AdminContext.Provider>
//     )
// }

// export default AdminContextProvider;

//-------------------------------------------------------------------

import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Effect hook to log whenever aToken changes
    useEffect(() => {
        console.log('aToken updated:', aToken);
    }, [aToken]);

    // Function to store token in localStorage and update state
    const setToken = (token) => {
        localStorage.setItem('aToken', token);
        setAToken(token);
        console.log("Token set in localStorage:", localStorage.getItem('aToken'));
    }

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { aToken } });
            if (data.success) {
                setDoctors(data.doctors);
                console.log("All doctors:", data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { aToken } });
            if (data.success) {
                toast.success(data.message);
                getAllDoctors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Delete Doctor Function
    const deleteDoctor = async (docId) => {
        try {
            const { data } = await axios.delete(backendUrl + '/api/admin/delete-doctor', {
                data: { docId },
                headers: { aToken }
            });

            if (data.success) {
                toast.success("Doctor deleted successfully.");
                getAllDoctors();
            } else {
                toast.error(data.message || "Failed to delete doctor.");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Get Appointments for Admin
    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } });
            if (data.success) {
                setAppointments(data.appointments);
                console.log(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Cancel appointment from admin
    const adminCancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } });
            if (data.success) {
                toast.success(data.message);
                getAllAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Dashboard Data
    const getDashBoardData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } });
            if (data.success) {
                setDashData(data.dashData);
                console.log(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const value = {
        aToken,
        setAToken,  // Now we can set the token using the setToken function
        backendUrl,
        getAllDoctors,
        doctors,
        changeAvailability,
        deleteDoctor,
        appointments,
        getAllAppointments,
        adminCancelAppointment,
        dashData,
        getDashBoardData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;
