import validator from "validator";
import bcrypt from 'bcrypt'
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import { v2 as cloudinary} from 'cloudinary';
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from 'razorpay';




// API to Register New User
const registerUser = async (req, res) => {
    try {

        const {name,email,password} = req.body;

        if (!name || !email || !password) {
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

        // hashing user password | encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const userData = {
            name,
            email,
            password:hashedPassword,
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();
        
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
        console.log("User Token : ", token);
        
        res.json({success:true, token, message:"New User Registered Successfully."})
 
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}
//---------------------------------------------------------------------------------------------------------------------------------

// API to User Login
const loginUser = async (req, res) => {
    try {

        const {email, password} = req.body;
        const user = await userModel.findOne({email});

        if (!user) {
            res.json({success:false, message:"User does not exist."})
        }

        const isMatch = await bcrypt.compare(password,user.password)    //matching password of user

        if (isMatch) {
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true, token, message:"User Login Successful."})
        }else{
            res.json({success:false, message:"Invalid Credentials."})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}
//---------------------------------------------------------------------------------------------------------------------------------

// API to get User Profile data
const getProfile = async (req,res) => {
    try {

        const {userId} = req.body;
        const userData = await userModel.findById(userId).select('-password');

        res.json({success:true, userData})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}
//---------------------------------------------------------------------------------------------------------------------------------

// API to update user profile
const updateProfile = async (req,res) => {
    try {

        const {userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;
        
        if (!name || !phone || !address || !dob || !gender ) {
            res.json({success:false, message:"Missing info! kindly provide all information."})
        }

        await userModel.findByIdAndUpdate(userId,{name, phone, address:JSON.parse(address), dob, gender});

        if (imageFile) {
            
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageURL = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId,{image:imageURL})

        }
        res.json({success:true, message:"User Profile Updated Successfully."})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}
//---------------------------------------------------------------------------------------------------------------------------------

// API to book appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;

        // Find the doctor and ensure they're available
        // const docData = await doctorModel.findById(docId).select('-password');
        const docData = await doctorModel.findById(docId).select('-password')
        console.log("docData",docData);
        
        if (!docData.available) {
            return res.json({ success: false, message: "We're sorry for the inconvenience. \nThe Doctor is not available at this time." });
        }

        // Initialize slots data
        let slots_booked = docData.slots_booked || {};

        // Check slot availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot Not Available." });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [slotTime];
        }

        // Get user data and prepare appointment
        const userData = await userModel.findById(userId).select('-password');
        const appointmentData = {
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            docData: { ...docData._doc, slots_booked: undefined },  // Remove slots_booked from docData
            amount: docData.fees,
            date: Date.now(),
        };

        // Save appointment
        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // Update the doctor's slots data
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "Your appointment is Booked. Wish you vibrant health and well-being." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
//---------------------------------------------------------------------------------------------------------------------------------

// API to get user apoointments for frontend my-appointments page
const listAppointments = async (req,res) => {
    try {

        const {userId} = req.body;
        const appointments = await appointmentModel.find({userId})

        res.json({success:true, message:"Your Upcoming Appointments.", appointments})
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
//---------------------------------------------------------------------------------------------------------------------------------

// API to cancel appointment
const cancelAppointment = async (req,res) => {
    try {

        const {userId, appointmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        // verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({success:false, message:"Unauthorized Action."})
        }

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});

        // releasing doctor's slot 

        const {docId, slotDate,slotTime} = appointmentData;

        const doctorData = await doctorModel.findById(docId);

        let slots_booked = doctorData.slots_booked //copy 

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime) //here we checking cancel slot and make it to available in doctor data again

        await doctorModel.findByIdAndUpdate(docId, {slots_booked})  //released slot time and date will added in doctor data

        res.json({success:true, message:"Appointment Cancelled Successfully."});
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//---------------------------------------------------------------------------------------------------------------------------------

const razorpayInstance = new razorpay({
    key_id:'',
    key_secret:''
})

// API to make payment of appointment using razorpay
const paymentRazorpay = async (req,res) => {
    
}


export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointments, cancelAppointment};