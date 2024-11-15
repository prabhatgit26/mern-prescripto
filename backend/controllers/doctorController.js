import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";

// Function for change Doctor's Availability (true/false)
const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;
        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
        res.json({ success: true, message: "Doctor's availability has been updated." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ------------------------------------------------------------------------------------------------------------

// API to list doctors
const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email']);
        res.json({ success: true, doctors });
        console.log("Doctor:", doctors);
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ------------------------------------------------------------------------------------------------------------

// API to Doctor Login
const doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email });
        if (!doctor) {
            return res.json({ success: false, message: "Invalid Credentials." });
        }
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
            res.json({ success: true, token, message: "Welcome Doctor! Login Successful." });
        } else {
            res.json({ success: false, message: "Invalid Credentials." });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ------------------------------------------------------------------------------------------------------------

// API to get all appointments for a specific doctor
const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.body;
        const appointments = await appointmentModel.find({ docId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ------------------------------------------------------------------------------------------------------------

// API to mark appointment completed for a doctor panel
const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
            return res.json({ success: true, message: "Appointment Completed." });
        } else {
            res.json({ success: false, message: "Mark Failed." });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ------------------------------------------------------------------------------------------------------------

// Updated API to cancel appointment for a doctor panel
const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        
        if (appointmentData && appointmentData.docId === docId) {
            // Mark the appointment as cancelled
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
            
            // Release the slot in the doctor's booked slots
            const { slotDate, slotTime } = appointmentData;
            const doctorData = await doctorModel.findById(docId);

            let slots_booked = doctorData.slots_booked;
            if (slots_booked[slotDate]) {
                slots_booked[slotDate] = slots_booked[slotDate].filter(
                    (time) => time !== slotTime
                );

                // If no more slots booked on this date, remove the date entry
                if (slots_booked[slotDate].length === 0) {
                    delete slots_booked[slotDate];
                }

                // Save the updated doctor data
                await doctorModel.findByIdAndUpdate(docId, { slots_booked });
            }

            res.json({ success: true, message: "Appointment Cancelled and Slot Released." });
        } else {
            res.json({ success: false, message: "Cancellation Failed." });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ------------------------------------------------------------------------------------------------------------

// API to get Dashboard Data for a doctor panel
const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.body;
        const appointments = await appointmentModel.find({ docId });
        let earnings = 0;
        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount;
            }
        });
        let patients = [];
        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId);
            }
        });
        const docDashdata = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 10)
        };
        res.json({ success: true, docDashdata, message: "All the Data Earnings, Patients, Appointments Updated." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ------------------------------------------------------------------------------------------------------------

// API to get Doctor Profile for doctor panel
const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.body;
        const profileData = await doctorModel.findById(docId).select('-password');
        res.json({ success: true, profileData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ------------------------------------------------------------------------------------------------------------

// API to update Doctor Profile from doctor panel
const updateDoctorProfile = async (req, res) => {
    try {
        const { docId, fees, address, available } = req.body;
        await doctorModel.findByIdAndUpdate(docId, { fees, address, available });
        res.json({ success: true, message: "Profile Updated." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    changeAvailability,
    doctorList,
    doctorLogin,
    appointmentsDoctor,
    appointmentComplete,
    appointmentCancel,
    doctorDashboard,
    doctorProfile,
    updateDoctorProfile
};
