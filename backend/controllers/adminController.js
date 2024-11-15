import validator from "validator";
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js'


// API for adding Doctor 
const addDoctor = async (req,res) => {

    try {

        
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        //checking for all data to add doctor 
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({success:false, message:"Missing info! Please fill out all fields."})
        }
        
        // validating email format 
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Kindly Enter a Valid Email."})  
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({success:false, message:"Kindly Enter a Strong Password."})   
        }

        // hashing doctor password | encrypt password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
   
        // Upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"});
        const imageUrl = imageUpload.secure_url;

        //Doctor Data
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            about,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({success:true, message:"New Doctor Added Successfully."});


    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});   
        
    }
}

//--------------------------------------------------------------------------------------------------------------

// API for admin login
const loginAdmin = async (req, res) => {

    try {
        
        const  {email, password} = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email+password,process.env.JWT_SECRET);

            res.json({success:true, message:"Welcome Admin ! Login Successful.", token})
            
        }else{
            res.json({success:false, message:"Invalid credentials."})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

//--------------------------------------------------------------------------------------------------------------

// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true, doctors});
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});   
    }
}

//--------------------------------------------------------------------------------------------------------------

// API to delete a doctor by ID (from request body)
const deleteDoctor = async (req, res) => {
    try {
        const {docId } = req.body;

        // Check if doctor exists
        const doctor = await doctorModel.findById(docId);
        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found!" });
        }

        // Delete the doctor
        await doctorModel.findByIdAndDelete(docId);

        res.json({ success: true, message: "Doctor removed successfully." });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//--------------------------------------------------------------------------------------------------------------

// API to get all Appointments list for admin panel
const appointmentsAdmin = async (req,res) => {
    try {

        const appointments = await appointmentModel.find({});
        res.json({ success: true, appointments });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//--------------------------------------------------------------------------------------------------------------

// API to Cancel Appointment from admin panel
const adminCancelAppointment = async (req, res) => {
    try {
      const { appointmentId } = req.body;
  
      const appointmentData = await appointmentModel.findById(appointmentId);
  
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
  
      // releasing doctor's slot
  
      const { docId, slotDate, slotTime } = appointmentData;
  
      const doctorData = await doctorModel.findById(docId);
  
      let slots_booked = doctorData.slots_booked; //copy
  
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (e) => e !== slotTime
      ); //here we checking cancel slot and make it to available in doctor data again
  
      await doctorModel.findByIdAndUpdate(docId, { slots_booked }); //released slot time and date will added in doctor data
  
      res.json({ success: true, message: "Appointment Cancelled Successfully." });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };

//--------------------------------------------------------------------------------------------------------------

// API to get Dashboard Data for Admin Panel
const adminDashboard = async (req,res) => {
    try {

        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,10)
        }

        res.json({success:true, dashData, message:"All the Data Doctors, Patients, Appointments Updated."})
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}




export { addDoctor, loginAdmin, allDoctors, deleteDoctor, appointmentsAdmin, adminCancelAppointment, adminDashboard};