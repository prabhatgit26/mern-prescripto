import { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [appointments, setAppointments] = useState([]);
  const [docDashdata, setDocDashdata] = useState(false);
  const [profileData, setProfileData] = useState(false);

  // Sync token with localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  // Get appointments for doctor panel
  const getAppointments = async () => {
    if (!token) {
      toast.error("Token is not available. Please login again.");
      return;
    }
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/appointments", {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // API to mark appointment as completed
  const completeAppointment = async (appointmentId) => {
    if (!token) {
      toast.error("Token is not available. Please login again.");
      return;
    }
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // API to cancel appointment
  const cancelAppointment = async (appointmentId) => {
    if (!token) {
      toast.error("Token is not available. Please login again.");
      return;
    }
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Get dashboard data
  const getDashboardData = async () => {
    if (!token) {
      toast.error("Token is not available. Please login again.");
      return;
    }
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/dashboard", {
        headers: { token },
      });
      if (data.success) {
        setDocDashdata(data.docDashdata);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Get doctor profile data
  const getProfileData = async () => {
    if (!token) {
      toast.error("Token is not available. Please login again.");
      return;
    }
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/profile", {
        headers: { token },
      });
      if (data.success) {
        setProfileData(data.profileData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    token,
    setToken,
    backendUrl,
    getAppointments,
    appointments,
    setAppointments,
    completeAppointment,
    cancelAppointment,
    docDashdata,
    setDocDashdata,
    getDashboardData,
    getProfileData,
    profileData,
    setProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
